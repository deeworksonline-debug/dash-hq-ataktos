// ============================================
// MATRIX RAIN ANIMATION
// ============================================

const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Enhanced character set: Greek letters, mathematical symbols, shapes, ancient glyphs
const characters = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω0123456789◊◇□■▪▫○●◎∑∏∫∂∇√∞≈≠≤≥±×÷§¶†‡※‰';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(0);

// Opacity variants for "popping" effect
const opacityLevels = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

function drawMatrix() {
    // Semi-transparent black background for fade effect
    ctx.fillStyle = 'rgba(10, 10, 10, 0.03)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Neon blue color with variation
    ctx.font = fontSize + 'px "JetBrains Mono", monospace';

    for (let i = 0; i < drops.length; i++) {
        const char = characters[Math.floor(Math.random() * characters.length)];
        
        // Random opacity for "popping" effect - some chars bright, some dim
        const opacity = opacityLevels[Math.floor(Math.random() * opacityLevels.length)];
        
        // Vary color slightly for more life
        if (opacity > 0.7) {
            ctx.fillStyle = 'rgba(0, 212, 255, ' + opacity + ')'; // Cyan for bright chars
        } else {
            ctx.fillStyle = 'rgba(0, 102, 255, ' + opacity + ')'; // Blue for dim chars
        }
        
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Matrix animation loop
function animateMatrix() {
    drawMatrix();
    requestAnimationFrame(animateMatrix);
}

// Start matrix animation
animateMatrix();

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ============================================
// BUTTON INTERACTIONS
// ============================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        const cursor = this.querySelector('.btn-cursor');
        if (cursor) {
            cursor.style.opacity = '0';
        }
    });

    button.addEventListener('mouseleave', function() {
        const cursor = this.querySelector('.btn-cursor');
        if (cursor) {
            cursor.style.opacity = '1';
        }
    });
});

// ============================================
// TRANSMISSION ITEM INTERACTIONS
// ============================================

document.querySelectorAll('.transmission-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.borderLeftColor = '#00ffff';
        this.style.boxShadow = '0 0 25px rgba(0, 212, 255, 0.4), inset 0 0 25px rgba(0, 212, 255, 0.08)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.borderLeftColor = '#00d4ff';
        this.style.boxShadow = '0 0 0px rgba(0, 212, 255, 0)';
    });
});

// ============================================
// TYPEWRITER EFFECT
// ============================================

function typeWriter(element, speed = 50) {
    const text = element.textContent;
    element.textContent = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    // Only trigger if element is in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && index === 0) {
                type();
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(element);
}

// ============================================
// GLITCH EFFECT ENHANCEMENT - DISABLED
// ============================================
// Glitch effect has been disabled in favor of clean neon glow

// ============================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// LOGO GLOW EFFECT
// ============================================

const logo = document.querySelector('.dash-logo');
if (logo) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Subtle glow intensity based on mouse position
        const intensity = Math.abs(Math.sin(x * 2 * Math.PI) * Math.cos(y * 2 * Math.PI));
        const glowAmount = 10 + intensity * 10;
        
        logo.style.filter = `drop-shadow(0 0 ${glowAmount}px rgba(0, 102, 255, ${0.4 + intensity * 0.4}))`;
    });
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Reduce animation intensity on low-power devices
if (navigator.deviceMemory && navigator.deviceMemory < 4) {
    document.documentElement.style.setProperty('--glow-intensity', '0.4');
    // Reduce matrix animation
    canvas.style.opacity = '0.08';
}

// ============================================
// INIT MESSAGE
// ============================================

console.log('%c>> DASH HQ X ATAKTOS - SIGNAL ACTIVE', 'color: #00d4ff; font-weight: bold; font-size: 14px;');
console.log('%c222 pieces. One chain. Permanent onchain.', 'color: #0066ff; font-size: 12px;');
