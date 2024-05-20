
class Habitacion {
    constructor(tipo, fumador) {
    this.tipo = tipo;
    this.fumador = fumador;
    this.capacidadMaxima = tipo === 'individual' ? 2 : tipo === 'doble' ? 4 : 6;
    this.mascotas = tipo === 'familiar';
    this.reservas = [];
    }

    agregarReserva(reserva) {
    if (this.reservas.length < this.capacidadMaxima) {
        this.reservas.push(reserva);
        return true;
    } else {
        return false;
    }
    }

    obtenerNumeroReservas() {
    return this.reservas.length;
    }
}

class Hotel {
    constructor() {
    this.habitaciones = {
        individual: new Habitacion('individual', false),
        doble: new Habitacion('doble', false),
        familiar: new Habitacion('familiar', false)
    };
    }

    hacerReserva(nombre, pais, tipo, fumador, mascota, personas, periodo) {
    const habitacion = this.habitaciones[tipo];
    if (habitacion) {
        if (habitacion.agregarReserva({ nombre, pais, fumador, mascota, personas, periodo })) {
        console.log(`La reserva fue realizada para ${nombre} en una habitación ${tipo}.`);
        } else {
        alert(`Lo sentimos, no hay espacio disponible en la habitación ${tipo}.`);
        }
    } else {
        alert(`Tipo de habitación inválido: ${tipo}`);
    }
    }

    obtenerEstadisticas() {
    let totalReservas = 0;
    let totalPersonas = 0;
    let totalMascotas = 0;

    for (const tipo in this.habitaciones) {
        const habitacion = this.habitaciones[tipo];
        totalReservas += habitacion.obtenerNumeroReservas();
        habitacion.reservas.forEach(reserva => {
        totalPersonas += reserva.personas;
        totalMascotas += reserva.mascota ? 1 : 0;
        });
    }

    return {
        totalReservas,
        totalPersonas,
        totalMascotas
    };
    }
}

const hotel = new Hotel();

hotel.hacerReserva('Juan', 'España', 'individual', false, false, 1, '10/05/2024 - 15/05/2024');
hotel.hacerReserva('Sebastián', 'Francia', 'doble', false, false, 2, '12/05/2024 - 16/05/2024');
hotel.hacerReserva('Pedro', 'Perú', 'familiar', false, true, 4, '11/05/2024 - 18/05/2024');
hotel.hacerReserva('Ana', 'Colombia', 'familiar', true, false, 3, '14/05/2024 - 17/05/2024');

const estadisticas = hotel.obtenerEstadisticas();
console.log('Estadísticas del hotel:\n' +
    'Total de reservas: ' + estadisticas.totalReservas + '\n' +
    'Total de personas en el hotel: ' + estadisticas.totalPersonas + '\n' +
    'Total de mascotas en el hotel: ' + estadisticas.totalMascotas);
