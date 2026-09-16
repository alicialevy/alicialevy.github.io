Papa.parse(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRC4H_kqtC_bQJOZOOEWCp6BwU9GL6haywQyBq6-wsBjZEY5LTyyITgt1cyt6zxpKNOnIFh4EMR-NL1/pub?output=csv",
   {
      download: true,
      complete: function(result) {
        renderButtons(result.data);
         renderData(result.data);
         renderCountries(result.data);
        
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
    let id_film_tags = 9;
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

function renderCountries(films) {
    let all_countries = [];
    let id_film_countries = 6
    let display = document.getElementById("display-countries");
    let card = document.createElement("div");
    let html = '';
    for (let i = 1; i < films.length; i++) {
	// Recuperer les tags dans la bonne colonne
	let countries = films[i][id_film_countries];
	// Decouper la chaine et mettre les tags du film courant dans un tableau
	// "tag1; tag2; tag3" -> [ "tag1", "tag2", "tag3"]
	let this_film_countries = countries.split(";");
	// Virer les espaces en debut et en fin de mot:
	// " tag  " -> "tag"
	for(let j = 0; j < this_film_countries.length; j++) {
	    this_film_countries[j] = this_film_countries[j].trim();
	}
	// Ajouter les tags du film courant à la liste de tous les tags
	all_countries = all_countries.concat(this_film_countries);
    }
    // Trier les tags par ordre alphabetique et supprimer les doublons
    all_countries = sort_unique(all_countries);

    // A remplacer par le code qui va vraiment afficher les vrais boutons
    for (let i=0; i < all_countres.length; i++) {
	html += (all_countries[i]) ;
    html += '<li><a href=\"#\"><button class=\"country\" onclick=\"filtercountry(\'' + (all_countries[i]) + '\' , this)\">' + (all_countries[i]) + '</button></a></li>'
    }

    card.innerHTML = html;
    display.appendChild(card);
    
}



// Fonction qui prend en argument un "film" (à savoir un tableau de chaines
// de caractères) et qui renvoit une chaine de caractère avec le code HTML
// à afficher pour le film.
function renderFilm(film) {

    let id_film_name = 0;
    let id_title_language = 1;
    let id_alt_title = 2;
    let id_film_date = 3;
    let id_film_director = 4;
    let id_film_lenght = 5;
    let id_film_countries = 6;
    let id_film_tmdb = 7;
    let id_film_synopsys = 8;
    let id_film_tags = 9;
    let id_link = 10;
    let id_link_source = 11;
    let id_film_img = 12;

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


    let all_countries = [];
	let countries = film[id_film_countries];
	let this_film_countries = countries.split(";");
	for(let j = 0; j < this_film_countries.length; j++) {
	    this_film_countries[j] = this_film_countries[j].trim();
	}
	all_countries = all_countries.concat(this_film_countries);
    all_countries = sort_unique(all_countries);

    let all_directors = [];
	let directors = film[id_film_director];
	let this_film_directors = directors.split(";");
	for(let j = 0; j < this_film_directors.length; j++) {
	    this_film_directors[j] = this_film_directors[j].trim();
	}
    all_directors = all_directors.concat(this_film_directors);
    all_directors = sort_unique(all_directors);



    let html = '';
    html += '<tr class=\"item entry trigger\"  data-director=\"'+ film[id_film_director] + '\" data-country=\"' + film[id_film_countries] + '\" data-tags=\"' + film[id_film_tags] + '\" data-img=\"' + film[id_film_img] + '\" data-linksource=\"' + film[id_link_source] + '\" data-synopsis=\"' + film[id_film_synopsys] + '\">';
    html +='<td><div class =\"year\">'+ film[id_film_date] +'</div></td>';
    if (film[id_alt_title] != '') { html += '<td sorttable_customkey=\"' + film[id_alt_title] + '\"><div class =\"filmname\"><a class = "filmnamelink" href=\"' + film[id_link] + '\" target=\"_blank\">'+ film[id_film_name] + '</a>'; if (film[id_alt_title] != '') { html += '<br><span class=\"alt-title\">' + film[id_alt_title] + '</span>' }; '</div></td>' } else { html +='<td sorttable_customkey=\"' + film[id_film_name] + '\"><div class =\"filmname\"><a class=\"filmnamelink\" href=\"' + film[id_link] + '\" target=\"_blank\">'+ film[id_film_name] + '</a>'; if (film[id_alt_title] != '') { html += '<br><span class=\"alt-title\">' + film[id_alt_title] + '</span>' }; '</div></td>' };
    //html +='<td sorttable_customkey=\"'+ film[id_film_name] + '\"><div class =\"film-name\"><a href=\"' + film[id_film_name] + '.html\" target=\"iframe\">'+ film[id_film_name] + '</a>'; if (film[id_alt_title] != '') { html += '<br><span class=\"alt-title\">' + film[id_alt_title] + '</span>' }; '</div></td>';
    
    
    html +='<td><div class \"directors\">';
     for (let i=0; i < all_directors.length; i++) {
    html +='<li><a href=\"#\"><button class =\"director\" onclick=\"filterdirector(\'' + (all_directors[i]) + '\' , this)\">' + (all_directors[i]) + '</button></a></li>';
     }
    html +='</div></td>';
    //html +='<td><div class =\"directors\">'+ film[id_film_director] +'</div></td>';

    html +='<td sorttable_customkey=\"'+ film[id_film_lenght] +'\"><div class =\"duration\">'+ film[id_film_lenght]+' min</div></td>';
    html +='<td><div class=\"tags\">';
    for (let i=0; i < all_tags.length; i++) {
    html += '<li><a href=\"#\"><button class=\"tag\" onclick=\"filter2(\'' + (all_tags[i]) + '\' , this)\">' + (all_tags[i]) + '</button></a></li>';
    }
    html += '</div></td>'
    //html +='<td><div class =\"country\">'+ film[id_film_countries] +'</div></td>';
    
    html +='<td><div class \"countries\">';
     for (let i=0; i < all_countries.length; i++) {
    html +='<li><a href=\"#\"><button class =\"country\" onclick=\"filtercountry(\'' + (all_countries[i]) + '\' , this)\">' + (all_countries[i]) +'</button></a></li>';
     }
    html += '</div></td>'
    html +='</tr>'
    return html;
    
}


 //   html += '<div id=\"entry\" data-tags=\"' + film[id_film_tags] + '\">'
 //   html += '<tr><div class=\"item\">'
 //   html += '<td><div class=\"film-name\"><a href=\"' + film[id_film_name] + '.html\" target=\"iframe\">' + film[id_film_name] + '</a>'; if (film[id_alt_title] != '') { html += ' · <span class=\"alt-title\">' + film[id_alt_title] + '</span>' } '</div></td>';
 //   html += '<td><div class=\"film-director\">' + film[id_film_director] + '</div></td>'
 //   html += '<td><div class=\"film-date\">' + film[id_film_date] + '</div></td>'
 //   html += '<td><div class=\"film-lenght\">' + film[id_film_lenght] + '</div></td>'
 //      for (let i=0; i < all_tags.length; i++) {
 //   html += '<td><div class=\"film-tags\"><li><a href=\"#\"><button class=\"tag\" onclick=\"filter2(\'' + (all_tags[i]) + '\' , this)\">' + (all_tags[i]) + '</button></a></li></div></td>'
 //   }
 //    html += '<td><div class=\"film-country\">' + film[id_film_countries] + '</div></td>'
 //   html += '</div>'
 //   html += '</div>'

 //   html += '</tr>'
 //    html += '</div>'
 //    html += '</div>'
    
    

 
    

// Fonction qui affiche tous les films, appelée par PapaParse
function renderData(data) {
    let display = document.getElementById("display-films-tab");
    let html = "";
    html += '<table class=\"sortable\" id=\"tableau\">'
    html += '<tr style=\"background-color: transparent;\" onmouseover=\"renderiframeonhover()\">';
    html += '<th class = \"year-line\">year</th>';
    html += '<th class = \"film-name-line\">name</th>';
    html += '<th class = \"directors-line\">director</th>';
    
    html += '<th class = \"duration-line\">duration</th>';
    html += '<th class = \"tags-line sorttable_nosort\">tags</th>';
    html += '<th class = \"country-line\">country</th>';   
    html += '</tr>';

    for (let i = 1; i < data.length; i++) {
        html += renderFilm(data[i]);
    }
    html += '</table>'
    display.innerHTML = html;
    

    sorttable.makeSortable(
    document.getElementById("tableau")
);

}



 
