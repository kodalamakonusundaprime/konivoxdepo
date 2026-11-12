"""Kontak sayfası: python3 tools/shots.py <video-adı> 0,1.5,3,... -> motion/build/sheet_<ad>.png"""
import sys, os, asyncio
from playwright.async_api import async_playwright
from PIL import Image
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
name = sys.argv[1]; TT = [float(x) for x in sys.argv[2].split(',')]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        pg = await b.new_page(viewport={'width': 540, 'height': 960}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(f'file://{R}/build/page.html#v={name}'); await pg.wait_for_timeout(400)
        await pg.evaluate('document.fonts.ready.then(()=>1)'); await pg.wait_for_timeout(200)
        ims = []
        for t in TT:
            await pg.evaluate(f'window.seek({t})'); f = f'/tmp/shot_{name}_{t}.png'; await pg.screenshot(path=f); ims.append(Image.open(f).convert('RGB'))
        W, H, n = 270, 480, len(ims); cols = min(6, n); rows = (n + cols - 1) // cols
        sh = Image.new('RGB', (cols*(W+10)+10, rows*(H+10)+10), (40, 40, 40))
        for i, im in enumerate(ims): sh.paste(im.resize((W, H)), (10+(i % cols)*(W+10), 10+(i//cols)*(H+10)))
        out = f'{R}/build/sheet_{name}.png'; sh.save(out); print('errors:', errs, '->', out)
        await b.close()
asyncio.run(main())
