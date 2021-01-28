function banco(nombre, TNA, TNACliente, montoMinimo){
    this.nombre = nombre;
    this.TNA = TNA;
    this.TNACliente = TNACliente;
    this.montoMinimo = montoMinimo;
}
var bSantander = new banco("Banco Santander",35,34,5000);
var bGalicia = new banco("Banco Galicia",36,34,2000);
var bNacion = new banco("Banco Nacion",37,36,1000);
var bPatagonia = new banco("Banco Patagonia",37,34,1000);
var bProvincia = new banco("Banco Provincia",37,36,1000);
var bBBVA = new banco("Banco BBVA",39,35,5000);
function preguntaBanco(){
    alert("¿Que banco deseas seleccionar?")
    var validarBanco = parseInt(prompt("1=Nacion 2=Santander 3=Galicia 4=Patagonia 5=Provincia 6=BBVA"))
    while (validarBanco <= 0 || validarBanco > 6 || isNaN(validarBanco)){
        var validarBanco = parseInt(prompt("Valor incorrecto. 1=Nacion 2=Santander 3=Galicia 4=Patagonia 5=Provincia 6=BBVA"))
    }
    if (validarBanco == 1){
        bancoElegido = bNacion;
    } else if (validarBanco == 2){
        bancoElegido = bSantander;
    } else if (validarBanco == 3){
        bancoElegido = bGalicia;
    } else if (validarBanco == 4){
        bancoElegido = bPatagonia;
    } else if (validarBanco == 5){
        bancoElegido = bProvincia;
    } else if (validarBanco == 6){
        bancoElegido = bBBVA;
    }
    return this;
}
function preguntaCliente(){
    let validarCliente = parseInt(prompt("Sos cliente del banco? (1=Si/2=No)"));
    while (isNaN(validarCliente) || validarCliente <= 0 || validarCliente > 2){
        validarCliente = prompt("Ingrese una respuesta valida (1=Si/2=No)")
    }
    if (validarCliente == 1) {
        esCliente = true;
        console.log("La tasa nominal anual es: " + bancoElegido.TNACliente + "%");
    }   else if (validarCliente == 2){
            esCliente = false;
            console.log("La tasa nominal anual es: " + bancoElegido.TNA + "%");
    }
    return validarCliente,esCliente;
}
function datosPlazo(){
    preguntaBanco();
    console.log("Banco: " + bancoElegido.nombre);
    console.log("El monto minimo de inversion es: $" + bancoElegido.montoMinimo)
    var importe = parseInt(prompt("Ingrese un monto a calcular"));
    while (importe < bancoElegido.montoMinimo || isNaN(importe) || importe < 0){
        importe = parseInt(prompt("Ingrese un monto válido a calcular"))
    }
    var diasPlazo = parseInt(prompt("Ingrese la cantidad de dias"))
    while (diasPlazo<=0 || isNaN(diasPlazo)){
        var diasPlazo = parseInt(prompt("Ingrese una cantidad de dias correcta"))
    }
    preguntaCliente();
    if (esCliente == false) {
        var importeFinal = importe * ((bancoElegido.TNA / 365 * diasPlazo) / 100 + 1 );
    } else if (esCliente == true){
        var importeFinal = importe * ((bancoElegido.TNACliente / 365 * diasPlazo) / 100 + 1 );
    }
    console.log("El importe total es: $" + importeFinal.toFixed(2))
    var interesesGanados = importeFinal - importe;
    console.log("Los intereses ganados son: $" + interesesGanados.toFixed(2))
    return importeFinal,interesesGanados;
}
function infoUsuario() {
    var infoUsuario = []
    infoUsuario.push(prompt("Ingrese un nombre"));
    infoUsuario.push(prompt("Ingrese su apellido"));
    infoUsuario.push(prompt("Ingrese una contrasenia"));
    infoUsuario.push(prompt("¿Sos mayor de edad?"));
    let nombreUsuario = infoUsuario.slice(0,2);
    let nombreBienvenida = nombreUsuario.toString();
    let saludoUsuario = nombreBienvenida.replace(/\s+/g, '');
    console.log(saludoUsuario);
    console.log("Bienvenid@ " + saludoUsuario.trim());
}
//infoUsuario();
//datosPlazo();