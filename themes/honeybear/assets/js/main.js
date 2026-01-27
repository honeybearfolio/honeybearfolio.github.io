// Initialize dark mode on page load
(function() {
  const theme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (theme === 'dark' || (!theme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();

function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function changeActionScreenshot(btn, src) {
    const mainImg = document.getElementById('action-screenshot');
    
    if (mainImg.getAttribute('src') !== src) {
        mainImg.style.opacity = '0.5';
        
        setTimeout(() => {
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
