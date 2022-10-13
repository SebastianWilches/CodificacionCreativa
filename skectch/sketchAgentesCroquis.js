const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const agente1 = new Agente(100, 100);

    agente1.dibujar(context);

    
  };
};

canvasSketch(sketch, settings);

class Punto {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agente {
  constructor(x, y) {
    this.pos = new Punto(x, y);
    this.radio = 10;
  }

  dibujar(context) {
    context.fillStyle = 'black';
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radio, 0, Math.PI * 2);
    context.stroke();
  }


}
