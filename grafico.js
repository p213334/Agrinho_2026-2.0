/* ============================================================
   EcoCampo — grafico.js
   ============================================================ */
if (document.getElementById('chartImpacto')) {
  const ctx = document.getElementById('chartImpacto').getContext('2d');
  const ocorrencias = JSON.parse(localStorage.getItem('ecocampo_ocorrencias') || '[]');

  const contagem = { queimadas: 0, desmatamento: 0, poluicao: 0, agua: 0 };
  ocorrencias.forEach(o => { if (contagem[o.tipo] !== undefined) contagem[o.tipo]++; });

  // Valores padrão para exibição inicial caso esteja vazio
  const dados = [
    contagem.queimadas || 2,
    contagem.desmatamento || 1,
    contagem.poluicao || 1,
    contagem.agua || 3
  ];

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Queimadas', 'Desmatamento', 'Poluição', 'Recursos Hídricos'],
      datasets: [{
        data: dados,
        backgroundColor: ['#FF6B35', '#2E7D32', '#795548', '#1976D2'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}
