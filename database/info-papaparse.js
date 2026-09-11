Papa.parse(
    //(insérer lien du tableur, soit le chemin d'accès si c'est un fichier, soit un lien si il est publié en ligne sur google sheet par exemple)
    "lien.com",
   {
      download: true,
      complete: function(result) {
         renderData(result.data);
      }
   }
);

// Fonction qui prend en argument un "x" (à savoir un tableau de chaines
// de caractères) et qui renvoit une chaine de caractère avec le code HTML
// à afficher pour le film.
function renderTableur(x) {

//définir un "id" pour chaque colonne du tableur
//  sous la forme : let nom_de_l'id = numéro de la colonne du tableur
    let id_première_colonne = 0;
    let id_deuxième_colonne = 1;
    let id_troisième_colonne = 2;
    let id_quatrième_colonne = 3;
    
//générer le code html en fonction des données de chaque colonne, pour chacune des lignes
    let html = '';
// pour appeler les data d'une des colonne : x[id_première_colonne]
// "html += appelle du html, on écrit le code qu'on veut générer entre '...' pour appeler des data on les écrit entre des +"
    html += 'code html' + x[id_première_colonne] + 'code html';
    html += 'code html' + x[id_deuxième_colonne] + 'code html';
// ...
    return html;
}

// Fonction qui affiche tous les films, appelée par PapaParse
function renderTableur(data) {
    let display = document.getElementById("display-tableur");
    for (let i = 1; i < data.length; i++) {
	let card = document.createElement("div");
	card.innerHTML = renderTableur(data[i]);
	display.appendChild(card);
    }
}
