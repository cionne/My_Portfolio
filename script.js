// Menu mobile
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Dark mode toggle
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        const mobileDarkModeToggle = document.getElementById('mobile-dark-mode-toggle');
        
        darkModeToggle.addEventListener('click', toggleDarkMode);
        mobileDarkModeToggle.addEventListener('click', toggleDarkMode);
        
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
        
        // Animation au défilement
        document.addEventListener('DOMContentLoaded', () => {
            const animateElements = document.querySelectorAll('.animate-fadeIn');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1
            });
            
            animateElements.forEach(element => {
                element.style.opacity = 0;
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(element);
            });
            
            // Smooth scrolling pour les liens
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Fermer le menu mobile si ouvert
                        mobileMenu.classList.add('hidden');
                    }
                });
            });
        });

        // Hobbies interactivity
        document.getElementById('show-chords-btn').addEventListener('click', function() {
            const container = document.getElementById('chords-container');
            container.classList.toggle('hidden');
            this.textContent = container.classList.contains('hidden') ? 
                'Show My Favorite Chords →' : 'Hide Chords ←';
        });

        document.getElementById('show-chess-btn').addEventListener('click', function() {
            const container = document.getElementById('chess-container');
            container.classList.toggle('hidden');
            this.textContent = container.classList.contains('hidden') ? 
                'Interactive Chess Board →' : 'Hide Chess Board ←';
            
            if (!container.classList.contains('hidden') && !document.querySelector('#chess-board').hasChildNodes()) {
                initChessBoard();
            }
        });

        document.getElementById('show-anime-btn').addEventListener('click', function() {
            const container = document.getElementById('anime-container');
            container.classList.toggle('hidden');
            this.textContent = container.classList.contains('hidden') ? 
                'My Top 5 Anime →' : 'Hide Anime List ←';
        });

        // Anime modal functionality
        function showAnimeInfo(anime) {
            const modal = document.getElementById('anime-modal');
            const title = document.getElementById('anime-modal-title');
            const content = document.getElementById('anime-modal-content');
            
            const animeData = {
                'death-note': {
                    title: 'Death Note',
                    content: `
                        <p class="mb-2"><strong>Genre:</strong> Psychological thriller, Supernatural</p>
                        <p class="mb-2"><strong>Episodes:</strong> 37</p>
                        <p class="mb-2"><strong>My Rating:</strong> 10/10</p>
                        <p>A high school student discovers a supernatural notebook that allows him to kill anyone by writing the victim's name while picturing their face. The story follows his attempts to become a god by creating a new world cleansed of evil, and the complex cat-and-mouse game that ensues.</p>
                    `
                },
                'fmab': {
                    title: 'Fullmetal Alchemist: Brotherhood',
                    content: `
                        <p class="mb-2"><strong>Genre:</strong> Action, Adventure, Fantasy</p>
                        <p class="mb-2"><strong>Episodes:</strong> 64</p>
                        <p class="mb-2"><strong>My Rating:</strong> 10/10</p>
                        <p>Two brothers search for a Philosopher's Stone after an attempt to revive their deceased mother goes awry and leaves them in damaged physical forms. The story explores themes of sacrifice, morality, and the consequences of playing god.</p>
                    `
                },
                'steins-gate': {
                    title: 'Steins;Gate',
                    content: `
                        <p class="mb-2"><strong>Genre:</strong> Sci-Fi, Thriller</p>
                        <p class="mb-2"><strong>Episodes:</strong> 24</p>
                        <p class="mb-2"><strong>My Rating:</strong> 9.5/10</p>
                        <p>A self-proclaimed mad scientist and his friends accidentally create a device that can send messages to the past, altering the flow of history. The story becomes a gripping tale of time travel consequences and personal sacrifice.</p>
                    `
                },
                'hxh': {
                    title: 'Hunter x Hunter',
                    content: `
                        <p class="mb-2"><strong>Genre:</strong> Adventure, Shounen</p>
                        <p class="mb-2"><strong>Episodes:</strong> 148</p>
                        <p class="mb-2"><strong>My Rating:</strong> 9.5/10</p>
                        <p>Gon Freecss aspires to become a Hunter, an exceptional being capable of greatness. Along his journey to find his father, he meets friends and foes, and learns the harsh realities of the world beyond his small island home.</p>
                    `
                },
                'your-lie': {
                    title: 'Your Lie in April',
                    content: `
                        <p class="mb-2"><strong>Genre:</strong> Drama, Music, Romance</p>
                        <p class="mb-2"><strong>Episodes:</strong> 22</p>
                        <p class="mb-2"><strong>My Rating:</strong> 9/10</p>
                        <p>A piano prodigy who lost his ability to hear his own playing after a traumatic childhood event meets a free-spirited violinist who helps him rediscover his love for music and life.</p>
                    `
                }
            };
            
            title.textContent = animeData[anime].title;
            content.innerHTML = animeData[anime].content;
            modal.classList.remove('hidden');
        }

        document.getElementById('close-anime-modal').addEventListener('click', function() {
            document.getElementById('anime-modal').classList.add('hidden');
        });

        document.getElementById('close-anime-modal-btn').addEventListener('click', function() {
            document.getElementById('anime-modal').classList.add('hidden');
        });

        // Chess board initialization
        function initChessBoard() {
            const chessBoard = document.getElementById('chess-board');
            chessBoard.innerHTML = '';
            
            const pieces = [
                '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',
                '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',
                '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '',
                '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
                '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'
            ];
            
            for (let i = 0; i < 64; i++) {
                const square = document.createElement('div');
                square.className = `chess-square ${Math.floor(i / 8) + i % 8 === 0 ? 'light' : 'dark'}`;
                square.dataset.index = i;
                
                if (pieces[i]) {
                    square.textContent = pieces[i];
                    square.style.cursor = 'pointer';
                    square.addEventListener('click', function() {
                        const selected = document.querySelector('.chess-selected');
                        if (selected) {
                            if (selected === this) {
                                this.classList.remove('chess-selected');
                            } else {
                                // Move piece
                                this.textContent = selected.textContent;
                                selected.textContent = '';
                                selected.classList.remove('chess-selected');
                            }
                        } else {
                            this.classList.add('chess-selected');
                        }
                    });
                }
                
                chessBoard.appendChild(square);
            }
        }

        // Guitar chord sounds
        function playChordSound(chord) {
            // In a real implementation, you would play actual chord sounds
            console.log(`Playing ${chord} chord sound`);
            alert(`Playing ${chord.toUpperCase()} chord sound (simulated)`);
        }

        // Contact form submission
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });

        // Typewriter effect for hero section
        const heroText = document.querySelector('#home h1');
        const originalText = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < originalText.length) {
                heroText.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 100);

        // Highlight active navigation link based on scroll position
function highlightNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, #mobile-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Run on page load and scroll
window.addEventListener('load', highlightNav);
window.addEventListener('scroll', highlightNav);

// Keyboard shortcut for dark mode (Ctrl/Cmd + Alt + D)
document.addEventListener('keydown', function(e) {
    // Check for Ctrl+Alt+D (Windows/Linux) or Cmd+Alt+D (Mac)
    if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        toggleDarkMode();
        
        // Show a brief notification
        const notification = document.createElement('div');
        notification.textContent = `Dark Mode ${document.body.classList.contains('dark-mode') ? 'Enabled' : 'Disabled'}`;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = document.body.classList.contains('dark-mode') ? '#1a202c' : '#f7fafc';
        notification.style.color = document.body.classList.contains('dark-mode') ? '#f7fafc' : '#1a202c';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1000';
        notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        notification.style.border = '1px solid';
        notification.style.borderColor = document.body.classList.contains('dark-mode') ? '#4a5568' : '#e2e8f0';
        
        document.body.appendChild(notification);
        
        // Remove after 2 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    }
});

// Make sure this function is accessible globally
window.toggleDarkMode = function() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('dark-mode-toggle').querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    
    // Also update the mobile toggle icon if it exists
    const mobileIcon = document.getElementById('mobile-dark-mode-toggle');
    if (mobileIcon) {
        mobileIcon.innerHTML = document.body.classList.contains('dark-mode') ? 
            '<i class="fas fa-sun mr-2"></i>Toggle Light Mode' : 
            '<i class="fas fa-moon mr-2"></i>Toggle Dark Mode';
    }
};

function highlightNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, #mobile-menu a');
    const contactBtn = document.querySelector('a.contact-btn');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    // Special handling for contact section
    const contactSection = document.getElementById('contact');
    const contactOffset = contactSection.offsetTop;
    const contactHeight = contactSection.offsetHeight;
    
    // Check if we're in contact section
    const isContactSection = scrollPosition >= contactOffset - 300 && 
                           scrollPosition <= contactOffset + contactHeight;
    
    if (isContactSection) {
        currentSection = 'contact';
        contactBtn.classList.add('active');
    } else {
        contactBtn.classList.remove('active');
        // Regular section detection for other sections
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}