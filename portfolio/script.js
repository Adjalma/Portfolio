// Navegação suave
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Configuração do EmailJS
(function() {
    emailjs.init("service_ds4gbys"); // Substitua pelo seu User ID do EmailJS
})();

// Adicione no início do arquivo
const EMAIL_CONFIG = {
    serviceId: 'service_ds4gbys',
    templateId: 'template_yvxjkxn',
    userId: 'user_seu_id',
    rateLimit: 5, // máximo de emails por minuto
    lastSent: 0
};

// Função para verificar rate limit
function checkRateLimit() {
    const now = Date.now();
    const timeSinceLastEmail = now - EMAIL_CONFIG.lastSent;
    const minimumInterval = (60 / EMAIL_CONFIG.rateLimit) * 1000; // em milissegundos
    
    if (timeSinceLastEmail < minimumInterval) {
        throw new Error(`Aguarde ${Math.ceil((minimumInterval - timeSinceLastEmail) / 1000)} segundos antes de enviar outra mensagem.`);
    }
    
    EMAIL_CONFIG.lastSent = now;
}

// Adicione antes da função handleSubmit
function validateForm(formData) {
    const errors = [];
    
    if (!formData.get('nome').trim()) {
        errors.push('Nome é obrigatório');
    }
    
    const email = formData.get('email').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Email inválido');
    }
    
    if (!formData.get('mensagem').trim()) {
        errors.push('Mensagem é obrigatória');
    }
    
    return errors;
}

// Adicione esta função
async function sendEmailFallback(formData) {
    try {
        // Tenta enviar via API alternativa
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                service_id: 'service_ds4gbys',
                template_id: 'template_yvxjkxn',
                user_id: 'user_seu_id',
                template_params: {
                    from_name: formData.get('nome'),
                    reply_to: formData.get('email'),
                    message: formData.get('mensagem'),
                    to_name: "Adjalma Aguiar"
                }
            })
        });

        if (!response.ok) throw new Error('Falha no envio');
        return true;
    } catch (error) {
        console.error('Erro no fallback:', error);
        return false;
    }
}

// Atualize a função handleSubmit
async function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Validação
    const errors = validateForm(formData);
    if (errors.length > 0) {
        errors.forEach(error => showNotification(error, 'error'));
        return;
    }

    const submitButton = form.querySelector('button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;

    try {
        checkRateLimit();
        let sent = false;
        try {
            await emailjs.send(
                "service_ds4gbys", // Seu Service ID
                "template_yvxjkxn", // Seu Template ID
                {
                    from_name: formData.get('nome'),
                    reply_to: formData.get('email'),
                    message: formData.get('mensagem'),
                    to_name: "Adjalma Aguiar"
                }
            );
            sent = true;
        } catch (primaryError) {
            console.warn('Tentando método alternativo...', primaryError);
            sent = await sendEmailFallback(formData);
        }

        if (sent) {
            showNotification('Mensagem enviada com sucesso!', 'success');
            form.reset();
        } else {
            throw new Error('Falha em todos os métodos de envio');
        }
    } catch (error) {
        console.error('Erro:', error);
        showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Sistema de notificações
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Ativar seção atual no menu
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 150 && window.scrollY < sectionTop + sectionHeight - 150) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if(link.getAttribute('href').substring(1) === section.getAttribute('id')) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Adicionar ao script.js
document.addEventListener('DOMContentLoaded', () => {
    // Animação suave ao scroll
    AOS.init();
    
    // Destacar menu ativo
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    // Preview de projetos
    const projetoCards = document.querySelectorAll('.projeto-card');
    projetoCards.forEach(card => {
        card.setAttribute('data-aos', 'fade-up');
        
        // Preview em hover
        card.addEventListener('mouseenter', () => {
            const img = card.querySelector('img');
            const info = card.querySelector('.projeto-info');
            
            img.style.transform = 'scale(1.05)';
            info.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            const img = card.querySelector('img');
            const info = card.querySelector('.projeto-info');
            
            img.style.transform = 'scale(1)';
            info.style.transform = 'translateY(0)';
        });
    });

    // Menu mobile
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-toggle';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    document.querySelector('nav').appendChild(menuButton);
    
    menuButton.addEventListener('click', () => {
        document.querySelector('nav ul').classList.toggle('active');
    });

    // Scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
});

// Sistema de preview melhorado
function showPreview(projectId) {
    const modal = document.getElementById('preview-modal');
    const content = document.getElementById('preview-content');
    const config = projectsConfig[projectId];
    
    if (!config) {
        showNotification('Projeto não encontrado', 'error');
        return;
    }
    
    content.innerHTML = `
        <div class="preview-container">
            <h2>${config.title}</h2>
            <div class="preview-carousel">
                ${config.images.map(img => `
                    <div class="carousel-item">
                        <img src="assets/demos/${img}" alt="${config.title}">
                    </div>
                `).join('')}
                <button class="prev">❮</button>
                <button class="next">❯</button>
            </div>
            <div class="preview-info">
                <h3>Principais Funcionalidades:</h3>
                <ul>
                    ${config.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <div class="tech-stack">
                    ${config.technologies.map(tech => `
                        <div class="tech-item">${tech}</div>
                    `).join('')}
                </div>
                <div class="preview-actions">
                    <a href="${config.demoUrl}" class="btn-demo" target="_blank">Ver Demo Completa</a>
                    <a href="${config.githubUrl}" class="btn-github" target="_blank">
                        <i class="fab fa-github"></i> Código
                    </a>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    initializePreviewElements(content);
}

function initializePreviewElements(container) {
    // Zoom em imagens
    container.querySelectorAll('.preview-image img').forEach(img => {
        img.addEventListener('click', () => {
            img.classList.toggle('zoomed');
        });
    });
    
    // Carousel de imagens (se houver)
    const carousel = container.querySelector('.preview-carousel');
    if (carousel) {
        initializeCarousel(carousel);
    }
}

function initializeCarousel(carousel) {
    const items = carousel.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    
    function showItem(index) {
        items.forEach(item => item.style.display = 'none');
        items[index].style.display = 'block';
    }
    
    carousel.querySelector('.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    });
    
    carousel.querySelector('.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    });
    
    showItem(0);
}

// Fechar modal
document.querySelector('.modal .close').addEventListener('click', () => {
    document.getElementById('preview-modal').style.display = 'none';
}); 