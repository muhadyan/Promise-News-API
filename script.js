const searchButton = document.querySelector('.input-keyword');
searchButton.addEventListener('click', async function() {
    try {
        const inputKeyword = document.querySelector('.input-keyword');
        const news = await getNews(inputKeyword.value);
        updateUI(news);
    } catch(err) {
        const newsContainer = document.querySelector('.news-container');
        newsContainer.innerHTML = showError()
        console.log(showError)
    }
});

function getNews(keyword) {
    return fetch('https://newsapi.org/v2/everything?q=' + keyword + '&sortBy=popularity&apiKey=5c85bde68ae04dcab6c72fe3e0e62c27')
    .then(response => {
        if(!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json();
    })
    .then(response => {
        if (response.totalResults === 0) {
            throw new Error(response.Error)
        }
        return response.articles;
    });
}

function updateUI(news) {
    let cards = '';
    news.forEach(n => cards += showCards(n));
    const newsContainer = document.querySelector('.news-container');
    newsContainer.innerHTML = cards;
}

fetch('https://newsapi.org/v2/top-headlines?country=id&apiKey=5c85bde68ae04dcab6c72fe3e0e62c27')
    .then(response => response.json())
    .then(response => {
        const news = response.articles;
        let cards = '';
        news.forEach(n => cards += showCards(n));
        const newsContainer = document.querySelector('.news-container');
        newsContainer.innerHTML = cards;
    });

function showCards(n) {
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${n.urlToImage}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${n.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${n.author} - ${n.publishedAt}</h6>
                    <p class="card-text">${n.description}</p>
                    <a href="${n.url}" target="_blank" class="btn btn-primary">Read more...</a>
                    </div>
                </div>
            </div>`;
}

function showError() {
    return `<div class="col-md-12 my-3">
                <div class="alert alert-danger" role="alert">
                    content tidak ditemukan
                </div>
            </div>`
}