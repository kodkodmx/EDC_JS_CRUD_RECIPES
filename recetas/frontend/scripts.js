document.addEventListener('DOMContentLoaded', () => {
  fetch('https://gloomy-cemetery-7q9wwvx6jg6cgqv-3000.app.github.dev/recetas')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const container = document.getElementById('recetas-container');
      data.forEach(receta => {
        const div = document.createElement('div');
        div.className = 'receta';
        if (receta.es_favorita) {
          div.classList.add('favorita');
        }
        const haVotado = localStorage.getItem(`votado_${receta.id}`) === 'true';
        div.innerHTML = `
          <h2>${receta.nombre}</h2>
          <p>${receta.descripcion}</p>
          <button onclick="toggleFavorita(${receta.id}, ${receta.es_favorita})">
            ${receta.es_favorita ? 'Quitar de Favorita' : 'Marcar como Favorita'}
          </button>
          <button onclick="votar(${receta.id})" ${haVotado ? 'disabled' : ''}>${haVotado ? 'Ya Votado' : 'Votar'}</button>
          <p>Votos: ${receta.votos}</p>
        `;
        container.appendChild(div);
      });
    })
    .catch(error => console.error('Error:', error));

  // Manejar el envío del formulario para agregar nuevas recetas
  document.getElementById('nueva-receta-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;

    fetch('https://gloomy-cemetery-7q9wwvx6jg6cgqv-3000.app.github.dev/recetas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, descripcion })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Recargar la página para mostrar la nueva receta
      location.reload();
    })
    .catch(error => console.error('Error:', error));
  });
});

function toggleFavorita(id, esFavorita) {
  fetch(`https://gloomy-cemetery-7q9wwvx6jg6cgqv-3000.app.github.dev/recetas/${id}/favorita`, { method: 'PUT' })
    .then(() => location.reload())
    .catch(error => console.error('Error:', error));
}

function votar(id) {
  fetch(`https://gloomy-cemetery-7q9wwvx6jg6cgqv-3000.app.github.dev/recetas/${id}/votar`, { method: 'PUT' })
    .then(() => {
      localStorage.setItem(`votado_${id}`, 'true');
      location.reload();
    })
    .catch(error => console.error('Error:', error));
}