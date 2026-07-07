# Nethawk Aviation and Training Institute Student Portal

Django full-stack portal for a physical aviation training institute. Students attend classes in person, while the portal handles registration, enrollments, payments, handouts, assignments, results, timetable, notifications, progress, certificates, reports, and audit logs.

## Stack

- Django 6
- Django Templates and ORM
- Django Authentication, Groups, and Permissions
- Bootstrap 5
- SQLite for local development
- PostgreSQL support through environment variables
- Bursary-controlled manual payment verification and receipt tracking

## Setup On Windows

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
python manage.py migrate
python manage.py seed_demo
python manage.py runserver
```

Open `http://127.0.0.1:8000/`. The root URL redirects to the portal login screen.

## Demo Accounts

All seeded users use this password:

```text
Nethawk@2026
```

```text
admin@nethawkati.local
superadmin@nethawkati.local
management@nethawkati.local
admissions@nethawkati.local
bursary@nethawkati.local
registry@nethawkati.local
advisor@nethawkati.local
instructor@nethawkati.local
student@nethawkati.local
pending.student@nethawkati.local
sponsored.student@nethawkati.local
```

## Main URLs

- Portal entry: `/`
- Invite-only registration: `/accounts/invitations/<token>/`
- Admin registration invitations: `/admin-portal/invitations/`
- Login: `/accounts/login/`
- Role redirect: `/dashboard/`
- Student dashboard: `/student/dashboard/`
- Instructor dashboard: `/instructor/dashboard/`
- System Admin dashboard: `/admin-portal/dashboard/`
- Management dashboard: `/management/dashboard/`
- Admissions students: `/management/students/`
- Bursary payments: `/management/payments/`
- Registry course registration: `/management/course-registrations/`
- Course offerings: `/management/course-offerings/`
- Django Admin: `/admin/`

## Payments

Phase 1 uses manual Bursary verification. Students can view payment summaries, balances, statuses, and receipts, but they do not upload proof or start online payments from the portal. Bursary or authorized staff record manual payments, approve or reject them, and approved payments generate receipt records.

Company-sponsored training is handled through sponsor companies, company invoices, invoice lines, and payment allocation. A confirmed company payment is allocated across invoice lines and unlocks each fully paid trainee enrollment.

Paystack/Remita are Phase 2 placeholders. The old Paystack settings can remain in `.env`, but active Phase 1 screens do not expose online gateway actions:

```text
PAYSTACK_PUBLIC_KEY=
PAYSTACK_SECRET_KEY=
PAYSTACK_WEBHOOK_SECRET=
```

## Development Checks

```powershell
python manage.py check
python manage.py makemigrations --check
python manage.py test
```

## Media And Static Files

Uploaded passport photos, materials, assignment files, submissions, receipts, and certificates are stored under `media/` in development.

The provided Nethawk logo files are sourced from `LOGO FILES` and copied into:

```text
static/images/logos/
```

The portal intelligence background is stored at:

```text
static/images/portal/aviation-intelligence-bg.png
```

## Notes

- Public student and instructor registration pages are disabled. System Admin sends one-time invitation links by email from `/admin-portal/invitations/`.
- Invitations support Student, Instructor, Admissions, Management, Bursary, Registry, Course Advisor, Admin, and Super Admin roles.
- Invited student and instructor registrations start as pending until approved by authorized staff.
- Development email uses Django's console backend by default. Configure `EMAIL_BACKEND` and `DEFAULT_FROM_EMAIL` in `.env` to send through SMTP.
- This is portal-only software; public marketing/course catalog pages are not exposed.
- Student course access remains locked until account approval and payment/enrollment activation.
- Course registration uses Course, CourseOffering, and CourseRegistration records layered on top of Program, Cohort, and Enrollment.
- Students only see materials and assignments for approved course registrations or legacy active paid enrollments.
- Instructor-entered results remain pending until Registry/authorized staff approve and publish them.
- Certificates can only be marked available/collected after completion.
