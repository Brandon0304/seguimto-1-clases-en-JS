
class Usuario {
    constructor(tipousuario) {
        this._tipousuario = tipousuario;
    }
}

class TerminalTelefonica {
    constructor() {
        this._usuarios = [];
    }

    atenderUsuario(usuario) {
        this._usuarios.push(usuario);
    }

    transferirUsuario(usuario) {
        return {
            modulo: "Oficina",
            usuario: usuario,
        };
    }

    obtenerEstadisticas() {
        return {
            modulo: "Terminal",
            usuariosatendidos: this._usuarios.length,
            tipodeusuario: this._usuarios.reduce((acc, usuario) => {
                acc[usuario._tipousuario] = (acc[usuario._tipousuario] || 0) + 1;
                return acc;
            }, {})
        };
    }
}

class Oficina {
    constructor() {
        this.usuarios = [];
    }

    usuariosAtendidos(usuario) {
        this.usuarios.push(usuario);
    }

    transferenciaRecibida(usuario) {
        this.usuarios.push(usuario);
    }

    obtenerEstadisticas() {
        return {
            modulo: "Oficina",
            usuariosatendidos: this.usuarios.length,
            tipodeusuario: this.usuarios.reduce((acc, usuario) => {
                acc[usuario._tipousuario] = (acc[usuario._tipousuario] || 0) + 1;
                return acc;
            }, {})
        };
    }
}

class Estadisticas {
    constructor() {
        this.terminalTelefonica = new TerminalTelefonica();
        this.oficina = new Oficina();
    }

    usuariosAtendidos(usuario) {
        this.terminalTelefonica.atenderUsuario(usuario);
    }

    transferirUsuario(usuario) {
        const transferir = this.terminalTelefonica.transferirUsuario(usuario);
        this.oficina.transferenciaRecibida(transferir.usuario);
        return transferir;
    }

    obtenerEstadisticas() {
        return {
            totalusuariosatendidos: this.terminalTelefonica._usuarios.length + this.oficina.usuarios.length,
            estadisticaspormodulo: [this.terminalTelefonica.obtenerEstadisticas(), this.oficina.obtenerEstadisticas()]
        };
    }
}

const estadisticas = new Estadisticas();

estadisticas.usuariosAtendidos(new Usuario("Estudiante"));
estadisticas.usuariosAtendidos(new Usuario("Docente"));

estadisticas.transferirUsuario(new Usuario("Estudiante"));

estadisticas.oficina.usuariosAtendidos(new Usuario("Estudiante"));
estadisticas.oficina.usuariosAtendidos(new Usuario("Docente"));

const estadisticasFinales = estadisticas.obtenerEstadisticas();
console.log(JSON.stringify(estadisticasFinales, null, 2));