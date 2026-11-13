"""Verisi dolu videoları gruplar (ihtiyaç, görsel fikir, kanca türü) ve Instagram ortalamalarını verir.
Kullanım: python3 ozet.py [--gun 28]   (son N günün videoları)"""
import argparse, datetime as dt
from ortak import yukle, bugun
a = argparse.ArgumentParser(); a.add_argument('--gun', type=int, default=28); o = a.parse_args()
s = bugun() - dt.timedelta(days=o.gun)
V = [v for v in yukle()['videolar'] if v.get('veri') and dt.date.fromisoformat(v['tarih']) >= s]
def m(v):
    ig = v['veri'].get('instagram') or {}; iz = ig.get('izlenme') or 0
    return {'izlenme': iz, 'ilk3_oran': (ig.get('ilk3') or 0) / iz if iz else None, 'ort_sure': ig.get('ort_sure'),
            'kayit_pay': (ig.get('kaydetme') or 0) + (ig.get('paylasim') or 0)}
print(f'Verili video: {len(V)} (son {o.gun} gün). Az veride ortalamalar yanıltıcıdır; n<4 grupları "belirsiz" say.\n')
for alan in ['ihtiyac', 'gorsel_fikir', 'kanca_turu']:
    g = {}
    for v in V: g.setdefault(v.get(alan) or '?', []).append(m(v))
    print(f'## {alan}\n| değer | n | ort. izlenme | ilk 3 sn oranı | ort. süre (sn) | kaydet+paylaş |\n|---|---|---|---|---|---|')
    for k, L in sorted(g.items(), key=lambda x: -len(x[1])):
        av = lambda key: (lambda xs: round(sum(xs)/len(xs), 2) if xs else '-')([x[key] for x in L if x[key] is not None])
        print(f'| {k} | {len(L)} | {av("izlenme")} | {av("ilk3_oran")} | {av("ort_sure")} | {av("kayit_pay")} |')
    print()
