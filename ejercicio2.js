class Banco{
    constructor(){
    this.cuentas={
    "123456789":{
    pin:"1234",
    saldo:1000
    },
    "987654321":{
    pin:"5678",
    saldo:2000
    }
    };
    }
    
    validarCredenciales(id,pin){
    if(this.cuentas[id]&&this.cuentas[id].pin===pin){
    return true;
    }else{
    return false;
    }
    }
    
    aprobarRetiro(idCuenta,cantidad){
    if(this.cuentas[idCuenta].saldo>=cantidad){
    this.cuentas[idCuenta].saldo-=cantidad;
    return true;
    }else{
    return false;
    }
    }
    }
    
    class CajeroAutomatico{
    constructor(banco){
    this.banco=banco;
    this.modoOperador=false;
    this.usuarioAutenticado=false;
    this.usuarioActual=null;
    }
    
    autenticarUsuario(){
    const id=prompt("Ingrese su número de documento:");
    const pin=prompt("Ingrese su PIN:");
    
    if(this.banco.validarCredenciales(id,pin)){
    alert("Autenticación exitosa.");
    this.usuarioAutenticado=true;
    this.usuarioActual=id;
    }else{
    alert("Autenticación fallida.");
    this.usuarioAutenticado=false;
    this.usuarioActual=null;
    }
    }
    
    retirar(){
    if(!this.modoOperador||!this.usuarioAutenticado){
    alert("Por favor, autentíquese primero.");
    return;
    }
    
    const cantidad=parseFloat(prompt("Ingrese la cantidad a retirar:"));
    
    if(this.banco.aprobarRetiro(this.usuarioActual,cantidad)){
    alert(`Retiro de ${cantidad} aprobado. Nuevo saldo: ${this.banco.cuentas[this.usuarioActual].saldo}`);
    }else{
    alert("No se pudo procesar el retiro. Saldo insuficiente.");
    }
    }
    
    depositar(){
    if(!this.modoOperador||!this.usuarioAutenticado){
    alert("Por favor, autentíquese primero.");
    return;
    }
    
    const destino=prompt("Ingrese el número de cuenta de destino:");
    const cantidad=parseFloat(prompt("Ingrese la cantidad a depositar:"));
    
    if(this.banco.validarCredenciales(destino,"")){
    this.banco.cuentas[destino].saldo+=cantidad;
    alert(`Depósito de ${cantidad} aprobado en la cuenta ${destino}.`);
    }else{
    alert("Número de cuenta de destino inválido.");
    }
    }
    
    transferir(){
    if(!this.modoOperador||!this.usuarioAutenticado){
    alert("Por favor, autentíquese primero.");
    return;
    }
    
    const destino=prompt("Ingrese el número de cuenta de destino:");
    const cantidad=parseFloat(prompt("Ingrese la cantidad a transferir:"));
    
    if(this.banco.validarCredenciales(destino,"")){
    if(this.banco.cuentas[this.usuarioActual].saldo>=cantidad){
    this.banco.cuentas[destino].saldo+=cantidad;
    this.banco.cuentas[this.usuarioActual].saldo-=cantidad;
    alert(`Transferencia de ${cantidad} aprobada a la cuenta ${destino}. Nuevo saldo en su cuenta: ${this.banco.cuentas[this.usuarioActual].saldo}`);
    }else{
    alert("Saldo insuficiente para realizar la transferencia.");
    }
    }else{
    alert("Número de cuenta de destino inválido.");
    }
    }
    
    verificarSaldo(){
    if(!this.modoOperador||!this.usuarioAutenticado){
    alert("Por favor, autentíquese primero.");
    return;
    }
    
    alert(`El saldo de su cuenta (${this.usuarioActual}) es $${this.banco.cuentas[this.usuarioActual].saldo}.`);
    }
    
    salir(){
    alert("Saliendo de la aplicación.");
    this.apagar();
    }
    }
    
    const banco=new Banco();
    const cajeroAutomatico=new CajeroAutomatico(banco);
    
    function autenticarUsuario(){
    cajeroAutomatico.autenticarUsuario();
    }
    
    function retirar(){
    cajeroAutomatico.retirar();
    }
    
    function depositar(){
    cajeroAutomatico.depositar();
    }
    
    function transferir(){
    cajeroAutomatico.transferir();
    }
    
    function verificarSaldo(){
    cajeroAutomatico.verificarSaldo();
    }
    
    function salir(){
    cajeroAutomatico.salir();
    }
    