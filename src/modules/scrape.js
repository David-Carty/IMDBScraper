/**** This is an IMDB Scrapper using request method (Simpliest but fastest approach) ****/
/* There would be a different module for each format
Sites rendered in JavaSCript like AirBNB would cause the request method to fail
Did the lot on Sunday, so no testing or error handling and very quick coding.
Also on run in latest browsers and due to the tinyslider scritp it isnt perfect
on mobiles, however this is a small detail that could be corrected by using
a different slider mechanism.
The demo Pulls files from local domain as needs to go on a node server, due to CORS,
No time to setup node and express, but we need a server environment in the 
finished solution.  Also I am mocking data source into hardcoded objects.
Data sources and config would be held in a separate json file or pulled from 
a data store.
*/
//import  rp  from 'request-promise';


import cheerio from 'cheerio';

let sources = [
	{director: "Jean-Luc Godard",source: "https://www.imdb.com/name/nm0000419/?ref_=fn_al_nm_1#director", localFile:"godard.html"},
	{director: "Joel Coen",source: "https://www.imdb.com/name/nm0001054/?ref_=ttfc_fc_cl_t3#director", localFile:"coen.html"},
	{director: "Mike Leigh",source: "https://www.imdb.com/name/nm0005139/?ref_=fn_al_nm_1#director", localFile:"leigh.html"},
	{director: "Jim Jarmusch",source: "https://www.imdb.com/name/nm0000464/?ref_=fn_al_nm_1#director", localFile:"jarmusch.html"},
	{director: "Ken Loach",source: "https://www.imdb.com/name/nm0516360/?ref_=nv_sr_1#director", localFile:"loach.html"},
	{director: "David Lynch",source: "https://www.imdb.com/name/nm0000186/?ref_=nv_sr_1#director", localFile:"lynch.html"},
	{director: "Stanley Kubrick",source: "https://www.imdb.com/name/nm0000040/?ref_=nv_sr_1#director", localFile:"kubrick.html"},
	{director: "Ruben Östlund",source: "https://www.imdb.com/name/nm1128037/?ref_=tt_cl_t2#director", localFile:"ostlund.html"},
	{director: "Thomas Vinterberg",source: "https://www.imdb.com/name/nm0899121/#director", localFile:"vinterberg.html"},
	{director: "Krzysztof Kieslowski",source: "https://www.imdb.com/name/nm0001425/?ref_=tt_ov_dr#director", localFile:"Kieslowski.html"}
]


class Scrape {
	constructor() {

	}
	static scrapeIMDB(selectedIdx) {

		const loadingOverlay = document.getElementById("loadingOverlay");
		loadingOverlay.style.display = "block";
		const URL = `assets/scrapings/${sources[selectedIdx].localFile}`
		const cls = this;
		
		this.getHTML(URL)
			.then(function (data) {
				const table = cls.buildTable(cls.processHTML(data));
				let tdBody = document.getElementById("movies");
				const movieCount = table.count;
				const tableRows = table.tableBody;

				while (tdBody.hasChildNodes()) {
					tdBody.removeChild(tdBody.lastChild);
				}
				const directorLink = document.getElementById('directorLink');
				directorLink.innerHTML = `Director:&nbsp<a href=${sources[selectedIdx].source} target="_blank">${sources[selectedIdx].director}&nbsp;(${movieCount})</a>` 
		
				tdBody.innerHTML = tableRows;
				loadingOverlay.style.display = "none";
			});
	}
	static buildTable(data) {
		let movieCount=0;
		let rows = "";
	
		data.forEach(function (movie, index) {
			rows += `<tr><td data-title="movie">${movie.title}</td><td data-title="year">${movie.year}</td></tr>`
			movieCount++;
		});

		return {tableBody:rows,count:movieCount};
	}
	static getHTML(url) {

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open("GET", url);
			xhr.onload = () => resolve(xhr.responseText);
			xhr.onerror = () => reject(xhr.statusText);
			xhr.send();
		});
	}

	static processHTML(rawHTML) {

		const cls = this;
		let reduceHTML = rawHTML.split('filmo-head-director')[1]
		reduceHTML = reduceHTML.split('filmo-head-editor')[0];

		let films = [];
		const $ = cheerio.load(reduceHTML)
		$('.filmo-row').each(function (index, element) {
			films[index] = {};
			let year = $(element).find('.year_column');
			let title = $(element).find('b > a');
			films[index]['year'] = year.text().trim();
			films[index]['title'] = title.text().trim();
		});

		return films;
	}

}

export default Scrape;




