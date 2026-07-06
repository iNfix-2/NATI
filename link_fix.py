import re
import glob

def fix_links(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Nav links
    content = re.sub(r'href="#"([^>]*>Home</a>)', r'href="home.html"\1', content)
    content = re.sub(r'href="#"([^>]*>About</a>)', r'href="about-us.html"\1', content)
    content = re.sub(r'href="#"([^>]*>Programmes</a>)', r'href="training-programmes.html"\1', content)

    # In home.html: UAV Pilot Training (Advanced) -> uav-pilot-training-detail.html
    # We need to find the <a> tag that contains "UAV Pilot Training (Advanced)"
    content = re.sub(
        r'<a([^>]+href=)"#"(.*?>.*?UAV Pilot Training \(Advanced\).*?)</a>',
        r'<a\1"uav-pilot-training-detail.html"\2</a>',
        content,
        flags=re.DOTALL
    )

    with open(filepath, 'w') as f:
        f.write(content)

for filepath in glob.glob("src/*.html"):
    fix_links(filepath)

print("Links updated")
