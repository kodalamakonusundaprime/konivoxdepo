# tilkisoft motion

Reels/TikTok için kodla çizilen kısa videoların motoru. Her video `render(t)` ile 1080×1920 SVG kare üreten bir JS modülüdür; headless Chrome ile kare kare render edilir, Puck seslendirmesi ve hafif efektlerle ffmpeg'de birleştirilir.

- `engine/core.js` – ortak yardımcılar (zamanlama, metin, kalem çizgisi, halka, kontur, Caveat notu, turuncu dolgu, köşe yazısı)
- `engine/page.html` – render sayfası şablonu (`#v=<video-adı>`)
- `videos/tek-kalem-ornekler.js` – Tek Kalem onaylı örnekleri (açık zemin, şekilli): `ts-vitrin`, `ts-kampanya`, `ts-saat`; `referans/` içinde kontak sayfaları
- `videos/ornekler.js` – eski tarzlar (Göz İzi, Kalem Bakışı, koyu masa); şimdilik kullanılmıyor
- `videos/*.json` – final ayarları (ses↔görüntü çapaları, efektler)
- `tools/build.py`, `tools/shots.py`, `tools/final.py` – sayfa üretimi, kontak sayfası, sesli final
- `fonts/` – Fraunces ve Caveat (SIL Open Font License 1.1)

```
python3 tools/build.py videos/tek-kalem-ornekler.js videos/yeni.js
python3 tools/shots.py yeni-video 0,2,4,6,8,10,12,14
python3 tools/final.py videos/yeni-video.json
```
