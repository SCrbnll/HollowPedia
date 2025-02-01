function loadProducts() {
    fetch('../json/shop.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            if (!data || !Array.isArray(data.products)) {
                throw new Error('Formato JSON incorrecto');
            }
            renderProductList(data.products);
            setupFilters(data.products);
        })
        .catch(error => console.error(error));
}

function renderProductList(products = []) {
    const productListContainer = document.querySelector('.product-list');
    productListContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productImage = document.createElement('img');
        productImage.src = product.img;
        productImage.alt = product.name;

        const productName = document.createElement('h4');
        productName.textContent = product.name;

        const productPrice = document.createElement('span');
        productPrice.classList.add('price');
        productPrice.textContent = product.price;

        productCard.appendChild(productImage);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);

        productCard.addEventListener("click", function () {
            const modal = new bootstrap.Modal(document.getElementById("productModal"));
            modal.show();
        });

        productListContainer.appendChild(productCard);
    });
}

function setupFilters(products) {
    const filterCheckboxes = document.querySelectorAll('.filter-section input[type="checkbox"]');

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            filterCheckboxes.forEach(cb => {
                if (cb !== this) cb.checked = false;
            });

            const selectedCategory = this.checked ? this.value : null;
            filterProducts(products, selectedCategory);
        });
    });
}

function filterProducts(products = [], category) {
    if (!Array.isArray(products)) {
        console.error('Los productos no están en el formato correcto');
        return;
    }

    if (category) {
        const filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
        renderProductList(filteredProducts);
    } else {
        renderProductList(products);
    }
}

document.addEventListener('DOMContentLoaded', loadProducts);
