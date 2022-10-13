const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080]
};

const gradosARadianes = (grados) => {
  return grados * (Math.PI / 180);
}

const intervaloAleatorio = (min, max) => {
  return Math.random() * (max - min) + min;
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);


    //eje x
    context.beginPath();
    context.moveTo(width / 2, 0);
    context.lineTo(width / 2, height);
    // context.stroke();

    //eje y
    context.beginPath();
    context.moveTo(0, height / 2);
    context.lineTo(width, height / 2);
    // context.stroke();

    //Centro del canvas
    const x = width * 0.5;
    const y = height * 0.5;


    //Lineas de beizer
    // const numBeizer = 100;
    // for (let i = 0; i < numBeizer; i++) {

    //   context.save();
    //   context.beginPath();
    //   context.lineWidth = 2;
    //   context.strokeStyle = "gray";
    //   context.translate(x, y);
    //   context.moveTo(0, 0);
    //   context.quadraticCurveTo(random.range(-width, width),random.range(-height, height) ,random.range(-width, width), random.range(-height, height));
    //   context.stroke();
    //   context.restore();

    // }

    //Cuadrado
    const wCuadrado = width * 0.6;
    const hCuadrado = height * 0.6;
    context.fillStyle = 'black';

    //Transformaciones
    //Cuadrado
    context.save();
    context.translate(x, y); //Centramos el eje en el centro del canvas
    context.rotate(gradosARadianes(45));
    context.beginPath();
    context.rect(-wCuadrado / 2, -hCuadrado / 2, wCuadrado, hCuadrado);
    context.fill();
    context.restore();


    //Reloj
    const horas = 12;
    const wReloj = width * 0.03;
    const hReloj = height * 0.15;
    context.fillStyle = 'white';

    for (let i = 0; i < horas; i++) {
      const angulo = gradosARadianes(360 / horas * i);
      const radio = width * 0.2;

      let circuloX = x + Math.sin(angulo) * radio;
      let circuloY = y + Math.cos(angulo) * radio;

      context.save();
      context.translate(circuloX, circuloY);
      context.rotate(-angulo);
      context.beginPath();
      context.rect(-wReloj / 2, -hReloj / 2, wReloj, hReloj);
      context.fill();
      context.restore();


      //Circunferencias
      const radio2 = width * 0.5;

      context.save();
      // context.translate(x, y);
      context.translate(circuloX, circuloY);
      context.rotate(-angulo);
      context.arc(0, 0, radio2, 0, math.degToRad(360));
      context.stroke();
      context.restore();
    }


    //Circunferencia blanca
    context.save();
    context.beginPath();
    context.lineWidth = 15;
    context.translate(x, y);
    // context.arc(0, 0, width * 0.1, math.degToRad(0), math.degToRad(360));
    context.strokeStyle = "white";
    context.stroke();
    context.restore();





  };
};

canvasSketch(sketch, settings);
