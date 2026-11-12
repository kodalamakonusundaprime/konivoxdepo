"""Kullanım: python3 tools/build.py videos/ornekler.js [videos/yeni.js ...]  -> motion/build/page.html"""
import sys, base64, os
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ff = ''
for fam, fn, sty, wt in [('Fraunces','Fraunces.ttf','normal','100 900'),('Fraunces','Fraunces-Italic.ttf','italic','100 900'),('Caveat','Caveat.ttf','normal','400 700')]:
    b = base64.b64encode(open(f'{R}/fonts/{fn}','rb').read()).decode()
    ff += f"@font-face{{font-family:'{fam}';src:url(data:font/ttf;base64,{b}) format('truetype');font-style:{sty};font-weight:{wt};font-display:block}}\n"
js = open(f'{R}/engine/core.js').read() + '\n' + '\n'.join(open(p if os.path.isabs(p) else f'{R}/{p}').read() for p in sys.argv[1:])
html = open(f'{R}/engine/page.html').read().replace('/*FONTS*/', ff).replace('/*JS*/', js)
os.makedirs(f'{R}/build', exist_ok=True); open(f'{R}/build/page.html','w').write(html); print('ok', f'{R}/build/page.html')
