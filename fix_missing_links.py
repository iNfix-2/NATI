import re
import glob

def fix_missing_links(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    replacements = {
        r'href="#"([^>]*>Services</a>)': r'href="home.html"\1',
        r'href="#"([^>]*>Admissions</a>)': r'href="mailto:admissions@nati.com"\1',
        r'href="#"([^>]*>Contact</a>)': r'href="mailto:contact@nati.com"\1',
        r'href="#"([^>]*>Student Life</a>)': r'href="home.html"\1',
        r'href="#"([^>]*>Gallery</a>)': r'href="home.html"\1',
        r'href="#"([^>]*>Privacy Policy</a>)': r'href="home.html"\1',
        r'href="#"([^>]*>Terms of Service</a>)': r'href="home.html"\1',
        r'href="#"([^>]*>Code of Conduct</a>)': r'href="home.html"\1',
        r'href="#"([^>]*>Safety Guidelines</a>)': r'href="home.html"\1',
        r'href="#"([^>]*>Campus Locations</a>)': r'href="home.html"\1',
        r'href="#"([^>]*>Admissions FAQ</a>)': r'href="mailto:admissions@nati.com"\1',
        r'href="#"([^>]*>Technical Support</a>)': r'href="mailto:support@nati.com"\1',
        r'href="#"([^>]*>UAV Pilot Training</a>)': r'href="uav-pilot-training-detail.html"\1',
        r'href="#"([^>]*>Flight Mechanics</a>)': r'href="training-programmes.html"\1',
        r'href="#"([^>]*>Air Law</a>)': r'href="training-programmes.html"\1',
        # Any remaining empty href="#" in list items or generic links
        r'<a class="group py-8 flex items-center justify-between hover:px-4 transition-all hover:bg-white/5" href="#">': r'<a class="group py-8 flex items-center justify-between hover:px-4 transition-all hover:bg-white/5" href="training-programmes.html">',
    }

    for pattern, repl in replacements.items():
        content = re.sub(pattern, repl, content)

    # Social icons linking to #
    content = content.replace('href="#"', 'href="javascript:void(0)"')

    with open(filepath, 'w') as f:
        f.write(content)

for filepath in glob.glob("src/*.html"):
    fix_missing_links(filepath)

print("Missing links updated.")
