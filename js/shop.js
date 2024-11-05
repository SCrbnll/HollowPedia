function loadProducts() {
    fetch('../json/shop.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            renderProductList(data);
        })
        .catch(error => console.error(error));
}

function renderProductList(data) {
    const productListContainer = document.querySelector('.product-list');
    productListContainer.innerHTML = ''; 

    data.products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productImage = document.createElement('img');
        productImage.src = product.img;
        productImage.alt = product.name;

        const productName = document.createElement('h4');
        productName.textContent = product.name;

        const productCategory = document.createElement('p');
        productCategory.textContent = `Categoría: ${product.category}`;

        const productPrice = document.createElement('span');
        productPrice.classList.add('price');
        productPrice.textContent = product.price;

        productCard.appendChild(productImage);
        productCard.appendChild(productName);
        productCard.appendChild(productCategory);
        productCard.appendChild(productPrice);

        productListContainer.appendChild(productCard);
    });
}

document.addEventListener('DOMContentLoaded', loadProducts);
