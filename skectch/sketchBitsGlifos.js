const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

//Variables globales
const texto = 'Ø';
const fontFamily = 'Arial';
const fontSize = 1000;


const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);


    //Config. del texto
    context.fillStyle = 'black';
    context.font = `${fontSize}px ${fontFamily}`;
    context.textBaseline = "top";

    //Metricas
    const metricas = context.measureText(texto);
    console.log(metricas); //Podemos inspeccionar toda la información que nos brinda estas metricas

    //Sacamos la información de cual es el tamaño del texto
    const metricaX = metricas.actualBoundingBoxLeft * -1;
    const metricaY = metricas.actualBoundingBoxAscent * -1;
    const metricaWidth = metricas.actualBoundingBoxLeft + metricas.actualBoundingBoxRight;
    const metricaHeight = metricas.actualBoundingBoxAscent + metricas.actualBoundingBoxDescent;

    
    //Ahora podemos centrar perfectamente el texto calculando las siguientes coordenadas
    const x = (width - metricaWidth) * 0.5 - metricaX;
    const y = (height - metricaHeight) * 0.5 - metricaY;
    
    

    context.save();
    context.translate(x, y);
    context.strokeRect(metricaX, metricaY, metricaWidth, metricaHeight);
    context.fillText(texto, 0, 0);
    context.restore();
  };


};

canvasSketch(sketch, settings);
