"""Elle paylaşılacaklar listesi (TikTok her zaman; Instagram yalnız Metricool kotası dolunca).
Kullanım: python3 elle.py [--yaz]   --yaz: listeyi sirket/elle-paylas.md dosyasına da yazar."""
import argparse, os, datetime as dt
from ortak import yukle, bugun, aktif
a = argparse.ArgumentParser(); a.add_argument('--yaz', action='store_true'); o = a.parse_args()
URL = 'https://raw.githubusercontent.com/kodalamakonusundaprime/konivoxdepo/main/motion/yayin/{}.mp4'
b = bugun() - dt.timedelta(days=1); satir = []
for v in yukle()['videolar']:
    if not aktif(v): continue
    for ag, z in (v.get('yayin') or {}).items():
        if z and z.startswith('elle:') and dt.date.fromisoformat(z[5:15]) >= b:
            satir.append((z[5:], ag, v))
satir.sort(key=lambda x: x[0])
out = ['# Elle paylaşılacaklar', '', 'Videoyu bağlantıdan indir, metni kopyala, belirtilen saatte paylaş. TikTok\'ta "Yapay zekâ ile oluşturuldu" etiketini aç.', '']
for z, ag, v in satir:
    ad = 'TikTok' if ag == 'tiktok' else 'Instagram (Reels)'
    metin = v.get('tiktok_metin' if ag == 'tiktok' else 'instagram_metin') or '(metin yok: kanca + soru yaz)'
    out += [f"## {z[:10]} {z[11:16]} · {ad} · {v['ad']}", f"Video: {URL.format(v['ad'])}", '', '```', metin, '```', '']
if not satir: out.append('(şu an elle paylaşılacak bir şey yok)')
txt = '\n'.join(out); print(txt)
if o.yaz: open(os.path.join(os.path.dirname(__file__), '..', 'elle-paylas.md'), 'w', encoding='utf-8').write(txt + '\n')
