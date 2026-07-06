import re
import glob

def fix_global_links(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Map text content of tags to target hrefs
    link_map = {
        r'(>Home<)': r'href="home.html"\1',
        r'(>About<)': r'href="about-us.html"\1',
        r'(>Programmes<)': r'href="training-programmes.html"\1',
        r'(>Training<)': r'href="training-programmes.html"\1',
        r'(>Services<)': r'href="services.html"\1',
        r'(>Admissions<)': r'href="admissions.html"\1',
        r'(>Student Life<)': r'href="student-life.html"\1',
        r'(>Gallery<)': r'href="gallery.html"\1',
        r'(>Contact<)': r'href="contact-us.html"\1',
        r'(>Contact Us<)': r'href="contact-us.html"\1',
        r'(>Campus<)': r'href="home.html"\1', # Generic fallback if we don't have a campus page
    }

    # First, let's fix any href="..." to href="#" just to normalize before we apply our specific replacements based on inner text
    # Actually, replacing all href="..." might break external links (e.g. fonts).
    # We will just use regex to replace the href attribute of anchor tags containing the specific text.
    # Pattern: href="[^"]*"([^>]*>Text<) -> href="target.html"\1
    
    for text_pattern, repl in link_map.items():
        # This will match href="anything" ... >Text<
        pattern = r'href="[^"]*"([^>]*' + text_pattern + r')'
        content = re.sub(pattern, repl, content)

    # Now handle buttons that need to be links.
    # Convert <button> to <a> for these specific texts
    button_map = {
        r'<button class="([^"]*)">\s*Apply Now\s*</button>': r'<a href="apply-now.html" class="\1 flex items-center justify-center text-center">Apply Now</a>',
        r'<button class="([^"]*)">\s*Enrol Now\s*</button>': r'<a href="apply-now.html" class="\1 flex items-center justify-center text-center">Enrol Now</a>',
        r'<button class="([^"]*)">\s*START APPLICATION\s*</button>': r'<a href="apply-now.html" class="\1 flex items-center justify-center text-center">START APPLICATION</a>',
        r'<button class="([^"]*)">\s*Contact Us\s*</button>': r'<a href="contact-us.html" class="\1 flex items-center justify-center text-center">Contact Us</a>',
        r'<button class="([^"]*)">\s*Talk to an Advisor\s*</button>': r'<a href="contact-us.html" class="\1 flex items-center justify-center text-center">Talk to an Advisor</a>',
        r'<button class="([^"]*)">\s*Explore Programmes\s*</button>': r'<a href="training-programmes.html" class="\1 flex items-center justify-center text-center">Explore Programmes</a>',
        r'<button class="([^"]*)">\s*Explore Curriculum\s*</button>': r'<a href="training-programmes.html" class="\1 flex items-center justify-center text-center">Explore Curriculum</a>',
        r'<button class="([^"]*)">\s*Course Details\s*</button>': r'<a href="uav-pilot-training-detail.html" class="\1 flex items-center justify-center text-center">Course Details</a>',
        r'<button class="([^"]*)">\s*Portal Login\s*</button>': r'<a href="portal-login.html" class="\1 flex items-center justify-center text-center">Portal Login</a>',
        r'<button class="([^"]*)">\s*Login\s*</button>': r'<a href="portal-login.html" class="\1 flex items-center justify-center text-center">Login</a>'
    }

    for pattern, repl in button_map.items():
        content = re.sub(pattern, repl, content)

    # Finally, there might be some older mailto: links from our previous script. Let's redirect them to the new pages.
    content = content.replace('href="mailto:admissions@nati.com"', 'href="admissions.html"')
    content = content.replace('href="mailto:contact@nati.com"', 'href="contact-us.html"')
    
    with open(filepath, 'w') as f:
        f.write(content)

for filepath in glob.glob("src/*.html"):
    fix_global_links(filepath)

print("Global links updated.")
