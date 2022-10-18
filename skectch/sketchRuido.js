const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const PARAMS = {
  Filas: 10,
  Columnas: 10,
  Frecuencia: 0.001,
  Amplitud: 0.2,
  minAnchoLinea: 1,
  maxAnchoLinea: 20,
  Animacion: true,
  Frame: 0,
  tipoLinea: 'butt',
}

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};



const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const filas = PARAMS.Filas;
    const columnas = PARAMS.Columnas;

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
        const frecuencia = PARAMS.Frecuencia;
        const amplitud = PARAMS.Amplitud;
        // const n = random.noise2D(casillaPosX + frame * 10, casillaPosY, frecuencia);

        const frameParams = PARAMS.Animacion ? frame : PARAMS.Frame //Si la animación esta activa, usara el frame del canvas, si es falso, usara el frame estatico del TweakPane

        const n = random.noise3D(casillaPosX, casillaPosY, frameParams * 10,frecuencia);
        const angulo = n * Math.PI * amplitud;
        const anchoLinea = math.mapRange(n, -1, 1, PARAMS.minAnchoLinea, PARAMS.maxAnchoLinea);



        context.lineWidth = anchoLinea;
        context.lineCap = PARAMS.tipoLinea;
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

const crearPane = () => {
  const pane = new Tweakpane.Pane();

  let folderGrid, folderRuido, folderAnimacion;

  folderGrid = pane.addFolder({
    title: 'Parámetros Grid'
  });
  folderGrid.addInput(PARAMS, 'Filas', { min: 1, max: 100, step: 1 });
  folderGrid.addInput(PARAMS, 'Columnas', { min: 1, max: 100, step: 1 });
  folderGrid.addInput(PARAMS, 'minAnchoLinea', { min: 1, max: 100});
  folderGrid.addInput(PARAMS, 'maxAnchoLinea', { min: 1, max: 100});
  
  folderRuido = pane.addFolder({
    title: 'Parámetros Ruido'
  });
  folderRuido.addInput(PARAMS, 'Frecuencia', { min: -0.001, max: 0.001});
  folderRuido.addInput(PARAMS, 'Amplitud', { min: 0, max: 1});
  
  folderAnimacion = pane.addFolder({
    title: 'Parámetros Animación'
  })
  folderAnimacion.addInput(PARAMS, 'Animacion');
  folderAnimacion.addInput(PARAMS, 'Frame', { min: 0, max: 999});
  folderAnimacion.addInput(PARAMS, 'tipoLinea', {options: {butt:'butt', round:'round', square:'square'}})

}
crearPane();


canvasSketch(sketch, settings);
