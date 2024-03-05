const urlWorks = "http://localhost:5678/api/works";
let works = [];
let categoriesApi = [];
const token = localStorage.token;
/* récupération des données Works via l'API */

const getDataWorks = async () => {
  try {
    const response = await fetch(urlWorks);
    if (!response.ok) throw new Error("not a valid response")
    const data = await response.json();
    works = data;
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
    categoriesApi = dataCategories;
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
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.token;

  if (token) {
    document.getElementById("btn-login").remove();
    document.querySelector(".all-buttons").remove();
  } else {
    document.getElementById("btn-logout").remove();
    document.querySelector(".btn-modif").remove();
    document.querySelector(".banner").remove();
  };
});

// changer le bouton logout en login 
const deconnectLogout = document.getElementById("btn-logout");
deconnectLogout.addEventListener("click", () => {
  if (localStorage.token) {
    localStorage.removeItem("token");
    document.getElementById("btn-login").add();
  }
});

/********** boîte modale  *********/

// ouvrir la boîte modale

document.addEventListener('DOMContentLoaded', () => {
  const btnModif = document.querySelector(".btn-modif");
  const modal = document.getElementById("modal");
  const btnCloseModal = document.querySelector(".close-modal");
  const wrapModal = document.querySelector(".modal-wrapper");
  const secondModal = document.querySelector(".modal-add");

  // ouvrir la boîte modale avec le bouton modifier
  btnModif.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "grid";
    wrapModal.style.display = "grid";
    secondModal.style.display = "none";
    displayGalleryModal();
  });

  // fermer la boîte modale en cliquant à l'exterieur de la boîte
  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  wrapModal.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.style.display = "grid";
  });

  // fermer la boîte modale avec le bouton 
  btnCloseModal.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.style.display = "none";
  });
});

// ajouter galerie dans la boîte modale

const displayGalleryModal = async () => {
  const modal = document.getElementById("gallery-modal");
  // RAS de la galerie de la modale
  modal.innerText = "";

  works.forEach(objet => {

    const figure = document.createElement("figure");

    const image = document.createElement("img");
    image.src = objet.imageUrl;
    image.alt = objet.title;

    const span = document.createElement("span");
    const bin = document.createElement("i");
    bin.classList.add("fa-solid", "fa-trash-can");
    bin.id = objet.id;

    // ajout des balises figure + enfants ( img; figurecaption; poubelle ) dans la div .gallery
    modal.appendChild(figure);
    figure.appendChild(image);
    span.appendChild(bin);
    figure.appendChild(span);
  })
  removeProject();
};

// fonction pour supprimer un projet en cliquant sur la poubelle

function removeProject() {
  // selectionner toutes les icônes poubelles 
  const allBin = document.querySelectorAll(".fa-trash-can");
  // console.table(allBin);
  allBin.forEach((objet) => {
    objet.addEventListener("click", () => {
      const idBin = objet.id;
      fetch(`http://localhost:5678/api/works/${idBin}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    })
  });
}

// fonction pour ouvrir la seconde modale en cliquant sur le btn ajouter une photo  
document.addEventListener('DOMContentLoaded', () => {

  const btnOpenModal2 = document.querySelector(".add-picture");
  const firstdModal = document.querySelector(".modal-wrapper");
  const secondModal = document.querySelector(".modal-add");
  const arrowBackFirstModal = document.querySelector(".left");
  const crossModal = document.querySelector(".cross");
  const modal = document.getElementById("modal");
  const addPhoto = document.querySelector(".add-photo");


  function openSecondModal() {

    btnOpenModal2.addEventListener("click", (e) => {
      e.stopPropagation();
      // probleme display none sur aside class modal
      modal.style.display = "grid";
      firstdModal.style.display = "none";
      secondModal.style.display = "flex";
    })

    arrowBackFirstModal.addEventListener("click", (e) => {
      e.stopPropagation();
      firstdModal.style.display = "grid";
      secondModal.style.display = "none";
    })

    crossModal.addEventListener("click", () => {
      modal.style.display = "none";
      secondModal.style.display = "none";
    })

    // pour empêcher la seconde modale de se fermer quand on appuie sur "Ajouter photo"
    secondModal.addEventListener("click", (e) => {
      e.stopPropagation();
    })

  }
  openSecondModal();
});

// Aperçu d'une image dans la seconde modale avant la mise en ligne

document.addEventListener('DOMContentLoaded', () => {

const image = document.querySelector(".box-picture img");
const input = document.querySelector(".box-picture input");
const label = document.querySelector(".box-picture label");
const icon = document.querySelector(".box-picture .fa-image");
const paragraph = document.querySelector(".box-picture p");


input.addEventListener("change", () => {
  console.log(input.files);
  const file = input.files[0];

  if (file) {
    const reader = new FileReader();

    label.style.display = "none";
    icon.style.display = "none";
    paragraph.style.display = "none";
    image.style.display = "block";

    reader.addEventListener("load", () => {
      image.setAttribute("src", reader.result);
    });

    reader.readAsDataURL(file);
  } 
});
});
