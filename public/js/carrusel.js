const API_URL = "http://localhost:3000/api/libros";

const track = document.getElementById("carouselLibros");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let libros = [];
let index = 0;
const itemsPorVista = 3; // SOLO 3 EN PANTALLA

async function cargarLibros() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        libros = data.libros || [];

        renderLibros();
        actualizarMovimiento();

    } catch (error) {
        console.error("Error cargando libros:", error);
    }
}

function renderLibros() {
    track.innerHTML = "";

    libros.forEach(libro => {
        const card = document.createElement("div");
        card.classList.add("card-libro");

        card.innerHTML = `
            <img src="${libro.portada}" alt="${libro.titulo}">
            <h4>${libro.titulo}</h4>
            <p>${libro.autor}</p>
            <p>${libro.año}</p>
        `;

        track.appendChild(card);
    });
}

function actualizarMovimiento() {
    const anchoItem = track.children[0].offsetWidth + 25; // 25px gap
    track.style.transform = `translateX(-${index * anchoItem}px)`;
}

// Botón Next
nextBtn.addEventListener("click", () => {
    if (index < libros.length - itemsPorVista) {
        index++;
        actualizarMovimiento();
    }
});

// Botón Previous
prevBtn.addEventListener("click", () => {
    if (index > 0) {
        index--;
        actualizarMovimiento();
    }
});

cargarLibros();
document.getElementById("btnGeneral").addEventListener("click", () => {
    window.location.href = "general.html"; 
});
const formAgregar = document.getElementById("formAgregarLibro");
const modalAgregarLibro = new bootstrap.Modal(document.getElementById("modalAgregarLibro"));

formAgregar.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(formAgregar);

    const libro = {
        titulo: formData.get("titulo"),
        autor: formData.get("autor"),
        categoria: formData.get("categoria"),
        año: Number(formData.get("año")),
        portada: formData.get("portada")
    };

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(libro)
        });

        const data = await res.json();

        if (res.ok) {
            alert("Libro agregado correctamente ✔️");

            // Cerrar modal
            modalAgregarLibro.hide();

            // Limpiar formulario
            formAgregar.reset();

            // Recargar lista sin recargar página
            contenedor.innerHTML = "";
            inicio = 0;
            cargarLibros();

        } else {
            alert("Error: " + data.mensaje);
        }

    } catch (err) {
        console.error("Error creando libro:", err);
        alert("No se pudo crear el libro");
    }
});
document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.querySelector(".fila-libros");

  try {
    const res = await fetch("http://localhost:3000/api/libros");
    const data = await res.json();

    const lista = data.libros || [];

    contenedor.innerHTML = "";

    lista.forEach(libro => {
      const card = `
        <div class="tarjeta-libro">
          <img src="${libro.portada}" alt="${libro.titulo}">
          <h4>${libro.titulo}</h4>
          <p>${libro.autor}</p>
        </div>
      `;
      contenedor.innerHTML += card;
    });

  } catch (error) {
    console.log("Error cargando libros:", error);
  }
});

