// Carga de productos.
menuInicio('home')

// Métodos. ----

// Vistas.
function menuInicio(origen) {

    if (origen == 'home') {
        let paginaHome = document.getElementById("homePage")
        paginaHome.classList.remove("ocultarElemento")
        cargarCategorias()
        cargarProductosDestacados()
        cargarOferta()
        cargarTestimonios()
    }
    
    if (origen == 'page') {
        let paginaHome = document.getElementById("homePage")
        paginaHome.classList.remove("ocultarElemento")
        let paginaProductos = document.getElementById("productosPage")
        paginaProductos.classList.add("ocultarElemento")
        let paginaCarro = document.getElementById("carroPage")
        paginaCarro.classList.add("ocultarElemento")
        cargarCategorias()
        cargarProductosDestacados()
        cargarOferta()
        cargarTestimonios()
    }
    
}

function menuProductos() {

    let paginaHome = document.getElementById("homePage")
    paginaHome.classList.add("ocultarElemento")
    let paginaProductos = document.getElementById("productosPage")
    paginaProductos.classList.remove("ocultarElemento")
    let paginaCarro = document.getElementById("carroPage")
    paginaCarro.classList.add("ocultarElemento")
    
    cargarSelectCategorias()
    cargarProductos()
}

function menuCarro() {

    let paginaHome = document.getElementById("homePage")
    paginaHome.classList.add("ocultarElemento")
    let paginaProductos = document.getElementById("productosPage")
    paginaProductos.classList.add("ocultarElemento")
    let paginaCarro = document.getElementById("carroPage")
    paginaCarro.classList.remove("ocultarElemento")
    cargarCarro()

}


// Carga de data.
async function cargarCategorias() {

    let divCategorias = document.getElementById("categorias")
    divCategorias.innerHTML = " "

    let htmlCategorias = document.createElement("div")
    htmlCategorias.innerHTML = `<div class="small-container">
        <h2 class="title">Categorías principales</h2>
        <div class="row" id="filaCategorias">
        </div>
        </div>`
    divCategorias.append(htmlCategorias)

    let filaCategorias = document.getElementById("filaCategorias")
    let respuesta = await fetch('./data/categorias.json')
    let datos = await respuesta.json()

    for (const c of datos) {
        let cat = document.createElement("div")
        cat.innerHTML = `<div class="col-5" onclick="menuCategoria('${c.nombre}')">
            <img src="${c.enlaceIMG}" alt="Monitores">
            <a href="#"><h4>${c.nombre}</h4></a>
            </div>`
        filaCategorias.append(cat)
    }

}

async function cargarProductosDestacados() {

    let divProdDestacados = document.getElementById("prodDestacados")
    divProdDestacados.innerHTML = " "

    let htmlProdDestacados = document.createElement("div")
    htmlProdDestacados.innerHTML = `<h2 class="title">Productos destacados</h2>
        <div class="row" id="filaProdDestacados">
        </div>`
    divProdDestacados.append(htmlProdDestacados)

    let filaProdDestacados = document.getElementById("filaProdDestacados")
    let respuesta = await fetch('./data/productos.json')
    let datos = await respuesta.json()

    for (const p of datos) {
        if (p.destacado == true) {
            let prod = document.createElement("div")
            prod.className = "col-4"
            prod.innerHTML = `<a href="#"><img src="${p.enlaceIMG}" class="prodDestacado"></a>
                <a href="#"><h4>${p.nombre}</h4></a>
                <div class="rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <p>$${p.precio}</p>`
            filaProdDestacados.append(prod)
        }
    }

}

async function cargarOferta() {

    let divOferta = document.getElementById("oferta")
    divOferta.innerHTML = " "

    let htmlOferta = document.createElement("div")
    htmlOferta.innerHTML = `<div class="small-container">
        <div class="row" id="filaOferta">
        </div>
        </div>`
    divOferta.append(htmlOferta)

    let filaOferta = document.getElementById("filaOferta")
    let respuesta = await fetch('./data/ofertas.json')
    let datos = await respuesta.json()

    for (const o of datos) {
        filaOferta.innerHTML = `<div class="col-2">
            <img src="${o.enlaceIMG}" alt="Producto Exclusivo" class="imgOferta">
            </div>
            <div class="col-2">
                <p>Disponible exclusivamente en ConspiX Store</p>
                <h1>${o.nombre}</h1>
                <small>${o.descripcion}</small>
                <br>
                <a href="#" onclick="menuProductos()" class="btn">Comprar ahora &#8594;</a>
            </div>`
    }

}

async function cargarTestimonios() {

    let divTestimonios = document.getElementById("testimonios")
    divTestimonios.innerHTML = " "

    let htmlTestimonios = document.createElement("div")
    htmlTestimonios.innerHTML = `<div class="small-container">
        <div class="row" id="filaTestimonios">
        </div>
        </div>`
        divTestimonios.append(htmlTestimonios)

    let filaTestimonios = document.getElementById("filaTestimonios")
    let respuesta = await fetch('./data/testimonios.json')
    let datos = await respuesta.json()

    for (const t of datos) {
        let test = document.createElement("div")
        test.className = "col-3"
        test.innerHTML = `
            <i class="fas fa-quote-left"></i>
            <p>${t.comentarios}</p>
            <div class="rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
            <img src="${t.enlaceIMG}" alt="Imagen cliente">
            <h3>${t.nombre}</h3>`
            filaTestimonios.append(test)
    }
}

async function cargarSelectCategorias() {

    let divContenedorProductos = document.getElementById("contenedorProductos")
    divContenedorProductos.innerHTML = " "

    let htmlDivCategorias = document.createElement("div")
    htmlDivCategorias.innerHTML = `<div class="row row-2">
        <h2>Todos los productos</h2>
        <select id="selectCat" onchange="filtrarProductos()">
        </select>
        </div>`
    divContenedorProductos.append(htmlDivCategorias)

    let selectCat = document.getElementById("selectCat")
    let respuesta = await fetch('./data/categorias.json')
    let datos = await respuesta.json()

    let cat = document.createElement("option")
        cat.innerHTML = `<option value="QuitarFiltros">Sin filtros</option>`
        selectCat.append(cat)

    for (const c of datos) {
        let cat = document.createElement("option")
        cat.innerHTML = `<option onclick="filtrarProductos(${c.nombre})" value="${c.nombre}">${c.nombre}</option>`
        selectCat.append(cat)
    }

}

async function cargarProductos(productos) {

    let htmlProductos = document.createElement("div")
    htmlProductos.innerHTML = `<div class="row" id="filaProductos"></div>`

    let divContenedorProductos = document.getElementById("contenedorProductos")
    divContenedorProductos.append(htmlProductos)

    if (productos != null) {
        productos = productos
    } else {
        let respuesta = await fetch('./data/productos.json')
        productos = await respuesta.json()
    }


    let filaProductos = document.getElementById("filaProductos")
    filaProductos.innerHTML = ""

    for (const p of productos) {
        let prod = document.createElement("div")
        prod.className = "col-4"
        prod.innerHTML = `<div class="col-4">
            <img src="${p.enlaceIMG}" alt="" />
            <h4>${p.nombre}</h4>
            <div class="rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
            <p>$${p.precio}</p>
            <a href="javascript:void(0)" onclick="agregarCarrito(${p.id})" class="btn">Añadir al carro</a>
            </div>`
        filaProductos.append(prod)
    }

}

async function cargarCarro() {
    
    let divContenedorCarro = document.getElementById("contenedorCarro")
    divContenedorCarro.innerHTML = " "

    let htmlCarro = document.createElement("div")
    htmlCarro.innerHTML = `<table id="tablaCarro"><tr><th>Producto</th><th>Cantidad</th><th>Subtotal</th>
        </tr><tr id="msjCarroVacio"><td>No existen productos en el carro.</td></tr></table><div class="total-price" id="tablaDetallesCarro">
        <table><tr><td>Subtotal</td><td>$0</td></tr><tr><td>Impuestos</td><td>$0</td></tr><tr><td>Total</td><td>$0</td>
        </tr></table></div>`

    divContenedorCarro.append(htmlCarro)
    actualizarCarrito()

}

function actualizarCarrito() {

	// Limpiar carrito actual.
	let tablaCarro = document.getElementById("tablaCarro")
	let tablaDetallesCarro = document.getElementById("tablaDetallesCarro")

	if (localStorage.getItem("carritoCompra") != null) {
						
		// Insertar productos en carrito.
		let carritoExistente = JSON.parse(localStorage.getItem("carritoCompra"))

        tablaCarro.innerHTML = ""
        let filaTitulos = document.createElement("tr")
        filaTitulos.innerHTML = `<th>Producto</th><th>Cantidad</th><th>Subtotal</th>`
        tablaCarro.append(filaTitulos)
						
		for (const prod of carritoExistente) {
			let filaProducto = document.createElement("tr")
			filaProducto.innerHTML = `<td>
            <div class="cart-info">
              <img src="${prod.enlaceIMG}"/>
              <div>
                <p>${prod.nombre}</p>
                <small>Precio $${prod.precio}</small>
                <br />
                <a href="javascript:void(0)" onclick="eliminarProdCarrito(${prod.id})">Remover</a>
              </div>
            </div>
          </td>
          <td><p>${prod.cantidad}</p></td>
          <td>$${prod.total}</td>`

			tablaCarro.append(filaProducto)
		}

		// Cargar detalles carrito.
		let valorCarrito = parseInt(JSON.parse(localStorage.getItem("valorTotal")))
		let valorImpuestos = parseInt(valorCarrito * 0.19)
		let total = valorCarrito + valorImpuestos

        tablaDetallesCarro.innerHTML = " "

		let detallesCarrito = document.createElement("table")
		detallesCarrito.innerHTML = `
        <tr><td>Subtotal</td><td>$${valorCarrito}</td></tr><tr><td>Impuestos</td><td>$${valorImpuestos}</td></tr><tr><td>Total</td><td>$${total}</td>
        </tr><br><br><a href="javascript: void(0);" onclick="finalizarCompra()" class="btn">Finalizar compra</a>`

		tablaDetallesCarro.append(detallesCarrito)

	} else {

        tablaCarro.innerHTML = ""
        let filaTitulos = document.createElement("tr")
        filaTitulos.innerHTML = `<th>Producto</th><th>Cantidad</th><th>Subtotal</th>`
        tablaCarro.append(filaTitulos)

        let msjCarroVacio = document.createElement("tr")
        msjCarroVacio.id = "msjCarroVacio"
        msjCarroVacio.innerHTML = `<td>No existen productos en el carro.</td>`
        tablaCarro.append(msjCarroVacio)

        tablaDetallesCarro.innerHTML = " "

    }
}

async function agregarCarrito(id) {

    
	// Obtener producto.
    let requestProd = await fetch('./data/productos.json')
    let productos = await requestProd.json()
    let producto = productos.find(p => p.id === id)

	// Si carrito no existe.
	if (localStorage.getItem("carritoCompra") === null) {

		let valorTotal = producto["precio"]
		producto["cantidad"] = 1
		producto["total"] = producto["precio"]

		let productosCarrito = [producto]
		let productosCarritoJSON = JSON.stringify(productosCarrito)

		localStorage.setItem("carritoCompra", productosCarritoJSON)
		localStorage.setItem("valorTotal", valorTotal)

	} else {

		// Si carrito ya existe.
		let productosCarrito = []
		let existenciaProducto = false
		let carritoExistente = JSON.parse(localStorage.getItem("carritoCompra"))
		let valorCarritoExiste = JSON.parse(localStorage.getItem("valorTotal"))
		let valorTotal = parseInt(valorCarritoExiste)

		for (const prod of carritoExistente) {
				
			// Si el producto ya existía se incrementa cantidad en 1.
			if (prod.id == id) {
				existenciaProducto = true
				valorTotal += prod["precio"]
				prod["total"] += prod["precio"]
				prod["cantidad"] += 1
			}

			productosCarrito.push(prod)

		}

		// Si el producto no existía se añade.
		if (!existenciaProducto) {
			producto["cantidad"] = 1
			productosCarrito.push(producto)
			producto["total"] = producto["precio"]
			valorTotal += producto["total"]
		}

		productosCarritoJSON = JSON.stringify(productosCarrito)
		localStorage.setItem("carritoCompra", productosCarritoJSON)
		localStorage.setItem("valorTotal", valorTotal)
	}

	desplegarAlerta("¡Producto agregado al carro de compra!")
}

function eliminarProdCarrito(id) {

	let productosCarrito = []
	let carritoExistente = JSON.parse(localStorage.getItem("carritoCompra"))
	let valorCarritoExiste = JSON.parse(localStorage.getItem("valorTotal"))
	let valorTotal = parseInt(valorCarritoExiste)

	for (const prod of carritoExistente) {
			
		if (prod.id != id) {
			productosCarrito.push(prod)

		} else {

			valorTotal -= prod["precio"]
			prod["total"] -= prod["precio"]
			let nuevaCantidad = prod["cantidad"] - 1
			
			if (nuevaCantidad > 0) {
				prod["cantidad"] -= 1
				productosCarrito.push(prod)
			}

		}
	}

	productosCarritoJSON = JSON.stringify(productosCarrito)

    if (valorTotal == 0) {
        localStorage.clear()
    } else {
        localStorage.setItem("carritoCompra", productosCarritoJSON)
        localStorage.setItem("valorTotal", valorTotal)
    }

	desplegarAlerta("¡Producto eliminado del carrito!")
	actualizarCarrito()
}

function desplegarAlerta(textoAlerta) {
	Toastify({
		text: textoAlerta,
		duration: 3000,
        gravity: "bottom",
		style: {
			background: '#198754'
		}
	}).showToast();
}

async function filtrarProductos() {

    let selectCat = document.getElementById("selectCat")
    let filtro = selectCat.options[selectCat.selectedIndex].value

    switch (true) {
		case filtro == "Monitores":
            respuesta = await fetch('./data/productos.json')
            productos = await respuesta.json()
			prodFiltrados = productos.filter(prod => prod.categoria == "monitores")
			break;

		case filtro == "Accesorios":
            respuesta = await fetch('./data/productos.json')
            productos = await respuesta.json()
			prodFiltrados = productos.filter(prod => prod.categoria == "accesorios")
			break;

		case filtro == "Diseño":
            respuesta = await fetch('./data/productos.json')
            productos = await respuesta.json()
			prodFiltrados = productos.filter(prod => prod.categoria == "diseño")
			break;

		case filtro == "Conectividad":
            respuesta = await fetch('./data/productos.json')
            productos = await respuesta.json()
			prodFiltrados = productos.filter(prod => prod.categoria == "conectividad")
			break;

		case filtro == "Audio":
            respuesta = await fetch('./data/productos.json')
            productos = await respuesta.json()
			prodFiltrados = productos.filter(prod => prod.categoria == "audio")
			break;

		case filtro == "Sin filtros":
            respuesta = await fetch('./data/productos.json')
            productos = await respuesta.json()
			prodFiltrados = productos
			break;

	}

    cargarProductos(prodFiltrados)

}

function finalizarCompra() {
	
	localStorage.clear()
	actualizarCarrito()

	Toastify({
		text: "Compra finalizada.",
		duration: 3000,
        gravity: "bottom",
		style: {
			background: '#DC3545'
		}
	}).showToast();
}