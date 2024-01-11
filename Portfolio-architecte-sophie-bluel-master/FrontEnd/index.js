const urlWorks = "http://localhost:5678/api/works";

/* récupération des données Works via l'API */

const getDataWorks = async () => {
  try {
    const response = await fetch(urlWorks);
    if (!response.ok) throw new Error("not a valid response")
    const data = await response.json();
    console.table(data);
    return data;
  }
  catch (err) {
    console.warn(err.message);
  }
}

/* créer le HTML de la galerie */

const divGallery = document.querySelector(".gallery")

const dataWork = getDataWorks();

dataWork.then((completeData) => {

  // créer les balises figure+ img + figurecaption
  completeData.forEach(objet => {
    const figure = document.createElement("figure");

    const image = document.createElement("img");
    image.src = objet.imageUrl;

    const figCaption = document.createElement("figurecaption");
    figCaption.innerHTML = objet.title;

    // ajout des balises figure + enfants ( img; figurecaption) dans la div .gallery
    divGallery.appendChild(figure);
    figure.appendChild(image);
    figure.appendChild(figCaption);

  });
})
console.log(dataWork);
/* récupération des données Categories via l'API */

const urlCategories = "http://localhost:5678/api/categories";

const getDataCategories = async () => {
  try {
    const response = await fetch(urlCategories);
    if (!response.ok) throw new Error("not a valid response")
    const dataCategories = await response.json();
    console.table(dataCategories);
    return dataCategories;
  }
  catch (err) {
    console.warn(err.message);
  }
}

/* créer les boutons-filtres */

const allButtons = document.querySelector(".all-buttons");

const dataCategories = getDataCategories();

dataCategories.then((dataCategories) => {

  dataCategories.forEach(filterButton => {

    // créer les boutons + noms + id + class btn-filter 
    const button = document.createElement("button");
    button.textContent = filterButton.name;
    button.id = filterButton.id;
    button.classList.add("btn-filter");

    // ajout des boutons ds la div all-buttons
    allButtons.appendChild(button);
  });
})

/* filtrer les catégories */

const sortBtn = async () => {
  // récuperer les données Works
  const retreiveDataWorks = await getDataWorks();
  // sélectionner tous les boutons-filtres
  const allBtns = document.querySelectorAll(".all-buttons button");

  allBtns.forEach((button) => {
    // retirer la classe selected des boutons-filtres
    button.classList.remove("selected");

    button.addEventListener("click", (e) => {
      // sélectionner les id des boutons
      const idBtn = e.target.id;
      button.classList.add("selected");
      // RAZ de la galerie d'images au clic
      divGallery.innerHTML = "";

      if (idBtn !== "0") {
        const sortedCategories = retreiveDataWorks.filter((element) => {

          return element.categoryId == idBtn;
        });
        sortedCategories.forEach(category => {

          const figure = document.createElement("figure");

          const image = document.createElement("img");
          image.src = category.imageUrl;

          const figCaption = document.createElement("figurecaption");
          figCaption.innerHTML = category.title;

          // ajout des balises figure + enfants ( img; figurecaption) dans la div .gallery
          divGallery.appendChild(figure);
          figure.appendChild(image);
          figure.appendChild(figCaption);;
        });
      } else {
        dataWork.then((completeData) => {

          // créer les balises figure+ img + figurecaption
          completeData.forEach(objet => {

            const figure = document.createElement("figure");

            const image = document.createElement("img");
            image.src = objet.imageUrl;

            const figCaption = document.createElement("figurecaption");
            figCaption.innerHTML = objet.title;

            // ajout des balises figure + enfants ( img; figurecaption) dans la div .gallery
            divGallery.appendChild(figure);
            figure.appendChild(image);
            figure.appendChild(figCaption);
          });
        });
      }
    });
  });
}
sortBtn();

/******************* page d'accueil  utilisateur connecter ****************/

// changer le bouton login en logout + suppression des boutons-filtres et bannière
const token = localStorage.token;
console.log(token);

if (token) {
  document.getElementById("btn-login").remove();
  document.querySelector(".all-buttons").remove();
} else {
  document.getElementById("btn-logout").remove(); 
  document.querySelector(".btn-modif").remove();
  document.querySelector(".banner").remove();


};

// changer le bouton logout en login 
const deconnectLogout = document.getElementById("btn-logout");

deconnectLogout.addEventListener("click", () => {
  if (localStorage.token) {
    localStorage.removeItem("token");
    document.getElementById("btn-login").add();
  }
});

/********** boîte modale  *********/

