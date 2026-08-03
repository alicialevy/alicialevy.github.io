Papa.parse(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQi8u88PufDDJhfdJen0WKP9kEvQ2y5TAdwXRpq5TFQ2bOKSZLzWiCRHLNceCwaPumtI59MbWojpErz/pub?output=csv",
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
    html += '<div class=\"entry\" data-tags=\"' + film[id_film_tags] + '\">';
    html += '<div class=\"film-img\"><img src=\"' + film[id_film_img] + '\" width=\"100px\"></div>';
    html += '<div class=\"entry-right\">'
    html += '<div class=\"film-name\"><a href=\"' + film[id_link] + '\" target=\"_blank\">' + film[id_film_name] + '</a>'; if (film[id_alt_title] != '') { html += ' · <span class=\"alt-title\">' + film[id_alt_title] + '</span>' } '</div>';
    html += '<div class=\"film-director\">' + film[id_film_director] + '</div>'
    html += '<div class=\"film-date\">' + film[id_film_date] + '</div>'
    html += '<div class=\"film-synopsis\">' + film[id_film_synopsys] + '</div>'
    html += '<div class=\"film-tags\">' + film[id_film_tags] + '</div>'
    html += '</div>'
    html += '</div>'

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
