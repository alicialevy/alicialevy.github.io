Papa.parse(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQi8u88PufDDJhfdJen0WKP9kEvQ2y5TAdwXRpq5TFQ2bOKSZLzWiCRHLNceCwaPumtI59MbWojpErz/pub?output=csv",
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
	//html += (all_tags[i]) ;
    html += '<li><a href=\"#\"><button class=\"tag-btn\" onclick=\"filter2(\'' + (all_tags[i]) + '\' , this)\">' + (all_tags[i]) + '</button></a></li>'
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

    let all_tags = [];
	// Recuperer les tags dans la bonne colonne
	let tags = film[id_film_tags];
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
    
    
    

    let html = '';
    html += '<div class=\"entry\" data-tags=\"' + film[id_film_tags] + '\">';
    html += '<div class=\"film-img\"><img src=\"' + film[id_film_img] + '\" width=\"100px\"></div>';
    html += '<div class=\"entry-right\">'
    html += '<div class=\"film-name\"><a href=\"' + film[id_link] + '\" target=\"_blank\">' + film[id_film_name] + '</a>'; if (film[id_alt_title] != '') { html += ' · <span class=\"alt-title\">' + film[id_alt_title] + '</span>' } '</div>';
    html += '<div class=\"film-director\">' + film[id_film_director] + '</div>'
    html += '<div class=\"film-date\">' + film[id_film_date] + '</div>'
    html += '<div class=\"film-synopsis\">' + film[id_film_synopsys] + '</div>'
    //html += '<div class=\"film-tags\"><a href=\"#\"><button class=\"tag\" onclick=\"filter2(\'' + film[id_film_tags] + '\', this)\">' + film[id_film_tags] + '</button></a></div>'
    //html += '<div class=\"film-tags\">' + film[id_film_tags] + '</div>'
    
       for (let i=0; i < all_tags.length; i++) {
	//html += (all_tags[i]) ;
    html += '<div class=\"film-tags\"><li><a href=\"#\"><button class=\"tag\" onclick=\"filter2(\'' + (all_tags[i]) + '\' , this)\">' + (all_tags[i]) + '</button></a></li></div>'
    }

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
