import re
import glob

def convert_buttons(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Apply Now button in the nav and elsewhere
    content = re.sub(
        r'<button class="([^"]*)">Apply Now</button>',
        r'<a href="mailto:admissions@nati.com" class="\1 flex items-center justify-center text-center">Apply Now</a>',
        content
    )
    
    # Explore Programmes
    content = re.sub(
        r'<button class="([^"]*)">Explore Programmes</button>',
        r'<a href="training-programmes.html" class="\1 flex items-center justify-center text-center">Explore Programmes</a>',
        content
    )

    # Explore Curriculum
    content = re.sub(
        r'<button class="([^"]*)">Explore Curriculum</button>',
        r'<a href="training-programmes.html" class="\1 flex items-center justify-center text-center">Explore Curriculum</a>',
        content
    )

    # Contact Us
    content = re.sub(
        r'<button class="([^"]*)">Contact Us</button>',
        r'<a href="mailto:contact@nati.com" class="\1 flex items-center justify-center text-center">Contact Us</a>',
        content
    )

    # Enrol Now
    content = re.sub(
        r'<button class="([^"]*)">Enrol Now</button>',
        r'<a href="mailto:admissions@nati.com" class="\1 flex items-center justify-center text-center">Enrol Now</a>',
        content
    )

    # Course Details
    content = re.sub(
        r'<button class="([^"]*)">Course Details</button>',
        r'<a href="uav-pilot-training-detail.html" class="\1 flex items-center justify-center text-center">Course Details</a>',
        content
    )

    # Download Brochure / Prospectus
    content = re.sub(
        r'<button class="([^"]*)">Download Brochure</button>',
        r'<a href="#" class="\1 flex items-center justify-center text-center">Download Brochure</a>',
        content
    )
    content = re.sub(
        r'<button class="([^"]*)">Download Prospectus</button>',
        r'<a href="#" class="\1 flex items-center justify-center text-center">Download Prospectus</a>',
        content
    )

    # Talk to an Advisor
    content = re.sub(
        r'<button class="([^"]*)">Talk to an Advisor</button>',
        r'<a href="mailto:admissions@nati.com" class="\1 flex items-center justify-center text-center">Talk to an Advisor</a>',
        content
    )
    
    # START APPLICATION
    content = re.sub(
        r'<button class="([^"]*)">START APPLICATION</button>',
        r'<a href="mailto:admissions@nati.com" class="\1 flex items-center justify-center text-center">START APPLICATION</a>',
        content
    )

    with open(filepath, 'w') as f:
        f.write(content)

for filepath in glob.glob("src/*.html"):
    convert_buttons(filepath)

print("Buttons converted to links.")
