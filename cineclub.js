Papa.parse(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSC775QKrLTnFKs0b56EjWi-rnnI_kIbZG_FYv9FNhCLOJHm75E1RJl6ri2ujezLexp3gYnfNbGwDT-/pub?gid=0&single=true&output=csv",
   {
      download: true,
      complete: function(result) {
       
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

    
    let html = '';
    

    html += '<div class=\"wrapper\">';
    html += '<div class=\"film-name\">';
    html +=  film[id_film_name] ; 
    if (film[id_alt_title] != ''){
        html += '<div class =\"alttitle\">';
        html += film[id_alt_title];
        html += '</div>'
    }

    html += '<br>';
    
    html += '<a href=\"' + film[id_link] + '\" target= \"_blank\" class=\"film-director\">';
    html += film[id_film_director] ;
    html += '</a>';
    html+= '</div>';
    
    html += '<div class=\"duree\">';
    html += film[id_film_lenght] ;
    html += '</div>';
    html += '<div class=\"date\">';
    html += film[id_film_date];
    html += '</div>';
    html += '<div class=\"image\">';
    html += '<img class=\"image\" src=\"seance1/' + film[id_film_img] + '\">';
    html += '</div>';
    html += '<div class=\"synopsis\">';
    html += film[id_film_synopsys];
    html += '</div>';
    html += '<div class=\"technique\">';
    html += film[id_film_tags];
    html += '</div>';
    html += '</div>';
    html += '<br>'



    return html;
    
}

function renderData(data) {
    let display = document.getElementById("display-films");
    let html = "";
    for (let i = 1; i < data.length; i++) {
        html += renderFilm(data[i]);
    }
    display.innerHTML = html;
    


}
