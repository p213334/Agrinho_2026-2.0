/* ============================================================
   EcoCampo — app.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLoading();
  initFormHandler();
});

function initTheme() {
  const themeBtn = document.getElementById('themeBtn');
  if (!themeBtn) return;

  const savedTheme = localStorage.getItem('ecocampo-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ecocampo-theme', newTheme);
    themeBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
}

function initLoading() {
  const loader = document.getElementById('loading-screen');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('fade-out');
    }, 600);
  }
}

function initFormHandler() {
  const form = document.getElementById('formDenuncia');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const novaDenuncia = {
      id: Date.now(),
      autor: document.getElementById('autor').value,
      tipo: document.getElementById('tipo').value,
      descricao: document.getElementById('descricao').value,
      data: new Date().toLocaleDateString('pt-BR'),
      lat: -25.42 + (Math.random() - 0.5) * 0.1,
      lng: -49.27 + (Math.random() - 0.5) * 0.1
    };

    const DB_KEY = 'ecocampo_ocorrencias';
    const localAtual = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
    localAtual.push(novaDenuncia);
    localStorage.setItem(DB_KEY, JSON.stringify(localAtual));

    showToast('✅ Ocorrência guardada com sucesso!');
    form.reset();
    
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  });
}

function showToast(mensagem) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.textContent = mensagem;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
