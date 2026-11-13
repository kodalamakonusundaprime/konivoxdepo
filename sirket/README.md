# TilkiSoft şirket klasörü

Yapay zekâ ekibinin hafızası. Her görev önce bu dosyaları okur, iş bitince yazar.

| Dosya | Kim değiştirir | Ne |
|---|---|---|
| `anayasa.md` | yalnız kullanıcı | amaç, kırmızı çizgiler, yetkiler (yayın: sessiz onay) |
| `yonetim.md` | kullanıcı | bu dönemin odağı, istenen/istenmeyen konular, üretimi aç/kapat |
| `plan.md` | haftalık toplantı | **haftanın günlük planı (şirketin beyni)** |
| `oyun-kitabi.md` | haftalık toplantı (kanıtla) | kitle, kanca kuralları, kurgu, açıklama, yayın saatleri |
| `deneyler.md` | ekip | açık hipotezler ve sonuçları |
| `karar-kuyrugu.md` | ekip yazar, kullanıcı karar verir | onay gereken öneriler |
| `gecmis.json` | üretim turu (betikle) | her video, yayın zamanları ve verisi |
| `raporlar/` | haftalık/aylık toplantı | raporlar |
| `araclar/` | – | mekanik işler için betikler (model çağrısı gerektirmez) |

## Takvim
| Görev | Zaman (İstanbul) | Ne yapar |
|---|---|---|
| Üretim turu | Pazartesi ve perşembe 12:09 | Boş günleri doldurur (en fazla 4 video), sessiz onayla zamanlar, eksik veriyi çeker |
| Haftalık toplantı | Pazar 20:17 | Veri → deney sonuçları → oyun kitabı → gelecek haftanın planı → rapor |
| Aylık iş araştırması | Her ayın 1'i 21:13 | Ne satılabilir, kime, kaç liraya; alternatif niş |

## Betikler (`sirket/araclar/`)
- `python3 stok.py --kadar YYYY-MM-DD` → önümüzdeki günlerde hangi ağda hangi video var, `DOLDUR:` satırında boş günler
- `python3 kayit.py liste --son 10` → ajan istemi için son videolar tablosu
- `python3 kayit.py eksik-veri` → verisi çekilmesi gereken videolar (Metricool kimlikleriyle)
- `python3 kayit.py ekle|durum|veri …` → `gecmis.json` kaydı
- `python3 ozet.py --gun 28` → ihtiyaç / görsel fikir / kanca türüne göre ortalamalar

Herhangi bir Claude sohbetinde "TilkiSoft notu: …" → `yonetim.md`, "TilkiSoft karar: K3 evet" → `karar-kuyrugu.md`.
