Papa.parse(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQi8u88PufDDJhfdJen0WKP9kEvQ2y5TAdwXRpq5TFQ2bOKSZLzWiCRHLNceCwaPumtI59MbWojpErz/pub?output=csv",
//    "films.csv",
    {
       download: true,
       complete: function(result) {
	   renderButtons(result.data);
           renderData(result.data);
       }
   }
);


// Trie un tableau de chaine de caracteres et supprime tous
// les doublons.
// Source: https://stackoverflow.com/questions/4833651/javascript-array-sort-and-unique
function sort_unique(arr) {
    if (arr.length === 0) {
	return arr;
    }
    arr = arr.sort();
    var ret = [arr[0]];
    //Start loop at 1: arr[0] can never be a duplicate
    for (var i = 1; i < arr.length; i++) {
	if (arr[i-1] !== arr[i]) {
	    ret.push(arr[i]);
	}
    }
    return ret;
}

function renderButtons(films) {
    let all_tags = [];
    let id_film_tags = 7;
    let display = document.getElementById("display-buttons");
    let card = document.createElement("div");
    let html = '';
    for (let i = 1; i < films.length; i++) {
	// Recuperer les tags dans la bonne colonne
	let tags = films[i][id_film_tags];
	// Decouper la chaine et mettre les tags du film courant dans un tableau
	// "tag1; tag2; tag3" -> [ "tag1", "tag2", "tag3"]
	let this_film_tags = tags.split(";");
	// Virer les espaces en debut et en fin de mot:
	// " tag  " -> "tag"
	for(let j = 0; j < this_film_tags.length; j++) {
	    this_film_tags[j] = this_film_tags[j].trim();
	}
	// Ajouter les tags du film courant à la liste de tous les tags
	all_tags = all_tags.concat(this_film_tags);
    }
    // Trier les tags par ordre alphabetique et supprimer les doublons
    all_tags = sort_unique(all_tags);

    // A remplacer par le code qui va vraiment afficher les vrais boutons
    for (let i=0; i < all_tags.length; i++) {
	html += (all_tags[i] + ",");
    }

    card.innerHTML = html;
    display.appendChild(card);
}

// Fonction qui prend en argument un "film" (à savoir un tableau de chaines
// de caractères) et qui renvoit une chaine de caractère avec le code HTML
// à afficher pour le film.
function renderFilm(film) {

    let id_film_img = 0;
    let id_film_name = 1;
    let id_alt_title = 2;
    let id_link = 3;
    let id_film_director = 4;
    let id_film_date = 5;
    let id_film_synopsys = 6;
    let id_film_tags = 7;

    let html = '';
    html += '<ul>';

    html += '<li>';
    // Il faut "protéger" les guillements par un backslash quand ils sont dans
    // une chaine de caracteres sinon ils sont compris comme la fin de la chaine
    //                v
    html += '<img src=\"' + film[id_film_img] + "\" width=\"100px\"> </img>";
    html += '</li>';

    html += '<li>';
    html += '<b>name: </b>';
    html += film[id_film_name];
    html += '</li>';

    html += '<li>';
    html += '<b>date: </b>';
    html += film[id_film_date];
    html += '</li>';

    // Exemple de test de la présence d'un champ
    if (film[id_alt_title] != '') {
	html += '<li>';
	html += '<b>alt title: </b>';
	html += film[id_alt_title];
	html += '</li>';
    }

    html += '<li>';
    html += '<b>director: </b>';
    html += film[id_film_director];
    html += '</li>';


    html += '<li>';
    html += '<b>synopsys: </b>';
    html += film[id_film_synopsys];
    html += '</li>';

    html += '<li>';
    html += '<b>tags: </b>';
    html += film[id_film_tags];
    html += '</li>';

    html += '<li>'
    html += '<b>watch it: </b>';
    html += '<a href=\"' + film[id_link] + "\"> [link] </a>";
    html += '</li>'

    html += '</ul>';
    return html;

}

// Fonction qui affiche tous les films, appelée par PapaParse
function renderData(data) {
    let display = document.getElementById("display-films");
    for (let i = 1; i < data.length; i++) {
	let card = document.createElement("div");
	card.innerHTML = renderFilm(data[i]);
	display.appendChild(card);
    }
}
