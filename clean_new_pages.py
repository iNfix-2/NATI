import os
import re
import glob

def clean_page(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original = content
    style_pattern = re.compile(r'<style>.*?</style>', re.DOTALL)
    script_pattern = re.compile(r'<script id="tailwind-config">.*?</script>', re.DOTALL)
    
    content = style_pattern.sub('', content)
    
    if script_pattern.search(content):
        content = script_pattern.sub('<script src="js/tailwind-config.js"></script>\n<link href="css/styles.css" rel="stylesheet"/>', content)
    elif content != original:
        # if style was removed but script wasn't there, we need to add the tags somewhere
        content = content.replace('</head>', '<script src="js/tailwind-config.js"></script>\n<link href="css/styles.css" rel="stylesheet"/>\n</head>')

    if content != original:
        # Also let's clean up any multiple includes if we accidentally added them
        if content.count('<script src="js/tailwind-config.js"></script>') > 1:
            content = content.replace('<script src="js/tailwind-config.js"></script>\n<link href="css/styles.css" rel="stylesheet"/>', '', 1)

        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Cleaned {filepath}")

for filepath in glob.glob("src/*.html"):
    clean_page(filepath)

print("Finished cleaning pages.")
