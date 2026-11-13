"""gecmis.json kayıt aracı.
  ekle   --ad --tarih --ihtiyac --gorsel --kanca [--kanca-turu] [--deney] [--plan-satiri] [--ig-id] --ig-zaman YYYY-MM-DDTHH:MM --tt-zaman elle:YYYY-MM-DDTHH:MM --ig-metin '…' --tt-metin '…'
         (Metricool kotası dolduysa --ig-zaman de 'elle:' ile başlar, --ig-id verilmez)
  durum  --ad --durum "metin"
  veri   --ad --json '{"instagram":{...},"tiktok":{...},"cekildi":"YYYY-MM-DD"}'
  eksik-veri         yayından ≥2 gün geçmiş, verisi boş videolar (Metricool kimlikleriyle)
  liste [--son 10]   son videoların kısa tablosu (ajan istemi için)"""
import argparse, json, sys, datetime as dt
from ortak import yukle, kaydet, bugun, aktif
a = argparse.ArgumentParser(); a.add_argument('komut')
for k in ['ad','tarih','ihtiyac','gorsel','kanca','kanca-turu','deney','plan-satiri','ig-id','tt-id','ig-zaman','tt-zaman','ig-metin','tt-metin','durum','json']: a.add_argument('--'+k)
a.add_argument('--son', type=int, default=10)
o = a.parse_args(); d = yukle(); V = d['videolar']
bul = lambda ad: next((v for v in V if v['ad'] == ad), None)
if o.komut == 'ekle':
    if bul(o.ad): sys.exit(f'zaten var: {o.ad}')
    V.append({'ad': o.ad, 'tarih': o.tarih or bugun().isoformat(), 'tarz': 'Tek Kalem', 'ihtiyac': o.ihtiyac, 'gorsel_fikir': o.gorsel,
              'kanca_turu': o.kanca_turu, 'kanca': o.kanca, 'deney': o.deney, 'plan_satiri': o.plan_satiri,
              'durum': 'zamanlandı (sessiz onay: silinmezse yayınlanır)',
              'metricool_id': {'instagram': int(o.ig_id) if o.ig_id else None, 'tiktok': int(o.tt_id) if o.tt_id else None},
              'yayin': {'instagram': o.ig_zaman, 'tiktok': o.tt_zaman}, 'instagram_metin': o.ig_metin, 'tiktok_metin': o.tt_metin, 'veri': None})
elif o.komut == 'durum':
    bul(o.ad)['durum'] = o.durum
elif o.komut == 'veri':
    bul(o.ad)['veri'] = json.loads(o.json)
elif o.komut == 'eksik-veri':
    s = bugun() - dt.timedelta(days=2)
    for v in V:
        if v.get('veri') or not aktif(v): continue
        for ag, z in (v.get('yayin') or {}).items():
            if z and not z.startswith('elle:') and dt.date.fromisoformat(z[:10]) <= s:
                print(v['ad'], ag, z, (v.get('metricool_id') or {}).get(ag))
    sys.exit()
elif o.komut == 'liste':
    print('| ad | tarih | ihtiyaç | görsel fikir | kanca | durum | IG ilk3/izlenme | IG ort. sn | kaydet+paylaş |'); print('|'+'---|'*9)
    for v in V[-o.son:]:
        ig = ((v.get('veri') or {}).get('instagram') or {})
        r = f"{ig.get('ilk3','?')}/{ig.get('izlenme','?')}" if ig else '-'
        kp = (ig.get('kaydetme',0) or 0)+(ig.get('paylasim',0) or 0) if ig else '-'
        print(f"| {v['ad']} | {v.get('tarih')} | {v.get('ihtiyac')} | {v.get('gorsel_fikir')} | {v.get('kanca')} | {v.get('durum')} | {r} | {ig.get('ort_sure','-') if ig else '-'} | {kp} |")
    sys.exit()
else: sys.exit(__doc__)
kaydet(d); print('ok')
