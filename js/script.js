// ================================
// Инициализация при загрузке страницы
// ================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initBackToTop();
    initSmoothScroll();
});

// ================================
// Навигация
// ================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Изменение стиля navbar при прокрутке
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Мобильное меню
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Анимация иконки бургера
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            
            // Сброс анимации иконки бургера
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Активная ссылка при прокрутке
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ================================
// Плавная прокрутка
// ================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================
// Анимации при прокрутке
// ================================

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Отключаем наблюдение после появления элемента
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Наблюдаем за всеми элементами с классом fade-on-scroll
    const elementsToAnimate = document.querySelectorAll('.fade-on-scroll');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// ================================
// Кнопка "Наверх"
// ================================

function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    // Показываем/скрываем кнопку при прокрутке
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Прокрутка наверх при клике
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ================================
// Дополнительные эффекты
// ================================

// Параллакс эффект для hero секции удален по запросу
// window.addEventListener('scroll', function() {
//     const hero = document.querySelector('.hero');
//     const scrolled = window.scrollY;
//     
//     if (hero && scrolled < window.innerHeight) {
//         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//         hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
//     }
// });

// Эффект наведения на карточки отзывов
const reviewCards = document.querySelectorAll('.review-card');
reviewCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderTop = '5px solid var(--accent-gold)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderTop = 'none';
    });
});

// Анимация появления элементов списка содержания
const contentItems = document.querySelectorAll('.contents-list li');
contentItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        item.style.transition = 'all 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
    }, index * 50);
});

// ================================
// Утилиты
// ================================

// Функция для определения видимости элемента
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Функция для плавного появления элементов с задержкой
function staggerAnimation(elements, delay = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * delay);
    });
}

// ================================
// Эффекты для улучшения UX
// ================================

// Добавление фокус-эффектов для доступности
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--accent-gold)';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Предзагрузка изображений при наведении на ссылки
const links = document.querySelectorAll('a[href]');
links.forEach(link => {
    link.addEventListener('mouseenter', function() {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                const images = target.querySelectorAll('img');
                images.forEach(img => {
                    if (!img.complete) {
                        img.loading = 'eager';
                    }
                });
            }
        }
    });
});

// ================================
// Обработка ошибок загрузки PDF
// ================================

const pdfEmbed = document.querySelector('.book-cover-pdf');
if (pdfEmbed) {
    pdfEmbed.addEventListener('error', function() {
        console.log('PDF загружается...');
        // Можно добавить альтернативное изображение или плейсхолдер
    });
}

// ================================
// Оптимизация производительности
// ================================

// Debounce функция для оптимизации событий прокрутки
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Применяем debounce к событиям прокрутки
const debouncedScroll = debounce(function() {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ================================
// Анимация счетчиков (если добавите статистику)
// ================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ================================
// Эффект печатной машинки для цитат (опционально)
// ================================

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ================================
// Пасхальное яйцо: эффект конфетти при клике на золотые звезды
// ================================

const stars = document.querySelectorAll('.review-stars i');
let clickCount = 0;

stars.forEach(star => {
    star.addEventListener('click', function() {
        clickCount++;
        this.style.transform = 'scale(1.2) rotate(360deg)';
        this.style.transition = 'transform 0.5s ease';
        
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 500);
        
        // Секретный эффект после 5 кликов
        if (clickCount >= 5) {
            console.log('🎉 Спасибо за интерес к книге!');
            clickCount = 0;
        }
    });
});

// ================================
// Обработка видео иконок
// ================================

// Храним маппинг ссылок в памяти
let videoLinksMapping = {};

// Загружаем маппинг ссылок из JSON файла
function loadVideoLinksMapping() {
    fetch('vk-video-links-mapping.json')
        .then(response => response.json())
        .then(data => {
            videoLinksMapping = data;
            console.log('Маппинг видео ссылок загружен');
        })
        .catch(error => {
            console.error('Ошибка загрузки маппинга видео ссылок:', error);
        });
}

function initVideoIcons() {
    // Загружаем маппинг ссылок
    loadVideoLinksMapping();
    
    // Добавляем обработчики событий для всех видео иконок
    const videoIcons = document.querySelectorAll('.video-icon');
    
    videoIcons.forEach(icon => {
        // Обработчик клика
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Получаем URL видео из data атрибута
            const videoKey = this.getAttribute('data-video');
            
            // Получаем реальный URL видео из маппинга
            const realVideoUrl = videoLinksMapping[videoKey] || videoKey;
            
            // Проверяем, что URL существует
            if (realVideoUrl && realVideoUrl !== '#') {
                // Открываем видео в новой вкладке
                window.open(realVideoUrl, '_blank');
            } else {
                console.warn('URL видео не найден для этой иконки');
            }
        });
        
        // Добавляем поддержку клавиатуры
        icon.addEventListener('keydown', function(e) {
            // Открываем видео при нажатии Enter или Space
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Добавляем визуальную обратную связь при наведении
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Добавляем фокус-эффекты для доступности
        icon.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-gold)';
            this.style.outlineOffset = '2px';
        });
        
        icon.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Инициализируем видео иконки после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    initVideoIcons();
    initHeroVideo();
});

// ================================
// Управление видео в Hero-секции
// ================================

function initHeroVideo() {
    const video = document.getElementById('heroVideo');
    const playToggle = document.getElementById('videoPlayToggle');
    const muteToggle = document.getElementById('videoMuteToggle');
    const overlay = document.getElementById('videoOverlay');
    const playIcon = playToggle.querySelector('i');
    const muteIcon = muteToggle.querySelector('i');

    if (!video || !playToggle || !muteToggle) return;

    // Клик по кнопке play/pause
    playToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleVideoPlay();
    });

    // Клик по кнопке звука
    muteToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleVideoSound();
    });

    // Клик по видео — пауза/плей
    video.addEventListener('click', function() {
        toggleVideoPlay();
    });

    // Клик по оверлею
    if (overlay) {
        overlay.addEventListener('click', function() {
            toggleVideoPlay();
        });
    }

    // Показывать оверлей когда видео на паузе
    video.addEventListener('pause', function() {
        if (overlay) overlay.classList.add('visible');
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        playToggle.setAttribute('title', 'Воспроизвести');
    });

    // Скрывать оверлей когда видео играет
    video.addEventListener('play', function() {
        if (overlay) overlay.classList.remove('visible');
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        playToggle.setAttribute('title', 'Пауза');
    });

    function toggleVideoPlay() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    function toggleVideoSound() {
        video.muted = !video.muted;

        if (video.muted) {
            muteIcon.classList.remove('fa-volume-up');
            muteIcon.classList.add('fa-volume-mute');
            muteToggle.classList.remove('unmuted');
            muteToggle.setAttribute('title', 'Включить звук');
        } else {
            muteIcon.classList.remove('fa-volume-mute');
            muteIcon.classList.add('fa-volume-up');
            muteToggle.classList.add('unmuted');
            muteToggle.setAttribute('title', 'Выключить звук');
        }
    }
}

// ================================
// Консольное приветствие
// ================================

console.log('%c📚 Шесть минут', 'color: #8B2635; font-size: 24px; font-weight: bold;');
console.log('%cСборник прозы Софии Агачер', 'color: #1a365d; font-size: 16px;');
console.log('%cСпасибо за посещение сайта! 📖', 'color: #D4AF37; font-size: 14px;');