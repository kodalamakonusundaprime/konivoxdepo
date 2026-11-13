import json, os, datetime as dt
YOL = os.path.join(os.path.dirname(__file__), '..', 'gecmis.json')
TZ = dt.timezone(dt.timedelta(hours=3))  # Europe/Istanbul
PASIF = ('reddedildi', 'yayınlanmayacak', 'iptal')
def yukle():
    return json.load(open(YOL, encoding='utf-8'))
def kaydet(d):
    json.dump(d, open(YOL, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
def bugun():
    return dt.datetime.now(TZ).date()
def aktif(v):
    return not any(p in (v.get('durum') or '') for p in PASIF)
