document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('navbar-container');
  if (!container) return;

  // 1. 動態讀取 navbar.html
  fetch('navbar.html')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load navbar');
      return response.text();
    })
    .then(html => {
      container.innerHTML = html;

      // 2. 綁定手機版漢堡包點擊事件
      const navToggle = document.getElementById('navToggle');
      const navMenu = document.getElementById('navMenu');
      if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
          navMenu.classList.toggle('is-active');
        });
      }

      // 3. 自動跟據當前網址高亮對應的 Link (例如按 Home 亮 Home)
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const navLinks = document.querySelectorAll('.nav-link');
      
      navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
          link.classList.add('active');
        }
      });
    })
    .catch(error => console.error('Error:', error));
});

