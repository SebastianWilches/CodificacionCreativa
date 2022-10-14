const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

// const animate = () => {
//   console.log('ACTUALIZO');
//   requestAnimationFrame(animate); //Aqui le pasamos la función que queremos que llame cada vez que el navegador pueda
// }
// animate();

const sketch = ({ context, width, height }) => {
  const arrayAgentes = [];

  //Creación random de un conjunto de agentes (Puntos)
  for (let i = 0; i < 150; i++) {
    arrayAgentes.push(new Agente(random.range(1, width), random.range(1, height), random.range(-1, 1), random.range(-1, 1)));
  }


  return ({ context, width, height }) => { //Esta función es la que llama con el animate:true
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);


    arrayAgentes.forEach(agente => {
      agente.actualizar();
      agente.dibujar(context);
      agente.rebotar(width, height);
    });



  };
};

canvasSketch(sketch, settings);

class Punto {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Vector { //Vector de velocidad
  constructor(vx, vy) {
    this.vx = vx;
    this.vy = vy;
  }
}

class Agente {
  constructor(x, y, vx, vy) {
    this.posicion = new Punto(x, y);
    this.velocidad = new Vector(vx, vy)
    this.radio = random.range(5, 20);
  }

  actualizar() {
    this.posicion.x += this.velocidad.vx;
    this.posicion.y += this.velocidad.vy;
  }

  rebotar(width, height) {
    if (this.posicion.x <= 0 || this.posicion.x >= width) {
      this.velocidad.vx *= -1; //Invertimos su velocidad
    }
    if (this.posicion.y <= 0 || this.posicion.y >= height) {
      this.velocidad.vy *= -1; //Invertimos su velocidad
    }
  }

  dibujar(context) {
    context.fillStyle = 'black';
    context.lineWidth = 3;

    context.save();
    context.beginPath();
    context.arc(this.posicion.x, this.posicion.y, this.radio, 0, Math.PI * 2);
    context.stroke();
    context.restore();
  }


}
