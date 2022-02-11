let carritoDeCompras = []

// selectores de body
const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

// selectores de modal
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');



//llamamos la funcion stock
mostrarProductos(stockProductos)


// empty vacia el contenedor
function mostrarProductos(array) {
    $('#contenedor-productos').empty();

    for (const producto of array) {

        $('#contenedor-productos').append(
            `<div class="producto">
            <div class="card"> 
            <div class="card-image">
                <img src=${producto.img}>
                <span class="card-title">${producto.nombre}</span>
                <a id="boton${producto.id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add_shopping_cart</i></a>
            </div>
            <div class="card-content">
                <p>${producto.desc}</p>
           
                <p> $${producto.precio}</p>
            </div>
            </div>
            </div>`)

        $(`#boton${producto.id}`).on('click', () => { // jquery evento
            agregarAlCarrito(producto.id) // le da a la funcion find el id del boton a agregar al carrito 
        })
    }

}

// funcion para agregar al carrito

function agregarAlCarrito(id) {
    let repetido = carritoDeCompras.find(prodR => prodR.id == id); // prod r repetivo  si id es igual a id --coincide u objetp sino false
    if (repetido) { //
        repetido.cantidad = repetido.cantidad + 1;
        $(`#cantidad${repetido.id}`).html(`cantidad: ${repetido.cantidad}`) //jquery
        actualizarCarrito()
    } else {
        let productoAgregar = stockProductos.find(prod => prod.id == id); // encuentra y devuelve el producto encontrado-- encuentra 1 devuevle 1 find prod (item dek array)

        carritoDeCompras.push(productoAgregar); // encuentra el producto entonces al producto agregar uso el push para mandarlo al carrito

        productoAgregar.cantidad = 1;
        actualizarCarrito() // jquery
        $('#carrito-contenedor').append(`<div class="productoEnCarrito">  
                        <p>${productoAgregar.nombre}</p> 
                        <p>Precio: ${productoAgregar.precio}</p>
                        <p id="cantidad${productoAgregar.id}">cantidad: ${productoAgregar.cantidad}</p> 
                      
                        <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button></div>`)

        $(`#eliminar${productoAgregar.id}`).click(function() {
            $(this).parent().remove()
            carritoDeCompras = carritoDeCompras.filter(prodE => prodE.id != productoAgregar.id) //filter prod E xq va a ser eliminado buscarlo y devolver los que no sean iguales al id
            actualizarCarrito() // actualizo la cant y el precio
        })
    }

}

// acumulador para sumar cantidad y precio l
function actualizarCarrito() {
    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad, 0); // inner text es para que el array de cero me lo cambie a 1 --reduce (metodo de array que realiza funciones matematicas) tiene un acumulador y un elemento que se van a sumar con la cantidad de stock.. 1 y se pone un valor de 0 , haciendo un bucle
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0) // nuevamente acumulador reduce para hacer el precio total -- elemneto precio x el elemnto cantidad arrancando desde cero
}