// Ensure Preloader Always Hides Properly
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 600);
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navbar Toggle
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    const hamburgerIcon = hamburgerBtn ? hamburgerBtn.querySelector('i') : null;

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (hamburgerIcon) {
                if (navLinks.classList.contains('active')) {
                    hamburgerIcon.classList.remove('fa-bars');
                    hamburgerIcon.classList.add('fa-xmark');
                    hamburgerIcon.style.color = '#E5C396';
                } else {
                    hamburgerIcon.classList.remove('fa-xmark');
                    hamburgerIcon.classList.add('fa-bars');
                    hamburgerIcon.style.color = '#0C0E0D';
                }
            }
        });
    }

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            if (hamburgerIcon) {
                hamburgerIcon.classList.remove('fa-xmark');
                hamburgerIcon.classList.add('fa-bars');
                hamburgerIcon.style.color = '#0C0E0D';
            }
        });
    });

    // 2. MAGIC TRANSFORMATION BEFORE/AFTER SLIDER (FIXED)
    const baRangeInput = document.getElementById('baRangeInput');
    const afterImg = document.getElementById('afterImg');
    const sliderHandle = document.getElementById('sliderHandle');

    if (baRangeInput && afterImg && sliderHandle) {
        baRangeInput.addEventListener('input', (e) => {
            const value = e.target.value;
            afterImg.style.width = `${value}%`;
            sliderHandle.style.left = `${value}%`;
        });
    }

    // 3. FREQUENTLY ASKED QUESTIONS ACCORDION (FIXED)
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const isActive = currentItem.classList.contains('active');

            // Close all open accordions
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current click
            if (!isActive) {
                currentItem.classList.add('active');
            }
        });
    });

    // 4. Bridal Look Quiz Logic
    const eventBtns = document.querySelectorAll('#eventOptions .q-btn');
    const vibeBtns = document.querySelectorAll('#vibeOptions .q-btn');
    const recTitle = document.getElementById('recTitle');
    const recDesc = document.getElementById('recDesc');

    let selectedEvent = 'Barat';
    let selectedVibe = 'Royal Red';

    const recommendations = {
        'Barat-Royal Red': { title: 'Royal Barat Classic Red', desc: 'High-definition full coverage matte base with 24K gold foil eyeshadow and timeless crimson velvet lips.' },
        'Barat-Soft Nude': { title: 'Modern Soft Barat Glam', desc: 'Dewy glass skin base with subtle rose gold shimmer eyes and nude plush lips.' },
        'Barat-Smokey Gold': { title: 'Smokey Bronze Royalty', desc: 'Dramatic bronze smokey eyes with sculpted contours and bold berry lips.' },
        'Nikkah-Royal Red': { title: 'Classic Nikkah Grace', desc: 'Luminous soft base with gold eye accents and romantic rose red lips.' },
        'Nikkah-Soft Nude': { title: 'Pastel Pearl Nikkah Glow', desc: 'Weightless glowing base with champagne shimmer eyes and peachy nude gloss.' },
        'Nikkah-Smokey Gold': { title: 'Soft Gold Nikkah Elegance', desc: 'Soft brown smokey eyes with 5D mink lashes and glossy nude lips.' },
        'Walima-Royal Red': { title: 'Walima Crimson Glam', desc: 'Ultra HD airbrush base with metallic gold eyes and rich wine velvet lips.' },
        'Walima-Soft Nude': { title: 'Walima Dewy Goddess', desc: 'Radiant glass skin with diamond shimmer lids and soft pink nude lips.' },
        'Walima-Smokey Gold': { title: 'Champagne Gold Queen', desc: 'Glittering champagne gold smokey eyes with contoured cheekbones and velvet nude lips.' }
    };

    function updateQuizResult() {
        const key = `${selectedEvent}-${selectedVibe}`;
        const rec = recommendations[key] || recommendations['Barat-Royal Red'];
        if (recTitle) recTitle.innerText = rec.title;
        if (recDesc) recDesc.innerText = rec.desc;
    }

    eventBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            eventBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedEvent = btn.getAttribute('data-event');
            updateQuizResult();
        });
    });

    vibeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            vibeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedVibe = btn.getAttribute('data-vibe');
            updateQuizResult();
        });
    });

    // 5. Live Price Estimator
    const serviceChecks = document.querySelectorAll('.service-check');
    const totalPriceDisplay = document.getElementById('totalPriceDisplay');

    function calculateTotal() {
        let total = 0;
        serviceChecks.forEach(check => {
            if (check.checked) {
                total += parseInt(check.getAttribute('data-price') || 0);
            }
        });
        if (totalPriceDisplay) {
            totalPriceDisplay.innerText = 'Rs. ' + total.toLocaleString();
        }
    }

    serviceChecks.forEach(check => {
        check.addEventListener('change', calculateTotal);
    });

    // 6. VIP Booking Modal & Package Reservation
    const vipModal = document.getElementById('vipModal');
    const closeVipModal = document.getElementById('closeVipModal');
    const cPackageInput = document.getElementById('cPackage');

    function openModalWithPackage(pkgName) {
        if (cPackageInput) cPackageInput.value = pkgName;
        if (vipModal) vipModal.style.display = 'flex';
    }

    document.querySelectorAll('#openModalBtn, #openModalBtnMobile').forEach(btn => {
        btn.addEventListener('click', () => openModalWithPackage('General Reservation'));
    });

    if (closeVipModal) {
        closeVipModal.addEventListener('click', () => {
            if (vipModal) vipModal.style.display = 'none';
        });
    }

    document.querySelectorAll('.book-pkg').forEach(btn => {
        btn.addEventListener('click', () => {
            const pkg = btn.getAttribute('data-pkg');
            openModalWithPackage(pkg);
        });
    });

    const bookQuizLook = document.getElementById('bookQuizLook');
    if (bookQuizLook) {
        bookQuizLook.addEventListener('click', () => {
            const title = recTitle ? recTitle.innerText : 'Recommended Look';
            openModalWithPackage('Quiz Look: ' + title);
        });
    }

    const bookCalculatedPkg = document.getElementById('bookCalculatedPkg');
    if (bookCalculatedPkg) {
        bookCalculatedPkg.addEventListener('click', () => {
            const total = totalPriceDisplay ? totalPriceDisplay.innerText : '';
            openModalWithPackage('Custom Package Estimate (' + total + ')');
        });
    }

    // 7. Gallery Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');

            galleryCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 8. Gallery Lightbox Popup Logic
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const closeLightbox = document.getElementById('closeLightbox');

    document.querySelectorAll('.gallery-card').forEach(card => {
        card.addEventListener('click', () => {
            const fullImg = card.getAttribute('data-full');
            const title = card.getAttribute('data-title');
            if (lightboxImg) lightboxImg.src = fullImg;
            if (lightboxTitle) lightboxTitle.innerText = title;
            if (lightboxModal) lightboxModal.style.display = 'flex';
        });
    });

    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            if (lightboxModal) lightboxModal.style.display = 'none';
        });
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = 'none';
            }
        });
    }

    // 9. Send WhatsApp Direct Logic
    const sendWaBtn = document.getElementById('sendWaBtn');
    if (sendWaBtn) {
        sendWaBtn.addEventListener('click', () => {
            const nameEl = document.getElementById('cName');
            const phoneEl = document.getElementById('cPhone');
            const pkgEl = document.getElementById('cPackage');
            const dateEl = document.getElementById('cDate');

            const name = nameEl ? nameEl.value : 'Client';
            const phone = phoneEl ? phoneEl.value : 'N/A';
            const pkg = pkgEl ? pkgEl.value : 'Bridal Booking';
            const date = dateEl ? dateEl.value : 'TBD';
            
            const msg = `Hello PURE.GLOW Atelier! I want to reserve a bridal date.%0A%0A*Name:* ${name}%0A*WhatsApp:* ${phone}%0A*Selected Package:* ${pkg}%0A*Event Date:* ${date}`;
            window.open(`https://wa.me/923219876543?text=${msg}`, '_blank');
        });
    }
});