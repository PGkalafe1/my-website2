
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Smooth scrolling for navigation links
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Add click event to all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                scrollToSection(targetId);
                mobileMenu.classList.add('hidden');
            });
        });

        // Intersection Observer for section reveals
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Animate skill bars when skills section is visible
                    if (entry.target.id === 'skills') {
                        animateSkillBars();
                    }
                }
            });
        }, observerOptions);

        // Observe all sections with reveal animation
        document.querySelectorAll('.section-reveal').forEach(section => {
            observer.observe(section);
        });

        // Animate skill bars
        function animateSkillBars() {
            document.querySelectorAll('.skill-bar').forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
            });
        }

        // Contact form handling
        document.getElementById('contact-form').addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !subject || !message) {
                alert('لطفاً تمام فیلدها را پر کنید.');
                return;
            }

            // Simulate form submission
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'در حال ارسال...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('پیام شما با موفقیت ارسال شد! به زودی با شما تماس خواهم گرفت.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

        // Add active nav link highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');

            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('text-purple-600');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('text-purple-600');
                }
            });
        });

        // Add scroll-to-top functionality
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                if (!document.getElementById('scroll-top')) {
                    const scrollTopBtn = document.createElement('button');
                    scrollTopBtn.id = 'scroll-top';
                    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
                    scrollTopBtn.className = 'fixed bottom-8 left-8 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 z-50';
                    scrollTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
                    document.body.appendChild(scrollTopBtn);
                }
            } else {
                const scrollTopBtn = document.getElementById('scroll-top');
                if (scrollTopBtn) {
                    scrollTopBtn.remove();
                }
            }
        });
    