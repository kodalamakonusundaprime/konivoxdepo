"""Seslendirmeye senkron final video.
Kullanım: python3 tools/final.py config.json
config.json:
{
  "video": "dm-cumlesi",            # VIDEOS[...] adı (build/page.html içinde)
  "wav": "/tmp/ses.wav",            # Speko'dan gelen Puck sesi (24 kHz mono wav)
  "out": "/home/claude/out/x.mp4",
  "anchors": [[0,0],[2.3,3.0],...], # [ses_zamanı_tau, tasarım_zamanı_t]; son çapa = video sonu (ses bitişi + ~1 sn)
  "fx": [["whoosh",6.0,0.7],["pop",3.8,0],...]  # [tür, tasarım zamanı, süre]; türler: whoosh scratch pop tick ding
}
Görüntü, tau->t çapalarıyla parça parça doğrusal eşlenir; efektler tasarım zamanından ses zamanına çevrilip seslendirmenin altına karıştırılır.
"""
import sys, json, asyncio, subprocess, os, shutil
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt
from playwright.async_api import async_playwright

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR, FPS = 24000, 30
rng = np.random.default_rng(7)

def env(n, a=.01, r=.2):
    t = np.arange(n)/SR; return np.minimum(1, t/a)*np.exp(-t/r)
def bp(x, lo, hi):
    return sosfilt(butter(2, [lo, hi], btype='band', fs=SR, output='sos'), x)
def whoosh(d):
    n = int(SR*max(d, .3)); x = rng.standard_normal(n); t = np.linspace(0, 1, n)
    return (bp(x, 300, 1200)*(1-t)+bp(x, 1200, 3500)*t)*np.sin(np.pi*t)**1.5*.22
def scratch(d):
    n = int(SR*max(d, .2)); x = bp(rng.standard_normal(n), 2500, 7000); t = np.arange(n)/SR
    am = .55+.45*np.abs(np.sin(2*np.pi*7*t+rng.random()*3)); fade = np.minimum(1, np.minimum(t/.04, (n/SR-t)/.06))
    return x*am*fade*.10
def pop(_):
    n = int(SR*.09); t = np.arange(n)/SR; f = 520*np.exp(-t*25)+380
    return np.sin(2*np.pi*np.cumsum(f)/SR)*env(n, .002, .03)*.35
def tick(_):
    n = int(SR*.05); t = np.arange(n)/SR; return np.sin(2*np.pi*1400*t)*env(n, .001, .012)*.18
def ding(_):
    n = int(SR*.9); t = np.arange(n)/SR
    return (np.sin(2*np.pi*988*t)+.4*np.sin(2*np.pi*1976*t)+.15*np.sin(2*np.pi*2964*t))*env(n, .003, .28)*.16
GEN = dict(whoosh=whoosh, scratch=scratch, pop=pop, tick=tick, ding=ding)

async def frames(name, xs, ys, dur, d):
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        pg = await b.new_page(viewport={'width': 720, 'height': 1280})
        await pg.goto(f'file://{R}/build/page.html#v={name}'); await pg.wait_for_timeout(400)
        await pg.evaluate('document.fonts.ready.then(()=>1)'); await pg.wait_for_timeout(200)
        for i in range(int(dur*FPS)):
            t = float(np.interp(i/FPS, xs, ys)); await pg.evaluate(f'window.seek({t:.4f})'); await pg.screenshot(path=f'{d}/{i:04d}.png')
        await b.close()

def main(cfg):
    c = json.load(open(cfg)); xs = [a for a, _ in c['anchors']]; ys = [b for _, b in c['anchors']]; dur = xs[-1]
    sr, v = wavfile.read(c['wav']); v = v.astype(np.float32)/32768.0
    if v.ndim > 1: v = v.mean(1)
    mix = np.zeros(int(SR*(dur+.2)), np.float32); mix[:len(v)] += v[:len(mix)]
    for kind, t0, dd in c.get('fx', []):
        a = float(np.interp(t0, ys, xs)); b = float(np.interp(t0+dd, ys, xs)) if dd else a
        s = GEN[kind](b-a); i0 = int(a*SR); s = s[:max(0, len(mix)-i0)]; mix[i0:i0+len(s)] += s
    mix = np.clip(mix/max(1, np.abs(mix).max()/.95), -1, 1); wav = f"/tmp/mix_{c['video']}.wav"
    wavfile.write(wav, SR, (mix*32767).astype(np.int16))
    d = f"/tmp/fr_{c['video']}"; shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
    asyncio.run(frames(c['video'], xs, ys, dur, d))
    os.makedirs(os.path.dirname(c['out']), exist_ok=True)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', str(FPS), '-i', f'{d}/%04d.png', '-i', wav, '-c:v', 'libx264',
                    '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-shortest', c['out']], check=True)
    print('ok', c['out'])

if __name__ == '__main__':
    main(sys.argv[1])
