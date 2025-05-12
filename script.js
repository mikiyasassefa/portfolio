// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  themeToggle.innerHTML = body.dataset.theme === 'dark' ? 
    '<i class="fas fa-sun"></i>' : 
    '<i class="fas fa-moon"></i>';
});

// Typing Animation
const roles = [
  "Web Developer",
  "UI/UX Designer",
  "React Specialist",
  "Problem Solver"
];
let roleIndex = 0;
let charIndex = 0;
const roleElement = document.getElementById("role");

function typeRole() {
  if (charIndex < roles[roleIndex].length) {
    roleElement.textContent += roles[roleIndex][charIndex];
    charIndex++;
    setTimeout(typeRole, 100);
  } else {
    setTimeout(eraseRole, 2000);
  }
}

function eraseRole() {
  if (charIndex > 0) {
    roleElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseRole, 50);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 500);
  }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Form Validation
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  if (!name || !email || !message) {
    formMessage.textContent = 'Please fill in all fields';
    return;
  }
  
  if (!isValidEmail(email)) {
    formMessage.textContent = 'Please enter a valid email address';
    return;
  }

  try {
    formMessage.textContent = 'Sending message...';
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
      form.reset();
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    formMessage.textContent = 'Oops! There was a problem sending your message. Please try again.';
  }
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  typeRole();
  
  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll('.skill-level');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.style.width;
      }
    });
  });
  
  skillBars.forEach(bar => observer.observe(bar));
});