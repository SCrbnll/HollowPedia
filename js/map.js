const mapContainer = document.querySelector(".map-container");
const map = document.getElementById("map");
let scale = 1;
let isDragging = false;
let startX, startY, initialLeft = 0, initialTop = 0;

map.addEventListener("dragstart", function(event) {
    event.preventDefault();
});

// Función para manejar el zoom basado en la posición del ratón
mapContainer.addEventListener("wheel", function(event) {
    event.preventDefault();

    // Obtener coordenadas del cursor dentro del contenedor
    const rect = map.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    // Calcular el factor de zoom
    const zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;
    const newScale = scale * zoomFactor;

    if (newScale < 1) {
        scale = 1;
        initialLeft = 0;
        initialTop = 0;
        return; 
    }

    // Calcular el desplazamiento necesario para mantener el punto de zoom
    const deltaX = offsetX * (1 - zoomFactor);
    const deltaY = offsetY * (1 - zoomFactor);

    // Actualizar la posición y escala
    map.style.transformOrigin = "0 0"; // Definir el origen de transformación en la esquina superior izquierda
    map.style.transform = `translate(${initialLeft + deltaX}px, ${initialTop + deltaY}px) scale(${newScale})`;

    // Actualizar escala y posición inicial para el próximo zoom
    scale = newScale;
    initialLeft += deltaX;
    initialTop += deltaY;

});

mapContainer.addEventListener("mousedown", function(event) {
    if (scale > 1) {
        isDragging = true;
        startX = event.clientX - initialLeft;
        startY = event.clientY - initialTop;
        map.style.cursor = "grabbing"; 
    }
});

mapContainer.addEventListener("mousemove", function(event) {
    if (isDragging) {
        const newX = event.clientX - startX;
        const newY = event.clientY - startY;
        initialLeft = newX;
        initialTop = newY;
        map.style.transform = `translate(${initialLeft}px, ${initialTop}px) scale(${scale})`;
    }
});

mapContainer.addEventListener("mouseup", function() {
    isDragging = false;
    map.style.cursor = "grab";
});

mapContainer.addEventListener("mouseleave", function() {
    isDragging = false;
});
