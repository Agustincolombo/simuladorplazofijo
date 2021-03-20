//Informacion de los bancos
function banco(nombre, TNA, TNACliente, montoMinimo) {
    this.nombre = nombre;
    this.TNA = TNA;
    this.TNACliente = TNACliente;
    this.montoMinimo = montoMinimo;
}
const bSantander = new banco("Banco Santander", 35, 34, 5000);
const bGalicia = new banco("Banco Galicia", 36, 34, 2000);
const bNacion = new banco("Banco Nacion", 37, 36, 1000);
const bPatagonia = new banco("Banco Patagonia", 37, 34, 1000);
const bProvincia = new banco("Banco Provincia", 37, 36, 1000);
const bBBVA = new banco("Banco BBVA", 39, 35, 5000);
//Funciones hijas
function preguntaBanco() {
    let validarBanco = document.getElementById("bancoValores").value;
    if (validarBanco == 0) {
        alert("Elija un banco")
    } else if (validarBanco == 1) {
        bancoElegido = bNacion;
    } else if (validarBanco == 2) {
        bancoElegido = bSantander;
    } else if (validarBanco == 3) {
        bancoElegido = bGalicia;
    } else if (validarBanco == 4) {
        bancoElegido = bPatagonia;
    } else if (validarBanco == 5) {
        bancoElegido = bProvincia;
    } else if (validarBanco == 6) {
        bancoElegido = bBBVA;
    }
    return bancoElegido;
}
function preguntaCliente() {
    if (document.getElementById("clienteBanco").checked) {
        esCliente = true;
    } else {
        esCliente = false;
    }
    return esCliente;
}
//Mostrar datos previos EVENTOS
function mostrarBanco(valorRes) {
    let validarBanco = document.getElementById("bancoValores").value;
    if (validarBanco == 1) {
        valorRes = bNacion;
    } else if (validarBanco == 2) {
        valorRes = bSantander;
    } else if (validarBanco == 3) {
        valorRes = bGalicia;
    } else if (validarBanco == 4) {
        valorRes = bPatagonia;
    } else if (validarBanco == 5) {
        valorRes = bProvincia;
    } else if (validarBanco == 6) {
        valorRes = bBBVA;
    } else {
        valorRes = 0
    }
    if (valorRes == 0) {
        document.getElementById('bancoRes').value = "Elija un banco";
        document.getElementById('TNARes').value = "0%"
        document.getElementById('montoMinimoRes').value = "$0";
    } else if (document.getElementById("clienteBanco").checked) {
        document.getElementById('bancoRes').value = valorRes.nombre;
        document.getElementById('TNARes').value = valorRes.TNACliente + "%";
        document.getElementById('montoMinimoRes').value = "$" + valorRes.montoMinimo
    } else {
        document.getElementById('bancoRes').value = valorRes.nombre
        document.getElementById('TNARes').value = valorRes.TNA + "%";;
        document.getElementById('montoMinimoRes').value = "$" + valorRes.montoMinimo
    }
}
function valorSlideDias(diasPlazo) {
    document.getElementById('nroPlazoDias').value = diasPlazo + " dias";
}
function otroDia() {
    if (document.getElementById("fechaPlazo").checked) {
        document.getElementById("numeroPlazo").disabled = false;
    } else {
        document.getElementById("numeroPlazo").disabled = true
    }
}
window.onload = valorSlideDias(90);
// Historial de simulaciones
var listHist = document.getElementById('listaHistorial');
var counter = 0
const historial = [];
function elementoHistorial() {
    historial.push(
        [crearSpan(bancoElegido.nombre),
        crearSpan(importe),
        crearSpan(diasPlazo),
        crearSpan(interesesRes.toFixed(2)),
        crearSpan(importeFinal.toFixed(2))
        ]);
    let listaNueva = document.createElement('li');
    listaNueva.classList.add("mdc-list-item");
    listHist.append(listaNueva);
    function crearSpan(text) {
        let nuevoSpan = document.createElement('span');
        nuevoSpan.classList.add("mdc-list-item__text", "col-md-auto");
        nuevoSpan.textContent = text;
        return nuevoSpan
    }
    historial[counter].forEach(function (nuevoSpan) {
        listaNueva.appendChild(nuevoSpan);
    });
    historial.shift();
}
//Funcion padre
var importeFinal;
var diasPlazo;
var importe;
var interesesRes;
function datosPlazo() {
    preguntaBanco();
    let importeCorrecto = false;
    let diasCorrecto = false;
    importe = document.getElementById("importeCalculo").value;
    if (importe < bancoElegido.montoMinimo || importe < 0) {
        alert("Ingrese un monto válido a calcular");
    } else {
        importeCorrecto = true;
    }
    if (document.getElementById("fechaPlazo").checked && document.getElementById("numeroPlazo").value > 180) {
        document.getElementById("numeroPlazo").disabled = false;
        diasPlazo = document.getElementById("numeroPlazo").value;
        diasCorrecto = true;
    } else if (document.getElementById("fechaPlazo").checked === false && document.getElementById("plazoDias").value > 0) {
        document.getElementById("numeroPlazo").disabled = true;
        diasPlazo = document.getElementById("plazoDias").value;
        diasCorrecto = true;
    } else {
        alert("Ingrese un plazo de dias valido");
    }
    preguntaCliente();
    if (esCliente) {
        importeFinal = importe * ((bancoElegido.TNACliente / 365 * diasPlazo) / 100 + 1);
    } else {
        importeFinal = importe * ((bancoElegido.TNA / 365 * diasPlazo) / 100 + 1);
    }
    interesesRes = importeFinal - importe;
    function interesesResultado(intereses) {
        intereses = interesesRes;
        document.getElementById('InteresesRes').value = intereses.toFixed(2);
    }
    function diasResultado(dias) {
        dias = diasPlazo;
        document.getElementById('diasRes').value = dias;
    }
    function importeResultado(importe) {
        importe = importeFinal
        document.getElementById("importeRes").value = importe.toFixed(2);
    }
    if (importeCorrecto && diasCorrecto) {
        elementoHistorial()
    };
    return interesesResultado(), diasResultado(), importeResultado();
}
$(function () {
    $('[data-toggle="popover"]').popover({
        trigger: "hover"
    })
})
//Login
function validarUsuario() {
    ;
    var todoCorrecto = true;
    let formulario = document.formularioContacto;
    for (var i = 0; i < formulario.length; i++) {
        if (formulario[i].type == 'text' || formulario[i].type == "password") {
            if (formulario[i].value == null || formulario[i].value.length == 0 || /^\s*$/.test(formulario[i].value)) {
                alert(formulario[i].name + ' no puede estar vacío o contener sólo espacios en blanco');
                todoCorrecto = false;
            }
        }
    }
    if (todoCorrecto == true) {
        $("#registrarUsuario").click(function () {
            $('#exampleModal').modal('hide'),
                $("#formRegistro")[0].reset();
        })
        registroUsuario()
    }
}
function registroUsuario() {
    console.log("Se guardo el usuario")
    function Usuario(nickname, contrasenia) {
        this.nickname = nickname;
        this.contrasenia = contrasenia;
    }
    let Usuario1 = new Usuario(
        document.getElementById("nickname").value,
        document.getElementById("password").value,
    )
    localStorage.setItem("usuario", Usuario1.nickname);
    localStorage.setItem("contrasenia", Usuario1.contrasenia);
}
function iniciarUsuario() {
    let botonLogout = document.createElement('BUTTON');
    botonLogout.innerHTML = "Log-Out";
    botonLogout.classList.add('btn', 'btn-dark',
        'btn-outline-light', 'my-2', 'my-sm-0', 'botonLogout');
    if (localStorage["usuario"] === document.getElementById("nicknameLogin").value && localStorage["contrasenia"] === document.getElementById("passwordLogin").value) {
        $('#form-login').remove(),
            $('.form-inline').append(
                '<span>' + 'Bienvenid@ ' + localStorage["usuario"] + '</span'
            ),
            $('.form-inline').append(botonLogout);
    } else {
        alert("USUARIO NO REGISTRADO")
    }
}
var buttonLogin = document.getElementById("log-in");
buttonLogin.addEventListener("click", iniciarUsuario);
var buttonCalcular = document.getElementById("enviarPresupuesto");
buttonCalcular.addEventListener("click", (e) => {
    e.preventDefault();
    datosPlazo();
});
var buttonRegistro = document.getElementById("registrarUsuario");
buttonRegistro.addEventListener("click", validarUsuario);
// Cotizacion dolar API
var apiNoCargada = true;
$("#buttonDolar").click(function () {
    $.get("https://www.dolarsi.com/api/api.php?type=valoresprincipales",
        function (data) {
            if (apiNoCargada) {
                for (let x = 0; x < 2; x++) {
                    $("#resultadoDolar").append(
                        '<ul>' +
                        '<span>' + data[x].casa.nombre + '</span>' +
                        '<li>' + 'Compra: ' + data[x].casa.compra + '</li>' +
                        '<li>' + 'Venta: ' + data[x].casa.venta + '</li>' + '</ul>'
                    )
                };
                apiNoCargada = false;
            }
        })
})