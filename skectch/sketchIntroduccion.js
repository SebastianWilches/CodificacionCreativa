const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1000, 1000]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const columnas = 3;
    const filas = 3;
    for (let i = 0; i < columnas; i++) {
      for (let j = 0; j < filas; j++) {
        const ancho = 250;
        const alto = 250;
        const gap = 50;
        const x = 10 + (ancho + gap) * i;
        const y = 10 + (alto + gap) * j;


        context.lineWidth = 1;
        context.beginPath();
        context.rect(x, y, ancho, alto);
        context.stroke();

        const radius = ancho / 2;
        const angulo1 = 0;
        const angulo2 = Math.PI * 2 //Radianes

        //El circulo solo se dibujara basado en probabilidad
        if (Math.random() < 0.5) {
          context.lineWidth = 2;
          context.beginPath();
          context.arc(x + ancho / 2, y + alto / 2, radius, angulo1, angulo2);
          context.stroke();

        }
      }
    }
  };
};

canvasSketch(sketch, settings);
