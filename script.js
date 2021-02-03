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
function preguntaBanco(){
    let validarBanco = document.getElementById("bancoElegido").value;
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
    return bancoElegido;
}
function preguntaCliente(){
    if (document.getElementById("clienteBanco").checked) {
        esCliente = true;
        console.log("La tasa nominal anual es: " + bancoElegido.TNACliente + "%");
    }   else{
            esCliente = false;
            console.log("La tasa nominal anual es: " + bancoElegido.TNA + "%");
    }
    return esCliente;
}
function datosPlazo(){
    preguntaBanco();
    console.log("Banco: " + bancoElegido.nombre);
    console.log("El monto minimo de inversion es: $" + bancoElegido.montoMinimo)
    let importe = document.getElementById("importeCalculo").value;
    while (importe < bancoElegido.montoMinimo || importe < 0){
        alert("Ingrese un monto válido a calcular")
        break
    }
    let diasPlazo = document.getElementById("plazoDias").value;
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
    function Usuario (nickname,contrasenia){
        this.nickname = nickname;
        this.contrasenia = contrasenia;
    }
    let admin = new Usuario("Administrador",12345);
    let Usuario1 = new Usuario(
        document.getElementById("nickname").value,
        document.getElementById("password").value,
        )
    //let Usuario1_registrado = JSON.parse(Usuario1);
    //localStorage.setItem(Usuario1_registrado);
    let nombreBienvenida = Usuario1.nickname;
    let saludoUsuario = nombreBienvenida.replace(/\s+/g, '');
    if (Usuario1.nickname == admin.nickname && Usuario1.contrasenia == admin.contrasenia){
        console.log("Bienvenid@ " + saludoUsuario.trim());
    }
        else{
            console.log("Para usar todos los beneficios registrese");
        }
    return infoUsuario;
}
var buttonLogin = document.getElementById("log-in");
buttonLogin.addEventListener("click", infoUsuario);
var buttonCalcular = document.getElementById("enviarPresupuesto");
buttonCalcular.addEventListener("click", datosPlazo);
//infoUsuario();