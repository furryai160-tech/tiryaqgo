// Wait for DOM to load fully
// Developed by: Yasseen Sabry Alawamy (ياسين صبري العوامي)
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. Light / Dark Theme Switcher Logic
       ========================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
    const htmlEl = document.documentElement;

    function setTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('tg-theme', theme);
        
        // Update toggle buttons icons
        const iconClass = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        if (themeToggleBtn) {
            themeToggleBtn.querySelector('i').className = iconClass;
        }
        if (themeToggleMobileBtn) {
            themeToggleMobileBtn.querySelector('i').className = iconClass;
        }
    }

    // Read stored theme preference or use browser settings
    const savedTheme = localStorage.getItem('tg-theme');
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(userPrefersDark ? 'dark' : 'light');
    }

    function handleThemeToggle() {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', handleThemeToggle);
    }
    if (themeToggleMobileBtn) {
        themeToggleMobileBtn.addEventListener('click', handleThemeToggle);
    }


    /* ==========================================
       2. Scroll Progress Bar Loader
       ========================================== */
    const progressBar = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }
    });


    /* ==========================================
       3. Interactive Particle Network Canvas
       ========================================== */
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const maxParticles = 60;
        
        // Set Canvas dimensions
        function resizeCanvas() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.6; // Slow movement
                this.vy = (Math.random() - 0.5) * 0.6;
                this.radius = Math.random() * 2 + 1;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                // Boundary collision
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
            }
            
            draw() {
                // Determine color based on active theme variables
                const themeColor = htmlEl.getAttribute('data-theme') === 'dark' ? 'rgba(0, 210, 196, 0.4)' : 'rgba(0, 180, 165, 0.2)';
                ctx.fillStyle = themeColor;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particle array
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }

        function drawConnections() {
            const maxDistance = 120;
            const lineColor = htmlEl.getAttribute('data-theme') === 'dark' ? 'rgba(0, 210, 196, 0.08)' : 'rgba(0, 180, 165, 0.05)';
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < maxDistance) {
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 1 - (distance / maxDistance);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Canvas animation frame loop
        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            drawConnections();
            requestAnimationFrame(animateCanvas);
        }
        
        animateCanvas();
    }


    /* ==========================================
       4. Mobile Drawer Menu Logic
       ========================================== */
    const menuBtn = document.querySelector('.menu-btn');
    const closeDrawer = document.querySelector('.close-drawer');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const drawerOverlay = document.querySelector('.drawer-overlay');
    const drawerLinks = document.querySelectorAll('.drawer-links a');

    function toggleDrawer(open) {
        if (open) {
            mobileDrawer.classList.add('active');
            drawerOverlay.classList.add('active');
        } else {
            mobileDrawer.classList.remove('active');
            drawerOverlay.classList.remove('active');
        }
    }

    if (menuBtn) menuBtn.addEventListener('click', () => toggleDrawer(true));
    if (closeDrawer) closeDrawer.addEventListener('click', () => toggleDrawer(false));
    if (drawerOverlay) drawerOverlay.addEventListener('click', () => toggleDrawer(false));
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => toggleDrawer(false));
    });


    /* ==========================================
       5. Smooth Scroll & Active Link Tracking
       ========================================== */
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    /* ==========================================
       6. Interactive Tab Simulator Toggler
       ========================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const simViews = document.querySelectorAll('.simulator-view');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            simViews.forEach(v => v.classList.remove('active'));

            btn.classList.add('active');

            const targetTab = btn.getAttribute('data-tab');
            if (targetTab === 'doctor-patient') {
                document.getElementById('view-doctor-patient').classList.add('active');
            } else if (targetTab === 'device-marketplace') {
                document.getElementById('view-device-marketplace').classList.add('active');
            } else if (targetTab === 'pharmacy-prescription') {
                document.getElementById('view-pharmacy-prescription').classList.add('active');
            }
        });
    });


    /* ==========================================
       7. Live Tracking Map Simulator (Interactive Click to Drive)
       ========================================== */
    const startTrackBtn = document.getElementById('start-track-demo');
    const movingDoc = document.querySelector('.moving-doc');
    const trackDistVal = document.getElementById('track-dist');
    const trackTimeVal = document.getElementById('track-time');
    const trackingStatusBadge = document.getElementById('tracking-status-badge');
    const mapCanvas = document.getElementById('map-canvas');

    let trackingInterval = null;
    let isSimulating = false;

    // Default coordinates representing Patient (top: 25%, left: 20%)
    const patientPos = { top: 25, left: 20 };
    // Current doctor position coordinate
    let docPos = { top: 75, left: 80 };

    function calculateStats(pos) {
        // Simple distance formula using percentage points as scale
        const dx = pos.left - patientPos.left;
        const dy = pos.top - patientPos.top;
        const distancePercent = Math.sqrt(dx * dx + dy * dy);
        
        // Let's say 80% map width represents 2.0 kilometers
        const distanceKM = ((distancePercent / 80) * 2.0).toFixed(1);
        // Say average speed yields 4 minutes per kilometer
        const timeMinutes = Math.ceil(distanceKM * 4);

        return {
            dist: distanceKM,
            time: timeMinutes
        };
    }

    function runSimulation(startPos) {
        clearInterval(trackingInterval);
        isSimulating = true;
        startTrackBtn.textContent = 'إعادة ضبط المحاكاة';
        trackingStatusBadge.textContent = 'في الطريق إليك';
        trackingStatusBadge.style.background = 'rgba(0, 180, 165, 0.1)';
        trackingStatusBadge.style.color = 'var(--primary-dark)';

        let currentPos = { ...startPos };
        
        // Define simple intermediate steps towards patient
        const totalSteps = 10;
        let step = 0;
        
        const stepX = (patientPos.left - startPos.left) / totalSteps;
        const stepY = (patientPos.top - startPos.top) / totalSteps;

        trackingInterval = setInterval(() => {
            if (step <= totalSteps) {
                currentPos.left = startPos.left + (step * stepX);
                currentPos.top = startPos.top + (step * stepY);
                
                movingDoc.style.transition = 'all 0.3s linear';
                movingDoc.style.top = `${currentPos.top}%`;
                movingDoc.style.left = `${currentPos.left}%`;

                const stats = calculateStats(currentPos);
                
                if (step === totalSteps) {
                    trackDistVal.innerHTML = '<span style="color: var(--primary);">وصل الطبيب</span>';
                    trackTimeVal.innerHTML = '<span style="color: var(--primary);">الآن</span>';
                    trackingStatusBadge.textContent = 'وصل الطبيب للوجهة';
                    trackingStatusBadge.style.background = 'rgba(0, 180, 165, 0.2)';
                    isSimulating = false;
                    startTrackBtn.textContent = 'بدء محاكاة الحركة';
                    clearInterval(trackingInterval);
                } else {
                    trackDistVal.textContent = `${stats.dist} كم`;
                    trackTimeVal.textContent = `${stats.time} دقائق`;
                }
                
                step++;
            }
        }, 600);
    }

    if (startTrackBtn) {
        startTrackBtn.addEventListener('click', () => {
            if (isSimulating) {
                // Reset to default
                clearInterval(trackingInterval);
                docPos = { top: 75, left: 80 };
                movingDoc.style.top = '75%';
                movingDoc.style.left = '80%';
                trackDistVal.textContent = '1.2 كم';
                trackTimeVal.textContent = '5 دقائق';
                trackingStatusBadge.textContent = 'في انتظار بدء المحاكاة';
                startTrackBtn.textContent = 'بدء محاكاة الحركة';
                isSimulating = false;
                return;
            }
            
            runSimulation(docPos);
        });
    }

    // Interactive Map Click listener
    if (mapCanvas) {
        mapCanvas.addEventListener('click', (e) => {
            // Get click coordinate relative to map canvas
            const rect = mapCanvas.getBoundingClientRect();
            const clickX = ((e.clientX - rect.left) / rect.width) * 100;
            const clickY = ((e.clientY - rect.top) / rect.height) * 100;

            docPos = { top: clickY, left: clickX };

            // Place doctor marker instantly
            movingDoc.style.transition = 'all 0.5s ease-out';
            movingDoc.style.top = `${docPos.top}%`;
            movingDoc.style.left = `${docPos.left}%`;

            const stats = calculateStats(docPos);
            trackDistVal.textContent = `${stats.dist} كم`;
            trackTimeVal.textContent = `${stats.time} دقائق`;
            trackingStatusBadge.textContent = 'تم تحديد نقطة انطلاق جديدة';
            
            if (isSimulating) {
                // Restart simulation route from clicked location
                runSimulation(docPos);
            }
        });
    }


    /* ==========================================
       8. Medical Device Marketplace Search & Filter
       ========================================== */
    const deviceSearch = document.getElementById('device-search');
    const openModalBtn = document.getElementById('open-supplier-modal');
    const closeModalBtn = document.getElementById('close-supplier-modal');
    const cancelModalBtn = document.getElementById('cancel-device-btn');
    const supplierModal = document.getElementById('supplier-modal');
    const addDeviceForm = document.getElementById('add-device-form');
    const devicesList = document.getElementById('devices-list');

    if (deviceSearch) {
        deviceSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const deviceCards = devicesList.querySelectorAll('.device-card-mini');

            deviceCards.forEach(card => {
                const name = card.getAttribute('data-name').toLowerCase();
                if (name.includes(query)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    function toggleModal(show) {
        if (show) {
            supplierModal.classList.add('active');
        } else {
            supplierModal.classList.remove('active');
        }
    }

    if (openModalBtn) openModalBtn.addEventListener('click', () => toggleModal(true));
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => toggleModal(false));
    if (cancelModalBtn) cancelModalBtn.addEventListener('click', () => toggleModal(false));

    if (addDeviceForm) {
        addDeviceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const deviceName = document.getElementById('device-name').value;
            const devicePrice = document.getElementById('device-price').value;
            const deviceType = document.getElementById('device-type').value;
            const deviceCompany = document.getElementById('device-company').value;

            let tagLabel = 'متوفر للبيع';
            let priceSuffix = 'ج.م';
            if (deviceType === 'rent') {
                tagLabel = 'متوفر للإيجار';
                priceSuffix = 'ج.م / شهرياً';
            } else if (deviceType === 'both') {
                tagLabel = 'متوفر للبيع والإيجار';
            }

            const newCard = document.createElement('div');
            newCard.className = 'device-card-mini';
            newCard.setAttribute('data-name', deviceName);
            newCard.innerHTML = `
                <div class="img-placeholder"><i class="fas fa-box-tissue"></i></div>
                <div class="info">
                    <h4>${deviceName}</h4>
                    <p class="tag">${tagLabel}</p>
                    <div class="price">${Number(devicePrice).toLocaleString()} ${priceSuffix}</div>
                    <p style="font-size:0.75rem; color: var(--text-muted); margin-top:2px;">بواسطة: ${deviceCompany}</p>
                    <button class="btn btn-buy btn-glow" style="margin-top:6px;" onclick="alert('تم إرسال طلب الشراء للمورد!')">طلب شراء</button>
                </div>
            `;

            devicesList.insertBefore(newCard, devicesList.firstChild);
            
            addDeviceForm.reset();
            toggleModal(false);
        });
    }


    /* ==========================================
       9. Pharmacy Prescription OCR Simulation
       ========================================== */
    const dropZone = document.getElementById('drop-zone');
    const selectFileBtn = document.getElementById('btn-select-file');
    const fileInput = document.getElementById('prescription-file');
    const scannerUi = document.getElementById('scanner-ui');
    const resultsUi = document.getElementById('results-ui');
    const matchedItemsList = document.getElementById('matched-items-list');
    const matchedTotalVal = document.getElementById('matched-total-val');
    const matchedTitle = document.getElementById('matched-title');
    const resetPharmacyBtn = document.getElementById('btn-reset-pharmacy');
    const samplePrescriptionBtns = document.querySelectorAll('.btn-sample');

    // Sample prescription datasets
    const prescriptionsData = {
        general: {
            title: "روشتة أطفال (عيادة د. أحمد كمال):",
            total: "140 ج.م",
            items: [
                { name: "أوجمنتين 1 جم (مضاد حيوي)", price: "95 ج.م" },
                { name: "بانادول إكسترا (مسكن)", price: "45 ج.م" }
            ]
        },
        cardio: {
            title: "روشتة قلب وأوعية دموية (عيادة د. مجدي يعقوب):",
            total: "285 ج.م",
            items: [
                { name: "كونكور 5 ملجم (ضغط الدم)", price: "120 ج.م" },
                { name: "أسبرين بروتكت (سيولة)", price: "65 ج.م" },
                { name: "أوتورفاستاتين 20 ملجم (كوليسترول)", price: "100 ج.م" }
            ]
        }
    };

    function startScanning(prescriptionType) {
        if (dropZone) dropZone.style.display = 'none';
        if (scannerUi) scannerUi.style.display = 'block';

        setTimeout(() => {
            if (scannerUi) scannerUi.style.display = 'none';
            if (resultsUi) resultsUi.style.display = 'flex';

            // Load matched items based on type selected
            const data = prescriptionsData[prescriptionType] || prescriptionsData.general;
            
            matchedTitle.textContent = data.title;
            matchedTotalVal.textContent = data.total;
            matchedItemsList.innerHTML = ''; // clear

            data.items.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${item.name}</span><strong>${item.price}</strong>`;
                matchedItemsList.appendChild(li);
            });
        }, 2200); // scan time animation duration
    }

    // Handle Upload Triggering
    if (selectFileBtn && fileInput) {
        selectFileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            fileInput.click();
        });
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                startScanning('general');
            }
        });
    }

    if (dropZone) {
        dropZone.addEventListener('click', () => fileInput && fileInput.click());
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--primary)';
            dropZone.style.background = 'rgba(0, 180, 165, 0.05)';
        });
        dropZone.addEventListener('dragleave', () => {
            dropZone.style.borderColor = 'rgba(10, 31, 68, 0.15)';
            dropZone.style.background = 'transparent';
        });
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = 'rgba(10, 31, 68, 0.15)';
            dropZone.style.background = 'transparent';
            if (e.dataTransfer.files.length > 0) {
                startScanning('general');
            }
        });
    }

    // Trigger Sample Prescriptions
    samplePrescriptionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const type = btn.getAttribute('data-prescription');
            startScanning(type);
        });
    });

    // Reset Pharmacy simulation
    if (resetPharmacyBtn) {
        resetPharmacyBtn.addEventListener('click', () => {
            resultsUi.style.display = 'none';
            dropZone.style.display = 'flex';
            if (fileInput) fileInput.value = ''; // clear
        });
    }


    /* ==========================================
       10. Interactive Testimonials Carousel System
       ========================================== */
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const carouselDots = document.querySelectorAll('.carousel-dots .dot');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');
    let currentSlide = 0;

    function showSlide(index) {
        // boundary wrap
        if (index >= testimonialCards.length) currentSlide = 0;
        else if (index < 0) currentSlide = testimonialCards.length - 1;
        else currentSlide = index;

        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            carouselDots[i].classList.remove('active');
            if (i === currentSlide) {
                card.classList.add('active');
                carouselDots[i].classList.add('active');
            }
        });
    }

    if (carouselNext) {
        carouselNext.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }
    if (carouselPrev) {
        carouselPrev.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }

    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Automatic transition every 6 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 6000);


    /* ==========================================
       11. FAQ Accordion Logic
       ========================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const parentItem = question.parentElement;
            const isActive = parentItem.classList.contains('active');

            // Close all items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // If not active, open clicked item
            if (!isActive) {
                parentItem.classList.add('active');
            }
        });
    });


    /* ==========================================
       12. Smooth Scroll Reveal (Intersection Observer)
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
