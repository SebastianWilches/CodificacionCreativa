const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const filas = 10;
    const columnas = 10;

    const gridWidth = width * 0.8;
    const gridHeight = height * 0.8;

    const marginGridWidth = (width - gridWidth) / 2;
    const marginGridHeight = (height - gridHeight) / 2;

    const casillaTamañoX = gridWidth / columnas;
    const casillaTamañoY = gridHeight / filas;

    for (let i = 0; i < columnas; i++) {
      for (let j = 0; j < filas; j++) {


        let casillaPosX = casillaTamañoX * i;
        let casillaPosY = casillaTamañoY * j;

        //Ruido
        const frecuencia = 0.001
        const amplitud = 0.2
        const n = random.noise2D(casillaPosX + frame*10, casillaPosY, frecuencia, 1);
        const angulo = n * Math.PI*0.2;
        const anchoLinea = math.mapRange(n, -1, 1, 1, 20);
        


        context.lineWidth = anchoLinea;
        context.save();

        context.beginPath();
        context.translate(casillaPosX, casillaPosY);
        context.translate(marginGridWidth, marginGridHeight); //Haga el desplazamiento de acuerdo a la margen
        context.translate(casillaTamañoX * 0.5, casillaTamañoY * 0.5); //Haga el desplazamiento a la mitad de la casilla
        context.rotate(angulo);
        context.moveTo(casillaTamañoX * -0.4, 0); //Arista izquierda de la casilla
        context.lineTo(casillaTamañoX * 0.4, 0);  //Arista derecha de la casilla
        context.stroke();

        context.restore();


      }


    }

  };
};

canvasSketch(sketch, settings);
