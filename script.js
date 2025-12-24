document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Navbar Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
        } else {
            header.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // Modal Functions
    window.openModal = function (source, type) {
        const modal = document.getElementById('certModal');
        const modalBody = document.getElementById('modalBody');

        if (!modal || !modalBody) return;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        if (type === 'pdf') {
            modalBody.innerHTML = `
                <div style="position: relative; width: 100%; height: 100%;">
                    <iframe src="${source}#toolbar=0&navpanes=0&scrollbar=0&view=FitH" 
                            style="width: 100%; height: 100%; border: none;" 
                            allowfullscreen></iframe>
                    <div class="no-interaction-layer" oncontextmenu="return false;"></div>
                </div>
            `;
        } else {
            modalBody.innerHTML = `
                <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
                    <img src="${source}" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px;">
                </div>
            `;
        }
    }

    window.closeModal = function () {
        const modal = document.getElementById('certModal');
        const modalBody = document.getElementById('modalBody');

        if (!modal) return;

        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
        if (modalBody) modalBody.innerHTML = ''; // Clear content to stop iframe
    }

    // Close on click outside
    window.onclick = function (event) {
        const modal = document.getElementById('certModal');
        if (event.target == modal) {
            closeModal();
        }
    }

    // Close on Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });
});
