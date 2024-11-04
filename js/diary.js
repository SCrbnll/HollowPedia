function loadEntities() {
    fetch('../json/diary.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            renderEntityList(data);
        })
        .catch(error => console.error(error));
}

function renderEntityList(data) {
    const entityListContainer = document.querySelector('.entity-scroll');
    entityListContainer.innerHTML = ''; 

    data.entities.forEach(entity => {
        const entityItem = document.createElement('div');
        entityItem.classList.add('entity-item');
        entityItem.dataset.id = entity.id; 

        const entityIcon = document.createElement('img');
        entityIcon.src = entity.icon;
        entityIcon.alt = entity.name;
        const entityName = document.createElement('p');
        entityName.textContent = entity.name;

        entityItem.appendChild(entityIcon);
        entityItem.appendChild(entityName);

        entityItem.addEventListener('click', () => {
            setActiveEntity(entityItem);
            displayEntityDetails(entity); 
        });

        entityListContainer.appendChild(entityItem);
    });
}

function setActiveEntity(selectedItem) {
    const allItems = document.querySelectorAll('.entity-item');
    allItems.forEach(item => item.classList.remove('active'));

    selectedItem.classList.add('active');
}

function displayEntityDetails(entity) {
    const entityImage = document.querySelector('.entity-image img');
    entityImage.src = entity.img;
    entityImage.alt = entity.name;

    const entityName = document.querySelector('.entity-description h2');
    entityName.textContent = entity.name;

    const normalDescription = document.querySelector('.entity-description .normalDescription');
    normalDescription.textContent = entity.description;

    const hunterDescription = document.querySelector('.entity-description .hunterDescription');
    hunterDescription.textContent = entity.hunterComment;
}

document.addEventListener('DOMContentLoaded', loadEntities);
