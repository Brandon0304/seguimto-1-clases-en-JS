
class Producto {
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento) {
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.precioCompra = precioCompra;
    this.precioVenta = precioVenta;
    this.cantidadBodega = cantidadBodega;
    this.cantidadMinima = cantidadMinima;
    this.cantidadMaxima = cantidadMaxima;
    this.porcentajeDescuento = porcentajeDescuento;
    }

    solicitarPedido() {
    return this.cantidadBodega < this.cantidadMinima;
    }

    calcularTotalPagar(cantidad) {
      return cantidad * this.precioCompra;
    }
}

class PrendaVestir extends Producto {
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento, talla, permitePlanchado) {
    super(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento);
    this.talla = talla;
    this.permitePlanchado = permitePlanchado;
    }
}

class Calzado extends Producto {
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento, talla) {
    super(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento);
    this.talla = talla;
    }
}

//Esta es la instancia de las clases :D
const prendasVestir = [
    new PrendaVestir('C0001', 'Camisa', 20, 40, 10, 5, 20, 0, 'M', true),
    new PrendaVestir('C0002', 'Jeans', 30, 50, 8, 4, 15, 0, 'L', false)
];

const calzados = [
    new Calzado('C001', 'Tenis', 25, 45, 15, 6, 25, 0, 40),
    new Calzado('C002', 'Zapatos formales', 35, 60, 12, 5, 20, 0, 42)
];

console.log('Productos de prendas de vestir:');
for (const prenda of prendasVestir) {
    console.log(prenda);
}

console.log('\nProductos de calzado:');
for (const zapato of calzados) {
    console.log(zapato);
}
