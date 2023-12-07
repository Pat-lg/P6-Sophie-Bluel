const urlWorks = "http://localhost:5678/api/works";
const divGallery = document.querySelector(".gallery")

/* récupération des données Works via l'API */

const getDataWorks = async () => {
  try {
    const response = await fetch(urlWorks);
    if (!response.ok) throw new Error("not a valid response")
    const data = await response.json();
    console.log(data);
    return data;
  }
  catch (err) {
    console.warn(err.message);
  }
}

/* créer le HTML de la galerie */

getDataWorks()

  .then((completeData) => {

    // créer les balises figure+ img + figurecaption
    completeData.forEach(objet => {
      const figure = document.createElement("figure");

      const image = document.createElement("img");
      image.src = objet.imageUrl;

      const figCaption = document.createElement("figurecaption");
      figCaption.textContent = objet.title;

      // ajout des balises figure + enfants ( img; figurecaption) dans la div .gallery
      divGallery.appendChild(figure);
      figure.appendChild(image);
      figure.appendChild(figCaption);

    });
  })

/* récupération des données Categories via l'API */

const urlCategories = "http://localhost:5678/api/categories";
console.log(urlCategories);

const getDataCategories = async () => {
  try {
    const response = await fetch(urlCategories);
    if (!response.ok) throw new Error("not a valid response")
    const dataCategories = await response.json();
    console.log(dataCategories);
    return dataCategories;
  }
  catch (err) {
    console.warn(err.message);
  }
}

getDataCategories();