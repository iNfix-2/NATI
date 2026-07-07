(function () {
  const data = window.NATI_DATA;
  const app = document.querySelector("#app");
  const page = app ? app.dataset.page : "home";

  const navLinks = [
    ["Home", "index.html", "home"],
    ["About", "about.html", "about"],
    ["Programmes", "programmes.html", "programmes"],
    ["Services", "services.html", "services"],
    ["Admissions", "#", "admissions"],
    ["Student Life", "student-life.html", "student-life"]
  ];

  function image(key) {
    return data.images[key] || data.images.field;
  }

  function cssImage(key) {
    const src = image(key).src;
    return `../images/${src.split("/").pop()}`;
  }

  function imgTag(key, className) {
    const item = image(key);
    return `<img class="${className || ""}" src="${item.src}" alt="${item.alt}" loading="lazy">`;
  }

  function button(label, href, style) {
    return `<a class="btn ${style || "btn-primary"}" href="${href}">${label}</a>`;
  }

  function renderHeader() {
    const header = document.querySelector("#site-header");
    if (!header) return;
    const links = navLinks.map(([label, href, key]) => {
      const active = key === page || (page === "programme-detail" && key === "programmes");
      return `<a class="${active ? "active" : ""}" href="${href}">${label}</a>`;
    }).join("");

    header.innerHTML = `
      <header class="site-header" data-header>
        <div class="nav-shell">
          <a class="brand" href="index.html" aria-label="NATI home">
            <span class="brand-mark" aria-hidden="true">N</span>
            <span><strong>NATI</strong><small>Aviation Training Institute</small></span>
          </a>
          <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-menu-toggle>
            <span></span><span></span><span></span>
          </button>
          <nav class="main-nav" aria-label="Primary navigation" data-main-nav>
            ${links}
            <a class="portal-link" href="#" aria-disabled="true">Student Portal</a>
            <a class="portal-link" href="#" aria-disabled="true">Staff Portal</a>
            <a class="nav-cta" href="#" aria-disabled="true">Apply Now</a>
          </nav>
        </div>
      </header>
    `;
  }

  function renderFooter() {
    const footer = document.querySelector("#site-footer");
    if (!footer) return;
    footer.innerHTML = `
      <footer class="site-footer">
        <section class="footer-main section">
          <div class="container footer-grid">
            <div class="footer-brand">
              <a class="brand" href="index.html">
                <span class="brand-mark" aria-hidden="true">N</span>
                <span><strong>NATI</strong><small>Aviation Training Institute</small></span>
              </a>
              <p>Nethawk Aviation Training Institute develops disciplined UAV, aerospace and aviation operations professionals through practical training and safety-led instruction.</p>
              <div class="social-row" aria-label="Social links">
                <a href="#" aria-label="LinkedIn">in</a>
                <a href="#" aria-label="Instagram">ig</a>
                <a href="#" aria-label="YouTube">yt</a>
              </div>
            </div>
            <div>
              <h3>Quick Links</h3>
              <a href="about.html">About</a>
              <a href="programmes.html">Programmes</a>
              <a href="services.html">Services</a>
            </div>
            <div>
              <h3>Programmes</h3>
              <a href="programme-detail.html">UAV Pilot Training</a>
              <a href="programme-detail.html">Drone Engineering</a>
              <a href="programme-detail.html">Mission Planning</a>
              <a href="programme-detail.html">Aviation Safety</a>
            </div>
            <div>
              <h3>Admissions</h3>
              <a href="#" aria-disabled="true">How to Apply</a>
              <a href="#" aria-disabled="true">Apply Now</a>
              <a href="#" aria-disabled="true">Student Portal</a>
              <a href="#" aria-disabled="true">Staff Portal</a>
            </div>
            <div class="footer-contact">
              <h3>Contact</h3>
              <p>${data.brand.phone}</p>
              <p>${data.brand.email}</p>
              <p>${data.brand.location}</p>
              <form class="newsletter" data-static-form>
                <label for="newsletter-email">Newsletter</label>
                <div>
                  <input id="newsletter-email" type="email" placeholder="Email address" required>
                  <button type="submit">Join</button>
                </div>
                <p class="form-note" aria-live="polite"></p>
              </form>
            </div>
          </div>
        </section>
        <div class="copyright">
          <div class="container">Copyright ${new Date().getFullYear()} NATI. All rights reserved.</div>
        </div>
      </footer>
    `;
  }

  function hero(options) {
    const badges = (options.badges || []).map((item) => `<span>${item}</span>`).join("");
    const buttons = (options.buttons || []).map((item) => button(item.label, item.href, item.style)).join("");
    return `
      <section class="hero ${options.compact ? "hero-compact" : ""}" style="--hero-image: url('${cssImage(options.image || "field")}')">
        <div class="hero-overlay"></div>
        <div class="container hero-content">
          <p class="eyebrow">${options.eyebrow || "NATI"}</p>
          <h1>${options.title}</h1>
          <p class="hero-copy">${options.text}</p>
          ${buttons ? `<div class="hero-actions">${buttons}</div>` : ""}
          ${badges ? `<div class="trust-row">${badges}</div>` : ""}
        </div>
      </section>
    `;
  }

  function sectionTitle(eyebrow, title, text, align) {
    return `
      <div class="section-title ${align === "center" ? "centered" : ""}">
        <p class="eyebrow">${eyebrow}</p>
        <h2>${title}</h2>
        ${text ? `<p>${text}</p>` : ""}
      </div>
    `;
  }

  function programmeList(limit) {
    const items = data.programmes.slice(0, limit || data.programmes.length).map((programme, index) => `
      <a class="programme-row" href="programme-detail.html">
        <span class="programme-number">${String(index + 1).padStart(2, "0")}</span>
        <span>
          <strong>${programme.title}</strong>
          <small>${programme.description}</small>
        </span>
        <span class="row-arrow" aria-hidden="true">-&gt;</span>
      </a>
    `).join("");
    return `<div class="programme-list">${items}</div>`;
  }

  function programmeCard(programme) {
    return `
      <article class="programme-card filter-item" data-category="${programme.category}">
        <div>
          <p class="card-kicker">${programme.category}</p>
          <h3>${programme.title}</h3>
          <p>${programme.description}</p>
        </div>
        <dl class="programme-meta">
          <div><dt>Duration</dt><dd>${programme.duration}</dd></div>
          <div><dt>Delivery</dt><dd>${programme.mode}</dd></div>
          <div><dt>Outcome</dt><dd>${programme.outcome}</dd></div>
        </dl>
        <a class="text-link" href="programme-detail.html">View Details -&gt;</a>
      </article>
    `;
  }

  function serviceCard(service) {
    return `
      <article class="service-card">
        ${imgTag(service.image, "service-image")}
        <div class="service-body">
          <h3>${service.title}</h3>
          <p>${service.summary}</p>
          <ul>${service.features.map((item) => `<li>${item}</li>`).join("")}</ul>
          <a class="text-link" href="contact.html">Contact Us -&gt;</a>
        </div>
      </article>
    `;
  }

  function testimonialCard(item) {
    return `
      <article class="testimonial-card filter-item" data-category="${item.type}">
        <div class="quote-mark" aria-hidden="true">"</div>
        <p>${item.text}</p>
        <div>
          <strong>${item.name}</strong>
          <small>${item.role}</small>
          <span class="rating">${item.rating} rating</span>
        </div>
      </article>
    `;
  }

  function galleryGrid(items) {
    return `
      <div class="gallery-grid">
        ${items.map((item) => {
          const img = image(item.image);
          return `
            <button class="gallery-item filter-item" type="button" data-category="${item.category}" data-lightbox-src="${img.src}" data-lightbox-title="${item.title}">
              <img src="${img.src}" alt="${img.alt}" loading="lazy">
              <span><strong>${item.title}</strong><small>${item.category}</small></span>
            </button>
          `;
        }).join("")}
      </div>
    `;
  }

  function ctaSection(title, text, primary, secondary) {
    return `
      <section class="section cta-band">
        <div class="container cta-inner">
          <div>
            <p class="eyebrow">Next Step</p>
            <h2>${title}</h2>
            <p>${text}</p>
          </div>
          <div class="cta-actions">
            ${button(primary.label, primary.href, "btn-primary")}
            ${secondary ? button(secondary.label, secondary.href, "btn-ghost-light") : ""}
          </div>
        </div>
      </section>
    `;
  }

  function filterBar(categories) {
    return `
      <div class="filter-bar" data-filter-group>
        ${categories.map((category, index) => `<button class="filter-btn ${index === 0 ? "active" : ""}" type="button" data-filter="${category}">${category}</button>`).join("")}
      </div>
    `;
  }

  function contactForm() {
    return `
      <form class="form-panel" data-static-form>
        <div class="form-grid">
          <label>Full Name<input type="text" name="name" required></label>
          <label>Email Address<input type="email" name="email" required></label>
          <label>Phone Number<input type="tel" name="phone"></label>
          <label>Interest<select name="interest"><option>Admissions</option><option>Programme Enquiry</option><option>Services</option><option>Partnership</option></select></label>
        </div>
        <label>Message<textarea name="message" rows="5" required></textarea></label>
        <div class="form-actions">
          <button class="btn btn-primary" type="submit">Get in Touch</button>
          <a class="btn btn-outline" href="#map">View Map</a>
          <a class="btn btn-outline" href="apply.html">Apply Now</a>
        </div>
        <p class="form-note" aria-live="polite"></p>
      </form>
    `;
  }

  function applicationForm() {
    const programmes = data.programmes.map((item) => `<option>${item.title}</option>`).join("");
    return `
      <section class="section">
        <div class="container app-form-layout">
          <aside class="application-side">
            <p class="eyebrow">Application</p>
            <h2>Start your NATI admission file.</h2>
            <p>Complete each step carefully. The admissions team will review submitted information and contact qualified applicants for screening.</p>
            <div class="progress-list" data-progress-list></div>
          </aside>
          <form class="form-panel application-form" data-application-form>
            <div class="application-progress"><span data-progress-fill></span></div>
            <section class="form-step active" data-step="0">
              <h3>Personal Information</h3>
              <div class="form-grid">
                <label>First Name<input type="text" required></label>
                <label>Last Name<input type="text" required></label>
                <label>Email Address<input type="email" required></label>
                <label>Phone Number<input type="tel" required></label>
              </div>
            </section>
            <section class="form-step" data-step="1">
              <h3>Programme Selection</h3>
              <div class="form-grid">
                <label>Programme<select required>${programmes}</select></label>
                <label>Preferred Start Date<input type="date" required></label>
                <label>Study Mode<select><option>Full-time</option><option>Weekend</option><option>Organisation cohort</option></select></label>
                <label>Experience Level<select><option>Beginner</option><option>Intermediate</option><option>Professional</option></select></label>
              </div>
            </section>
            <section class="form-step" data-step="2">
              <h3>Educational Background</h3>
              <div class="form-grid">
                <label>Highest Qualification<input type="text" required></label>
                <label>Institution<input type="text" required></label>
                <label>Field of Study<input type="text"></label>
                <label>Year Completed<input type="number" min="1980" max="2035"></label>
              </div>
            </section>
            <section class="form-step" data-step="3">
              <h3>Supporting Documents</h3>
              <div class="form-grid">
                <label>Identification Document<input type="file"></label>
                <label>Academic Document<input type="file"></label>
                <label>Passport Photograph<input type="file"></label>
                <label>Additional Notes<input type="text"></label>
              </div>
            </section>
            <section class="form-step" data-step="4">
              <h3>Sponsor / Organisation Details</h3>
              <div class="form-grid">
                <label>Sponsor Type<select><option>Self-sponsored</option><option>Parent / Guardian</option><option>Organisation</option></select></label>
                <label>Sponsor Name<input type="text"></label>
                <label>Sponsor Email<input type="email"></label>
                <label>Sponsor Phone<input type="tel"></label>
              </div>
            </section>
            <section class="form-step" data-step="5">
              <h3>Review & Submit</h3>
              <p>Review your information before submission. This static prototype will confirm the interaction without sending data to a server.</p>
              <label class="check-row"><input type="checkbox" required> I confirm that the information provided is accurate.</label>
            </section>
            <div class="form-actions">
              <button class="btn btn-outline" type="button" data-prev-step>Back</button>
              <button class="btn btn-primary" type="button" data-next-step>Next</button>
              <button class="btn btn-primary hidden" type="submit" data-submit-application>Submit Application</button>
            </div>
            <p class="form-note" aria-live="polite"></p>
          </form>
        </div>
      </section>
    `;
  }

  function loginCard(type) {
    const isStaff = type === "staff";
    return `
      <section class="portal-layout">
        <div class="portal-visual" style="--portal-image: url('${cssImage(isStaff ? "mission" : "simulation")}')">
          <div>
            <p class="eyebrow">${isStaff ? "Staff Operations" : "Student Portal"}</p>
            <h1>${isStaff ? "Instructor and operations access." : "Access your mission board."}</h1>
            <p>${isStaff ? "Manage classes, reviews, schedules and trainee progress with discipline." : "View training notes, flight logs, assignments and academy updates."}</p>
          </div>
        </div>
        <div class="portal-card-wrap">
          <form class="login-card" data-static-form>
            <p class="eyebrow">${isStaff ? "Staff Login" : "Student Login"}</p>
            <h2>${isStaff ? "Staff Portal" : "Student Portal"}</h2>
            <label>Email Address<input type="email" required></label>
            <label>Password<input type="password" required></label>
            <div class="login-options">
              <label class="check-row"><input type="checkbox"> Remember me</label>
              <a href="contact.html">Forgot password?</a>
            </div>
            <button class="btn btn-primary" type="submit">Login</button>
            <p class="switch-portal">${isStaff ? "Trainee access?" : "Instructor access?"} <a href="${isStaff ? "student-portal.html" : "staff-portal.html"}">${isStaff ? "Open student portal" : "Open staff portal"}</a></p>
            <p class="form-note" aria-live="polite"></p>
          </form>
        </div>
      </section>
    `;
  }

  function renderHome() {
    return `
      ${hero({
        title: "Training the Next Generation of Aviation & UAV Professionals.",
        text: "NATI provides world-class training in unmanned aerial systems, aviation operations, aerospace technology, safety procedures, mission planning, and practical drone engineering.",
        image: "field",
        buttons: [
          { label: "Explore Programmes", href: "programmes.html" },
          { label: "Contact Us", href: "contact.html", style: "btn-outline-light" },
          { label: "Admissions", href: "admissions.html", style: "btn-ghost-light" }
        ],
        badges: ["Professional Aviation Training", "Mission-Based Learning", "Industry-Standard Practical Sessions", "Experienced Instructors"]
      })}
      <section class="section">
        <div class="container split about-split">
          <div class="stacked-nav">
            <a href="programmes.html"><span>01</span>Courses</a>
            <a href="services.html"><span>02</span>Services</a>
            <a href="student-life.html"><span>03</span>Student Life</a>
          </div>
          <div>
            ${sectionTitle("About NATI", "A serious academy for aviation, UAV and aerospace capability.", "Nethawk Aviation Training Institute is a forward-looking aviation and technology academy focused on UAV systems, aerospace training, flight operations, drone engineering, aviation safety, and mission-ready professional development.")}
            ${button("Learn More", "about.html", "btn-primary")}
          </div>
        </div>
      </section>
      <section class="section dark-section">
        <div class="container split">
          <div>
            ${sectionTitle("Why Choose NATI", "Why Choose NATI Training?", "Practical aviation training, UAV field operations and a safety-first learning culture shape every NATI programme.")}
            <div class="button-row">${button("Contact Us", "contact.html", "btn-primary")}${button("Download Brochure", "programmes.html", "btn-outline-light")}</div>
          </div>
          <div class="feature-grid">
            ${["Practical Training", "Mission Operations", "Aviation Safety", "Engineering & Innovation"].map((item) => `<article class="feature-card"><span></span><h3>${item}</h3><p>Focused instruction built around operational discipline and real-world skill development.</p></article>`).join("")}
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          ${sectionTitle("Programmes", "Our Programmes", "Numbered pathways designed for flight competence, operational awareness and technical growth.", "center")}
          ${programmeList()}
        </div>
      </section>
      <section class="quote-banner" style="--quote-image: url('${cssImage("classroom")}')">
        <div class="container">
          <blockquote>Excellence in aviation begins with discipline, precision, and practical mastery.</blockquote>
        </div>
      </section>
      <section class="section dark-section">
        <div class="container">
          ${sectionTitle("Testimonials", "Trusted by trainees and mission-focused teams.", "Hear from learners and partners who experienced NATI's practical aviation culture.", "center")}
          <div class="horizontal-scroll">${data.testimonials.slice(0, 4).map(testimonialCard).join("")}</div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          ${sectionTitle("Services", "UAV and aviation capability beyond the classroom.", "NATI supports training, operations, technical teams and organisations building reliable UAV programmes.", "center")}
          <div class="service-grid">${data.services.slice(0, 6).map(serviceCard).join("")}</div>
        </div>
      </section>
      <section class="section gallery-strip-section">
        <div class="container">
          ${sectionTitle("Gallery", "Training in motion.", "A look at practical sessions, mission rooms, classrooms and technical workshops.", "center")}
          ${galleryGrid(data.gallery.slice(0, 6))}
        </div>
      </section>
      ${ctaSection("Ready to train with operational discipline?", "Begin with admissions or speak with our team about the right programme pathway.", { label: "Apply Now", href: "apply.html" }, { label: "Contact Admissions", href: "contact.html" })}
    `;
  }

  function renderAbout() {
    const values = data.values.map((value) => `<article class="feature-card light"><span></span><h3>${value}</h3><p>${value} is treated as an operating standard, not a slogan.</p></article>`).join("");
    return `
      ${hero({ compact: true, image: "classroom", eyebrow: "About NATI", title: "About Nethawk Aviation Training Institute", text: "A forward-looking academy building disciplined aviation, UAV and aerospace technology professionals." })}
      <section class="section">
        <div class="container split">
          <div>${imgTag("briefing", "rounded-image")}</div>
          <div>
            ${sectionTitle("Who We Are", "Aviation training with a mission-ready mindset.", "NATI exists to close the gap between classroom knowledge and operational competence. Our programmes combine theory, supervised practice, safety discipline and technical confidence.")}
            <div class="two-col-list">
              <article><h3>Vision</h3><p>To become a leading aviation and UAV training institute known for discipline, safety and technology-led excellence.</p></article>
              <article><h3>Mission</h3><p>To train practical professionals who can support safe flight operations, UAV engineering, mapping, mission planning and aerospace innovation.</p></article>
            </div>
          </div>
        </div>
      </section>
      <section class="section muted-section">
        <div class="container">
          ${sectionTitle("Core Values", "The standards that shape the academy.", "Every trainee is expected to operate with precision, accountability and respect for safety.", "center")}
          <div class="feature-grid six">${values}</div>
        </div>
      </section>
      <section class="section dark-section">
        <div class="container editorial-grid">
          <article><p class="eyebrow">Academy Culture</p><h2>Calm, precise and practical.</h2><p>NATI is designed to feel like an elite training environment: focused briefings, practical drills, measured feedback and a strong culture of preparedness.</p></article>
          <article><p class="eyebrow">Leadership Message</p><h2>We train for responsibility.</h2><p>Our role is to build professionals who understand that aviation excellence begins long before takeoff: in planning, safety checks, team discipline and technical care.</p></article>
          <article><p class="eyebrow">Why NATI Exists</p><h2>Because capability must be built.</h2><p>UAV systems are changing industries. NATI prepares trainees and organisations to use those systems responsibly, safely and effectively.</p></article>
        </div>
      </section>
      <section class="section">
        <div class="container">
          ${sectionTitle("Timeline", "Institutional growth and future expansion.", "A practical roadmap for building stronger UAV and aviation capacity.", "center")}
          <div class="timeline">
            ${["Foundation training campus and practical UAV curriculum", "UAV laboratory, assembly workshop and mapping pathway", "Organisation cohorts, consultancy and field operations support", "Future expansion into simulation, research and autonomous systems"].map((item, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><p>${item}</p></article>`).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderProgrammes() {
    const categories = ["All Programmes", "UAV Training", "Aviation Operations", "Engineering", "Safety", "Professional Courses", "Short Courses"];
    return `
      ${hero({ compact: true, image: "lab", eyebrow: "Programmes", title: "Structured training pathways for aviation and UAV professionals.", text: "Explore practical programmes built around discipline, mission planning, technical capability and measurable outcomes." })}
      <section class="section">
        <div class="container">
          ${filterBar(categories)}
          <div class="programme-card-grid">${data.programmes.map(programmeCard).join("")}</div>
        </div>
      </section>
      ${ctaSection("Need help selecting a programme?", "Admissions can help you match your goals to the right NATI training pathway.", { label: "Talk to Admissions", href: "contact.html" }, { label: "Apply Now", href: "apply.html" })}
    `;
  }

  function renderProgrammeDetail() {
    const modules = [
      ["Week 1", "Aviation discipline, UAV foundations, safety culture and operating roles."],
      ["Week 2", "Airframe systems, controller setup, battery care and pre-flight inspection."],
      ["Week 3", "Simulator drills, control orientation, emergency response and flight logs."],
      ["Week 4", "Field operations, takeoff and landing practice, team communication and checklists."],
      ["Week 5", "Mission planning, route design, weather review and risk assessment."],
      ["Week 6", "Payload handling, aerial documentation, basic survey concepts and reporting."],
      ["Week 7", "Operational scenarios, incident response and supervised mission execution."],
      ["Week 8", "Final assessment, debriefing, portfolio review and certification outcome."]
    ];
    return `
      ${hero({ compact: true, image: "field", eyebrow: "Programme Detail", title: "UAV Pilot Training", text: "A practical training pathway for safe, disciplined and mission-ready UAV operation." })}
      <section class="section">
        <div class="container detail-layout">
          <article class="detail-main">
            ${sectionTitle("Course Overview", "From first briefing to supervised mission execution.", "This reusable programme layout combines classroom learning, simulator practice, field drills and instructor-led assessment.")}
            <div class="detail-section">
              <h3>Learning Objectives</h3>
              <ul class="check-list"><li>Understand UAV systems, operating roles and safety procedures.</li><li>Conduct pre-flight checks, mission planning and risk assessment.</li><li>Operate UAVs under supervised practical conditions.</li><li>Complete flight logs, debriefs and operational reports.</li></ul>
            </div>
            <div class="detail-section">
              <h3>Weekly Modules</h3>
              <div class="accordion" data-accordion>
                ${modules.map(([week, text], index) => `<button class="accordion-trigger" type="button" aria-expanded="${index === 0 ? "true" : "false"}">${week}<span>+</span></button><div class="accordion-panel ${index === 0 ? "open" : ""}"><p>${text}</p></div>`).join("")}
              </div>
            </div>
            <div class="detail-grid">
              <article><h3>Practical Sessions</h3><p>Controller handling, simulator drills, checklist discipline, field launch procedures and emergency drills.</p></article>
              <article><h3>Simulator or Field Experience</h3><p>Students progress from controlled simulation into supervised outdoor operations and mission scenarios.</p></article>
              <article><h3>Assessment Method</h3><p>Written knowledge checks, practical flight assessment, mission planning review and instructor debrief.</p></article>
              <article><h3>Career Outcomes</h3><p>UAV operator, field operations assistant, survey support technician, flight operations trainee or drone services assistant.</p></article>
              <article><h3>Instructor Profile</h3><p>Delivered by aviation and UAV instructors with practical field, safety and technical training experience.</p></article>
              <article><h3>Entry Requirements</h3><p>Basic computer literacy, good attention to safety, valid identification and willingness to complete practical drills.</p></article>
              <article><h3>Certification Outcome</h3><p>NATI certificate of completion with practical assessment record and module summary.</p></article>
            </div>
          </article>
          <aside class="sticky-card">
            <h3>Programme Snapshot</h3>
            <dl>
              <div><dt>Duration</dt><dd>8 weeks</dd></div>
              <div><dt>Schedule</dt><dd>Weekday and weekend cohorts</dd></div>
              <div><dt>Start Date</dt><dd>Next cohort TBA</dd></div>
              <div><dt>Fee</dt><dd>Placeholder</dd></div>
            </dl>
            ${button("Apply Now", "apply.html", "btn-primary")}
            ${button("Download Syllabus", "programmes.html", "btn-outline")}
          </aside>
        </div>
      </section>
    `;
  }

  function renderServices() {
    return `
      ${hero({ compact: true, image: "mission", eyebrow: "Services", title: "Aviation and UAV services for practical capability.", text: "Training, technical support and mission-aware services for organisations and professionals." })}
      <section class="section service-page">
        <div class="container">
          ${data.services.map((service, index) => `
            <article class="service-band ${index % 2 ? "reverse" : ""}">
              ${imgTag(service.image, "service-band-image")}
              <div>
                <p class="eyebrow">${String(index + 1).padStart(2, "0")}</p>
                <h2>${service.title}</h2>
                <p>${service.summary}</p>
                <ul class="check-list">${service.features.map((feature) => `<li>${feature}</li>`).join("")}</ul>
                ${button("Request Service", "contact.html", "btn-primary")}
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderAdmissions() {
    return `
      ${hero({ compact: true, image: "simulation", eyebrow: "Admissions", title: "Admissions at NATI", text: "A structured path from programme selection to orientation and resumption." })}
      <section class="section">
        <div class="container">
          ${sectionTitle("Admission Steps", "A clear route into the academy.", "Each step is designed to help the admissions team understand your goals and readiness.", "center")}
          <div class="step-grid">${data.admissionSteps.map((step, index) => `<article class="step-card"><span>${String(index + 1).padStart(2, "0")}</span><h3>${step}</h3></article>`).join("")}</div>
        </div>
      </section>
      <section class="section muted-section">
        <div class="container info-grid">
          <article><h3>Entry Requirements</h3><p>Valid identification, basic computer literacy, interest in aviation or technology, and ability to participate in practical sessions.</p></article>
          <article><h3>Required Documents</h3><p>Application form, identification document, passport photograph, academic or professional record, and sponsor details where applicable.</p></article>
          <article><h3>Tuition / Fees Placeholder</h3><p>Programme fees vary by pathway, duration and delivery mode. Admissions can provide the current fee sheet.</p></article>
          <article><h3>Sponsorship Options</h3><p>Self-sponsored, guardian-sponsored and organisation-sponsored applications are supported.</p></article>
        </div>
      </section>
      <section class="section">
        <div class="container narrow">
          ${sectionTitle("FAQs", "Admissions questions.", "Quick answers for prospective trainees.", "center")}
          <div class="accordion" data-accordion>
            ${data.faqs.map(([question, answer], index) => `<button class="accordion-trigger" type="button" aria-expanded="${index === 0 ? "true" : "false"}">${question}<span>+</span></button><div class="accordion-panel ${index === 0 ? "open" : ""}"><p>${answer}</p></div>`).join("")}
          </div>
        </div>
      </section>
      ${ctaSection("Ready to begin?", "Submit your application or speak with admissions about programme fit and requirements.", { label: "Apply Now", href: "apply.html" }, { label: "Contact Admissions", href: "contact.html" })}
    `;
  }

  function renderStudentLife() {
    return `
      ${hero({ compact: true, image: "briefing", eyebrow: "Student Life", title: "Aviation academy culture beyond the classroom.", text: "NATI student life is structured, purposeful and built around identity, achievement and mission readiness." })}
      <section class="section">
        <div class="container">
          ${sectionTitle("Academy Experience", "Not just a course. A disciplined training environment.", "Student systems reinforce progress, leadership, belonging and professional standards.", "center")}
          <div class="feature-grid">${data.studentLife.map(([title, text]) => `<article class="feature-card light"><span></span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>
        </div>
      </section>
      <section class="quote-banner" style="--quote-image: url('${cssImage("lab")}')">
        <div class="container"><blockquote>Every trainee learns to think like part of a mission crew.</blockquote></div>
      </section>
    `;
  }

  function renderFacilities() {
    return `
      ${hero({ compact: true, image: "workshop", eyebrow: "Campus / Facilities", title: "Facilities built for practical UAV and aviation training.", text: "Classrooms, labs, workshops, simulation rooms and outdoor areas support mission-focused learning." })}
      <section class="section">
        <div class="container split">
          <div>
            ${sectionTitle("Campus Overview", "A practical environment for serious training.", "NATI facilities are planned around briefings, technical work, simulation, practical flights, student support and operational review.")}
            <p>Spaces are arranged to help trainees move from theory to inspection, assembly, simulation, mission planning and supervised practical work.</p>
          </div>
          <div>${imgTag("simulation", "rounded-image")}</div>
        </div>
      </section>
      <section class="section muted-section">
        <div class="container">
          ${sectionTitle("Facilities", "Training spaces and support areas.", "", "center")}
          <div class="facility-grid">${data.facilities.map((item) => `<article><h3>${item}</h3><p>Designed to support safe, focused and professional learning.</p></article>`).join("")}</div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          ${sectionTitle("Campus Gallery", "A look inside NATI learning spaces.", "", "center")}
          ${galleryGrid(data.gallery.slice(1, 7))}
        </div>
      </section>
    `;
  }

  function renderGalleryPage() {
    const categories = ["All Programmes", "Training Sessions", "UAV Practicals", "Simulators", "Student Activities", "Graduation", "Facilities", "Field Operations", "Mission Operations", "Classroom Sessions"];
    return `
      ${hero({ compact: true, image: "field", eyebrow: "Gallery", title: "NATI training environments and field moments.", text: "Browse classroom sessions, practical UAV drills, mission operations, facilities and academy moments." })}
      <section class="section dark-section">
        <div class="container">
          ${filterBar(categories)}
          ${galleryGrid(data.gallery)}
        </div>
      </section>
    `;
  }

  function renderTestimonialsPage() {
    const categories = ["All Programmes", "Trainee", "Partner", "Organisation", "Alumni"];
    return `
      ${hero({ compact: true, image: "classroom", eyebrow: "Testimonials", title: "Feedback from trainees, partners and alumni.", text: "Stories from people and organisations shaped by NATI's practical training culture." })}
      <section class="section">
        <div class="container">
          ${filterBar(categories)}
          <div class="testimonial-grid">${data.testimonials.map(testimonialCard).join("")}</div>
        </div>
      </section>
    `;
  }

  function renderContact() {
    return `
      ${hero({ compact: true, image: "mission", eyebrow: "Contact", title: "Speak with NATI.", text: "Contact admissions, request a callback, ask about services or schedule a visit." })}
      <section class="section">
        <div class="container contact-layout">
          <div>
            ${sectionTitle("Get in Touch", "Admissions and service enquiries.", "Use the form and the NATI team will respond with the next practical step.")}
            ${contactForm()}
          </div>
          <aside class="contact-cards">
            <article><h3>Phone</h3><p>${data.brand.phone}</p></article>
            <article><h3>Email</h3><p>${data.brand.email}</p></article>
            <article><h3>Office Hours</h3><p>${data.brand.hours}</p></article>
            <article><h3>Admissions Contact</h3><p>admissions@nati.example</p></article>
            <article><h3>Emergency Contact</h3><p>Available to active trainees during field training windows.</p></article>
          </aside>
        </div>
      </section>
      <section class="section muted-section" id="map">
        <div class="container">
          <div class="map-placeholder">
            <p class="eyebrow">Map Placeholder</p>
            <h2>${data.brand.location}</h2>
            <p>Replace this block with an embedded map when the confirmed campus coordinates are available.</p>
            ${button("Request a Callback", "contact.html", "btn-primary")}
          </div>
        </div>
      </section>
    `;
  }

  function renderApply() {
    return `
      ${hero({ compact: true, image: "lab", eyebrow: "Apply Now", title: "Begin your NATI application.", text: "Complete a clean multi-step application for aviation, UAV, safety and technical training programmes." })}
      ${applicationForm()}
    `;
  }

  const renderers = {
    home: renderHome,
    about: renderAbout,
    programmes: renderProgrammes,
    "programme-detail": renderProgrammeDetail,
    services: renderServices,
    admissions: renderAdmissions,
    "student-life": renderStudentLife,
    facilities: renderFacilities,
    gallery: renderGalleryPage,
    testimonials: renderTestimonialsPage,
    contact: renderContact,
    apply: renderApply,
    "student-portal": () => loginCard("student"),
    "staff-portal": () => loginCard("staff")
  };

  function bindHeader() {
    const header = document.querySelector("[data-header]");
    const toggle = document.querySelector("[data-menu-toggle]");
    const nav = document.querySelector("[data-main-nav]");
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }
    function onScroll() {
      if (!header) return;
      header.classList.toggle("scrolled", window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function bindFilters() {
    document.querySelectorAll("[data-filter-group]").forEach((bar) => {
      bar.addEventListener("click", (event) => {
        const button = event.target.closest("[data-filter]");
        if (!button) return;
        const filter = button.dataset.filter;
        bar.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        const scope = bar.parentElement;
        scope.querySelectorAll(".filter-item").forEach((item) => {
          const match = filter === "All Programmes" || item.dataset.category === filter;
          item.classList.toggle("is-hidden", !match);
        });
      });
    });
  }

  function bindAccordions() {
    document.querySelectorAll("[data-accordion]").forEach((accordion) => {
      accordion.addEventListener("click", (event) => {
        const trigger = event.target.closest(".accordion-trigger");
        if (!trigger) return;
        const panel = trigger.nextElementSibling;
        const isOpen = panel.classList.toggle("open");
        trigger.setAttribute("aria-expanded", String(isOpen));
      });
    });
  }

  function bindStaticForms() {
    document.querySelectorAll("[data-static-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const note = form.querySelector(".form-note");
        if (note) note.textContent = "Prototype action confirmed. Connect this form to a backend when ready.";
      });
    });
  }

  function bindApplicationForm() {
    const form = document.querySelector("[data-application-form]");
    if (!form) return;
    const steps = Array.from(form.querySelectorAll("[data-step]"));
    const next = form.querySelector("[data-next-step]");
    const prev = form.querySelector("[data-prev-step]");
    const submit = form.querySelector("[data-submit-application]");
    const fill = form.querySelector("[data-progress-fill]");
    const progressList = document.querySelector("[data-progress-list]");
    let current = 0;
    const labels = ["Personal Information", "Programme Selection", "Educational Background", "Supporting Documents", "Sponsor Details", "Review & Submit"];

    if (progressList) {
      progressList.innerHTML = labels.map((label, index) => `<span data-progress-item="${index}">${String(index + 1).padStart(2, "0")} ${label}</span>`).join("");
    }

    function validStep() {
      const fields = Array.from(steps[current].querySelectorAll("input, select, textarea"));
      return fields.every((field) => {
        if (!field.checkValidity()) {
          field.classList.add("invalid");
          return false;
        }
        field.classList.remove("invalid");
        return true;
      });
    }

    function update() {
      steps.forEach((step, index) => step.classList.toggle("active", index === current));
      if (prev) prev.disabled = current === 0;
      if (next) next.classList.toggle("hidden", current === steps.length - 1);
      if (submit) submit.classList.toggle("hidden", current !== steps.length - 1);
      if (fill) fill.style.width = `${((current + 1) / steps.length) * 100}%`;
      document.querySelectorAll("[data-progress-item]").forEach((item) => {
        item.classList.toggle("active", Number(item.dataset.progressItem) <= current);
      });
    }

    next.addEventListener("click", () => {
      if (!validStep()) return;
      current = Math.min(current + 1, steps.length - 1);
      update();
    });
    prev.addEventListener("click", () => {
      current = Math.max(current - 1, 0);
      update();
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validStep()) return;
      const note = form.querySelector(".form-note");
      if (note) note.textContent = "Application prototype submitted. Backend connection can be added next.";
    });
    update();
  }

  function bindGalleryLightbox() {
    document.querySelectorAll("[data-lightbox-src]").forEach((item) => {
      item.addEventListener("click", () => {
        const overlay = document.createElement("div");
        overlay.className = "lightbox";
        overlay.innerHTML = `
          <button type="button" aria-label="Close preview">Close</button>
          <figure>
            <img src="${item.dataset.lightboxSrc}" alt="${item.dataset.lightboxTitle}">
            <figcaption>${item.dataset.lightboxTitle}</figcaption>
          </figure>
        `;
        overlay.addEventListener("click", (event) => {
          if (event.target === overlay || event.target.tagName === "BUTTON") overlay.remove();
        });
        document.body.appendChild(overlay);
      });
    });
  }

  renderHeader();
  renderFooter();
  if (app && renderers[page]) {
    app.innerHTML = renderers[page]();
  }
  bindHeader();
  bindFilters();
  bindAccordions();
  bindStaticForms();
  bindApplicationForm();
  bindGalleryLightbox();
})();
