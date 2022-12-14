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
  const numAgentes = 40;
  for (let i = 0; i < numAgentes; i++) {
    arrayAgentes.push(new Agente(random.range(1, width), random.range(1, height), random.range(-1, 1), random.range(-1, 1)));
  }


  return ({ context, width, height }) => { //Esta función es la que llama con el animate:true
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);


    //Lineas entre nodos
    for (let i = 0; i < arrayAgentes.length; i++) {
      const agente = arrayAgentes[i];

      for (let j = i+1; j < arrayAgentes.length; j++) {   //El iterar desde aqui, reduce las operaciones casi a la mitad  
        const otrosAgentes = arrayAgentes[j];

        context.lineWidth = 0.5;
        context.beginPath();
        context.moveTo(agente.posicion.x, agente.posicion.y);
        context.lineTo(otrosAgentes.posicion.x, otrosAgentes.posicion.y);
        context.stroke();


      }

    }

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
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    context.fillStyle = 'white';

    context.save();
    context.beginPath();
    context.arc(this.posicion.x, this.posicion.y, this.radio, 0, Math.PI * 2);
    context.stroke();
    context.fill();
    context.restore();
  }


}
