"""Build the copy of the site that gets published as a Claude artifact.

The artifact host wraps the main page in its own <html>/<head>/<body> and only loads fonts
from Google Fonts or data URIs, so this writes a copy with the main page unwrapped and
Spektra embedded in the stylesheet. Usage: python3 scripts/build-artifact.py OUT_DIR
"""
import base64, re, shutil, sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
out = Path(sys.argv[1]); shutil.rmtree(out, ignore_errors=True); (out / 'assets').mkdir(parents=True)

for name in ['story.html', 'motion.js', 'beans.js', 'art-switch.js']:
    shutil.copy(root / name, out / name)
for item in ['tribe-mark.svg', 'coffee-leaves.jpg']:
    shutil.copy(root / 'assets' / item, out / 'assets' / item)
for folder in (root / 'assets').glob('illustrations*'):
    shutil.copytree(folder, out / 'assets' / folder.name)
for folder in (root / 'assets').glob('products*'):
    shutil.copytree(folder, out / 'assets' / folder.name)

page = (root / 'index.html').read_text()
head = re.search(r'<head>(.*?)</head>', page, re.S).group(1)
body = re.search(r'<body>(.*?)</body>', page, re.S).group(1)
head = re.sub(r'\s*<meta (charset|name="viewport")[^>]*>', '', head)
head = re.sub(r'<title>.*?</title>', '<title>Tribe Coffee Roasters</title>', head)
(out / 'index.html').write_text(head.strip() + '\n' + body)

css = (root / 'styles.css').read_text()
font = base64.b64encode((root / 'fonts/Spektra-CondensedBold.ttf').read_bytes()).decode()
css = css.replace('src: local("Spektra Condensed Bold"), url("fonts/Spektra-CondensedBold.ttf") format("truetype");',
                  f'src: url(data:font/ttf;base64,{font}) format("truetype");')
css = re.sub(r'@font-face \{\n  font-family: "Spektra";\n  src: local\("Spektra Condensed Bold Italic"\).*?\n\}\n', '', css, flags=re.S)
(out / 'styles.css').write_text(css)
print('built', out)
