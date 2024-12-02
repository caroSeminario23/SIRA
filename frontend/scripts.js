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

// Manejar el evento de cambio del input file para mostrar la imagen seleccionada
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