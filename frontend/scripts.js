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
function updateBloque5(label) {
  const recomendaciones = document.getElementById('dinamico');
  const tarjetas = recomendaciones.querySelectorAll('[data-label]');

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