/*********** Page de connexion **********/

const urlUsersLogin = "http://localhost:5678/api/users/login";

// Requête POST avec la méthode fetch 
const postRequest = async () => {

  // les saisies des champs du formulaire de la page de connexion (Email, Password)
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // // Variable utilisateur avec les saisies Email + Password 
  const user = {
    email: email,
    password: password,
  };
  
  // gérer erreur e-mail
  if (!email) {
    alert("Veuillez saisir votre adresse e-mail");
    return;
  }
  //  gérer erreur password
  if (!password) {
    alert("Veuillez saisir votre mot de passe");
    return;
  }

  try {
    const response = await fetch(urlUsersLogin, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    if (!response.ok) throw new Error("Erreur dans l’identifiant ou le mot de passe")
    const result = await response.json();

    if (response.ok)
      window.localStorage.setItem('token', result.token);
      window.location.href="./index.html";
  }

  catch (err) {
    alert(err.message);
  }
};

// balise form de la page login 
const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  //  empêcher le comportement par défaut du navigateur
  event.preventDefault();
  postRequest();
});