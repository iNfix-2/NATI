import os
import glob
from bs4 import BeautifulSoup
import re

html_files = glob.glob('src/*.html')
print(f"Scanning {len(html_files)} HTML files...\n")

issues = {
    "missing_title": [],
    "duplicate_titles": {},
    "missing_meta_desc": [],
    "lorem_ipsum": [],
    "placeholder_images": [],
    "empty_links": [],
    "unwired_forms": [],
    "missing_alt_images": []
}

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    soup = BeautifulSoup(content, 'html.parser')
    
    # 1. SEO: Titles
    title = soup.find('title')
    title_text = title.text.strip() if title else ""
    if not title_text or title_text == "Document":
        issues["missing_title"].append(file)
    else:
        issues["duplicate_titles"].setdefault(title_text, []).append(file)
        
    # 2. SEO: Meta Description
    meta_desc = soup.find('meta', attrs={"name": "description"})
    if not meta_desc or not meta_desc.get("content"):
        issues["missing_meta_desc"].append(file)
        
    # 3. Placeholder Text
    if re.search(r'lorem\s+ipsum', content, re.IGNORECASE):
        issues["lorem_ipsum"].append(file)
        
    # 4. Placeholder Images
    images = soup.find_all('img')
    for img in images:
        src = img.get('src', '')
        if 'placehold' in src or src == '' or src == '#':
            if file not in issues["placeholder_images"]:
                issues["placeholder_images"].append(file)
        
        # 5. Accessibility: Alt tags
        if not img.get('alt'):
            if file not in issues["missing_alt_images"]:
                issues["missing_alt_images"].append(file)
                
    # 6. Empty Links
    links = soup.find_all('a')
    empty = False
    for link in links:
        href = link.get('href', '')
        if href in ['#', '', 'javascript:void(0)']:
            empty = True
    if empty:
        issues["empty_links"].append(file)
        
    # 7. Unwired Forms
    forms = soup.find_all('form')
    unwired = False
    for form in forms:
        action = form.get('action', '')
        method = form.get('method', '')
        if action in ['', '#'] or method == '':
            unwired = True
    if unwired:
        issues["unwired_forms"].append(file)

print("--- SCAN RESULTS ---")
print(f"Missing/Generic Title Tags: {len(issues['missing_title'])} files")
for f in issues['missing_title']: print(f"  - {f}")

print(f"\nMissing Meta Descriptions: {len(issues['missing_meta_desc'])} files")
for f in issues['missing_meta_desc']: print(f"  - {f}")

print(f"\nFiles with 'Lorem Ipsum' placeholder text: {len(issues['lorem_ipsum'])} files")
for f in issues['lorem_ipsum']: print(f"  - {f}")

print(f"\nFiles with Placeholder/Empty Images: {len(issues['placeholder_images'])} files")
for f in issues['placeholder_images']: print(f"  - {f}")

print(f"\nImages missing 'alt' attributes: {len(issues['missing_alt_images'])} files")
for f in issues['missing_alt_images']: print(f"  - {f}")

print(f"\nFiles containing Empty Links (href=\"#\"): {len(issues['empty_links'])} files")
for f in issues['empty_links']: print(f"  - {f}")

print(f"\nFiles with Unwired Forms (no action/method): {len(issues['unwired_forms'])} files")
for f in issues['unwired_forms']: print(f"  - {f}")

dup_titles = {k:v for k,v in issues['duplicate_titles'].items() if len(v) > 1}
if dup_titles:
    print("\nDuplicate Titles Found:")
    for title, files in dup_titles.items():
        print(f"  - '{title}' used in: {', '.join(files)}")

