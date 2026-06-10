/* ============================================================
   EcoCampo — mapa.js
   ============================================================ */
if (document.getElementById('map')) {
  const map = L.map('map').setView([-25.4284, -49.2733], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  const ocorrencias = JSON.parse(localStorage.getItem('ecocampo_ocorrencias') || '[]');
  
  ocorrencias.forEach(item => {
    if (item.lat && item.lng) {
      L.marker([item.lat, item.lng])
       .addTo(map)
       .bindPopup(`<b>\${item.tipo.toUpperCase()}</b><br>\${item.descricao}<br><small>\${item.data}</small>`);
    }
  });
}
