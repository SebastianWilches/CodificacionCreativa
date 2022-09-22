// let canvas = document.querySelector("canvas");
let canvas = document.getElementById("lienzo");
let contexto = canvas.getContext("2d");


contexto.beginPath(); //Creara un nuevo espacio para un elemento grafico
contexto.rect(100, 100, 200, 200);
// contexto.stroke(); //Dibuja la figura

contexto.beginPath();
contexto.arc(200, 200, 100, 0, Math.PI * 2);
// contexto.stroke(); 

const columnas = 3;
const filas = 3;

for (let i = 0; i < columnas; i++) {
    for (let j = 0; j < filas; j++) {
        const width = 250;
        const height = 250;
        const gap = 50;
        const x = 10 + (width + gap) * i;
        const y = 10 + (height + gap) * j;
        
        
        contexto.lineWidth = 1;
        contexto.beginPath();
        contexto.rect(x, y, width, height);
        contexto.stroke();

        const radius = width/2;
        const angulo1 = 0;
        const angulo2 = Math.PI*2 //Radianes

        //El circulo solo se dibujara basado en probabilidad
        if(Math.random()<0.5){
            contexto.lineWidth = 2;
            contexto.beginPath();
            contexto.arc(x+width/2, y+height/2, radius, angulo1, angulo2);
            contexto.stroke();

        }
    }
}