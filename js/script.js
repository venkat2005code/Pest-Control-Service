document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Try to get saved theme from localStorage (might fail on file:// protocol)
    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem('theme');
    } catch (e) {
        console.warn('localStorage is not available', e);
    }

    if (savedTheme) {
        body.classList.remove('light-theme', 'dark-theme');
        body.classList.add(savedTheme);
    } else {
        // Default to light theme if no preference
        body.classList.add('light-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            try { localStorage.setItem('theme', 'dark-theme'); } catch(e) {}
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            try { localStorage.setItem('theme', 'light-theme'); } catch(e) {}
        }
    });

    // --- RTL/LTR Toggle Logic ---
    const rtlToggleBtn = document.getElementById('rtl-toggle');
    const activeModeSpan = rtlToggleBtn.querySelector('.active-mode');
    const htmlElement = document.documentElement;

    // Check for saved dir in localStorage
    let savedDir = null;
    try {
        savedDir = localStorage.getItem('dir');
    } catch (e) {}

    if (savedDir) {
        htmlElement.setAttribute('dir', savedDir);
        activeModeSpan.textContent = savedDir.toUpperCase();
    } else {
        // Default is LTR from HTML
        activeModeSpan.textContent = 'LTR';
    }

    rtlToggleBtn.addEventListener('click', () => {
        const currentDir = htmlElement.getAttribute('dir');
        
        if (currentDir === 'ltr') {
            htmlElement.setAttribute('dir', 'rtl');
            activeModeSpan.textContent = 'RTL';
            try { localStorage.setItem('dir', 'rtl'); } catch(e) {}
        } else {
            htmlElement.setAttribute('dir', 'ltr');
            activeModeSpan.textContent = 'LTR';
            try { localStorage.setItem('dir', 'ltr'); } catch(e) {}
        }
    });

    // --- Form Submission Logic ---
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple mock success feedback
            const submitBtn = bookingForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Request Sent Successfully!';
            submitBtn.style.backgroundColor = '#4ade80'; // Green success color
            submitBtn.style.color = '#0f172a';
            
            bookingForm.reset();

            // Revert button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.color = '';
            }, 3000);
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Mobile Hamburger Menu & Dropdown Toggle ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.querySelector('.main-nav');

    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            mainNav.classList.toggle('open');
        });

        // Dropdown toggle on mobile
        const dropdownItems = document.querySelectorAll('.dropdown > a');
        dropdownItems.forEach(dropdownToggle => {
            dropdownToggle.addEventListener('click', (e) => {
                // Only trigger accordion behavior on mobile/tablet view
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    const parentLi = dropdownToggle.parentElement;
                    parentLi.classList.toggle('open');
                }
            });
        });

        // Close menu when clicking sub-links inside nav
        document.querySelectorAll('.dropdown-menu a, .nav-links > li:not(.dropdown) > a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                mainNav.classList.remove('open');
            });
        });
    }
});
