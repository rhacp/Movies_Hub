const apiLink = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=14226c1621a7eff4fdd3c02a21fcee6f&page=1";
const imgPath = "https://image.tmdb.org/t/p/w1280";
const searchApi = "https://api.themoviedb.org/3/search/movie?&api_key=14226c1621a7eff4fdd3c02a21fcee6f&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");
const barTop = document.getElementById("topnav");

// const modalButton = document.getElementById("modalButton");
const modalContainer = document.getElementById("modalContainer");
const modalRow = document.getElementById("modalRow");
const menu = document.getElementById("afterMenuContainer");
const body = document.querySelector("body");
// modalButton.onclick = openModal;

const divModalColumn = document.createElement("div");
divModalColumn.setAttribute("class", "modalColumn");

const divModalDescription = document.createElement("div");
divModalDescription.setAttribute("class", "modalDescription");

const divModalTitleContainer = document.createElement("div");
divModalTitleContainer.setAttribute("class", "modalTitleContainer");

const h2ModalTitle = document.createElement("h2");
h2ModalTitle.setAttribute("class", "modalTitle");

const divModalSecondContainer = document.createElement("div");
divModalSecondContainer.setAttribute("class", "modalSecondContainer");

const imgThumbnail = document.createElement("img");
imgThumbnail.setAttribute("class", "thumbnail");

const divModalSecondDescription = document.createElement("div");
divModalSecondDescription.setAttribute("class", "modalSecondDescription");

const h4ModalText = document.createElement("h4");
h4ModalText.setAttribute("class", "modalText");

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
        cardLink.setAttribute("id", "cardLink");
        cardLink.setAttribute("href", "javascript:void(0);");

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

        let searchLocal = searchApi + `${element.title}`;
        cardLink.addEventListener("click", function() {returnMovie(searchLocal);});
        cardLink.onclick = openModal;
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

function openModal() {
  modalContainer.style.animation = "fade-in 1s";
  modalContainer.classList.add("active");
  modalRow.classList.add("active");
  menu.classList.add("active");
  animationState = true;
}

modalContainer.addEventListener("click", closeModal);

function closeModal(e) {
  if (modalContainer.contains(e.target) && modalRow.contains(e.target)) {
  } else {
    modalContainer.style.animation = "fade-out 1s";
    modalContainer.addEventListener("animationend", function (e) {
      if (e.animationName === 'fade-out') {
        modalContainer.classList.remove("active");
        modalRow.classList.remove("active");
        menu.classList.remove("active");
      }
    });
  }
}

function returnMovie(url) {
  fetch(url)
    .then(res => res.json())
    .then(function (data) {
      console.log(data.results);
      let movie = data.results[0];

      console.log(movie);

      h2ModalTitle.innerHTML = `${movie.title}`;
      imgThumbnail.src = imgPath + `${movie.poster_path}`;
      h4ModalText.innerHTML = `${movie.overview}`;

      // h2ModalTitle.innerHTML = movie.title;
      // imgThumbnail.src = imgPath + movie.poster_path;
      // h4ModalText.innerHTML = movie.overview;

      divModalSecondDescription.appendChild(h4ModalText);
      divModalSecondContainer.appendChild(imgThumbnail);
      divModalSecondContainer.appendChild(divModalSecondDescription);
      divModalTitleContainer.appendChild(h2ModalTitle);
      divModalDescription.appendChild(divModalTitleContainer);
      divModalDescription.appendChild(divModalSecondContainer);
      divModalColumn.appendChild(divModalDescription);
      modalRow.appendChild(divModalColumn);

      modalContainer.addEventListener("animationend", function (e) {
        if (e.animationName === 'fade-out') {
          h2ModalTitle.innerHTML = ``;
          imgThumbnail.src = ``;
          h4ModalText.innerHTML = ``;
        }
      });
    });
}


const observer = new IntersectionObserver(
  ([e]) => e.target.classList.toggle('isSticky', e.boundingClientRect.top < 0),
  {threshold: [1]}
);

observer.observe(barTop);

// document.addEventListener('animationstart', function (e) {
//   if (e.animationName === 'fade-in') {
//     e.target.classList.add('did-fade-in');
//   }
// });
//
// document.addEventListener('animationend', function (e) {
//   if (e.animationName === 'fade-out') {
//     // e.target.classList.remove('did-fade-in');
//   }
// });
