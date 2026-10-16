"""Build the copy of the site that gets published as a Claude artifact.

The artifact host wraps the main page in its own <html>/<head>/<body>, so this writes a copy
with the main page unwrapped. Spektra is already embedded in fonts.css. Usage: python3 scripts/build-artifact.py OUT_DIR
"""
import re, shutil, sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
out = Path(sys.argv[1]); shutil.rmtree(out, ignore_errors=True); (out / 'assets').mkdir(parents=True)

for name in ['story.html', 'motion.js', 'beans.js', 'styles.css', 'fonts.css']:
    shutil.copy(root / name, out / name)
for item in ['tribe-mark.svg', 'coffee-leaves.jpg']:
    shutil.copy(root / 'assets' / item, out / 'assets' / item)
for folder in (root / 'assets').glob('illustrations*'):
    shutil.copytree(folder, out / 'assets' / folder.name)
for folder in (root / 'assets').glob('products*'):
    shutil.copytree(folder, out / 'assets' / folder.name)
shutil.copytree(root / 'assets' / 'team', out / 'assets' / 'team')

page = (root / 'index.html').read_text()
head = re.search(r'<head>(.*?)</head>', page, re.S).group(1)
body = re.search(r'<body>(.*?)</body>', page, re.S).group(1)
head = re.sub(r'\s*<meta (charset|name="viewport")[^>]*>', '', head)
head = re.sub(r'<title>.*?</title>', '<title>Tribe Coffee Roasters</title>', head)
(out / 'index.html').write_text(head.strip() + '\n' + body)

print('built', out)
