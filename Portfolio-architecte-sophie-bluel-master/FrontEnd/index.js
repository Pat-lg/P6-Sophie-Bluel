/* récupération des données via l'API */

//  Url de l'API
const url = "http://localhost:5678/api/works";


const getData = async() => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("not a valid response")
    const data = await response.json();
    return data;
  }
  catch (err) {
    console.warn(err.message);
  }
}
getData().then((completeData)=> {
  console.log(completeData);
})
 