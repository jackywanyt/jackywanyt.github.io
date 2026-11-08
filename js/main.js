document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('navbar-container');
  if (!container) return;

  // 1. 動態讀取 navbar.html (加入 ?v=2 與 { cache: 'no-store' } 強制不快取，確保每次都讀到最新)
  // fetch('navbar.html?v=2', { cache: 'no-store' })

    // 用當前時間毫秒數作為版本號，確保每次讀取都是絕對最新，再也不用手動改數字！
fetch(`navbar.html?v=${new Date().getTime()}`, { cache: 'no-store' })
    .then(response => {
      if (!response.ok) throw new Error('Failed to load navbar');
      return response.text();
    })
    .then(html => {
      container.innerHTML = html;

      // 2. 綁定手機版漢堡包點擊事件 (切換 hidden 與 flex 確保手機版順利展開)
      const navToggle = document.getElementById('navToggle');
      const navMenu = document.getElementById('navMenu');
      if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
          navMenu.classList.toggle('hidden');
          navMenu.classList.toggle('flex');
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
