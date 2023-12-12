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

      // créer les boutons + noms + class btn-filter
      const button = document.createElement("button");
      button.textContent = filterButton.name;
      button.classList.add("btn-filter");

      // ajout des boutons ds la div all-buttons
      allButtons.appendChild(button);
    });
  })
