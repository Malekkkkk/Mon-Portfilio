// Données des projets et expériences
const projects = [
    {
        id: "devops_amadeus",
        technologies: ["DevOps", "Backstage", "YAML", "Kubernetes", "ArgoCD"],
        icon: "fa-cloud"
    },
    {
        id: "software_amadeus",
        technologies: ["JavaScript", "Playwright", "Cypress", "Kubernetes", "ArgoCD"],
        icon: "fa-code"
    },
    {
        id: "weather_station",
        technologies: ["UML", "C++", "Arduino"],
        icon: "fa-temperature-high"
    },
    {
        id: "internship_website",
        technologies: ["HTML", "CSS", "JavaScript", "PHPMyAdmin", "REST APIs"],
        icon: "fa-briefcase"
    },
    {
        id: "medical_warehouse",
        technologies: ["PowerBI", "SQL", "Talend"],
        icon: "fa-database"
    },
    {
        id: "video_game",
        technologies: ["C", "GitHub", "Linux", "SDL"],
        icon: "fa-gamepad"
    }
];

// Gestion des traductions
let currentLanguage = 'fr';

function updateLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = key.split('.').reduce((obj, i) => obj[i], translations[currentLanguage]);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Mettre à jour les titres des sections
    document.querySelector('#about h2').textContent = translations[currentLanguage].skills.title;
    document.querySelector('#projets h2').textContent = translations[currentLanguage].projects.title;
    document.querySelector('#contact h2').textContent = translations[currentLanguage].contact.title;
    
    // Mettre à jour le footer
    document.querySelector('footer p').textContent = translations[currentLanguage].footer.copyright;
    
    // Mettre à jour les cartes de projets
    createProjectCards();
    
    // Sauvegarder la préférence de langue
    localStorage.setItem('preferredLanguage', lang);
}

// Fonction pour créer les cartes de projets
function createProjectCards() {
    const projectsGrid = document.querySelector('.projets-grid');
    projectsGrid.innerHTML = ''; // Vider la grille existante
    
    projects.forEach(project => {
        const projectData = translations[currentLanguage].projects.items[project.id];
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-icon">
                <i class="fas ${project.icon}"></i>
            </div>
            <div class="project-info">
                <h3>${projectData.title}</h3>
                <p class="company">${projectData.company}</p>
                <p class="period">${projectData.period} - ${projectData.location}</p>
                <p class="description">${projectData.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    // Initialiser EmailJS avec votre clé publique
    emailjs.init("VOTRE_CLE_PUBLIQUE_EMAILJS"); // Remplacez par votre clé publique EmailJS

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const statusDiv = document.getElementById('form-status');
        
        // Désactiver le bouton pendant l'envoi
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
        
        // Préparer les données du formulaire
        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value,
        };

        // Envoyer l'email
        emailjs.send('VOTRE_SERVICE_ID', 'VOTRE_TEMPLATE_ID', templateParams)
            .then(function(response) {
                // Succès
                statusDiv.textContent = 'Message envoyé avec succès!';
                statusDiv.className = 'form-status success';
                contactForm.reset();
            }, function(error) {
                // Erreur
                statusDiv.textContent = 'Erreur lors de l\'envoi du message. Veuillez réessayer.';
                statusDiv.className = 'form-status error';
                console.error('Erreur EmailJS:', error);
            })
            .finally(function() {
                // Réactiver le bouton
                submitBtn.disabled = false;
                submitBtn.textContent = 'Envoyer';
            });
    });
}

// Animation au défilement améliorée
function animateOnScroll() {
    const elements = document.querySelectorAll('.hero-content, .about-content, .projets-grid, .contact-content, .skill-category, .project-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const triggerBottom = window.innerHeight * 0.8;
        
        if (elementTop < triggerBottom && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Effet de parallaxe pour le hero
function parallaxEffect() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
}

// Animation des compétences
function animateSkills() {
    const skills = document.querySelectorAll('.skill-item');
    skills.forEach(skill => {
        skill.addEventListener('mouseover', () => {
            skill.style.transform = 'translateY(-5px) scale(1.1)';
        });
        skill.addEventListener('mouseout', () => {
            skill.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Animation des cartes de projets
function animateProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'translateY(-10px)';
            card.querySelector('.project-icon i').style.transform = 'scale(1.2)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'translateY(0)';
            card.querySelector('.project-icon i').style.transform = 'scale(1)';
        });
    });
}

// Animation du formulaire
function animateForm() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

// Animation du menu de navigation
function animateNav() {
    const nav = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
}

// Animation des icônes sociales
function animateSocialIcons() {
    const icons = document.querySelectorAll('.social-icon');
    icons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            icon.querySelector('i').style.transform = 'translateY(-5px) rotate(360deg)';
        });
        icon.addEventListener('mouseout', () => {
            icon.querySelector('i').style.transform = 'translateY(0) rotate(0)';
        });
    });
}

// Animation des icônes de contact
function animateContactIcons() {
    const icons = document.querySelectorAll('.contact-icon');
    icons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'translateY(-10px)';
            icon.querySelector('i').style.transform = 'scale(1.2)';
        });
        icon.addEventListener('mouseout', () => {
            icon.style.transform = 'translateY(0)';
            icon.querySelector('i').style.transform = 'scale(1)';
        });
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer la langue préférée ou utiliser le français par défaut
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'fr';
    document.getElementById('language-select').value = preferredLanguage;
    updateLanguage(preferredLanguage);
    
    // Écouter les changements de langue
    document.getElementById('language-select').addEventListener('change', function(e) {
        updateLanguage(e.target.value);
    });
    
    animateOnScroll();
    parallaxEffect();
    animateSkills();
    animateProjectCards();
    animateForm();
    animateNav();
    animateSocialIcons();
    animateContactIcons();
}); 