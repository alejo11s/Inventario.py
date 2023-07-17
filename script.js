document.addEventListener('DOMContentLoaded', function() {
  const videoEscaner = document.getElementById('video-escaner');
  const botonEscanear = document.getElementById('boton-escanear');

  botonEscanear.addEventListener('click', function() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
          videoEscaner.srcObject = stream;
          // Configurar la biblioteca Instascan y comenzar a escanear
          const scanner = new Instascan.Scanner({ video: videoEscaner });
          scanner.addListener('scan', function(content) {
            alert('Código QR detectado: ' + content);
          });
          Instascan.Camera.getCameras()
            .then(function(cameras) {
              if (cameras.length > 0) {
                scanner.start(cameras[0]);
              } else {
                alert('No se encontraron cámaras en el dispositivo.');
              }
            });
        })
        .catch(function(error) {
          console.error('Error al acceder a la cámara: ', error);
        });
    } else {
      alert('La cámara no está disponible en este navegador.');
    }
  });
});
