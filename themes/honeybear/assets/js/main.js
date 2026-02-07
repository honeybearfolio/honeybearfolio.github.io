// Initialize dark mode on page load
(function() {
  const theme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (theme === 'dark' || (!theme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Setup event listeners once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
      const darkModeToggle = document.getElementById('dark-mode-toggle');
      if (darkModeToggle) {
          darkModeToggle.addEventListener('click', toggleDarkMode);
      }

      const mobileDarkModeToggle = document.getElementById('mobile-dark-mode-toggle');
      if (mobileDarkModeToggle) {
          mobileDarkModeToggle.addEventListener('click', toggleDarkMode);
      }
      
      const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
      if (mobileMenuToggle) {
          mobileMenuToggle.addEventListener('click', () => {
              document.getElementById('mobile-menu').classList.toggle('hidden');
          });
      }

      // Screenshot buttons
      const screenshotBtns = document.querySelectorAll('.js-screenshot-btn');
      screenshotBtns.forEach(btn => {
          btn.addEventListener('click', () => {
              const src = btn.getAttribute('data-src');
              changeActionScreenshot(btn, src);
          });
      });
  });
})();

function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function changeActionScreenshot(btn, src) {
    const mainImg = document.getElementById('action-screenshot');

    // Security: validate image src before inserting into the DOM to avoid
    // reinterpreting attacker-controlled text as HTML or loading unsafe URIs.
    function isSafeImageSrc(u) {
        if (!u) return false;
        try {
            const parsed = new URL(u, location.href);
            const scheme = parsed.protocol; // includes ':'
            if (scheme === 'http:' || scheme === 'https:') return true;
            // allow only image data URIs (reject data:text/html, etc.)
            if (scheme === 'data:') return /^data:image\//i.test(u);
            return false;
        } catch (err) {
            return false;
        }
    }

    if (!isSafeImageSrc(src)) {
        // don't set unsafe values; fail closed
        console.warn('Blocked unsafe image src in changeActionScreenshot:', src);
        return;
    }
    
    if (mainImg.getAttribute('src') !== src) {
        mainImg.style.opacity = '0.5';
        
        setTimeout(() => {
            // safe to assign because `src` was validated above
            mainImg.src = src;
            mainImg.style.opacity = '1';
        }, 200);

        const buttons = document.querySelectorAll('.action-thumb');
        buttons.forEach(b => {
            b.classList.remove('border-honey-500', 'ring-2', 'ring-honey-500/50', 'opacity-100');
            b.classList.add('border-transparent', 'opacity-70');
        });

        btn.classList.remove('border-transparent', 'opacity-70');
        btn.classList.add('border-honey-500', 'ring-2', 'ring-honey-500/50', 'opacity-100');
    }
}
