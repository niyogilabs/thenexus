document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Navigation Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close menu when link clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // Managed Space Pricing Calculator
    const spaceRange = document.getElementById('spaceRange');
    const sqftVal = document.getElementById('sqftVal');
    const leaseTerm = document.getElementById('leaseTerm');
    const servicePackage = document.getElementById('servicePackage');
    const estPrice = document.getElementById('estPrice');
    const rateBreakdown = document.getElementById('rateBreakdown');

    function calculatePrice() {
        if (!spaceRange || !leaseTerm || !estPrice) return;

        const sqft = parseInt(spaceRange.value, 10);
        const term = leaseTerm.value; // 'long' or 'short'
        const isManaged = servicePackage ? (servicePackage.value === 'managed') : true;

        // Base Building & Furniture lease rate: Long term ₹40/sq.ft, Short term ₹50/sq.ft
        const baseRate = (term === 'long') ? 40 : 50;
        // Fully managed add-on rate (+₹20/sq.ft)
        const managedAddon = isManaged ? 20 : 0;
        const totalRatePerSqFt = baseRate + managedAddon;

        const totalMonthly = sqft * totalRatePerSqFt;
        const formattedTotal = new Intl.NumberFormat('en-IN').format(totalMonthly);

        sqftVal.textContent = `${sqft} sq.ft`;
        estPrice.innerHTML = `₹${formattedTotal} <span class="per-mo">/ month</span>`;
        if (isManaged) {
            rateBreakdown.textContent = `@ ₹${totalRatePerSqFt}/sq.ft/mo (₹${baseRate} base lease + ₹${managedAddon} managed add-on) • Indicative pricing, open to negotiation.`;
        } else {
            rateBreakdown.textContent = `@ ₹${totalRatePerSqFt}/sq.ft/mo (₹${baseRate} building & furniture lease only) • Indicative pricing, open to negotiation.`;
        }
    }

    if (spaceRange && leaseTerm) {
        spaceRange.addEventListener('input', calculatePrice);
        leaseTerm.addEventListener('change', calculatePrice);
        if (servicePackage) {
            servicePackage.addEventListener('change', calculatePrice);
        }
        calculatePrice(); // Initial calculation
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle clicked item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Active Section Observer for Nav links
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
