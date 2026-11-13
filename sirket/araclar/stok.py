"""Yayın stoku: önümüzdeki günlerde hangi ağda hangi video var, hangi günler boş.
Kullanım: python3 stok.py [--gun 10] [--kadar YYYY-MM-DD]
--kadar verilirse o tarihe kadar (dahil) boş günleri 'DOLDUR:' satırında listeler."""
import argparse, datetime as dt
from ortak import yukle, bugun, aktif
a = argparse.ArgumentParser(); a.add_argument('--gun', type=int, default=10); a.add_argument('--kadar'); o = a.parse_args()
d = yukle(); b = bugun(); tablo = {}
for v in d['videolar']:
    if not aktif(v): continue
    for ag, z in (v.get('yayin') or {}).items():
        if z: tablo.setdefault(z[:10], {})[ag] = v['ad']
son = dt.date.fromisoformat(o.kadar) if o.kadar else b + dt.timedelta(days=o.gun - 1)
bos = []
g = b
while g <= max(son, b + dt.timedelta(days=o.gun - 1)):
    s = tablo.get(g.isoformat(), {})
    ig, tt = s.get('instagram', '—'), s.get('tiktok', '—')
    print(f"{g.isoformat()} {['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'][g.weekday()]}  IG: {ig:<22} TikTok: {tt}")
    if g <= son and (ig == '—' or tt == '—'): bos.append(g.isoformat())
    g += dt.timedelta(days=1)
if o.kadar: print('DOLDUR:', ' '.join(bos) if bos else '(yok)')
