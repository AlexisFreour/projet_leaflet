var map = L.map('map').setView([51.505, -0.09], 13);
window.addEventListener('load', afficherFavoris);
var popup = L.popup();
map.on('click', onMapClick);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var markers = L.layerGroup().addTo(map);
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);


    var lait_longti = e.latlng.toString().substring(7);
    let array_separe = lait_longti.split(",");
    var laititude_map = array_separe[0];
    var longtitude_map = array_separe[1].substring(0, array_separe[1].length - 1);

    document.getElementById("latitude").value = laititude_map;
    document.getElementById("longitude").value = longtitude_map;
}



function enregistrerVueFavorite() {
    //Récupérer les données voulues
    
    var nom = document.getElementById('nom-vue').value;
    var lat = document.getElementById('latitude').value;
    var lng = document.getElementById('longitude').value;
    var com = document.getElementById('commentaire').value;
    var img = document.getElementById('image').value;

    //Effacer les cases
    document.getElementById("nom-vue").value=""
    document.getElementById('latitude').value=""
    document.getElementById('longitude').value=""
    document.getElementById('commentaire').value=""
    document.getElementById('image').value=""

    // Récupérer les informations du zoom
    
    var zoom = map.getZoom();
    // Enregistrer les informations dans le localstorage avec un nom unique, par exemple :
    localStorage.setItem(nom, JSON.stringify({com : com,lat: lat ,lng : lng, zoom: zoom,img : img}));
    // Mettre à jour le tableau affiché dans la page
    

    
    
    
        afficherFavoris();
}

function afficherFavoris() {
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
      var celluleCle = ligne.insertCell(0); // Ajout d'une cellule pour la clé (nom)
      var celluleCom = ligne.insertCell(1); //Ajout d'une cellule pour le commentaire
      var celluleValeur = ligne.insertCell(2); // Ajout d'une cellule pour la valeur
      var celluleImage = ligne.insertCell(3); // Ajout d'une cellule pour l'image
      var celluleAller = ligne.insertCell(4); //Ajout d'une cellule pour le bouton Aller
      var celluleSupprimer = ligne.insertCell(5); // Ajout d'une cellule pour le bouton Supprimer
      var valJson = JSON.parse(toutesLesDonnees[i].valeur);

      var val = valJson.lat + " " + valJson.lng + " " + valJson.zoom;
    
      celluleCle.innerHTML = toutesLesDonnees[i].cle; // Ajout de la clé dans la cellule correspondante
      celluleCom.innerHTML = valJson.com;
      celluleValeur.innerHTML = val; // Ajout de la valeur dans la cellule correspondante
      celluleImage.innerHTML = valJson.img;
      celluleAller.innerHTML = '<button onclick="allerVersPosition(\'' + toutesLesDonnees[i].cle + '\')">Aller</button>';// Ajout du bouton Aller dans la cellule correspondante
      celluleSupprimer.innerHTML = '<button onclick="supprimerDonnee(\'' + toutesLesDonnees[i].cle + '\')">Supprimer</button>'; // Ajout du bouton Supprimer dans la cellule correspondante
      var marker = L.marker([valJson.lat, valJson.lng]).addTo(markers);
      marker.bindPopup(valJson.com);
    
    }   
}

function allerVersPosition(cle) {
    // Récupérer la valeur et convertir la chaîne de caractères en objet JSON
    var valeur = localStorage.getItem(cle);
    var valeurJson = JSON.parse(valeur);
    
    //Extraire les coordonnées de la position
    var lat = valeurJson.lat;
    var lng = valeurJson.lng;
    var zoom = valeurJson.zoom;
  
    // Déplacer la carte à la position enregistrée
    map.setView([lat, lng], zoom);
}

function supprimerDonnee(clé) {
    markers.clearLayers(); //supprimer tous les marqueurs 
    localStorage.removeItem(clé);

        // Mettre à jour le tableau affiché dans la page et les marqueurs de la carte (recreer les marqueurs non supprimés)
    afficherFavoris();
    
}