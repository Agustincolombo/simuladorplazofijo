//Informacion de los bancos
function banco(nombre, TNA, TNACliente, montoMinimo){
    this.nombre = nombre;
    this.TNA = TNA;
    this.TNACliente = TNACliente;
    this.montoMinimo = montoMinimo;
}
const bSantander = new banco("Banco Santander",35,34,5000);
const bGalicia = new banco("Banco Galicia",36,34,2000);
const bNacion = new banco("Banco Nacion",37,36,1000);
const bPatagonia = new banco("Banco Patagonia",37,34,1000);
const bProvincia = new banco("Banco Provincia",37,36,1000);
const bBBVA = new banco("Banco BBVA",39,35,5000);
//Funciones hijas
function preguntaBanco(){
    let validarBanco = document.getElementById("bancoValores").value;
    if (validarBanco == 0){
        alert("Elija un banco")
    } else if (validarBanco == 1){
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
    return bancoElegido;
}
function preguntaCliente(){
    if (document.getElementById("clienteBanco").checked) {
        esCliente = true;
    }   else{
            esCliente = false;
    }
    return esCliente;
}
//Mostrar datos previos EVENTOS
function mostrarBanco(valorRes){
    let validarBanco = document.getElementById("bancoValores").value;
    if (validarBanco == 1){
        valorRes = bNacion;
        }   else if (validarBanco == 2){
            valorRes = bSantander;
        }   else if (validarBanco == 3){
            valorRes = bGalicia;
        }   else if (validarBanco == 4){
            valorRes = bPatagonia;
        }   else if (validarBanco == 5){
            valorRes = bProvincia;
        }   else if (validarBanco == 6){
            valorRes = bBBVA;
        }   else{
            valorRes = 0
    }
    if (valorRes == 0){
        document.getElementById('bancoRes').value="Elija un banco";
        document.getElementById('TNARes').value="0%"
        document.getElementById('montoMinimoRes').value="$0";
        } else if (document.getElementById("clienteBanco").checked){
            document.getElementById('bancoRes').value=valorRes.nombre;
            document.getElementById('TNARes').value=valorRes.TNACliente + "%";
            document.getElementById('montoMinimoRes').value= "$" + valorRes.montoMinimo
        } else{
            document.getElementById('bancoRes').value=valorRes.nombre 
            document.getElementById('TNARes').value=valorRes.TNA + "%";;
            document.getElementById('montoMinimoRes').value="$" + valorRes.montoMinimo
        }
}
function valorSlideDias(diasPlazo) {
    document.getElementById('nroPlazoDias').value=diasPlazo + " dias";
}
function otroDia(){
    if (document.getElementById("fechaPlazo").checked){
        document.getElementById("numeroPlazo").disabled = false;
    }   else{
        document.getElementById("numeroPlazo").disabled = true
        }
}
//Funcion padre
function datosPlazo(){
    preguntaBanco();
    let importe = document.getElementById("importeCalculo").value;
    while (importe < bancoElegido.montoMinimo || importe < 0){
        alert("Ingrese un monto válido a calcular")
        break
    }
    if (document.getElementById("fechaPlazo").checked){
        document.getElementById("numeroPlazo").disabled = false;
        var diasPlazo = document.getElementById("numeroPlazo").value;
    } else {
        document.getElementById("numeroPlazo").disabled = true
        var diasPlazo = document.getElementById("plazoDias").value
    }
    preguntaCliente();
    if (esCliente){
        var importeFinal = importe * ((bancoElegido.TNACliente / 365 * diasPlazo) / 100 + 1 );
    } else {
        var importeFinal = importe * ((bancoElegido.TNA / 365 * diasPlazo) / 100 + 1 );
    }
    function interesesResultado(intereses) {
        intereses = importeFinal-importe;
        document.getElementById('InteresesRes').value=intereses.toFixed(2);
    }
    function diasResultado(dias){
        dias=diasPlazo;
        document.getElementById('diasRes').value=dias;
    }
    function importeResultado(importe){
        importe = importeFinal 
        document.getElementById("importeRes").value=importe.toFixed(2);
    }
    return interesesResultado(),diasResultado(),importeResultado();
}
$(function () {
    $('[data-toggle="popover"]').popover({
        trigger: "hover"
    })
})
//Login
function validarUsuario(){;
    var todoCorrecto = true;
    var formulario = document.formularioContacto;
    for (var i=0; i<formulario.length; i++) {
        if(formulario[i].type =='text' || formulario[i].type == "password") {
                if (formulario[i].value == null || formulario[i].value.length == 0 || /^\s*$/.test(formulario[i].value)){
                    alert (formulario[i].name+ ' no puede estar vacío o contener sólo espacios en blanco');
                    todoCorrecto=false;
                }
        }
    }
    if (todoCorrecto == true) {
        $("#registrarUsuario").click(function(){
            $('#exampleModal').modal('hide'),
            $("#formRegistro")[0].reset();
        })
        registroUsuario()
    }
}
function registroUsuario() {
    console.log("Se guardo el usuario")
    function Usuario (nickname,contrasenia){
        this.nickname = nickname;
        this.contrasenia = contrasenia;
    }
    let Usuario1 = new Usuario(
        document.getElementById("nickname").value,
        document.getElementById("password").value,
        )
    localStorage.setItem("usuario",Usuario1.nickname);
    localStorage.setItem("contrasenia",Usuario1.contrasenia);
    let nombreBienvenida = Usuario1.nickname;
    let saludoUsuario = nombreBienvenida.replace(/\s+/g, '');
}
function iniciarUsuario(){
    if (localStorage["usuario"] === document.getElementById("nicknameLogin").value && localStorage["contrasenia"] === document.getElementById("passwordLogin").value){
        console.log("Se aprobo al usuario")
        } else{
            console.log("USUARIO NO REGISTRADO")
    }
}
var buttonLogin = document.getElementById("log-in");
buttonLogin.addEventListener("click", iniciarUsuario);
var buttonCalcular = document.getElementById("enviarPresupuesto");
buttonCalcular.addEventListener("click", datosPlazo);
var buttonRegistro = document.getElementById("registrarUsuario");
buttonRegistro.addEventListener("click", validarUsuario);