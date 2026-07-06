import os
import re

files = ["src/home.html", "src/training-programmes.html", "src/about-us.html", "src/uav-pilot-training-detail.html"]

script_pattern = re.compile(r'<script id="tailwind-config">.*?</script>\s*<style>.*?</style>', re.DOTALL)
replacement = '<script src="js/tailwind-config.js"></script>\n<link href="css/styles.css" rel="stylesheet"/>'

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    content = script_pattern.sub(replacement, content)
    with open(f, 'w') as file:
        file.write(content)
