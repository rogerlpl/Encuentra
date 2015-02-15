function aleatorio(minimo, maximo)
{
    var numero = Math.floor( Math.random() * (maximo - minimo + 1) + minimo );
    numero= numero *20;
    return numero;
}
var cronometro;
function reiniciarCronometro()
{
	melissa.x=0;
    melissa.y=0;
    liz.x = aleatorio(1,23);
    liz.y= aleatorio(1,23);
	clearInterval(cronometro);
}
function empezarCronometro()
{
	 contador_segundos=30;
	 contador_minutos=1;

	 minutos = document.getElementById("minutos");
	 segundos = document.getElementById("segundos");

	cronometro = setInterval(
		function(){
			if(contador_segundos==0)
			{
				contador_segundos=59;
				contador_minutos--;
				
			}

			if(contador_minutos==0 && contador_segundos==1)
			{
				contador_minutos=1;
				contador_segundos=0;
				reiniciarCronometro();
				alert("No has podido encontrar a Liz a tiempo!");
			}
			minutos.innerHTML = contador_minutos;
			segundos.innerHTML = contador_segundos;
			contador_segundos--;
		}
		,1000);
}
var tablero;
var teclas =
{
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};
var fondo = {
    imagenURL: "images/fondo.png",
    imagenOK: false
};
var melissa = {
    frenteOK: false,
    atrasOK: false,
    derOK: false,
    izqOK: false,
    velocidad: 20,
    x: 0,
    y: 0
};
var liz = {
    imagenOK: false,
    x: aleatorio(1,23),
    y:  aleatorio(1,23)
};
function inicio()
{

    var canvas = document.getElementById("campo");
    tablero = canvas.getContext("2d");

    fondo.imagen = new Image();
    fondo.imagen.src = fondo.imagenURL;
    fondo.imagen.onload = confirmarFondo;

    melissa.frente = new Image();
    melissa.frente.src = "images/diana-frente.png";
    melissa.frente.onload = confirmarFrente;

    melissa.atras = new Image();
    melissa.atras.src = "images/diana-atras.png";
    melissa.atras.onload = confirmarAtras;

    melissa.izq = new Image();
    melissa.izq.src = "images/diana-izq.png";
    melissa.izq.onload = confirmarIzq;

    melissa.der = new Image();
    melissa.der.src = "images/diana-der.png";
    melissa.der.onload = confirmarDer;

    liz.imagen = new Image();
    liz.imagen.src = "images/liz.png";
    liz.imagen.onload = confirmarLiz;

    console.log(liz.x);
  	console.log(liz.y);
  	

    document.addEventListener("keydown", teclado);
    empezarCronometro();

}
function teclado(evento)
{
    var codigo = evento.keyCode;
    if(codigo == teclas.UP)
    {
    	
    	melissa.y -= melissa.velocidad;
    	if(melissa.y<0 || (melissa.y == 200 && melissa.x >160 && melissa.x < 240)  || (melissa.y== 200 && melissa.x <= 120) || (melissa.y== 340 && melissa.x >= 120))
    	{
        melissa.y += melissa.velocidad;
    	}
    }
    if(codigo == teclas.DOWN)
    {
    	 
        melissa.y += melissa.velocidad;
        if( (melissa.y==320 && melissa.x>120)|| melissa.y>450 || (melissa.y == 160  && melissa.x <= 120))
        {
            melissa.y -= melissa.velocidad;
        }
    }
    if(codigo == teclas.LEFT)
    {
    	
    	melissa.x -= melissa.velocidad;
    	if(melissa.x<0 || (melissa.x == 220 && melissa.y <=200) ||( melissa.y >= 160  && melissa.y <= 200 ) && (melissa.x <= 130) )
    	{
    		melissa.x += melissa.velocidad;
    	}
        
    }
    if(codigo == teclas.RIGHT)
    {
    	
    	melissa.x += melissa.velocidad;
    	if(melissa.x>460 || melissa.y <= 200 && melissa.x == 180 ||( melissa.y >= 320  && melissa.y <= 340 ) && (melissa.x == 140) )
    	{
        melissa.x -= melissa.velocidad;
    	}
    }
    dibujar(codigo);
}
function confirmarFondo()
{
    fondo.imagenOK = true;
    dibujar();
}

function confirmarFrente()
{
    melissa.frenteOK = true;
    dibujar();
}
function confirmarAtras()
{
    melissa.atrasOK = true;
    dibujar();
}
function confirmarIzq()
{
    melissa.izqOK = true;
    dibujar();
}
function confirmarDer()
{
    melissa.derOK = true;
    dibujar();
}

function confirmarLiz()
{
    liz.imagenOK = true;
    dibujar();
}

function dibujar(direccion)
{

    if(fondo.imagenOK)
    {
        tablero.drawImage(fondo.imagen, 0, 0);    
    }

    var melissaOrientada = melissa.frente;

    if(melissa.frenteOK && melissa.atrasOK && melissa.derOK && melissa.izqOK)
    {
        if(direccion == teclas.DOWN || direccion == undefined)
        {
            melissaOrientada = melissa.frente;
        }
        else if(direccion == teclas.UP)
        {
            melissaOrientada = melissa.atras;
        }
        else if(direccion == teclas.LEFT)
        {
            melissaOrientada = melissa.izq;
        }
        else if(direccion == teclas.RIGHT)
        {
            melissaOrientada = melissa.der;
        }
    }
    tablero.drawImage(melissaOrientada, melissa.x, melissa.y);

    if( (melissa.x+20 ==liz.x  && melissa.y+20 ==liz.y ) && liz.imagenOK)
    {
        tablero.drawImage(liz.imagen, liz.x, liz.y);
        alert("Haz encontrado a liz :D!");
        empezarCronometro();
        reiniciarCronometro();

    }
}
