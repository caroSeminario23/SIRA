// lista de reproduccion 1 - plástico
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.bloque5-boton1-recuadro');
    if (button) {
      button.addEventListener('click', () => {
        window.open('https://youtube.com/playlist?list=PLDje3QcKQLjVoEPhtcBt2xhlMI1-rTkqZ&si=rdk1ahvYL5lp-S70', '_blank');
      });
    }
});

// lista de reproduccion 2 - papel y cartón
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.bloque5-boton2-recuadro');
    if (button) {
      button.addEventListener('click', () => {
        window.open('https://youtube.com/playlist?list=PLDje3QcKQLjWXCyg38-rlQLyrzw37hS4n&si=SPjt6IlhUUs0Ffm6', '_blank');
      });
    }
});

// lista de reproduccion 3 - vidrio
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.bloque5-boton3-recuadro');
    if (button) {
      button.addEventListener('click', () => {
        window.open('https://youtube.com/playlist?list=PLDje3QcKQLjV_a3OUJQW0EpxT-b9kb0ce&si=7UuSj4t_x_HJqjbX', '_blank');
      });
    }
});

// lista de reproduccion 4 - metal
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.bloque5-boton4-recuadro');
    if (button) {
      button.addEventListener('click', () => {
        window.open('https://youtube.com/playlist?list=PLDje3QcKQLjV6PUDAlVdmGZWVx-5bQfI9&si=N9T1wgAgT3_dyncD', '_blank');
      });
    }
});

// Cargar una imagen
document.querySelector('.subrecuadro4-boton1-recuadro').addEventListener('click', function() {
  document.getElementById('fileInput').click();
});

// Mostrar la imagen seleccionada
document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.alt = 'Imagen cargada';
      img.style.maxWidth = '100%';
      img.style.maxHeight = '100%';
      img.style.objectFit = 'contain';
      document.querySelector('.bloque3-imagen-recuadro').innerHTML = '';
      document.querySelector('.bloque3-imagen-recuadro').appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});

// Enviar la imagen al backend
/*document.querySelector('.subrecuadro4-boton2-recuadro').addEventListener('click', function() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://127.0.0.1:5000/procesar_imagen2', {
      method: 'POST',
      body: formData
    })
    .then(response => response.blob())
    .then(blob => {
      console.log("Imagen recibida del backend");
      const url = URL.createObjectURL(blob);
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Imagen procesada';
      img.style.maxWidth = '100%';
      img.style.maxHeight = '100%';
      img.style.objectFit = 'contain';
      document.querySelector('.bloque3-imagen-recuadro').innerHTML = '';
      document.querySelector('.bloque3-imagen-recuadro').appendChild(img);
    })
    .catch(error => console.error('Error:', error));
  }
});*/

document.querySelector('.subrecuadro4-boton2-recuadro').addEventListener('click', function() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://127.0.0.1:5000/procesamiento', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      const label = response.headers.get('X-Predicted-Label');
      // Imprimir la etiqueta predicha
      console.log("Etiqueta predicha:", label);
      return response.blob().then(blob => ({ blob, label }));
    })
    .then(({ blob, label }) => {
      console.log("Respuesta del backend:", label);
      const url = URL.createObjectURL(blob);
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Imagen procesada';
      img.style.maxWidth = '100%';
      img.style.maxHeight = '100%';
      img.style.objectFit = 'contain';
      document.querySelector('.bloque3-imagen-recuadro').innerHTML = '';
      document.querySelector('.bloque3-imagen-recuadro').appendChild(img);
      updateBloque5(label);
    })
    .catch(error => console.error('Error:', error));
  }
});

// Función para actualizar el contenido de bloque5
/*function updateBloque5(label) {
  const recomendaciones = document.getElementById('dinamico');
  let content = '';

  if (label === 'Metal') {
    content = `
      <div class="bloque5-tarjeta4">
        <div class="bloque5-tarjeta4-imagen"></div>
        <div class="bloque5-tarjeta4-contenido">
          <div class="bloque5-tarjeta4-texto">
            <span class="bloque5-subtitulo4">Metal</span>
            <span class="bloque5-contenido4">Hemos creado esta lista de reproducción de Yotube para ti.
              Esperamos que te inspire a crear un nuevo producto. Cuidar el
              planeta está también en nuestras manos.
            </span>
          </div>
          <div class="bloque5-boton4">
            <button class="bloque5-boton4-recuadro">
              <div class="video-48"><div class="bloque5-icono-boton4"></div></div>
              <span class="bloque5-boton4-texto">Ver lista de reproducción</span>
            </button>
          </div>
        </div>
      </div>
    `;
  } else if (label === 'Papel o carton') {
    content = `
      <div class="bloque5-tarjeta2">
        <div class="bloque5-tarjeta2-imagen"></div>
        <div class="bloque5-tarjeta2-contenido">
          <div class="bloque5-tarjeta2-texto">
            <span class="bloque5-subtitulo2">Papel o carton</span>
            <span class="bloque5-contenido2">Hemos creado esta lista de reproducción de Yotube para ti.
              Esperamos que te inspire a crear un nuevo producto. Cuidar el
              planeta está también en nuestras manos.
            </span>
          </div>
          <div class="bloque5-boton2">
            <button class="bloque5-boton2-recuadro">
              <div class="video-48"><div class="bloque5-icono-boton2"></div></div>
              <span class="bloque5-boton2-texto">Ver lista de reproducción</span>
            </button>
          </div>
        </div>
      </div>
    `;
  } else if (label === 'Plastico') {
    content = `
      <div class="bloque5-tarjeta1">
        <div class="bloque5-tarjeta1-imagen"></div>
        <div class="bloque5-tarjeta1-contenido">
          <div class="bloque5-tarjeta1-texto">
            <span class="bloque5-subtitulo1">Plastico</span>
            <span class="bloque5-contenido1">Hemos creado esta lista de reproducción de Yotube para ti.
              Esperamos que te inspire a crear un nuevo producto. Cuidar el
              planeta está también en nuestras manos.
            </span>
          </div>
          <div class="bloque5-boton1">
            <button class="bloque5-boton1-recuadro">
              <div class="video-48"><div class="bloque5-icono-boton1"></div></div>
              <span class="bloque5-boton1-texto">Ver lista de reproducción</span>
            </button>
          </div>
        </div>
      </div>
    `;
  } else if (label === 'Vidrio') {
    content = `
      <div class="bloque5-tarjeta3">
        <div class="bloque5-tarjeta3-imagen"></div>
        <div class="bloque5-tarjeta3-contenido">
          <div class="bloque5-tarjeta3-texto">
            <span class="bloque5-subtitulo3">Vidrio</span>
            <span class="bloque5-contenido3">Hemos creado esta lista de reproducción de Yotube para ti.
              Esperamos que te inspire a crear un nuevo producto. Cuidar el
              planeta está también en nuestras manos.
            </span>
          </div>
          <div class="bloque5-boton3">
            <button class="bloque5-boton3-recuadro">
              <div class="video-48"><div class="bloque5-icono-boton3"></div></div>
              <span class="bloque5-boton3-texto">Ver lista de reproducción</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  recomendaciones.innerHTML = content;
}*/

// Función para actualizar el contenido de bloque5
function updateBloque5(label) {
  const recomendaciones = document.getElementById('dinamico');
  const tarjetas = recomendaciones.querySelectorAll('[data-label]');

  /*tarjetas.forEach(tarjeta => {
    if (tarjeta.getAttribute('data-label') === label) {
      tarjeta.style.display = 'block'; // Mostrar la tarjeta correspondiente
    } else {
      tarjeta.style.display = 'none'; // Ocultar las demás tarjetas
    }
  });*/
  tarjetas.forEach(tarjeta => {
    if (tarjeta.getAttribute('data-label') === label) {
      tarjeta.classList.add('visible');
      tarjeta.classList.remove('oculto');
    } else {
      tarjeta.classList.add('oculto');
      tarjeta.classList.remove('visible');
    }
  });
}