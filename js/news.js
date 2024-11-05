function loadNews() {
    fetch('../json/news.json') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            renderNewsList(data.news); 
        })
        .catch(error => console.error(error));
}

function renderNewsList(news) {
    const newsListContainer = document.querySelector('.news-list');
    newsListContainer.innerHTML = ''; 

    news.forEach(article => {
        const newsItem = document.createElement('article');
        newsItem.classList.add('news-item');

        const image = document.createElement('img');
        image.src = article.img; 
        image.alt = article.title; 

        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');

        const title = document.createElement('h3');
        title.textContent = article.title; 

        const description = document.createElement('p');
        description.textContent = article.description; 

        textContainer.appendChild(title);
        textContainer.appendChild(description);
        newsItem.appendChild(image);
        newsItem.appendChild(textContainer);
        
        newsListContainer.appendChild(newsItem);
    });
}

document.addEventListener('DOMContentLoaded', loadNews);
