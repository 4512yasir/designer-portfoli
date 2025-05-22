// Smooth scroll for nav links
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelector(anchor.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// Dark mode toggle
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  // toggle moon/sun icon
  if (document.body.classList.contains("dark")) {
    darkModeToggle.textContent = "☀️";
  } else {
    darkModeToggle.textContent = "🌙";
  }
});

// Animated typing intro
const typedText = document.getElementById("typed");
const words = [
  "I am a Visual storyteller.",
  "I am a Graphic Designer.",
  "I am Creative thinker.",
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 120;
let deletingSpeed = 60;

function type() {
  const currentWord = words[wordIndex];
  if (!isDeleting) {
    typedText.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1200);
      return;
    }
  } else {
    typedText.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
}
type();

// Project filtering
const filterButtons = document.querySelectorAll("#projectFilters button");
const projects = document.querySelectorAll(".project-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    projects.forEach((project) => {
      if (
        filter === "all" ||
        project.getAttribute("data-category") === filter
      ) {
        project.style.display = "block";
        setTimeout(() => {
          project.style.opacity = "1";
          project.style.transform = "scale(1)";
        }, 50);
      } else {
        project.style.opacity = "0";
        project.style.transform = "scale(0.9)";
        setTimeout(() => (project.style.display = "none"), 300);
      }
    });
  });
});

// Contact form validation
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Simple validation
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (name.length < 2) {
    formMessage.textContent = "Please enter your name (at least 2 characters).";
    contactForm.name.focus();
    return;
  }
  if (!validateEmail(email)) {
    formMessage.textContent = "Please enter a valid email address.";
    contactForm.email.focus();
    return;
  }
  if (message.length < 10) {
    formMessage.textContent = "Message must be at least 10 characters long.";
    contactForm.message.focus();
    return;
  }

  formMessage.style.color = "green";
  formMessage.textContent =
    "Thank you for your message! I will get back to you soon.";
  contactForm.reset();
});

function validateEmail(email) {
  // Basic email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
