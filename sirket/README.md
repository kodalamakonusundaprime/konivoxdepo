# TilkiSoft şirket klasörü

Yapay zekâ ekibinin hafızası. Her görev (günlük video, haftalık strateji, aylık iş araştırması) önce bu dosyaları okur.

| Dosya | Kim değiştirir | Ne |
|---|---|---|
| `anayasa.md` | yalnız kullanıcı | amaç, kırmızı çizgiler, yetkiler |
| `yonetim.md` | kullanıcı | bu dönemin odağı, istenen/istenmeyen konular, üretimi aç/kapat |
| `oyun-kitabi.md` | haftalık ekip (kanıtla) | kitle, kanca kuralları, video kurgusu, açıklama biçimi |
| `deneyler.md` | ekip | açık hipotezler ve sonuçları |
| `karar-kuyrugu.md` | ekip yazar, kullanıcı karar verir | onay gereken öneriler |
| `gecmis.json` | günlük görev | her video ve verisi |
| `raporlar/` | haftalık/aylık görev | raporlar |

Herhangi bir Claude sohbetinde "TilkiSoft notu: …" → `yonetim.md`'ye, "TilkiSoft karar: K3 evet" → `karar-kuyrugu.md`'ye işlenir.
