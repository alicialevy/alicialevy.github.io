Papa.parse(
    "films.csv",
   {
      download: true,
      complete: function(result) {
         renderData(result.data);
      }
   }
);

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
    // Il faut "protéger" les guillements par un backslash quand ils sont dans une
    // chaine de caracteres sinon ils sont compris comme la fin de la chaine
    //                |
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
