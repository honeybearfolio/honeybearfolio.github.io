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

      // Docs mobile sidebar
      initDocsMobileSidebar();

      // Docs TOC scroll spy
      initTocScrollSpy();
  });
})();

function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

/* ── Docs mobile sidebar ── */
function initDocsMobileSidebar() {
  const toggle = document.getElementById('docs-mobile-sidebar-toggle');
  const sidebar = document.getElementById('docs-mobile-sidebar');
  const overlay = document.getElementById('docs-mobile-sidebar-overlay');
  const closeBtn = document.getElementById('docs-mobile-sidebar-close');

  if (!toggle || !sidebar) return;

  function openSidebar() {
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.add('translate-x-0');
    if (overlay) overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('translate-x-0');
    sidebar.classList.add('-translate-x-full');
    if (overlay) overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);
}

/* ── TOC scroll spy ── */
function initTocScrollSpy() {
  const tocContainer = document.querySelector('.toc-content');
  if (!tocContainer) return;

  const tocLinks = tocContainer.querySelectorAll('a');
  if (tocLinks.length === 0) return;

  // Get headings that match TOC links
  const headingIds = [];
  tocLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      headingIds.push(href.slice(1));
    }
  });

  let ticking = false;

  function updateActiveLink() {
    const scrollTop = window.scrollY;
    let activeId = '';

    for (const id of headingIds) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 100;
        if (scrollTop >= top) {
          activeId = id;
        }
      }
    }

    tocLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' + activeId) {
        link.classList.add('toc-active');
      } else {
        link.classList.remove('toc-active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial call
  updateActiveLink();
}

function changeActionScreenshot(btn, src) {
    const mainImg = document.getElementById('action-screenshot');

    // Security: parse and validate image src; only assign the parsed URL's href
    // to the DOM so we never reinterpret raw DOM text as HTML/URL.
    function parseSafeImageSrc(u) {
        if (!u || typeof u !== 'string') return null;
        try {
            const parsed = new URL(u, location.href);
            const scheme = parsed.protocol; // includes ':'
            if (scheme === 'http:' || scheme === 'https:') return parsed;
            if (scheme === 'data:' && /^data:image\//i.test(u)) return parsed;
            return null;
        } catch (err) {
            return null;
        }
    }

    const parsed = parseSafeImageSrc(src);
    if (!parsed) {
        console.warn('Blocked unsafe image src in changeActionScreenshot:', src);
        return;
    }

    // Use parsed.href (not raw DOM text) so the value written to the DOM is
    // from the URL parser, avoiding XSS from reinterpreting attribute text.
    const safeHref = parsed.href;
    if (mainImg.getAttribute('src') !== safeHref) {
        mainImg.style.opacity = '0.5';

        setTimeout(() => {
            mainImg.src = safeHref;
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
