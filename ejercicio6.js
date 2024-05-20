
class Producto {
    constructor(id, nombre, fecha, precioInicial) {
    this.id = id;
    this.nombre = nombre;
    this.fecha = fecha;
    this.precioInicial = precioInicial;
    this.ofertas = [];
    }

    registrarOferta(oferta) {
    this.ofertas.push(oferta);
    }

    obtenerOfertaGanadora() {
    if (this.ofertas.length === 0) {
        return null;
    }
    return this.ofertas.reduce((max, oferta) => (oferta.valor > max.valor ? oferta : max));
    }
}

class Oferta {
    constructor(fecha, producto, valor) {
    this.fecha = fecha;
    this.producto = producto;
    this.valor = valor;
    }
}

class Subasta {
    constructor() {
    this.productos = [];
    }

    registrarProducto(id, nombre, fecha, precioInicial) {
    const producto = new Producto(id, nombre, fecha, precioInicial);
    this.productos.push(producto);
    return producto;
    }

    realizarOferta(fecha, productoId, valor) {
    const producto = this.productos.find(producto => producto.id === productoId);
    if (producto) {
        const oferta = new Oferta(fecha, producto, valor);
        producto.registrarOferta(oferta);
        return oferta;
    } else {
        return "El producto no fue encontrado";
    }
    }

    mostrarProductosRegistrados() {
    console.log("Productos registrados en la subasta:");
    this.productos.forEach(producto => {
        console.log(`${producto.id}: ${producto.nombre} - Precio inicial: ${producto.precioInicial}`);
    });
    }

    mostrarOfertasPorProducto(productoId) {
    const producto = this.productos.find(producto => producto.id === productoId);
    if (producto) {
        console.log(`Ofertas para el producto "${producto.nombre}":`);
        producto.ofertas.forEach(oferta => {
        console.log(`Fecha: ${oferta.fecha} - Valor: ${oferta.valor}`);
        });
    } else {
        console.log("El producto no fue encontrado");
    }
    }

    seleccionarOfertaGanadora(productoId) {
    const producto = this.productos.find(producto => producto.id === productoId);
    if (producto) {
        const ofertaGanadora = producto.obtenerOfertaGanadora();
        if (ofertaGanadora) {
        console.log(`La oferta ganadora para el producto "${producto.nombre}" es de ${ofertaGanadora.valor}, realizada en la fecha ${ofertaGanadora.fecha}`);
        } else {
        console.log(`No hay ofertas para el producto "${producto.nombre}"`);
        }
    } else {
        console.log("Producto no encontrado");
    }
    }
}


//Instancia para las clases :D
const subasta = new Subasta();

const producto1 = subasta.registrarProducto(1, "Teléfono", "2024-05-21", 200);
const producto2 = subasta.registrarProducto(2, "Tablet", "2024-05-22", 300);

subasta.realizarOferta("2024-05-21", 1, 250);
subasta.realizarOferta("2024-05-22", 2, 320);
subasta.realizarOferta("2024-05-22", 1, 280);
subasta.realizarOferta("2024-05-23", 2, 500);

subasta.mostrarProductosRegistrados();
subasta.mostrarOfertasPorProducto(1);
subasta.mostrarOfertasPorProducto(2);

subasta.seleccionarOfertaGanadora(1);
subasta.seleccionarOfertaGanadora(2);
