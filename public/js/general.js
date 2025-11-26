const API_URL = "http://localhost:3000/api/libros";

let libros = [];
let inicio = 0;
const cantidad = 3;

const contenedor = document.getElementById("listaLibros");
const btnCargarMas = document.getElementById("btnCargarMas");

/* ===================== CARGAR LIBROS ===================== */
async function cargarLibros() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        libros = data.libros || [];

        mostrarMasLibros();
    } catch (error) {
        console.error("Error al cargar:", error);
    }
}

function mostrarMasLibros() {
    const fin = inicio + cantidad;
    const lote = libros.slice(inicio, fin);

    lote.forEach(libro => {
        const col = document.createElement("div");
        col.classList.add("col-12", "col-sm-6", "col-md-4");

        col.innerHTML = `
    <div class="card-libro" data-id="${libro._id}">
        <img src="${libro.portada}" alt="${libro.titulo}">
        <h4>${libro.titulo}</h4>
        <p>${libro.autor}</p>
        <p>${libro.año}</p>
    </div>
`;


        contenedor.appendChild(col);
    });

    inicio = fin;

    if (inicio >= libros.length) {
        btnCargarMas.style.display = "none";
    }
}

btnCargarMas.addEventListener("click", mostrarMasLibros);

cargarLibros();

/* ===================== GUARDAR LIBRO ===================== */
document.getElementById("formAgregarLibro").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevoLibro = {
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        categoria: document.getElementById("categoria").value,
        año: Number(document.getElementById("anio").value),
        portada: document.getElementById("portada").value,
    };

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoLibro)
        });

        const data = await res.json();
        console.log("Guardado:", data);

        // Cerrar modal correctamente
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalAgregarLibro'));
        modal.hide();

        location.reload();

    } catch (err) {
        console.error("Error al guardar libro", err);
    }
});
document.addEventListener("click", async (e) => {
    const card = e.target.closest(".card-libro");
    if (!card) return;

    const id = card.dataset.id;

    try {
        const res = await fetch(`${API_URL}/${id}`);
        const data = await res.json();
        const libro = data.libro;

        // Rellenar el modal
        document.getElementById("detallePortada").src = libro.portada;
        document.getElementById("detalleTitulo").textContent = libro.titulo;
        document.getElementById("detalleAutor").textContent = libro.autor;
        document.getElementById("detalleCategoria").textContent = libro.categoria;
        document.getElementById("detalleAño").textContent = libro.año;

        // Guardar ID global para editar / borrar
        window.libroActual = libro._id;

        // Abrir modal
        const modal = new bootstrap.Modal(document.getElementById("modalDetalleLibro"));
        modal.show();

    } catch (err) {
        console.error("Error cargando detalles", err);
    }
});
document.getElementById("btnEliminarLibro").addEventListener("click", async () => {
    if (!confirm("¿Seguro que deseas eliminar este libro?")) return;

    try {
        await fetch(`${API_URL}/${window.libroActual}`, {
            method: "DELETE"
        });

        location.reload();
    } catch (err) {
        console.error("Error al eliminar", err);
    }
});
document.getElementById("btnEditarLibro").addEventListener("click", async () => {

    const id = window.libroActual;

    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    const libro = data.libro;

    // Rellenar modal agregar
    document.getElementById("titulo").value = libro.titulo;
    document.getElementById("autor").value = libro.autor;
    document.getElementById("categoria").value = libro.categoria;
    document.getElementById("anio").value = libro.año;
    document.getElementById("portada").value = libro.portada;

    // Activar modo editar
    window.modoEditar = true;
    window.editId = id;

    // Cerrar modal de detalles antes de abrir el de editar
    const modalDetalle = bootstrap.Modal.getInstance(document.getElementById("modalDetalleLibro"));
    modalDetalle.hide();

    // Abrir modal agregar
    const modalEditar = new bootstrap.Modal(document.getElementById("modalAgregarLibro"));
    modalEditar.show();
});


document.getElementById("formAgregarLibro").addEventListener("submit", async (e) => {
    e.preventDefault();

    const libro = {
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        categoria: document.getElementById("categoria").value,
        año: Number(document.getElementById("anio").value),
        portada: document.getElementById("portada").value,
    };

    let url = API_URL;
    let method = "POST";

    if (window.modoEditar === true) {
        url = `${API_URL}/${window.editId}`;
        method = "PUT";
    }

    try {
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(libro)
        });

        await res.json();

        // Reset
        window.modoEditar = false;
        window.editId = null;

        // Recargar lista
        location.reload();

    } catch (err) {
        console.error("Error en guardar/editar:", err);
    }
});

document.querySelector("#inputBuscar").addEventListener("input", async (e) => {
    const texto = e.target.value.trim();

    const res = await fetch(`${API_URL}?buscar=${texto}`);
    const data = await res.json();

    libros = data.libros;
    contenedor.innerHTML = "";
    inicio = 0;
    btnCargarMas.style.display = "block";
    mostrarMasLibros();
});
// --- Elementos del buscador ---
const formBuscador = document.getElementById("formBuscador");
const inputBuscar = document.getElementById("inputBuscar");

// --- Evento para buscar ---
formBuscador.addEventListener("submit", async (e) => {
    e.preventDefault(); // evita que recargue la página

    const texto = inputBuscar.value.trim();

    // Llamar al backend con el texto
    cargarLibros(texto);
});