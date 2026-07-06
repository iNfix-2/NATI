import glob
import re
from bs4 import BeautifulSoup

def process_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add meta description
    if '<meta name="description"' not in content:
        desc = "Discover NATI Aviation Academy. Premium flight training, UAV certification, and aviation research facilities."
        content = re.sub(r'(<title>.*?</title>)', r'\1\n<meta name="description" content="{}"/>'.format(desc), content, flags=re.IGNORECASE)

    # 2. Add Mobile Menu Toggle Button
    if 'id="mobile-menu-btn"' not in content:
        # Find the "Apply Now" button at the top nav to wrap it and add the menu button
        # There are two variations of the apply now button in header
        # pattern 1: <a href="apply-now.html" class="bg-[#0091fa]...
        # pattern 2: <a href="admissions.html" class="bg-secondary...
        content = re.sub(
            r'(<a href="(?:apply-now|admissions)\.html"[^>]*>.*?Apply Now.*?</a>)',
            r'<div class="flex items-center gap-4">\n    <button id="mobile-menu-btn" class="md:hidden text-on-surface hover:text-secondary transition-colors" aria-label="Toggle Menu"><span class="material-symbols-outlined text-[28px]">menu</span></button>\n    \1\n</div>',
            content,
            count=1
        )

    # 3. Add Mobile Drawer and Javascript
    if 'id="mobile-drawer"' not in content:
        drawer_html = """
<!-- Mobile Drawer -->
<div id="mobile-drawer" class="fixed inset-y-0 right-0 z-[100] w-64 bg-surface-container-high/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl transform translate-x-full transition-transform duration-300 flex flex-col p-6 overflow-y-auto">
    <div class="flex justify-between items-center mb-8">
        <div class="font-display-lg text-title-md font-bold text-primary">NATI</div>
        <button id="close-menu-btn" class="text-on-surface hover:text-secondary"><span class="material-symbols-outlined">close</span></button>
    </div>
    <div class="flex flex-col gap-4">
        <a href="home.html" class="text-on-surface hover:text-secondary font-bold border-b border-outline-variant/30 pb-2">Home</a>
        <a href="about-us.html" class="text-on-surface hover:text-secondary font-bold border-b border-outline-variant/30 pb-2">About</a>
        <a href="training-programmes.html" class="text-on-surface hover:text-secondary font-bold border-b border-outline-variant/30 pb-2">Programmes</a>
        <a href="services.html" class="text-on-surface hover:text-secondary font-bold border-b border-outline-variant/30 pb-2">Services</a>
        <a href="admissions.html" class="text-on-surface hover:text-secondary font-bold border-b border-outline-variant/30 pb-2">Admissions</a>
        <a href="student-life.html" class="text-on-surface hover:text-secondary font-bold border-b border-outline-variant/30 pb-2">Student Life</a>
        <a href="contact-us.html" class="text-on-surface hover:text-secondary font-bold border-b border-outline-variant/30 pb-2">Contact</a>
    </div>
</div>
<!-- Mobile Overlay -->
<div id="mobile-overlay" class="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300"></div>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const closeBtn = document.getElementById('close-menu-btn');
        const drawer = document.getElementById('mobile-drawer');
        const overlay = document.getElementById('mobile-overlay');

        if(menuBtn && closeBtn && drawer && overlay) {
            const toggleMenu = () => {
                const isOpen = !drawer.classList.contains('translate-x-full');
                if(isOpen) {
                    drawer.classList.add('translate-x-full');
                    overlay.classList.remove('opacity-100');
                    overlay.classList.add('opacity-0');
                    overlay.classList.add('pointer-events-none');
                } else {
                    drawer.classList.remove('translate-x-full');
                    overlay.classList.remove('opacity-0');
                    overlay.classList.add('opacity-100');
                    overlay.classList.remove('pointer-events-none');
                }
            };
            menuBtn.addEventListener('click', toggleMenu);
            closeBtn.addEventListener('click', toggleMenu);
            overlay.addEventListener('click', toggleMenu);
        }
    });
</script>
</body>
"""
        content = content.replace('</body>', drawer_html)

    # 4. Form Validation & Dummy Submission
    # Find all <form> tags and replace with form tag + onsubmit
    content = re.sub(r'(<form[^>]*)(>)', r'\1 onsubmit="event.preventDefault(); alert(\'Form submitted successfully! We will get back to you shortly.\');"\2', content)
    # Add required to all <input> and <textarea> unless it's type="checkbox" or similar
    content = re.sub(r'(<input(?:(?!required)[^>])*>)', r'\1'.replace('>', ' required>'), content)
    # The above regex might be tricky, let's use BeautifulSoup for form fields if possible.
    # Actually, the regex `(<input(?:(?!required)[^>])*>|<textarea(?:(?!required)[^>])*>)(?![^<]*?>)` is hard.
    # Let's fix forms with BeautifulSoup properly for the whole file:
    soup = BeautifulSoup(content, 'html.parser')
    for form in soup.find_all('form'):
        if not form.get('onsubmit'):
            form['onsubmit'] = "event.preventDefault(); alert('Request submitted successfully! We will process it shortly.');"
        for inp in form.find_all(['input', 'textarea', 'select']):
            if inp.get('type') not in ['submit', 'button', 'hidden', 'checkbox']:
                inp['required'] = 'required'

    # 5. Empty Footer Links
    for a in soup.find_all('a', href=True):
        if a['href'] == '#':
            text = a.text.lower()
            if 'privacy' in text or 'terms' in text:
                a['href'] = 'about-us.html'
            elif 'location' in text or 'contact' in text or 'support' in text:
                a['href'] = 'contact-us.html'
            elif 'faq' in text or 'admissions' in text:
                a['href'] = 'admissions.html'
            else:
                a['href'] = 'javascript:void(0)'
                
    # 6. Accessibility (missing alt tags)
    for img in soup.find_all('img'):
        if not img.get('alt'):
            # try to use data-alt if available
            data_alt = img.get('data-alt')
            if data_alt:
                img['alt'] = data_alt
            else:
                img['alt'] = "NATI Aviation Graphic"

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(str(soup))

html_files = glob.glob('src/*.html')
for f in html_files:
    process_html_file(f)

print("Refactoring complete.")
