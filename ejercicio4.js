

class Cliente {
    constructor(nombre, tipo, tieneCuenta) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.tieneCuenta = tieneCuenta;
    }
}


class Caja {
    constructor(numero, tipoAtencion) {
    this.numero = numero;
    this.tipoAtencion = tipoAtencion;
    this.cliente = null;
    }
}

class Banco {
    constructor() {
    this.cajas = [
        new Caja(1, 'retiro'),
        new Caja(2, 'retiro'),
        new Caja(3, 'deposito'),
        new Caja(4, 'deposito'),
        new Caja(5, 'asesoria')
    ];
    this.clientesEspera = [];
    }

    asignarTurno(cliente) {
    if (cliente.tipo === 'presencial') {
        this.clientesEspera.unshift(cliente);
    } else {
        this.clientesEspera.push(cliente);
    }
    }

    atenderClientes() {
    for (const cliente of this.clientesEspera) {
        let cajaDisponible = null;
        if (cliente.tipo === 'presencial') {
        cajaDisponible = this.cajas.find(caja => !caja.cliente && caja.numero !== 5);
        } else {
        cajaDisponible = this.cajas.find(caja => !caja.cliente);
        }
        if (cajaDisponible) {
        cajaDisponible.cliente = cliente;
        console.log(`Caja ${cajaDisponible.numero} atiende a ${cliente.nombre}`);
        } else {
        console.log(`No hay cajas disponibles, ${cliente.nombre} debe esperar.`);
        }
    }
    for (const caja of this.cajas) {
        caja.cliente = null;
    }
    this.clientesEspera = [];
    }
}

const banco = new Banco();

banco.asignarTurno(new Cliente('Juan', 'presencial', true));
banco.asignarTurno(new Cliente('María', 'general', false));
banco.asignarTurno(new Cliente('Pedro', 'presencial', false));
banco.asignarTurno(new Cliente('Ana', 'general', true));
banco.asignarTurno(new Cliente('Luis', 'presencial', false));

banco.atenderClientes();
