// Données des projets et expériences
const projects = [
    {
        title: "Apprenti DevOps Engineer",
        company: "Amadeus",
        period: "Oct 2023 - Présent",
        location: "Nice, France",
        description: "Développement et amélioration de Backstage, un portail DevOps pour centraliser les services et l'infrastructure. Intégration d'outils d'automatisation et redéfinition de l'architecture de flux de release.",
        technologies: ["DevOps", "Backstage", "YAML", "Kubernetes", "ArgoCD"],
        icon: "fa-cloud"
    },
    {
        title: "Stage - Software Engineer",
        company: "Amadeus",
        period: "Avr 2023 - Jul 2023",
        location: "Nice, France",
        description: "Développement d'une application web interne pour suivre les charges de release et les scans de sécurité. Migration des tests end-to-end de Cypress vers Playwright.",
        technologies: ["JavaScript", "Playwright", "Cypress", "Kubernetes", "ArgoCD"],
        icon: "fa-code"
    },
    {
        title: "Station Météo Prototype",
        company: "CESI",
        period: "2023",
        location: "Nice, France",
        description: "Construction d'un prototype pour détecter divers paramètres environnementaux.",
        technologies: ["UML", "C++", "Arduino"],
        icon: "fa-temperature-high"
    },
    {
        title: "Site Web d'Offres de Stage",
        company: "CESI",
        period: "2023",
        location: "Nice, France",
        description: "Développement d'un site web regroupant les offres de stage, similaire à LinkedIn.",
        technologies: ["HTML", "CSS", "JavaScript", "PHPMyAdmin", "REST APIs"],
        icon: "fa-briefcase"
    },
    {
        title: "Entrepôt de Données Médicales",
        company: "CESI",
        period: "2023",
        location: "Nice, France",
        description: "Construction d'un entrepôt de données pour l'analyse de données médicales.",
        technologies: ["PowerBI", "SQL", "Talend"],
        icon: "fa-database"
    },
    {
        title: "Développement de Jeu Vidéo",
        company: "Esprit",
        period: "2022",
        location: "Tunis, Tunisie",
        description: "Développement d'un jeu vidéo, classé parmi les 10 meilleurs projets du concours annuel.",
        technologies: ["C", "GitHub", "Linux", "SDL"],
        icon: "fa-gamepad"
    }
];

// Fonction pour créer les cartes de projets
function createProjectCards() {
    const projectsGrid = document.querySelector('.projets-grid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-icon">
                <i class="fas ${project.icon}"></i>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p class="company">${project.company}</p>
                <p class="period">${project.period} - ${project.location}</p>
                <p class="description">${project.description}</p>
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
    createProjectCards();
    window.addEventListener('scroll', () => {
        animateOnScroll();
        parallaxEffect();
    });
    animateOnScroll(); // Animation initiale
    animateSkills();
    animateProjectCards();
    animateForm();
    animateNav();
    animateSocialIcons();
    animateContactIcons();
}); 