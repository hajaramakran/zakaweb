        document.addEventListener('DOMContentLoaded', function() {
            const menuToggler = document.querySelector('.menu-toggler');
            const offCanvasMenu = document.querySelector('.off-canvas-menu');
            const closeMenuBtn = document.querySelector('.close-menu');
            const overlay = document.querySelector('.overlay');
            const menuLinks = document.querySelectorAll('.off-canvas-menu a');

            function toggleMenu() {
                offCanvasMenu.classList.toggle('open');
                overlay.classList.toggle('active');
                menuToggler.classList.toggle('active'); // To change hamburger icon to 'X'
                document.body.classList.toggle('no-scroll'); // To prevent background scrolling
            }

            menuToggler.addEventListener('click', toggleMenu);
            closeMenuBtn.addEventListener('click', toggleMenu);
            overlay.addEventListener('click', toggleMenu);

            // Close menu when a link inside is clicked
            menuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (offCanvasMenu.classList.contains('open')) {
                        toggleMenu();
                    }
                });
            });

            // CSS for 'no-scroll' class (add this to your main.css too if you prefer)
            // Or ensure it's handled by your existing CSS framework
            const style = document.createElement('style');
            style.innerHTML = `
                body.no-scroll {
                    overflow: hidden;
                }
            `;
            document.head.appendChild(style);
        });
