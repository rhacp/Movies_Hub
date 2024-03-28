const apiLink = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=14226c1621a7eff4fdd3c02a21fcee6f&page=1";
const imgPath = "https://image.tmdb.org/t/p/w1280";
const searchApi = "https://api.themoviedb.org/3/search/movie?&api_key=14226c1621a7eff4fdd3c02a21fcee6f&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(apiLink);

function returnMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(function (data) {
      console.log(data.results);
      data.results.forEach(element => {
        const divCard = document.createElement("div");
        divCard.setAttribute("class", "card");

        const divRow = document.createElement("div");
        divRow.setAttribute("class", "row");

        const divColumn = document.createElement("div");
        divColumn.setAttribute("class", "column");

        const image = document.createElement("img");
        image.setAttribute("class", "thumbnail");
        image.setAttribute("id", "image");

        const title = document.createElement("h3");
        title.setAttribute("id", "title");

        const center = document.createElement("center");
        center.setAttribute("id", "center");

        const cardLink = document.createElement("a");
        cardLink.setAttribute("id", "card-link");
        cardLink.setAttribute("href", "#");

        const titleContainer = document.createElement("div");
        titleContainer.setAttribute("class", "titleContainer");

        title.innerHTML = `${element.title}`;
        image.src = imgPath + `${element.poster_path}`;

        center.appendChild(image);
        titleContainer.appendChild(title)
        divCard.appendChild(center);
        divCard.appendChild(titleContainer);
        divColumn.appendChild(divCard);
        cardLink.appendChild(divColumn);
        divRow.appendChild(cardLink);

        main.appendChild(divRow);
      });
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = "";

  const searchItem = search.value;

  if (searchItem) {
    returnMovies(searchApi + searchItem);
    search.value = "";
  }
});
