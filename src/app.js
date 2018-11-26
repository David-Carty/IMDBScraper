import "./css/main.scss";
import "./css/tables.scss";
import Scrape from './modules/scrape';


Scrape.scrapeIMDB(0);

/* Code below should be added to an initialisation module to keep the app.js clean and 
instantly readable.  Sorry ran out of time. */

let slider = tns({
    container: '.filmDirectors',
    nav: false,
    controls: true,
    arrowKeys: true,
    mouseDrag: true,
    autoHeight: true,
    items: 2,

    responsive: {
        640: {
            edgePadding: 20,
            gutter: 20,
            items: 3
        },
        700: {
            gutter: 30
        },
        900: {
            items: 5
        }
    }
});

let directors = document.querySelector(".filmDirectors");

directors.addEventListener("click", function(e)
{
  if(e.target.dataset.idx){
    Scrape.scrapeIMDB(e.target.dataset.idx);
  }
});


