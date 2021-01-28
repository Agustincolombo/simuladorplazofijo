var TNA = 32;
var TNACliente = 30;
var montoMinimo = 1000;
var esCliente = false;

function preguntaCliente(){
    validarCliente = prompt("Sos cliente del banco? (Si/No)");
    while (validarCliente !== "si" || validarCliente !=="no")
        validarCliente = prompt("Sos cliente del banco? (Si/No)");
    if (validarCliente == "si") {
        esCliente = true
    }   else if (validarCliente == "no"){
        esCliente = false
    }   else {
        alert("Por favor, ingrese algo válido")
    }
    return validarCliente;
}
function datosPlazo(){
    var importe = parseInt(prompt("Ingrese un monto a calcular"));
    if(importe < montoMinimo){
    alert("El monto minimo de inversion es: $" + montoMinimo);
    var importe = parseInt(prompt("Ingrese un monto VALIDO a calcular"));
    }
    var diasPlazo = parseInt(prompt("Ingrese la cantidad de dias"));
    preguntaCliente();
    if (esCliente=false) {
        var importeFinal = importe * ((TNA / 365 * diasPlazo) / 100 + 1 );
    } else if (esCliente=true){
        var importeFinal = importe * ((TNACliente / 365 * diasPlazo) / 100 + 1 );
    }
    console.log("El importe total es: " + importeFinal.toFixed(2))
    var interesesGanados = importeFinal - importe;
    console.log("Los intereses ganados son: " + interesesGanados.toFixed(2))
    return importeFinal,interesesGanados;
}
//
datosPlazo();