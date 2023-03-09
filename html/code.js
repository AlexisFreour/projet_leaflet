var map = L.map('map').setView([51.505, -0.09], 13);
window.addEventListener('load', afficherVuesFavorites);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


/*var control = L.Routing.control({
    waypoints: [
      L.latLng(51.505, -0.09), // Point de départ
      L.latLng(48.858, 2.294) // Point d'arrivée
    ],
    router: L.Routing.mapbox('pk.eyJ1IjoiYWxleGlzNDQiLCJhIjoiY2xleXJ5ajJ3MndtZzN1cnYwa3hudnVwNCJ9.xlr-dsHnn_HOcUU1QL6YuQ'), // Service de routage (ici Mapbox)
    routeWhileDragging: true // Permet de recalculer l'itinéraire lorsqu'on déplace un point de départ ou d'arrivée
  }).addTo(map);*/


function enregistrerVueFavorite() {
    //Récupérer le nom voulu
    var zoneTexte = document.getElementById('nom-vue');
    var texteSaisi = zoneTexte.value;
    document.getElementById("nom-vue").value=""
    // Récupérer les informations de la vue actuelle, par exemple :
    var latLng = map.getCenter();
    var zoom = map.getZoom();
    // Enregistrer les informations dans le localstorage avec un nom unique, par exemple :
    localStorage.setItem(texteSaisi, JSON.stringify({latLng: latLng, zoom: zoom}));
    // Mettre à jour le tableau affiché dans la page
    afficherVuesFavorites();
  }

function afficherVuesFavorites() {
    var toutesLesDonnees =[];
    for(var i = 0; i<localStorage.length; i++){
        var cle = localStorage.key(i);
        var valeur = localStorage.getItem(cle);
        toutesLesDonnees.push({cle : cle, valeur: valeur});
    }
    var corpsTableau = document.getElementById('tableau-donnees-corps');
    corpsTableau.innerHTML = ''; // Réinitialisation du corps du tableau
    
    for (var i = 0; i < toutesLesDonnees.length; i++) {
      var ligne = corpsTableau.insertRow(-1); // Ajout d'une nouvelle ligne au tableau
      var celluleCle = ligne.insertCell(0); // Ajout d'une cellule pour la clé
      var celluleValeur = ligne.insertCell(1); // Ajout d'une cellule pour la valeur
      var celluleAller = ligne.insertCell(2);
      var celluleSupprimer = ligne.insertCell(3); // Ajout d'une cellule pour le bouton Supprimer
    
      celluleCle.innerHTML = toutesLesDonnees[i].cle; // Ajout de la clé dans la cellule correspondante
      celluleValeur.innerHTML = toutesLesDonnees[i].valeur; // Ajout de la valeur dans la cellule correspondante
      celluleAller.innerHTML = '<button onclick="allerVersPosition(\'' + toutesLesDonnees[i].cle + '\')">Aller</button>';// Ajout du bouton Aller dans la cellule correspondante
      celluleSupprimer.innerHTML = '<button onclick="supprimerDonnee(\'' + toutesLesDonnees[i].cle + '\')">Supprimer</button>'; // Ajout du bouton Supprimer dans la cellule correspondante
    }   

}

function supprimerDonnee(clé) {
    //Supprimer la ligne voulue
    localStorage.removeItem(clé);
  
    // Mettre à jour le tableau affiché dans la page
    afficherVuesFavorites();
    
  }

  function allerVersPosition(cle) {
    // Récupérer la valeur et convertir la chaîne de caractères en objet JSON
    var valeur = localStorage.getItem(cle);
    var valeurJson = JSON.parse(valeur);
    
    //Extraire les coordonnées de la position
    var lat = valeurJson.latLng.lat;
    var lng = valeurJson.latLng.lng;
    var zoom = valeurJson.zoom;
  
    // Déplacer la carte à la position enregistrée
    map.setView([lat, lng], zoom);
  }
  
  
  

  



