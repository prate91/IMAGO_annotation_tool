// ////////////////////////////////////////////////////////////////////////
//
// Project: IMAGO / HDN
// Package: Frontend
// Title: manage form 
// File: app.js
// Path: static/js/
// Type: javascript
// Started: 2020-04-26
// Author(s): Nicolo' Pratelli & Daniele Metilli
// State: in use
//
//  Version history.
// - 2020-04-26 Nicolo' Pratelli & Daniele Metilli
// First version
// - 2020-04-28 Nicolo' Pratelli
// Added management of the insertion of citations
// - 2020-04-30 Nicolo' Pratelli
// Added management of the deletion of citations
// - 2020-05-04 Nicolo' Pratelli
// Added management of the updating of citations
// - 2020-05-07 Daniele Metilli
// Added autocomplete, popovers and hidden IRIs
// - 2020-05-17 Daniele Metilli
// Updated handling of popovers and modals
// - 2020.07.14 Nicolo' Pratelli
// Deleted HDN function
//
// ////////////////////////////////////////////////////////////////////////
//
// This file is part of software developed by the Digital Libraries group
// of NeMIS Laboratory, Institute of Information Science and Technologies
// (ISTI-CNR), Pisa, Italy, for the IMAGO and HDN projects.
// Further information at: https://hdn.dantenetwork.it
// Copyright (C) 2020 ISTI-CNR, Nicolo' Pratelli & Daniele Metilli
//
// This is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published
// by the Free Software Foundation; either version 3.0 of the License,
// or (at your option) any later version.
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty
// of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
// See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License
// along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// ////////////////////////////////////////////////////////////////////////

// Global variable that will contain form data
var data = {};

// Wait for the page to load
document.addEventListener('DOMContentLoaded', function () {
  

	// Reset the form 
	document.getElementById("workTypeForm").reset();
	document.getElementById("printEditionForm").reset();
	document.getElementById("manuscriptForm").reset();

	// Style delete button for Content reference forms
	$( ".delete-row" ).addClass( "btn btn-danger btn-sm" );
	$('#id_topography_set-TOTAL_FORMS').val(1);
	$('#id_source_print_edition_set-TOTAL_FORMS').val(1);
	$('#id_source_manuscript_set-TOTAL_FORMS').val(1);


	/********************************************************
	 * Inizializzazione variabili
	 ********************************************************/

	// Load JSON data into global variable
	data = JSON.parse(document.getElementById('json_data').textContent);
	id_data = JSON.parse(document.getElementById('id_data').textContent);

	// Select the form
	let forms = document.querySelectorAll('form');
	let author_form = forms[0];
	let lemma_form = forms[1];
	let work_form = forms[2];
	let topography_form = forms[3];
	let genre_form = forms[4];
	let abstract_form = forms[5];
	let work_type_form = forms[6];
	let manuscript_form = forms[7];
	let print_edition_form = forms[8];
	

	/********************************************************
	 * Manage insert and deletion of topograpies
	 ********************************************************/
	var btn_insert_topography = document.getElementById("insert-topography");
	let topography_group = document.getElementById("id_topography-group");
	let topography_text = document.getElementById("topography-text");

	btn_insert_topography.addEventListener("click", function () { 
		if (topography_group.hidden === true) {
			topography_group.hidden = false;
			topography_text.hidden = true;
			loadElementGroupFields(document.getElementById("topography-text").children, 'topography');
			btn_insert_topography.textContent = "Salva";
			btn = document.getElementById("insert-topography").parentElement.removeChild(document.getElementById("insert-topography"));
			topography_group.appendChild(btn);
		} else {
			topography_group.hidden = true;
			topography_text.hidden = false;
			btn_insert_topography.textContent = "Modifica luoghi";
			btn = document.getElementById("insert-topography").parentElement.removeChild(document.getElementById("insert-topography"));
			saveTopographies(topography_form, btn);

		}


	});

	/********************************************************
	 * Manage insert and deletion of genres
	 ********************************************************/
	var btn_insert_genre = document.getElementById("insert-genre");
	let genre_group = document.getElementById("id_genre-group");
	let genre_text = document.getElementById("genre-text");

	btn_insert_genre.addEventListener("click", function () { 
		if (genre_group.hidden === true) {
			genre_group.hidden = false;
			genre_text.hidden = true;
			loadElementGroupFields(document.getElementById("genre-text").children, 'genre');
			btn_insert_genre.textContent = "Salva";
			btn = document.getElementById("insert-genre").parentElement.removeChild(document.getElementById("insert-genre"));
			genre_group.appendChild(btn);
		} else {
			genre_group.hidden = true;
			genre_text.hidden = false;
			btn_insert_genre.textContent = "Modifica generi";
			btn = document.getElementById("insert-genre").parentElement.removeChild(document.getElementById("insert-genre"));
			// btn = document.getElementById("insert-genre").parentElement.removeChild(document.getElementById("insert-genre"));
			genre_text.appendChild(btn);
			saveGenres(genre_form, btn);

		}


	});

	/********************************************************
	 * Manage insert and deletion of abstract
	 ********************************************************/
	 var btn_insert_abstract = document.getElementById("insert-abstract");
	 let abstract = document.getElementById("id_abstract");
	 let abstract_text = document.getElementById("abstract-text");
 
	 btn_insert_abstract.addEventListener("click", function () { 
		 if (abstract.hidden === true) {
			 abstract.hidden = false;
			 abstract_text.hidden = true;
			//  abstract.getElementById("id_abstract").value = abstract_text;
			 abstract.children[1].children[0].value = abstract_text.textContent;
			//  loadElementGroupFields(document.getElementById("topography-text").children, 'topography');
			btn_insert_abstract.textContent = "Salva";
			 btn = document.getElementById("insert-abstract").parentElement.removeChild(document.getElementById("insert-abstract"));
			 abstract.appendChild(btn);
		 } else {
			abstract.hidden = true;
			abstract_text.hidden = false;
			btn_insert_abstract.textContent = "Modifica Abstract";
			 btn = document.getElementById("insert-abstract").parentElement.removeChild(document.getElementById("insert-abstract"));
			 saveAbstract(abstract_form, btn);
 
		 }
 
 
	 });

	/********************************************************
	 * Manage insert and deletion of author
	 ********************************************************/
	 let edit_author = document.getElementsByClassName("lemma-link")[0];
	 let authorForm = document.getElementById("authorForm");
	 let author_text = document.getElementsByClassName("lemma-text")[0];
	 let save_author = document.getElementById("save-author");

 
	 edit_author.addEventListener("click", function () { 
			
			authorForm.hidden = false;
			author_text.hidden = true;
			loadAuthorforEdit(edit_author.textContent); 
			//  loadElementGroupFields(document.getElementById("genre-text").children, 'genre');
		
 
 
	 });

	 
	 save_author.addEventListener("click", function () {
		 saveAuthor(author_form);
		//  authorForm.hidden = true;
		//  author_text.hidden = false;
		
		//saveGenres(genre_form, btn);



	});

	var checkBoxBirthDeath = document.getElementById("id_birth_death");
	var checkBoxFloruit = document.getElementById("id_floruit");
	var checkBoxBishop = document.getElementById("id_bishop");

	
	var blockBishop = document.getElementById("block-bishop");
	var blockFloruit = document.getElementById("block-floruit");

	var blockBirth = document.getElementById("block-birth");
	var blockDeath = document.getElementById("block-death");

	checkBoxBirthDeath.addEventListener("click", function () { 
		
		if (this.checked == true){
			blockBirth.hidden = false;
			blockDeath.hidden = false;
		} else {
			blockBirth.hidden = true;
			blockDeath.hidden = true;
		}
	});
	
	checkBoxFloruit.addEventListener("click", function () { 

	  if (this.checked == true){
		blockFloruit.hidden = false;
	  } else {
		blockFloruit.hidden = true;
	  }
	});
	  
	checkBoxBishop.addEventListener("click", function () { 
	
	  if (this.checked == true){
		blockBishop.hidden = false;
	  } else {
		blockBishop.hidden = true;
	  }
	});


	/********************************************************
	 * Manage insert and deletion of work
	 ********************************************************/
	 let edit_work = document.getElementsByClassName("lemma-link")[1];
	 let workForm = document.getElementById("workForm");
	 let work_text = document.getElementsByClassName("lemma-text")[1];
	 let save_work = document.getElementById("save-work");
 
	 edit_work.addEventListener("click", function () { 
		 
			workForm.hidden = false;
			work_text.hidden = true;
			// loadAuthorforEdit(edit_author.textContent); 
			//  loadElementGroupFields(document.getElementById("genre-text").children, 'genre');
		
 
 
	 });

	 save_work.addEventListener("click", function () { 
		workForm.hidden = true;
		work_text.hidden = false;
		saveWork(work_form);
		//saveGenres(genre_form, btn);



	});

    /********************************************************
	 * Accordion of print edition management
	 ********************************************************/

	// Get the array of citations accordion buttons
	var pe_acc = document.getElementsByClassName("pe-accordion"); 
	
	// Add the onclick event to citations accordion that show or hide the citations
	for (var i = 0; i < pe_acc.length; i++) {
		pe_acc[i].addEventListener("click", function () {
			/* Toggle between adding and removing the "active" class,
			to highlight the button that controls the panel */
			this.classList.toggle("active");

			/* Toggle between hiding and showing the active panel */
			var panel = this.nextElementSibling;
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
			}
		});
	}

    /********************************************************
	 * Accordion of manuscript management
	 ********************************************************/
	// Get the array of citations accordion buttons
	var m_acc = document.getElementsByClassName("m-accordion"); 
	
	// Add the onclick event to citations accordion that show or hide the citations
	for (var i = 0; i < m_acc.length; i++) {
		m_acc[i].addEventListener("click", function () {
			/* Toggle between adding and removing the "active" class,
			to highlight the button that controls the panel */
			this.classList.toggle("active");

			/* Toggle between hiding and showing the active panel */
			var panel = this.nextElementSibling;
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
			}
		});
	}

    /********************************************************
	 * Transform IRIs into names in loaded citations
	 ********************************************************/
	var iris = document.getElementsByClassName("is-iri");

	Array.from(iris).forEach(function(iri) {
		if (iri.textContent) {
			dataFromIRI(iri.textContent).then((context) => {
				if (context) iri.textContent = context.text;
			})
		}
	});

	/********************************************************
	 * Transform usernames into names
	 ********************************************************/
	 var users = document.getElementsByClassName("is-user");

	 Array.from(users).forEach(function(user) {
		 if (user.textContent) {
			dataFromUsers(user.textContent).then((context) => {
				 if (context) user.textContent = context.first_name + " " + context.last_name;
			 })
		 }
	 });

    /********************************************************
	 * Modal to cancel a manuscript or print edition
	 ********************************************************/

    // Manuscript

	// Get the buttons that opens the modal
	var btn_modal_manuscript = document.getElementsByClassName("btn-modal-m");

	// Get the modal
	var manuscript_delete_modal = document.getElementById("del-manuscript-modal");


	// Add click events to open modal 
	for (var i = 0; i < btn_modal_manuscript.length; i++) {
		btn_modal_manuscript[i].addEventListener("click", function () {
			id = this.id.split("-")[3];
			var btn_del_manuscript = document.getElementsByClassName("btn-del-manuscript")[0];
			btn_del_manuscript.id = "del-manuscript-" + id;
            manuscript_delete_modal.style.display = "block";

		});
	}

	// Print edition

	// Get the buttons that opens the modal
	var btn_modal_print_edition = document.getElementsByClassName("btn-modal-pe");

	// Get the modal
	var print_edition_delete_modal = document.getElementById("del-print-edition-modal");

	// Add click events to open modal 
	for (var i = 0; i < btn_modal_print_edition.length; i++) {
		btn_modal_print_edition[i].addEventListener("click", function () {
			id = this.id.split("-")[3];
			var btn_del_print_edition = document.getElementsByClassName("btn-del-print-edition")[0];
			btn_del_print_edition.id = "del-prin-edition-" + id;
                        print_edition_delete_modal.style.display = "block";

		});
	}

	// Get all the close buttons that close the modals
	var closeButtons = document.getElementsByClassName("close-modal");

	// For each button, add click event to close modal
	for (var i = 0; i < closeButtons.length; i++) {
		closeButtons[i].addEventListener("click", function () {
			this.parentElement.parentElement.style.display = "none";
		});
	}

	// When the user clicks anywhere outside of a modal, close it
	window.addEventListener("click", function (event) {
		let classList = event.target.classList;
		if (classList.contains('del-modal') || classList.contains('add-modal')) {
			event.target.style.display = "none";
		}
	});

    /********************************************************
	* Show the for for insert a manuscript
    * or a print edition
	********************************************************/
	
	// Get the forms
	var work_type = document.getElementById("id_work_type");
	var manuscriptForm = document.getElementById("manuscriptForm");
	var printEditionForm = document.getElementById("printEditionForm");
	

	work_type.addEventListener("change", function () {

		// var work_type = document.getElementById("id_work_type");
		var selectedOption = work_type.options[work_type.selectedIndex].value;
		if((document.getElementById("printEditionForm").parentElement.classList[0]=="print-edition-form-space")||
				(document.getElementById("manuscriptForm").parentElement.classList[0]=="manuscript-form-space")){
					document.getElementById("modal-open-form").style.display = "block";
			} else{

		if (selectedOption === "MANOSCRITTO") {
			
				
			manuscriptForm.hidden = false;
			printEditionForm.hidden = true;
			
		} else if (selectedOption === "EDIZIONE A STAMPA") {
			
				printEditionForm.hidden = false;
				manuscriptForm.hidden = true;

			
		} else {
			
			printEditionForm.hidden = true;
			manuscriptForm.hidden = true;
			}
		}

	});


    /********************************************************
	 * Show form to insert a sheet
	 ********************************************************/
	
	var workTypeForm = document.getElementById("workTypeForm");
	var insert_sheet = document.getElementById("insert-sheet");
	insert_sheet.addEventListener("click", function () {
		
		workTypeForm.hidden = false;
		insert_sheet.hidden = true;
			
	
	});

	/********************************************************
	* Show date edition
	********************************************************/
	// Get the forms
	var edition = document.getElementById("id_edition");
	var label_date_edition = document.getElementById("label-date-edition")
	var field_date_edition = document.getElementById("field-date-edition")
	

	edition.addEventListener("change", function () {

		// var work_type = document.getElementById("id_work_type");
		var selectedOption = edition.options[edition.selectedIndex].value;
		

		if (selectedOption === "RISTAMPA" || selectedOption === "FACSIMILE" || selectedOption === "ANASTATICA") {
			label_date_edition.hidden = false;
			field_date_edition.hidden = false;
		} else {
			label_date_edition.hidden = true;
			field_date_edition.hidden = true;
		}

	});

	/********************************************************
	* Show Language
	********************************************************/
	// Get the forms
	var ecdotic = document.getElementById("id_ecdotic_typology");
	var label_language = document.getElementById("label-language")
	var field_language = document.getElementById("field-language")
	

	ecdotic.addEventListener("change", function () {

		// var work_type = document.getElementById("id_work_type");
		var selectedOption = ecdotic.options[ecdotic.selectedIndex].value;
		

		if (selectedOption === "EDIZIONE CRITICA CON TRADUZIONE" || selectedOption === "EDIZIONE CRITICA COMMENTATA CON TRADUZIONE") {
			label_language.hidden = false;
			field_language.hidden = false;
		} else {
			label_language.hidden = true;
			field_language.hidden = true;
		}

	});

	/********************************************************
	 * button cancel manuscipt event
	 ********************************************************/
	let cancel_manuscript = document.getElementById("cancel-manuscript");

	cancel_manuscript.addEventListener("click", function () {
			document.getElementById("manuscriptForm").reset();
			document.getElementById("manuscriptForm").hidden = true;
			workTypeForm.hidden = true;
			insert_sheet.hidden = false;

			// Reset popovers
			resetPopovers();
	});

	/********************************************************
	 * button cancel print edition event
	 ********************************************************/
	let cancel_print_edition = document.getElementById("cancel-print-edition");

	cancel_print_edition.addEventListener("click", function () {
			document.getElementById("printEditionForm").reset();
			document.getElementById("printEditionForm").hidden = true;
			workTypeForm.hidden = true;
			insert_sheet.hidden = false;

			// Reset popovers
			resetPopovers();
	});
	
		


    /********************************************************
	 * Button for update manuscript.
	 * Load manuscript into form
	 ********************************************************/
	let m_buttons = document.getElementsByClassName("btn-m");
	for (var i = 0; i < m_buttons.length; i++) {
		loadManuscriptForEdit(m_buttons[i], data, manuscript_form);

	}

	/********************************************************
	 * Button for update print edition.
	 * Load print edition into form
	 ********************************************************/
	 let pe_buttons = document.getElementsByClassName("btn-pe");
	 for (var i = 0; i < pe_buttons.length; i++) {
		 loadPrintEditionForEdit(pe_buttons[i], data, print_edition_form);
	 }


	
	/********************************************************
	* Button save manuscript
	* Insert a new manuscript or update changes to manuscript
	 ********************************************************/
   	let insert_manuscript_btn = document.getElementById("insert-manuscript");

		insert_manuscript_btn.addEventListener("click", function () {
		// // Prevent page reload
		// event.preventDefault();

		// Get Django CSRF token
		let csrf = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

		// Set request headers
		let headers = new Headers();
		headers.append('X-CSRFToken', csrf);
		headers.append('X-Requested-With', 'XMLHttpRequest');


		// Create new FormData object and populate it
		let formData = new FormData(manuscript_form);
		for (let field of formData) {
			console.log(field);
			// if(field[0]=="source_manuscript_set-TOTAL_FORMS"){
			// 	total_form = field[1]
			// }
			// console.log(total_form)
		}

		// Get current URL (should include object ID)
		let url = window.location.href;
		if(document.getElementById("manuscriptForm").parentElement.classList[0]=="manuscript-form-space"){
			id_manuscript = document.getElementById("manuscriptForm").parentElement.parentElement.id.split("-")[2];
			url = url + "insert_manuscript/" + id_manuscript + "/";
		}else{
			url = url + "insert_manuscript/";
		}
		// Fetch current annotation
		fetch(url,
			{
				method: 'POST',
				body: formData,
				headers: headers,
				mode: 'cors' // questo forse va tolto se non si usa HTTPS?
			})
			.then((response) => {
				return response.json();
			})
			.then((context) => {
				/*
					Qui riceviamo il context in JSON, quindi possiamo
					prendere la variabile "data" e aggiornarla. Volendo si
					può fare la stessa cosa anche per la variabile "json"
					che contiene il JSON formattato
				*/
				// console.log(context.success)
				// console.log(context.errors)
				// console.log(context.errors["url"])
				if(!context.success){
					document.getElementById("invalid-feedback-id_url").style.display = "none";
					document.getElementById("invalid-feedback-id_url_description").style.display = "none";
					document.getElementById("invalid-feedback-id_date_manuscript").style.display = "none";
					for (var i = 0; i < context.errors.length; i++){
						var err = context.errors[i];
						if(err.url){
							console.log("URL non valido");
							document.getElementById("invalid-feedback-id_url").style.display = "block";
						}
						if(err.url_description){
							console.log("URL descrizione non valido");
							document.getElementById("invalid-feedback-id_url_description").style.display = "block";
	
						}
						if(err.date_manuscript){
							document.getElementById("invalid-feedback-id_date_manuscript").textContent = err.date_manuscript[0];
							document.getElementById("invalid-feedback-id_date_manuscript").style.display = "block";
							
						}
					  }
					
				}else{
				lemma_json = context.lemma_json;
				data_l = lemma_json;
				// console.log(data);
				if(document.getElementById("manuscriptForm").parentElement.classList[0]=="manuscript-form-space"){
					information = document.getElementById("manuscriptForm").parentElement.parentElement.firstElementChild;
					loadManuscriptForEdit(information.getElementsByClassName("btn-m")[0], data_l, manuscript_form);
					
					id_manuscript = document.getElementById("manuscriptForm").parentElement.parentElement.id.split("-")[2];
					manoscritto = lemma_json["lemma"]["manoscritti"][id_manuscript];
					form = document.getElementById("manuscriptForm").parentElement.removeChild(document.getElementById("manuscriptForm"));
					
					form_container = document.getElementById("container-manuscript-form");
					form_container.appendChild(form);
					var dl = document.createElement("dl");
					dl.className = "row";
					dl = buildManuscript(dl, manoscritto);
					information.replaceChild(dl, information.firstElementChild);
					information.hidden = false;
					document.getElementById("manuscriptForm").hidden = true;
					information.parentElement.scrollIntoView();

					document.getElementById("manuscriptForm").reset();
					resetPopovers();
					
				}else{
					// Inserire la nuova citazione nel DOM
					var manuscript_accordion = document.getElementById("manuscript-accordion");
					var btn = document.createElement("button");
					if(!manuscript_accordion.firstElementChild){
						new_id = 0;
					} else {
						
						var last_id = manuscript_accordion.lastElementChild.id.split("-")[2];
						new_id = parseInt(last_id) + 1;
					}
					btn_id = "btn-exp-m-" + new_id;
					manoscritto = lemma_json["lemma"]["manoscritti"][lemma_json["lemma"]["manoscritti"].length - 1];

					btn.id = btn_id;
					btn.className = "m-accordion";
					num_manuscript = new_id + 1;
					var text_btn = document.createTextNode("Manoscritto " + num_manuscript);
					btn.appendChild(text_btn);
					btn.addEventListener("click", function () {
						/* Toggle between adding and removing the "active" class,
						to highlight the button that controls the panel */
						this.classList.toggle("active");

						/* Toggle between hiding and showing the active panel */
						var panel = this.nextElementSibling;
						if(panel.getElementsByClassName("manuscript-information")[0].hidden){
							document.getElementById("manuscriptForm").reset();

							// Reset popovers
							resetPopovers();
			
						};
						if (panel.style.maxHeight) {
							panel.style.maxHeight = null;
						} else {
							panel.style.maxHeight = panel.scrollHeight + "px";
						}
					});

					manuscript_accordion.appendChild(btn);
					var div = document.createElement("div");
					div.id = "panel-m-" + new_id;
					div.className = "m-panel";
					var dl = document.createElement("dl");
					dl.className = "row";

					// create a div space for manuscript information in accordion
					var manucript_information = document.createElement("div");
					manucript_information.className = "manuscript-information";

					// create space for manuscript form update
					var manuscript_form_space = document.createElement("div");
					manuscript_form_space.className = "manuscript-form-space";

					dl = buildManuscript(dl, manoscritto);
					div.appendChild(manucript_information);
					manucript_information.appendChild(dl);
					div.appendChild(manuscript_form_space);

					// Btn Edit
					var btn_edit = document.createElement("button");
					btn_edit_id = "m-" + new_id;
					btn_edit.id = btn_edit_id
					btn_edit.className = "btn btn-primary btn-sm btn-m float-right";
					btn_edit.type = "button";
					var i_edit = document.createElement("i");
					i_edit.className = "far fa-edit";
					btn_edit.appendChild(i_edit);
					var text_btn_edit = document.createTextNode(" Modifica");
					btn_edit.appendChild(text_btn_edit);
					loadManuscriptForEdit(btn_edit, data_l, manuscript_form);
					manucript_information.appendChild(btn_edit);

					// Btn Del
					var btn_del = document.createElement("button");
					btn_del_id = "btn-modal-m-" + new_id;
					btn_del.id = btn_del_id
					btn_del.className = "btn btn-danger btn-sm btn-modal-m float-left";
					var i_del = document.createElement("i");
					i_del.className = "fas fa-trash";
					btn_del.appendChild(i_del);
					var text_btn_del = document.createTextNode(" Cancella");
					btn_del.appendChild(text_btn_del);
					manucript_information.appendChild(btn_del);
					btn_del.addEventListener("click", function () {
						id = this.id.split("-")[3];
						var btn_del_m = document.getElementsByClassName("btn-del-manuscript")[0];
						btn_del_m.id = "del-manuscript-" + id;
						manuscript_delete_modal.style.display = "block";

					});

		
					manuscript_accordion.appendChild(div);

					// Reset the form 
					document.getElementById("printEditionForm").reset();
					document.getElementById("manuscriptForm").reset();
					

					resetPopovers();
					// tinyMCE.activeEditor.setContent('');
					// tinymce.get("id_text_fragment").setContent('');
					// tinymce.get("id_source_text").setContent('');

					// hide all forms
					manuscriptForm.hidden = true; // hide
					
					document.getElementById("workTypeForm").reset();

					work_type_form.hidden = true;
					insert_sheet.hidden = false;

					document.getElementById(btn_id).scrollIntoView();
					

			}

				
				// Make sure that IRI fields are empty
				document.getElementById("id_library_location_iri").value = '';
				document.getElementById("id_library_iri").value = '';
				document.getElementById("invalid-feedback-id_url").style.display = "none";
				document.getElementById("invalid-feedback-id_url_description").style.display = "none";
				document.getElementById("invalid-feedback-id_date_manuscript").style.display = "none";
				console.log(document.getElementById('id_source_manuscript_set-TOTAL_FORMS').value)
				// $('#id_source_manuscript_set-TOTAL_FORMS').val(1);

				// document.getElementById("id_theme_area_iri").value = '';
		}
				// console.log(accordion);
			})
			.catch((error) => {
				console.error('Error:', error);
			});

	
		});

    /********************************************************
	 * Bottone salva edizione a stampa.
     * Inserisce una nuova edizione a stampa nel database
     * prendendo i dati dal form
	 ********************************************************/
   	let insert_print_edition_btn = document.getElementById("insert-print-edition");

		insert_print_edition_btn.addEventListener("click", function () {
		// // Prevent page reload
		// event.preventDefault();

		// Get Django CSRF token
		let csrf = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

		// Set request headers
		let headers = new Headers();
		headers.append('X-CSRFToken', csrf);
		headers.append('X-Requested-With', 'XMLHttpRequest');


		// Create new FormData object and populate it
		let formData = new FormData(print_edition_form);

		// Get current URL (should include object ID)
		let url = window.location.href;
		if(document.getElementById("printEditionForm").parentElement.classList[0]=="print-edition-form-space"){
			id_print_edition = document.getElementById("printEditionForm").parentElement.parentElement.id.split("-")[2];
			url = url + "insert_print_edition/" + id_print_edition + "/";
		}else{
			url = url + "insert_print_edition/";
		}

		// Fetch current annotation
                console 
		fetch(url,
			{
				method: 'POST',
				body: formData,
				headers: headers,
				mode: 'cors' // questo forse va tolto se non si usa HTTPS?
			})
			.then((response) => {
				return response.json();
			})
			.then((context) => {
				/*
					Qui riceviamo il context in JSON, quindi possiamo
					prendere la variabile "data" e aggiornarla. Volendo si
					può fare la stessa cosa anche per la variabile "json"
					che contiene il JSON formattato
				*/
				if(!context.success){
					document.getElementById("invalid-feedback-id_date_print_edition").style.display = "none";
					for (var i = 0; i < context.errors.length; i++){
						var err = context.errors[i];
						if(err.date_print_edition){
							document.getElementById("invalid-feedback-id_date_print_edition").textContent = err.date_print_edition[0];
							document.getElementById("invalid-feedback-id_date_print_edition").style.display = "block";
							
						}
					  }
					
				}else{
				lemma_json = context.lemma_json;
				data = lemma_json;
				console.log(data);
				
				//Update json field
				// jsonField.textContent = context.json;

				if(document.getElementById("printEditionForm").parentElement.classList[0]=="print-edition-form-space"){
					information = document.getElementById("printEditionForm").parentElement.parentElement.firstElementChild;
					loadPrintEditionForEdit(information.getElementsByClassName("btn-pe")[0], data, print_edition_form);
					
					id_print_edition = document.getElementById("printEditionForm").parentElement.parentElement.id.split("-")[2];
					print_edition = lemma_json["lemma"]["edizioniStampa"][id_print_edition];
					form = document.getElementById("printEditionForm").parentElement.removeChild(document.getElementById("printEditionForm"));
					
				
					form_container = document.getElementById("container-print-edition-form");

					form_container.appendChild(form);
					
					var dl = document.createElement("dl");
					dl.className = "row";

					dl = buildPrintEdition(dl, print_edition);

					information.replaceChild(dl, information.firstElementChild);
					// manucript_information.appendChild(dl);

					information.hidden = false;

					document.getElementById("printEditionForm").hidden = true;

					information.parentElement.scrollIntoView();

					document.getElementById("printEditionForm").reset();
				}else{

				// Inserire la nuova citazione nel DOM
				var print_edition_accordion = document.getElementById("print-edition-accordion");
				// console.log(accordion);
				var btn = document.createElement("button");
				if(!print_edition_accordion.firstElementChild){
					new_id = 0;
					// console.log(newId);
				} else {
					
					var last_id = print_edition_accordion.lastElementChild.id.split("-")[2];
					// console.log(lastId);
					new_id = parseInt(last_id) + 1;
					// console.log(newId);
				}
				btn_id = "btn-exp-pe-" + new_id;
				// console.log(btnId);
				edizione_stampa = lemma_json["lemma"]["edizioniStampa"][lemma_json["lemma"]["edizioniStampa"].length - 1];

				btn.id = btn_id;
				btn.className = "pe-accordion";
				num_print_edition = new_id + 1;
				var text_btn = document.createTextNode("Edizione a stampa " + num_print_edition);
				btn.appendChild(text_btn);
				btn.addEventListener("click", function () {
					/* Toggle between adding and removing the "active" class,
					to highlight the button that controls the panel */
					this.classList.toggle("active");

					/* Toggle between hiding and showing the active panel */
					var panel = this.nextElementSibling;
					if(panel.getElementsByClassName("print-edition-information")[0].hidden){
						document.getElementById("printEditionForm").reset();
	
						// Reset popovers
						resetPopovers();
		
					};
					if (panel.style.maxHeight) {
						panel.style.maxHeight = null;
					} else {
						panel.style.maxHeight = panel.scrollHeight + "px";
					}
				});

				print_edition_accordion.appendChild(btn);

				var div = document.createElement("div");
				div.id = "panel-pe-" + new_id;
				div.className = "pe-panel";
				var dl = document.createElement("dl");
				dl.className = "row";

                // create a div space for manuscript information in accordion
				var print_edition_information = document.createElement("div");
				print_edition_information.className = "print-edition-information";

                // create space for manuscript form update
				var print_edition_form_space = document.createElement("div");
				print_edition_form_space.className = "print-edition-form-space";

				dl = buildPrintEdition(dl, edizione_stampa);
				// console.log(dl);

				div.appendChild(print_edition_information);
				print_edition_information.appendChild(dl);
				div.appendChild(print_edition_form_space);

				// Btn Edit
				var btn_edit = document.createElement("button");
				btn_edit_id = "pe-" + new_id;
				btn_edit.id = btn_edit_id
				btn_edit.className = "btn btn-primary btn-sm btn-pe float-right";
				btn_edit.type = "button";
				var i_edit = document.createElement("i");
				i_edit.className = "far fa-edit";
				btn_edit.appendChild(i_edit);
				var text_btn_edit = document.createTextNode(" Modifica");
				btn_edit.appendChild(text_btn_edit);
				loadPrintEditionForEdit(btn_edit, data, print_edition_form);
				print_edition_information.appendChild(btn_edit);


				// Btn Del
				var btn_del = document.createElement("button");
				btn_del_id = "btn-modal-pe-" + new_id;
				btn_del.id = btn_del_id
				btn_del.className = "btn btn-danger btn-sm btn-modal-pe float-left";
				var i_del = document.createElement("i");
				i_del.className = "fas fa-trash";
				btn_del.appendChild(i_del);
				var text_btn_del = document.createTextNode(" Cancella");
				btn_del.appendChild(text_btn_del);
				print_edition_information.appendChild(btn_del);
				btn_del.addEventListener("click", function () {
					id = this.id.split("-")[3];
					var btn_del_pe = document.getElementsByClassName("btn-del-print-edition")[0];
					btn_del_pe.id = "del-print-edition-" + id;
					print_edition_delete_modal.style.display = "block";

				});

	
				print_edition_accordion.appendChild(div);
				// console.log(print_edition_accordion);
				
			

				// Reset the form 
				document.getElementById("printEditionForm").reset();
				document.getElementById("manuscriptForm").reset();
				// tinyMCE.activeEditor.setContent('');
				// tinymce.get("id_text_fragment").setContent('');
				// tinymce.get("id_source_text").setContent('');

				// hide formsets
				// hideFormsets(formsets_id);

				// hide all forms
				printEditionForm.hidden = true; // hide
				
				document.getElementById("workTypeForm").reset();
				work_type_form.hidden = true;
				insert_sheet.hidden = false;

				document.getElementById(btn_id).scrollIntoView();

					

				
				// Make sure that IRI fields are empty
				
				// document.getElementById("id_cited_author_iri").value = '';
				// document.getElementById("id_theme_area_iri").value = '';

				// console.log(accordion);
			}
			document.getElementById("id_place_iri").value = '';
			document.getElementById("invalid-feedback-id_date_print_edition").style.display = "none";
			resetPopovers();
		}
			})
			.catch((error) => {
				console.error('Error:', error);
			});


	});

    /********************************************************
	 *  Event to delete a manuscript
	 ********************************************************/
	
	
	var manuscript_del_button = document.getElementsByClassName("btn-del-manuscript")[0];

	manuscript_del_button.addEventListener("click", function () {
		// // Prevent page reload
		// event.preventDefault();

		id = this.id.split("-")[2];
		//cit = data.Nota.Citazioni[id];

		modalid = "deleteCitModal" + id;


		// Get Django CSRF token
		let csrf = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

		// Set request headers
		let headers = new Headers();
		headers.append('X-CSRFToken', csrf);
		headers.append('X-Requested-With', 'XMLHttpRequest');

                // Create new FormData object and populate it
		let formData = new FormData(lemma_form);

		// Check content of FormData object
		for (let field of formData) {
			console.log(field);
		}

		// Get current URL (should include object ID)
		let url = window.location.href;

		url = url + "delete_manuscript/" + id + "/";

		// Fetch current annotation
		fetch(url,
			{
				method: 'POST',
				body: formData,
				headers: headers,
				mode: 'cors' // questo forse va tolto se non si usa HTTPS?
			})
			.then((response) => {
				return response.json();
			})
			.then((context) => {
				/*
					Qui riceviamo il context in JSON, quindi possiamo
					prendere la variabile "data" e aggiornarla. Volendo si
					può fare la stessa cosa anche per la variabile "json"
					che contiene il JSON formattato
				*/

				data = context.data;

				//Update json field
				// jsonField.textContent = context.json;

				
			})
			.catch((error) => {
				console.error('Error:', error);
			});
             // Get lenght of manuscripts accorditions
			manuscript_acc_lenght = m_acc.length;

            // Close the modal
			manuscript_delete_modal.style.display = "none";

            // Built ids of the elements to remove
			id_m_panel = "panel-m-" + id; // id of the panel div
			id_btn_exp_m = "btn-exp-m-" + id; // id of the button to expand accordion
			
			// get the elements to remove
			let button_exp_m = document.getElementById(id_btn_exp_m);
			let m_panel = document.getElementById(id_m_panel);

			// remove the elements
			button_exp_m.parentNode.removeChild(button_exp_m);
			m_panel.parentNode.removeChild(m_panel);
		
			// renumber the accordition manuscript elements
			if(id!=(manuscript_acc_lenght-1)){
				
				for (var k = parseInt(id) + 1; k < manuscript_acc_lenght; k++) {
					new_id = k - 1;
					temp_id = "btn-exp-m-" + k;
					// rename btn expand text of accordion
					document.getElementById(temp_id).textContent = "Manoscritto " + k;
					// change id of btn expand
					document.getElementById(temp_id).id = "btn-exp-m-" + new_id;
					// change id of panel
					temp_id = "panel-m-" + k;
					document.getElementById(temp_id).id = "panel-m-" + new_id;
					// change id of update btn
					temp_id = "m-" + k;
					document.getElementById(temp_id).id = "m-" + new_id;
					// change id of delete btn
					temp_id = "btn-modal-m-" + k;
					document.getElementById(temp_id).id = "btn-modal-m-" + new_id;
				}

			}
		
			
	});

    /********************************************************
	 *  Event to delete a print edition
	 ********************************************************/
	
	var print_edition_del_button = document.getElementsByClassName("btn-del-print-edition")[0];

	print_edition_del_button.addEventListener("click", function () {
		// // Prevent page reload
		// event.preventDefault();

		id = this.id.split("-")[3];
		//cit = data.Nota.Citazioni[id];

		modalid = "deleteCitModal" + id;


		// Get Django CSRF token
		let csrf = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

		// Set request headers
		let headers = new Headers();
		headers.append('X-CSRFToken', csrf);
		headers.append('X-Requested-With', 'XMLHttpRequest');

                // Create new FormData object and populate it
		let formData = new FormData(lemma_form);

		// Check content of FormData object
		for (let field of formData) {
			console.log(field);
		}

		// Get current URL (should include object ID)
		let url = window.location.href;

		url = url + "delete_print_edition/" + id + "/";
		// window.open(url); 
		// Fetch current annotation
		fetch(url,
			{
                method: 'POST',
				body: formData,
				headers: headers,
				mode: 'cors' // questo forse va tolto se non si usa HTTPS?
			})
			.then((response) => {
				return response.json();
			})
			.then((context) => {
				/*
					Qui riceviamo il context in JSON, quindi possiamo
					prendere la variabile "data" e aggiornarla. Volendo si
					può fare la stessa cosa anche per la variabile "json"
					che contiene il JSON formattato
				*/

				data = context.data;

				//Update json field
				// jsonField.textContent = context.json;

				
			})
			.catch((error) => {
				console.error('Error:', error);
			});
			// Get lenght of print edition accorditions
			print_edition_acc_lenght = pe_acc.length;

			// Close the modal
			print_edition_delete_modal.style.display = "none";

			// Built ids of the elements to remove
			id_pe_panel = "panel-pe-" + id; // id of the panel div
			id_btn_exp_pe = "btn-exp-pe-" + id; // id of the button to expand accordion
			
			// get the elements to remove
			let button_exp_pe = document.getElementById(id_btn_exp_pe);
			let pe_panel = document.getElementById(id_pe_panel);

			// remove the elements
			button_exp_pe.parentNode.removeChild(button_exp_pe);
			pe_panel.parentNode.removeChild(pe_panel);
		
			// renumber the accordition manuscript elements
			if(id!=(print_edition_acc_lenght-1)){
				
				for (var k = parseInt(id) + 1; k < print_edition_acc_lenght; k++) {
					new_id = k - 1;
					temp_id = "btn-exp-pe-" + k;
					// rename btn expand text of accordion
					document.getElementById(temp_id).textContent = "Edizione a stampa " + k;
					// change id of btn expand
					document.getElementById(temp_id).id = "btn-exp-pe-" + new_id;
					// change id of panel
					temp_id = "panel-pe-" + k;
					document.getElementById(temp_id).id = "panel-pe-" + new_id;
					// change id of update btn
					temp_id = "pe-" + k;
					document.getElementById(temp_id).id = "pe-" + new_id;
					// change id of delete btn
					temp_id = "btn-modal-pe-" + k;
					document.getElementById(temp_id).id = "btn-modal-pe-" + new_id;
				}

			}
		
			
	});

	/********************************************************
	*	Qui sotto viene catturato l'evento submit sul lemma form, 
	*	bloccando il reload automatico della pagina
	*********************************************************/


	// Add event listener on lemma form
	lemma_form.addEventListener('submit', function (event) {

		// Prevent page reload
		event.preventDefault();

		// Get Django CSRF token
		let csrf = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

		// Set request headers
		let headers = new Headers();
		headers.append('X-CSRFToken', csrf);
		headers.append('X-Requested-With', 'XMLHttpRequest');

		// Create new FormData object and populate it
		let formData = new FormData(this);

		// Check content of FormData object
		for (let field of formData) {
			console.log(field);
		}

		// Reset popovers
		resetPopovers();

		// Get current URL (should include object ID)
		let url = window.location.href;	

		// Fetch current annotation
		fetch(url,
			{
				method: 'POST',
				body: formData,
				headers: headers,
				mode: 'cors'
			})
			.then((response) => {
				return response.json();
			})
			.then((context) => {
				/*
					Qui riceviamo il context in JSON, quindi possiamo
					prendere la variabile "data" e aggiornarla. Volendo si
					può fare la stessa cosa anche per la variabile "json"
					che contiene il JSON formattato
				*/

				data = context.lemma_json;
				console.log(data);
				duplicate = context.duplicate;
				author_id = context.author_id;
				work_id = context.work_id;
                // lemma_id = context.lemma_id
				// console.log(work_id);
				// console.log(author_id);
				// console.log(duplicate);

				// if lemma inserted is duplicated
				if(duplicate==1){
					
					// console.log("prova");
					// Retrieve lemma
					url = "/tool/annotation/lemma/" + author_id + "/" + work_id + "/";
					// Open modal or something to notify the user
					var go_duplicate_btn = document.getElementById("go-duplicate");
					// console.log(go_duplicate_btn);
					go_duplicate_btn.addEventListener("click", function () {
						//redirect to url page
						window.location.href = url;
					});
					// Get the modal
					var duplicate_modal = document.getElementById("duplicate-modal");
					// console.log(duplicate_modal);
					duplicate_modal.style.display = "block";
					// the modal show the link to the duplicate event


				}else{

				lemma = data["lemma"];

				
				//Update json field
				// jsonField.textContent = context.json;
				document.getElementById('id_author').disabled = true;
				document.getElementById('id_work').disabled = true;
				document.getElementById("insert-sheet").hidden = false;
				document.getElementById("topography-group").hidden = false;
				document.getElementById("genre-group").hidden = false;

				// Show update lemma and new lemma buttons
				document.getElementById("insert-lemma").style.display = "none";

				// Fetch names from IRIs and put them in input fields
				if (lemma["autore"]) {
					dataFromIRI(lemma["autore"]).then(result => document.getElementById("id_author").value = result.text);
					document.getElementById("id_author_iri").value = lemma["autore"];
				}
				if (lemma["opera"]) {
					dataFromIRI(lemma["opera"]).then(result =>document.getElementById("id_work").value = result.text);
					document.getElementById("id_work_iri").value = lemma["opera"];
				}

				new_url = window.location.href + author_id + "/" + work_id + "/";
				window.history.pushState({}, '', new_url);
				
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});


		// Return false to avoid page reload
		return false;
	});
	
	/*
		Autocomplete for input fields (jQuery Q_Q)
	*/

    // Initialize autocomplete fields
    $('#id_author, #id_place, #id_genre_set-0-genre, #id_library, #id_library_location, #id_topography_set-0-topography, #id_source_manuscript_set-0-source_manuscript, #id_source_print_edition_set-0-source_print_edition').autoComplete({
            resolverSettings: {
                    url: $(this).attr('data-url'),
                    fail: autocompleteFail
            },
            minLength: 0,
            preventEnter: true,
            events: {searchPost: filterByLength}
    });
    $('#id_work').autoComplete({
            resolverSettings: {
                    url: $(this).attr('data-url'),
                    fail: autocompleteFail
            },
            minLength: 0,
            preventEnter: true,
            events: {searchPre: filterByAuthor, searchPost: highlightMissing}
    });

	// $('#id_library').autoComplete({
	// 	resolverSettings: {
	// 			url: $(this).attr('data-url'),
	// 			fail: autocompleteFail
	// 	},
	// 	minLength: 0,
	// 	preventEnter: true,
	// 	events: {searchPre: filterByPlace}
	// });

    // Add Wikidata autocomplete for works
    $('#add-work-wd').autoComplete({
            minLength: 3,
            preventEnter: true,
            resolver: 'custom',
            events: {
                    search: function (userInput, callback) {
                            // If there is a new query, cancel the previous one
                            if (this.timeoutID) {
                                    window.clearTimeout(this.timeoutID);
                            }
                            // Run Wikidata query
                            this.timeoutID = setTimeout(
                                    function() {runWikidataQuery('work', userInput, callback)}, 200
                            );
                    },
                    searchPost: filterByLength
            }
    });

    // Add Wikidata autocomplete for authors
    $('#add-author-wd').autoComplete({
            minLength: 3,
            preventEnter: true,
            resolver: 'custom',
            events: {
                    search: function (userInput, callback) {
                            // If there is a new query, cancel the previous one
                            if (this.timeoutID) {
                                    window.clearTimeout(this.timeoutID);
                            }
                            // Run Wikidata query
                            this.timeoutID = setTimeout(
                                    function() {runWikidataQuery('author', userInput, callback)}, 200
                            );
                    },
                    searchPost: filterByLength
            }
    });

    // Add Wikidata autocomplete for librarys
    $('#add-library-wd').autoComplete({
            minLength: 3,
            preventEnter: true,
            resolver: 'custom',
            events: {
                    search: function (userInput, callback) {
                            // If there is a new query, cancel the previous one
                            if (this.timeoutID) {
                                    window.clearTimeout(this.timeoutID);
                            }
                            // Run Wikidata query
                            this.timeoutID = setTimeout(
                                    function() {runWikidataQuery('library', userInput, callback)}, 200
                            );
                    },
                    searchPost: filterByLength
            }
    });

	// Add Wikidata autocomplete for locations
	$('#add-location-wd').autoComplete({
		minLength: 3,
		preventEnter: true,
		resolver: 'custom',
		events: {
				search: function (userInput, callback) {
						// If there is a new query, cancel the previous one
						if (this.timeoutID) {
								window.clearTimeout(this.timeoutID);
						}
						// Run Wikidata query
						this.timeoutID = setTimeout(
								function() {runWikidataQuery('location', userInput, callback)}, 200
						);
				},
		searchPost: filterByLength
		}
});


	
	// Add Wikidata autocomplete for places
	$('#add-place-wd').autoComplete({
			minLength: 3,
			preventEnter: true,
			resolver: 'custom',
			events: {
					search: function (userInput, callback) {
							// If there is a new query, cancel the previous one
							if (this.timeoutID) {
									window.clearTimeout(this.timeoutID);
							}
							// Run Wikidata query
							this.timeoutID = setTimeout(
									function() {runWikidataQuery('place', userInput, callback)}, 200
							);
					},
			searchPost: filterByLength
			}
	});


    // Initialize popovers
    $('[data-toggle="popover"]').popover({html: true, trigger: 'focus', container: 'body'});

    // Prevent autocomplete from adding garbage to URL
    $('.container').on('click', '.dropdown-item', function (e) {
            e.preventDefault();
            e.stopPropagation();
            return true;
    });

    // Remember initial popover title
    $('.autocomplete').each(function(i) {
            $(this).attr('data-default-title', $(this).attr('data-original-title'));
    });

    // On autocomplete keydown, reset IRI field and popover
    $('body').on('keydown', '.autocomplete', function(e) {
            let target = $(e.target);
            let iriField = $('#' + target.attr('id') + '_iri');

            // If IRI field is not empty, reset everything
            if (iriField.val() !== '') {
                    iriField.val('');
                    target.popover('hide');
                    resetPopovers('#' + target.attr('id'));
                    target.focus();
            }
    });

    // On autocomplete focus, show the list if IRI field is empty
    $('body').on('focus', '.autocomplete', function(e) {
            let target = $(e.target);
            if ($('#' + target.attr('id') + '_iri').val() === '') {
                    target.autoComplete('show');
            }
            // Add reference to element inside its popover
            if ($(e.target).data("bs.popover")) {
                $($(e.target).data("bs.popover").tip).attr('from', e.target.id);
            }
    });

    // Allow click on popover content
    $('body').on('mousedown', '.popover', function(e) {
            e.preventDefault();
    });

    // Show modal when clicking on button to add new work
    $('body').on('click', '.add-work-btn', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('.autocomplete').autoComplete('hide');
            $('#add-work-modal').show();
    });

    // Show modal when clicking on button to add new author
    $('body').on('click', '.add-author-btn', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('.autocomplete').autoComplete('hide');
            $('#add-author-modal').show();
    });

    // Show modal when clicking on button to add new author
    $('body').on('click', '.add-library-btn', function(e, b) {
            e.preventDefault();
            e.stopPropagation();
            $('.autocomplete').autoComplete('hide');
            $('#add-library-modal').attr('target',
                $(e.target.parentElement.parentElement).attr('from'));
            $('#add-library-modal').show();
    });

	// Show modal when clicking on button to add new author
    $('body').on('click', '.add-location-btn', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('.autocomplete').autoComplete('hide');
		$('#add-location-modal').attr('target',
			$(e.target.parentElement.parentElement).attr('from'));
		$('#add-location-modal').show();
});

    // Show modal when clicking on button to add new author
    $('body').on('click', '.add-place-btn', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('.autocomplete').autoComplete('hide');
            $('#add-place-modal').attr('target',
                $(e.target.parentElement.parentElement).attr('from'));
            $('#add-place-modal').show();
    });

	// Show modal when clicking on button to add new source
    $('body').on('click', '.add-source-btn', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('.autocomplete').autoComplete('hide');
		$('#add-source-modal').attr('target',
			$(e.target.parentElement.parentElement).attr('from'));
		$('#add-source-modal').show();
});

    // On autocomplete blur, empty the field if nothing has been selected
    $('body').on('blur', '.autocomplete', function(e) {
            let target = $(e.target);

	    if ($('#' + target.attr('id') + '_iri').val() === '') {
		    target.val('');
            }
    });

    // On autocomplete select, set popover content
    $('body').on('autocomplete.select', '.autocomplete', function(e, item) {
	    
	    // Target element
            let target = $(e.target);

	    // Fix value of field if needed
	    target.val(target.val().split('<')[0].trim());
            
	    // Set popover content
		target.attr('data-original-title', item.text);
		target.attr('data-content', '<a target=_blank href='+item.id+'>'+item.id+'</a>');

		// Set value of hidden field
		$('#' + target.attr('id') + '_iri').val(item.id);

		// Set place when library is selected
		// if (target.attr('id') === 'id_library' && item.place != MISSING_IRI) {
		// 	// console.log(item)
		// 	let url = '/tool/annotation/entity?iri=' + item.place;
		// 	fetch(url)
		// 	.then((response) => {
		// 		return response.json();
		// 	})
		// 	.then((context) => {
		// 		// console.log(context);
		// 		fillLocationField(context, "id_library_location");
		// 	})
		// 	.catch((error) => {
		// 			console.error('Error loading places:', error);
		// 	});
		// }
		// // Make sure that place and library match
		// else if (target.attr('id') === 'id_library_location') {
		// 	let url = '/tool/annotation/entity?iri=' + $('#id_library_iri').val();
		// 	fetch(url)
		// 	.then((response) => {
		// 			return response.json();
		// 	})
		// 	.then((context) => {
		// 		// console.log(context)
		// 			if (context.place !== $('#id_library_location_iri').val() && context.place !== MISSING_IRI) {
		// 					$('#id_library').val('');
		// 					$('#id_library_iri').val('');
		// 					resetPopovers('#id_library');
		// 			}
		// 	})
		// 	.catch((error) => {
		// 			console.error('Error loading authors:', error);
		// 	});
		// }

		// Set author when work is selected
		if (target.attr('id') === 'id_work' && item.author != MISSING_IRI) {
				let url = '/tool/annotation/entity?iri=' + item.author;
				fetch(url)
				.then((response) => {
						return response.json();
				})
				.then((context) => {
					// console.log(context);
						fillAuthorField(context);
				})
				.catch((error) => {
						console.error('Error loading works:', error);
				});
		}
		// Make sure that author and work match
		else if (target.attr('id') === 'id_author') {
				let url = '/tool/annotation/entity?iri=' + $('#id_work_iri').val();
				fetch(url)
				.then((response) => {
						return response.json();
				})
				.then((context) => {
					// console.log(context)
						if (context.author !== $('#id_author_iri').val() && context.author !== MISSING_IRI) {
								$('#id_work').val('');
								$('#id_work_iri').val('');
								resetPopovers('#id_work');
						}
				})
				.catch((error) => {
						console.error('Error loading authors:', error);
				});
		}

		// Modal fields for Wikidata search
		else if ($(this).attr('id').startsWith('add')) {
				$(this).val(item.itemLabel);
		}

		// If preventFocus is false, focus the element
		if (!item.preventFocus) {
				target.focus();
		}
    });

    // On author button click, run Wikidata query
    $('#author-btn').on('click', function(e) {
            $('.add-modal').hide();
            let iri = $('#add-author-wd_iri').val();
            if (iri) {
                    let url = '/tool/annotation/import-author?iri=' + iri;
                    fetch(url)
                    .then((response) => {
                            return response.json();
                    })
                    .then((context) => {
                            fillAuthorField(context);
                    })
                    .catch((error) => {
                            console.error('Error loading author from Wikidata:', error);
                    });
            } else {
                    let author_name = $('#add-author-name').val();
                    if (author_name) {
                            let author_desc = $('#add-author-desc').val();
                            let url = '/tool/annotation/add-author?name=' + author_name + '&desc=' + author_desc;
                            fetch(url)
                            .then((response) => {
                                    return response.json();
                            })
                            .then((context) => {
				    fillAuthorField(context);
                            })
                            .catch((error) => {
                                    console.error('Error adding user-defined author', error);
                            });
                    }
            }
    });

    // On work button click, run Wikidata query
    $('#work-btn').on('click', function(e) {
            $('.add-modal').hide();
            let iri = $('#add-work-wd_iri').val();
            if (iri) {
                    let url = '/tool/annotation/import-work?iri=' + iri;
                    fetch(url)
                    .then((response) => {
                            return response.json();
                    })
                    .then((context) => {
                            fillworkField(context);
                    })
                    .catch((error) => {
                            console.error('Error loading work from Wikidata:', error);
                    });
            } else {
                    let work_title = $('#add-work-title').val();
                    if (work_title) {
                            let work_desc = $('#add-work-desc').val();
                            let url = '/tool/annotation/add-work?title=' + work_title + '&desc=' + work_desc;
                            fetch(url)
                            .then((response) => {
                                    return response.json();
                            })
                            .then((context) => {
                                    fillworkField(context);
                            })
                            .catch((error) => {
                                    console.error('Error adding user-defined work', error);
                            });
                    }
            }
    });

    // On library button click, run Wikidata query
    $('#library-btn').on('click', function(e) {
            $('.add-modal').hide();
            let iri = $('#add-library-wd_iri').val();
            if (iri) {
                    let url = '/tool/annotation/import-library?iri=' + iri;
                    fetch(url)
                    .then((response) => {
                            return response.json();
                    })
                    .then((context) => {
                            fillLibraryField(context, $(this).parents('.add-modal').attr('target'));
                    })
                    .catch((error) => {
                            console.error('Error loading library from Wikidata:', error);
                    });
            } else {
                    let char_name = $('#add-library-name').val();
                    if (char_name) {
                            let char_desc = $('#add-library-desc').val();
                            let url = '/tool/annotation/add-library?name=' + char_name + '&desc=' + char_desc;
                            fetch(url)
                            .then((response) => {
                                    return response.json();
                            })
                            .then((context) => {
                                    fillLibraryField(context, $(this).parents('.add-modal').attr('target'));
                            })
                            .catch((error) => {
                                    console.error('Error adding user-defined library', error);
                            });
                    }
            }
    });

	// On location button click, run Wikidata query
    $('#location-btn').on('click', function(e) {
		$('.add-modal').hide();
		let iri = $('#add-location-wd_iri').val();
		if (iri) {
				let url = '/tool/annotation/import-place?iri=' + iri;
				fetch(url)
				.then((response) => {
						return response.json();
				})
				.then((context) => {
						fillLocationField(context, $(this).parents('.add-modal').attr('target'));
				})
				.catch((error) => {
						console.error('Error loading location from Wikidata:', error);
				});
		} else {
		let location_name = $('#add-location-name').val();
		if (location_name) {
				let location_desc = $('#add-location-desc').val();
				let url = '/tool/annotation/add-place?name=' + location_name + '&desc=' + location_desc;
				fetch(url)
				.then((response) => {
						return response.json();
				})
				.then((context) => {
						fillLocationField(context, $(this).parents('.add-modal').attr('target'));
				})
				.catch((error) => {
						console.error('Error adding user-defined location', error);
				});
		}
		}
    });

    // On place button click, run Wikidata query
    $('#place-btn').on('click', function(e) {
		$('.add-modal').hide();
		let iri = $('#add-place-wd_iri').val();
		if (iri) {
				let url = '/tool/annotation/import-place?iri=' + iri;
				fetch(url)
				.then((response) => {
						return response.json();
				})
				.then((context) => {
						fillPlaceField(context, $(this).parents('.add-modal').attr('target'));
				})
				.catch((error) => {
						console.error('Error loading place from Wikidata:', error);
				});
		} else {
		let place_name = $('#add-place-name').val();
		if (place_name) {
				let place_desc = $('#add-place-desc').val();
				let url = '/tool/annotation/add-place?name=' + place_name + '&desc=' + place_desc;
				fetch(url)
				.then((response) => {
						return response.json();
				})
				.then((context) => {
						fillPlaceField(context, $(this).parents('.add-modal').attr('target'));
				})
				.catch((error) => {
						console.error('Error adding user-defined place', error);
				});
		}
		}
    });

	// On source button click, run Wikidata query
    $('#source-btn').on('click', function(e) {
		$('#error-source').html('')
		let source_name = $('#add-source-name').val();
		if (source_name) {
				let source_desc = $('#add-source-desc').val();
				let url = '/tool/annotation/add-source?name=' + source_name + '&desc=' + source_desc;
				fetch(url)
				.then((response) => {
						return response.json();
				})
				.then((context) => {
						if(context.exist){
							$('#error-source').html("La fonte esiste già, modificare il nome abbreviato");	
						}else{
							$('.add-modal').hide();
							fillSourceField(context, $(this).parents('.add-modal').attr('target'));
						}
				})
				.catch((error) => {
						console.error('Error adding user-defined source', error);
				});
		}
		// }
    });

	/*
		Function to reset popovers to original state
	*/
	function resetPopovers(selector) {
		if (selector === undefined) {
			selector = '[data-toggle=popover]';
		}
		$(selector).each(function() {
			$(this).attr('data-original-title', $(this).attr('data-default-title'));
			$(this).attr('data-content', '');
		});
	}


});


function autocompleteFail(event) {
	console.log(event);
}

function enableAutocomplete(context) {
	$('input[name^=form-],input[name^=genre_set-],input[name^=topography_set-],input[name^=place],input[name^=source_manuscript_set-],input[name^=source_print_edition_set-]', context || null)
	.autoComplete({
		resolverSettings: {
			url: $(this).attr('data-url'),
			fail: autocompleteFail
		},
		minLength: 0,
		preventEnter: true}
	)
	.popover({html: true, trigger: 'focus'})
	.each(function() {
		$(this).attr('data-default-title', $(this).attr('data-original-title'));
	});
}


 /********************************************************
 * Build a manuscript in accordion after insert or update
 ********************************************************/
function buildManuscript(dl, manoscritto){
	
	// citazione = data["Nota"]["Citazioni"][data["Nota"]["Citazioni"].length - 1];

	// Autore
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Autore");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(manoscritto["autore"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

        // Opera
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Opera");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(manoscritto["titolo"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

    // Località
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Località");
	dt.appendChild(text_dt);
	var dd_place = document.createElement("dd");
	dd_place.className = "col-sm-9 text-fragment";
	dl.appendChild(dt);
	dl.appendChild(dd_place);
        if (manoscritto["luogoBiblioteca"]) {
                dataFromIRI(manoscritto["luogoBiblioteca"]).then(result => dd_place.textContent = result.text);
        }

    // Biblioteca
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Biblioteca");
	dt.appendChild(text_dt);
	var dd_library = document.createElement("dd");
	dd_library.className = "col-sm-9 text-fragment";
	dl.appendChild(dt);
	dl.appendChild(dd_library);
        if (manoscritto["biblioteca"]) {
                dataFromIRI(manoscritto["biblioteca"]).then(result => dd_library.textContent = result.text);
        }

    // Segnatura
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Segnatura");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(manoscritto["segnatura"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

    // Fogli
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Fogli");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(manoscritto["fogli"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

	// Incipit dedica / proemio
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Incipit dedica / proemio");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(manoscritto["incipitDedica"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

    // Explicit dedica / proemio
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Explicit dedica / proemio");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(manoscritto["explicitDedica"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

        // Incipit testo
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Incipit testo");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(manoscritto["incipitTesto"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

        // Explicit testo
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Explicit testo");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(manoscritto["explicitTesto"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

    // Datazione
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Datazione");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(manoscritto["datazioneString"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

	// Decorazione
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Decorazione / apparato iconografico");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(manoscritto["decorazione"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

	// Url
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Link al manoscritto");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(manoscritto["url"]);
	a = document.createElement("a");
	a.target = "_blank";
	a.href = manoscritto["url"];
	a.append(text_dd)
	dd.append(a);
	dl.appendChild(dt);
	dl.appendChild(dd);

	// Url descrizione
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Link alla descrizione del manoscritto");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(manoscritto["urlDescrizione"]);
	a = document.createElement("a");
	a.target = "_blank";
	a.href = manoscritto["url"];
	a.append(text_dd)
	dd.append(a);
	dl.appendChild(dt);
	dl.appendChild(dd);


    // Fonti delle notizie
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Fonti delle notizie");
	dt.appendChild(text_dt);
	var ddFonte = document.createElement("dd");
	ddFonte.className = "col-sm-9 text-fragment";
	ddFonte.id = "source-manuscript";
	for (i in manoscritto["fonti"]) {
		var divFonte = document.createElement("div");
		var spanFonte = document.createElement("span");
		var spanSpecific = document.createElement("span");
		var text_spanSpecific = document.createTextNode(manoscritto["fonti"][i]["specific"]);
		var spanIriSources = document.createElement("span");
		spanIriSources.className = "source-manuscript-iri";
		var text_spanIriSources = document.createTextNode(manoscritto["fonti"][i]["iri"]);
		spanSpecific.append(text_spanSpecific);
		spanIriSources.append(text_spanIriSources);
		sourceFromIRI(manoscritto["fonti"][i]["iri"], spanFonte, spanSpecific, spanIriSources, divFonte).then((divFonte) => {
			ddFonte.append(divFonte);
		});
		// div.append(spanFonte);
		// div.append(spanSpecific);
	}
	// dd.append(divFonte);
	dl.appendChild(dt);
	dl.appendChild(ddFonte);

	// Altre eventuali notizie
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Altre eventuali notizie");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	
	var text_dd = document.createTextNode(manoscritto["note"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

	// Schedatore
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Schedatore");
	dt.appendChild(text_dt);
	var ddSchedatore = document.createElement("dd");
	ddSchedatore.className = "col-sm-9 text-fragment";
	dl.appendChild(dt);
	dl.appendChild(ddSchedatore);
        if (manoscritto["schedatore"]) {
                dataFromUsers(manoscritto["schedatore"]).then(result => ddSchedatore.textContent = result.first_name + " " + result.last_name);
        }

	// Ultima modifica
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Ultima modifica");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var milliseconds = manoscritto["lastMod"] * 1000 
	var dateObject = new Date(milliseconds)
	var humanDateFormat = dateObject.toLocaleDateString('en-GB')
	var text_dd = document.createTextNode(humanDateFormat);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

	return dl;
	
}

/********************************************************
 * Build a print edition in accordion after insert or update
 ********************************************************/
function buildPrintEdition(dl, edizioneStampa){
	
	// citazione = data["Nota"]["Citazioni"][data["Nota"]["Citazioni"].length - 1];

	// Autore
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Autore");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(edizioneStampa["autore"]);
	dd.append(text_dd);
	// dd.innerHTML = edizioneStampa["Autore"];
	dl.appendChild(dt);
	dl.appendChild(dd);

	// Opera
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Opera");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(edizioneStampa["titolo"]);
	dd.append(text_dd);
	// dd.innerHTML = edizioneStampa["Titolo"];
	dl.appendChild(dt);
	dl.appendChild(dd);

	// Curatore
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Curatore");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(edizioneStampa["curatore"]);
	dd.append(text_dd);
	// dd.innerHTML = edizioneStampa["Titolo"];
	dl.appendChild(dt);
	dl.appendChild(dd);

	// Luogo
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Luogo");
	dt.appendChild(text_dt);
	var ddLuogo = document.createElement("dd");
	ddLuogo.className = "col-sm-9 text-fragment";
	dl.appendChild(dt);
	dl.appendChild(ddLuogo);
        if (edizioneStampa["luogo"]) {
                dataFromIRI(edizioneStampa["luogo"]).then(result => ddLuogo.textContent = result.text);
        }

	// Luogo Edizione
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Luogo come indicato nell'edizione");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(edizioneStampa["luogoEdizione"]);
	dd.append(text_dd);
	// dd.innerHTML = edizioneStampa["Titolo"];
	dl.appendChild(dt);
	dl.appendChild(dd);

	// Data
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Data");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(edizioneStampa["dataString"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

	// Tipografo / Casa editrice
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Tipografo / Casa editrice");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(edizioneStampa["editore"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

	// Formato
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Formato");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(edizioneStampa["formato"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

	// Pagine
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Pagine");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(edizioneStampa["pagine"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

	// Illustrazioni
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Illustrazioni");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(edizioneStampa["figure"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

	// Altre eventuali notizie
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Altre eventuali notizie");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(edizioneStampa["note"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

	// Prefatore ed eventuali dediche, prefazioni o premesse all’edizione
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Prefatore ed eventuali dediche, prefazioni o premesse all’edizione");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(edizioneStampa["prefatore"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

	 // Altri contenuti
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Altri contenuti");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(edizioneStampa["altriContenuti"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

	// Prima edizione/ristampa
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Prima edizione/ristampa");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(edizioneStampa["edizione"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

	// Data dell'edizione
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Data dell'edizione");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(edizioneStampa["dataEdizione"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

	// Fonti dell'edizione
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Fonti dell'edizione");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var text_dd = document.createTextNode(edizioneStampa["fontiPrimarie"]);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);
	

	// Tipologia ecdotica dell’edizione
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Tipologia ecdotica dell’edizione");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	if(edizioneStampa["linguaTraduzione"] != ""){
		var text_dd = document.createTextNode(edizioneStampa["ecdotica"] + " " + edizioneStampa["linguaTraduzione"]);
	}else{
		var text_dd = document.createTextNode(edizioneStampa["ecdotica"]);
	}
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);

	// Fonti delle notizie
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Fonti delle notizie");
	dt.appendChild(text_dt);
	// var dd = document.createElement("dd");
	// dd.className = "col-sm-9 text-fragment";
	// var text_dd = document.createTextNode(edizioneStampa["fontiSecondarie"]);
	// dd.append(text_dd);
	// dl.appendChild(dt);
	// dl.appendChild(dd);
	var ddFonte = document.createElement("dd");
	ddFonte.className = "col-sm-9 text-fragment";
	ddFonte.id = "source-print-edition";
	for (i in edizioneStampa["fontiSecondarie"]) {
		var divFonte = document.createElement("div");
		var spanFonte = document.createElement("span");
		var spanSpecific = document.createElement("span");
		var text_spanSpecific = document.createTextNode(edizioneStampa["fontiSecondarie"][i]["specific"]);
		var spanIriSources = document.createElement("span");
		spanIriSources.className = "source-manuscript-iri";
		var text_spanIriSources = document.createTextNode(edizioneStampa["fontiSecondarie"][i]["iri"]);
		spanSpecific.append(text_spanSpecific);
		spanIriSources.append(text_spanIriSources);
		sourceFromIRI(edizioneStampa["fontiSecondarie"][i]["iri"], spanFonte, spanSpecific, spanIriSources, divFonte).then((divFonte) => {
			ddFonte.append(divFonte);
		});
		// div.append(spanFonte);
		// div.append(spanSpecific);
	}
	// dd.append(divFonte);
	dl.appendChild(dt);
	dl.appendChild(ddFonte);

	// Schedatore
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Schedatore");
	dt.appendChild(text_dt);
	var ddSchedatore = document.createElement("dd");
	ddSchedatore.className = "col-sm-9 text-fragment";
	dl.appendChild(dt);
	dl.appendChild(ddSchedatore);
        if (edizioneStampa["schedatore"]) {
                dataFromUsers(edizioneStampa["schedatore"]).then(result => ddSchedatore.textContent = result.first_name + " " + result.last_name);
        }

	// Ultima modifica
	var dt = document.createElement("dt");
	dt.className = "col-sm-3";
	var text_dt = document.createTextNode("Ultima modifica");
	dt.appendChild(text_dt);
	var dd = document.createElement("dd");
	dd.className = "col-sm-9 text-fragment";
	var milliseconds = edizioneStampa["lastMod"] * 1000 
	var dateObject = new Date(milliseconds)
	var humanDateFormat = dateObject.toLocaleDateString('en-GB')
	var text_dd = document.createTextNode(humanDateFormat);
	dd.append(text_dd);
	dl.appendChild(dt);
	dl.appendChild(dd);
	
	// console.log(dl);
	return dl;
	
}

function loadManuscriptForEdit(button, data_l, manuscript_form){

	// button.removeEventListener("click", myFunction);

	button.addEventListener("click", function loadManuscript(manuscript_form) {  
		if((document.getElementById("printEditionForm").parentElement.classList[0]=="print-edition-form-space")||
				(document.getElementById("manuscriptForm").parentElement.classList[0]=="manuscript-form-space")){
				document.getElementById("modal-open-form").style.display = "block";
			}else if((document.getElementById("manuscriptForm").parentElement.id=="container-manuscript-form")&&(document.getElementById("manuscriptForm").hidden==false)){
				document.getElementById("modal-open-form").style.display = "block";
			}else if((document.getElementById("printEditionForm").parentElement.id=="container-print-edition-form")&&(document.getElementById("printEditionForm").hidden==false)){
				document.getElementById("modal-open-form").style.display = "block";
				}else{
		this.removeEventListener('click', loadManuscript);
		// // Prevent page reload
		console.log("data_l");
		console.log(data_l);
		document.getElementById("manuscriptForm").reset();
		// clearForm(manuscript_form);

		manuscript_id = this.id.split("-")[1];

		manuscript = data_l.lemma.manoscritti[manuscript_id];

		// Fetch names from IRIs and put them in input fields
		if (manuscript.luogoBiblioteca) {
				dataFromIRI(manuscript.luogoBiblioteca).then((context) => {
						document.getElementById("id_library_location").value = context.text;
						context.preventFocus = true;
						$('#id_library_location').trigger('autocomplete.select', context);
				});
		}
		if (manuscript.biblioteca) {
				dataFromIRI(manuscript.biblioteca).then((context) => {
						document.getElementById("id_library").value = context.text;
						context.preventFocus = true;
						$('#id_library').trigger('autocomplete.select', context);
				});
		}
		
		
			
			// form.reset();
				
			// form = document.getElementById("manuscriptForm").parentElement.removeChild(document.getElementById("manuscriptForm"));
	
			// form_container = document.getElementById("container-manuscript-form");

			// form_container.appendChild(form);

			// information.hidden = false;

			// document.getElementById("manuscriptForm").parentElement.previousElementSibling.getElementsByClassName("btn-m")[0].addEventListener("click", loadManuscript);

			// document.getElementById("manuscriptForm").hidden = true;
		
		
		form = document.getElementById("manuscriptForm").parentElement.removeChild(document.getElementById("manuscriptForm"));
		// console.log(form);
		accordion_id = "panel-m-" + manuscript_id;
		accordion = document.getElementById(accordion_id);

		information = accordion.getElementsByClassName("manuscript-information")[0];
		information.hidden = true;

		form_space = accordion.getElementsByClassName("manuscript-form-space")[0];

		form_space.appendChild(form);
		accordion.style.maxHeight = "5000px";

		form.reset();
		// hideFormsets(formsets_id);

		// console.log(document.getElementById("id_text_fragment"));
		
		// document.getElementById("id_text_fragment").value = cit.FrammentoNota;
		document.getElementById("id_manuscript_author").value = manuscript.autore;
		document.getElementById("id_manuscript_title").value = manuscript.titolo;
		document.getElementById("id_library_iri").value = manuscript.biblioteca;
		document.getElementById("id_library_location_iri").value = manuscript.luogoBiblioteca;
		document.getElementById("id_signature").value = manuscript.segnatura;
		document.getElementById("id_folios").value = manuscript.fogli;
		document.getElementById("id_incipit_dedication_proem").value = manuscript.incipitDedica;
		document.getElementById("id_explicit_dedication_proem").value = manuscript.explicitDedica;
		document.getElementById("id_incipit_text").value = manuscript.incipitTesto;
		document.getElementById("id_explicit_text").value = manuscript.explicitTesto;
		// document.getElementById("id_date").value = manuscript.datazione;
		document.getElementById("id_date_manuscript_start").value = manuscript.datazione.dataInizio.data;
		document.getElementById("id_date_manuscript_end").value =  manuscript.datazione.dataFine.data;
		document.getElementById("id_uncertainty_manuscript").checked =  manuscript.datazione.incertezza;
		document.getElementById("id_ante_manuscript").checked =  manuscript.datazione.ante;
		document.getElementById("id_post_manuscript").checked =  manuscript.datazione.post;
		document.getElementById("id_saec_manuscript").checked =  manuscript.datazione.secolo;
		document.getElementById("id_decoration").value = manuscript.decorazione;
		document.getElementById("id_url").value = manuscript.url;
		document.getElementById("id_url_description").value = manuscript.urlDescrizione;
		// document.getElementById("id_secondary_sources").value = manuscript.fonti;
		loadElementGroupFieldsSource(manuscript.fonti,'secondary_sources', 'source_manuscript', 'manuscript');
		document.getElementById("id_notes").value = manuscript.note;



		document.getElementById("id_manuscript_author").scrollIntoView();
		// document.getElementById("del-cit").id = "del-cit-" + id;
		document.getElementById("manuscriptForm").hidden = false;
		// document.getElementsByClassName("btn-save-cit")[0].id = "save-cit-" + manuscript_id; 
		// document.getElementById("add-cit").hidden = true;
		// document.getElementsByClassName("btn-save-cit")[0].style.display = "inline";
		
		
		/* 
		Event onclick button annulla on reference
		*/
		let cancel = document.getElementById("cancel-manuscript");

		cancel.hidden = false;

		cancel.addEventListener("click", function () {
				// // Prevent page reload
				// event.preventDefault();
				button.addEventListener("click", loadManuscript);
				form.reset();
				
				form = document.getElementById("manuscriptForm").parentElement.removeChild(document.getElementById("manuscriptForm"));
		
				form_container = document.getElementById("container-manuscript-form");

				form_container.appendChild(form);

				information.hidden = false;

				document.getElementById("manuscriptForm").hidden = true;

				// Make sure that IRI forms are empty
				// document.getElementById("id_cited_source_iri").value = '';
				// document.getElementById("id_cited_author_iri").value = '';
				// document.getElementById("id_theme_area_iri").value = '';

				information.parentElement.scrollIntoView();

				// Reset popovers
				resetPopovers();
		});

	}

	});
}

function loadPrintEditionForEdit(button, data, print_edition_form){
	button.addEventListener("click", function loadPrintEdition () {  
		if((document.getElementById("printEditionForm").parentElement.classList[0]=="print-edition-form-space")||
				(document.getElementById("manuscriptForm").parentElement.classList[0]=="manuscript-form-space")){
				document.getElementById("modal-open-form").style.display = "block";
			}else if((document.getElementById("manuscriptForm").parentElement.id=="container-manuscript-form")&&(document.getElementById("manuscriptForm").hidden==false)){
				document.getElementById("modal-open-form").style.display = "block";
			}else if((document.getElementById("printEditionForm").parentElement.id=="container-print-edition-form")&&(document.getElementById("printEditionForm").hidden==false)){
				document.getElementById("modal-open-form").style.display = "block";

		}else{
					this.removeEventListener('click', loadPrintEdition);
		
		// // Prevent page reload
		// event.preventDefault();
		document.getElementById("printEditionForm").reset();

		print_edition_id = this.id.split("-")[1];
		
		print_edition = data.lemma.edizioniStampa[print_edition_id];

		// Fetch names from IRIs and put them in input fields
		if (print_edition.luogo) {
				dataFromIRI(print_edition.luogo).then((context) => {
						document.getElementById("id_place").value = context.text;
						context.preventFocus = true;
						$('#id_place').trigger('autocomplete.select', context);
				});
		}
	
		// if(document.getElementById("printEditionForm").parentElement.classList[0]=="print-edition-form-space"){
		// 	form.reset();
				
		// 		// form = document.getElementById("printEditionForm").parentElement.removeChild(document.getElementById("printEditionForm"));

		// 		information.hidden = false;
		// 		// console.log(document.getElementById("printEditionForm"))
		// 		document.getElementById("printEditionForm").parentElement.previousElementSibling.getElementsByClassName("btn-pe")[0].addEventListener("click", loadPrintEdition);
		// }else{
			
		// }
		
		form = document.getElementById("printEditionForm").parentElement.removeChild(document.getElementById("printEditionForm"));

		accordion_id = "panel-pe-" + print_edition_id;
		accordion = document.getElementById(accordion_id);

		information = accordion.getElementsByClassName("print-edition-information")[0];
		information.hidden = true;

		form_space = accordion.getElementsByClassName("print-edition-form-space")[0];

		form_space.appendChild(form);
		accordion.style.maxHeight = "5000px";

		form.reset();

		console.log(data);

		// document.getElementById("id_text_fragment").value = cit.FrammentoNota;
		document.getElementById("id_print_edition_author").value = print_edition.autore;
		document.getElementById("id_print_edition_title").value = print_edition.titolo;
		document.getElementById("id_curator").value = print_edition.curatore;
		document.getElementById("id_place_iri").value = print_edition.luogo;
		document.getElementById("id_print_edition_place").value = print_edition.luogoEdizione;
		// document.getElementById("id_date").value = print_edition.data;
		document.getElementById("id_date_print_edition_start").value = print_edition.data.dataInizio.data;
		document.getElementById("id_date_print_edition_end").value =  print_edition.data.dataFine.data;
		document.getElementById("id_uncertainty_print_edition").checked =  print_edition.data.incertezza;
		document.getElementById("id_ante_print_edition").checked =  print_edition.data.ante;
		document.getElementById("id_post_print_edition").checked =  print_edition.data.post;
		document.getElementById("id_saec_print_edition").checked =  print_edition.data.secolo;
		document.getElementById("id_editor").value = print_edition.editore;
		document.getElementById("id_format_print_edition").value = print_edition.formato;
		document.getElementById("id_pages").value = print_edition.pagine;
		document.getElementById("id_figures").value = print_edition.figure;
		document.getElementById("id_notes").value = print_edition.note;
		document.getElementById("id_prefatore").value = print_edition.prefatore;
		document.getElementById("id_other_content").value = print_edition.altriContenuti;
		document.getElementById("id_edition").value = print_edition.edizione;
		document.getElementById("id_date_edition").value = print_edition.dataEdizione;
		document.getElementById("id_primary_sources").value = print_edition.fontiPrimarie;
		document.getElementById("id_ecdotic_typology").value = print_edition.ecdotica;
		// document.getElementById("id_secondary_sources_pe").value = print_edition.fontiSecondarie;
		loadElementGroupFieldsSource(print_edition.fontiSecondarie,"secondary_sources_pe", 'source_print_edition', 'print_edition');
		document.getElementById("id_print_edition_author").scrollIntoView();
		document.getElementById("printEditionForm").hidden = false;
		
		
		/* 
		Event onclick button annulla on reference
		*/
		let cancel = document.getElementById("cancel-print-edition");

		cancel.hidden = false;

		cancel.addEventListener("click", function () {
				// // Prevent page reload
				// event.preventDefault();
				form.reset();
				
				form = document.getElementById("printEditionForm").parentElement.removeChild(document.getElementById("printEditionForm"));
		
				form_container = document.getElementById("container-print-edition-form");

				form_container.appendChild(form);

				information.hidden = false;

				document.getElementById("printEditionForm").hidden = true;
				// Make sure that IRI forms are empty
				// document.getElementById("id_cited_source_iri").value = '';
				// document.getElementById("id_cited_author_iri").value = '';
				// document.getElementById("id_theme_area_iri").value = '';

				information.parentElement.scrollIntoView();


				// Reset popovers
				resetPopovers();
		});

	}

	});
}
$('#link-formset-topography').formset({
	addText: '<i class="fas fa-plus"></i>',
	deleteText: '<i class="fas fa-minus"></i>',
	addCssClass: 'add-row btn btn-success',
	// deleteCssClass: 'delete-row btn btn-sm btn-danger',
	prefix: 'topography_set',
	added: function(row) {
		enableAutocomplete(row);
		// $('.add-place-wd').autoComplete({
		// 	minLength: 3,
		// 	preventEnter: true,
		// 	resolver: 'custom',
		// 	events: {
		// 			search: function (userInput, callback) {
		// 					// If there is a new query, cancel the previous one
		// 					if (this.timeoutID) {
		// 							window.clearTimeout(this.timeoutID);
		// 					}
		// 					// Run Wikidata query
		// 					this.timeoutID = setTimeout(
		// 							function() {runWikidataQuery('place', userInput, callback)}, 200
		// 					);
		// 			},
		// 	searchPost: filterByLength
		// 	}
		// });
		$( ".delete-row" ).addClass( "btn btn-danger btn-sm" );
		// enableAutocomplete(row);
	}
});

$('#link-formset-genre').formset({
	addText: '<i class="fas fa-plus"></i>',
	deleteText: '<i class="fas fa-minus"></i>',
	addCssClass: 'add-row btn btn-success',
	// deleteCssClass: 'delete-row',
	prefix: 'genre_set',
	added: function(row) {
		enableAutocomplete(row);
		$( ".delete-row" ).addClass( "btn btn-danger btn-sm" );

	},
});


$('#link-formset-id_secondary_sources').formset({
	addText: '<i class="fas fa-plus"></i>',
	deleteText: '<i class="fas fa-minus"></i>',
	addCssClass: 'add-row btn btn-success',
	// deleteCssClass: 'delete-row',
	prefix: 'source_manuscript_set',
	added: function(row) {
		enableAutocomplete(row);
		$( ".delete-row" ).addClass( "btn btn-danger btn-sm" );

	},
});

$('#link-formset-id_secondary_sources_pe').formset({
	addText: '<i class="fas fa-plus"></i>',
	deleteText: '<i class="fas fa-minus"></i>',
	addCssClass: 'add-row btn btn-success',
	// deleteCssClass: 'delete-row',
	prefix: 'source_print_edition_set',
	added: function(row) {
		enableAutocomplete(row);
		$( ".delete-row" ).addClass( "btn btn-danger btn-sm" );

	},
});




// Fetch save luogo
function saveTopographies(topographyFormset, btn) {

	var pathArray = window.location.pathname.split('/');

	let formData = new FormData(topographyFormset);
	id =  pathArray[4];
	let url = window.location.href + 'save_topographies/';
	let result = '';

	// Get Django CSRF token
	let csrf = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

	// Set request headers
	let headers = new Headers();
	headers.append('X-CSRFToken', csrf);
	headers.append('X-Requested-With', 'XMLHttpRequest');
	
	// return fetch(url)
	return fetch(url,
		{
			method: 'POST',
			body: formData,
			headers: headers,
			mode: 'cors'
		})
	.then((response) => {
		return response.json();
	})
	.then((context) => {
		
		data = context.json_data;
		topography_text = document.getElementById("topography-text");
		topography_text.textContent = "";
		if(data["lemma"]["toponimi"].length!=0){
		for (i in data["lemma"]["toponimi"]) {
			
			a = document.createElement("a");
			a.classList = "badge badge-light";
			a.target = "_blank";
			a.title = data["lemma"]["toponimi"][i];
			a.href = data["lemma"]["toponimi"][i];
			placeFromIRI(data["lemma"]["toponimi"][i], a, topography_text).then((text) => {
				topography_text = text;
				
				topography_text.parentNode.appendChild(btn);
			});
			// console.log(spanTop.textContent);
			
			
		  } 
		} else {
			topography_text.parentNode.appendChild(btn);
		}
		// console.log(topography_text);
		// danteText.innerHTML = br_text;
		// console.log(danteText.innerHTML);
	})
	.catch((error) => {
		console.error(error);
		return {};
	});
}

// Fetch save abstract
function saveAbstract(abstractForm, btn) {

	var pathArray = window.location.pathname.split('/');

	let formData = new FormData(abstractForm);
	id =  pathArray[4];
	let url = window.location.href + 'save_abstract/';
	let result = '';

	// Get Django CSRF token
	let csrf = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

	// Set request headers
	let headers = new Headers();
	headers.append('X-CSRFToken', csrf);
	headers.append('X-Requested-With', 'XMLHttpRequest');
	
	// return fetch(url)
	return fetch(url,
		{
			method: 'POST',
			body: formData,
			headers: headers,
			mode: 'cors'
		})
	.then((response) => {
		return response.json();
	})
	.then((context) => {
		
		data = context.json_data;
		abstract_text = document.getElementById("abstract-text");
		abstract_text.textContent = "";
		if(data["lemma"]["abstract"].length!=0){
			abstract_text.textContent = data["lemma"]["abstract"];
			abstract_text.parentNode.appendChild(btn);
		// for (i in data["lemma"]["toponimi"]) {
			
		// 	a = document.createElement("a");
		// 	a.classList = "badge badge-light";
		// 	a.target = "_blank";
		// 	a.title = data["lemma"]["toponimi"][i];
		// 	a.href = data["lemma"]["toponimi"][i];
		// 	placeFromIRI(data["lemma"]["toponimi"][i], a, topography_text).then((text) => {
		// 		topography_text = text;
				
		// 		topography_text.parentNode.appendChild(btn);
		// 	});
		// 	// console.log(spanTop.textContent);
			
			
		//   } 
		} else {
			console.log(abstract_text.parentNode);
			abstract_text.parentNode.appendChild(btn);
		}
		// console.log(topography_text);
		// danteText.innerHTML = br_text;
		// console.log(danteText.innerHTML);
	})
	.catch((error) => {
		console.error(error);
		return {};
	});
}

function saveGenres(genreFormset, btn) {

	var pathArray = window.location.pathname.split('/');

	let formData = new FormData(genreFormset);
	id =  pathArray[4];
	let url = window.location.href + 'save_genres/';
	let result = '';

	// Get Django CSRF token
	let csrf = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

	// Set request headers
	let headers = new Headers();
	headers.append('X-CSRFToken', csrf);
	headers.append('X-Requested-With', 'XMLHttpRequest');
	
	// return fetch(url)
	return fetch(url,
		{
			method: 'POST',
			body: formData,
			headers: headers,
			mode: 'cors'
		})
	.then((response) => {
		return response.json();
	})
	.then((context) => {
		
		data = context.json_data;
		genre_text = document.getElementById("genre-text");
		
		genre_text.textContent = "";
		if(data["lemma"]["generi"].length!=0){
			for (i in data["lemma"]["generi"]) {
				
				a = document.createElement("a");
				a.classList = "badge badge-light";
				a.target = "_blank";
				a.title = data["lemma"]["generi"][i];
				a.href = data["lemma"]["generi"][i];

				placeFromIRI(data["lemma"]["generi"][i], a, genre_text).then((text) => {
					genre_text = text;
					genre_text.parentNode.appendChild(btn);
					// genre_button_space.appendChild(btn);
				});
				// console.log(spanTop.textContent);
				// genre_button_space.appendChild(btn);
			
			} 
		}else{
			genre_text.parentNode.appendChild(btn);
		}
	})
	.catch((error) => {
		console.error(error);
		return {};
	});
}

function saveAuthor(author_form) {

	var pathArray = window.location.pathname.split('/');

	let formData = new FormData(author_form);
	id =  pathArray[4];
	let url = window.location.href + 'save_author/';
	let result = '';

	// Get Django CSRF token
	let csrf = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

	// Set request headers
	let headers = new Headers();
	headers.append('X-CSRFToken', csrf);
	headers.append('X-Requested-With', 'XMLHttpRequest');
	
	// return fetch(url)
	return fetch(url,
		{
			method: 'POST',
			body: formData,
			headers: headers,
			mode: 'cors'
		})
	.then((response) => {
		return response.json();
	})
	.then((context) => {
		
		if(!context.success){
			document.getElementById("invalid-feedback-id_date_birth").style.display = "none";
			document.getElementById("invalid-feedback-id_date_death").style.display = "none";
			document.getElementById("invalid-feedback-id_date_floruit").style.display = "none";
			document.getElementById("invalid-feedback-id_date_bishop").style.display = "none";
			for (var i = 0; i < context.errors.length; i++){
				var err = context.errors[i];
				if(err.date_birth){
					document.getElementById("invalid-feedback-id_date_birth").textContent = err.date_birth[0];
					document.getElementById("invalid-feedback-id_date_birth").style.display = "block";
				}
				if(err.date_death){
					document.getElementById("invalid-feedback-id_date_death").textContent = err.date_death[0];
					document.getElementById("invalid-feedback-id_date_death").style.display = "block";

				}
				if(err.date_floruit){
					document.getElementById("invalid-feedback-id_date_floruit").textContent = err.date_floruit[0];
					document.getElementById("invalid-feedback-id_date_floruit").style.display = "block";
					
				}
				if(err.date_bishop){
					document.getElementById("invalid-feedback-id_date_bishop").textContent = err.date_bishop[0];
					document.getElementById("invalid-feedback-id_date_bishop").style.display = "block";
					
				}
			  }
			 
			
		}else{
			data = context.json_data;
			author_text = document.getElementsByClassName("lemma-link")[0];
			
			author_text.textContent = "";

			author_text.textContent = data["name"] + ", " + data["stringDatazione"] + ' ';
			var i_edit = document.createElement("i");
			i_edit.className = "far fa-edit";
			author_text.appendChild(i_edit);

			document.getElementById("authorForm").hidden = true;
	 		document.getElementsByClassName("lemma-text")[0].hidden = false;

			document.getElementById("invalid-feedback-id_date_birth").style.display = "none";
			document.getElementById("invalid-feedback-id_date_death").style.display = "none";
			document.getElementById("invalid-feedback-id_date_floruit").style.display = "none";
			document.getElementById("invalid-feedback-id_date_bishop").style.display = "none";

			
		}
		
	})
	.catch((error) => {
		console.error(error);
		return {};
	});
	
}

function saveWork(work_form) {

	var pathArray = window.location.pathname.split('/');

	let formData = new FormData(work_form);
	id =  pathArray[4];
	let url = window.location.href + 'save_work/';
	let result = '';

	// Get Django CSRF token
	let csrf = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

	// Set request headers
	let headers = new Headers();
	headers.append('X-CSRFToken', csrf);
	headers.append('X-Requested-With', 'XMLHttpRequest');
	
	// return fetch(url)
	return fetch(url,
		{
			method: 'POST',
			body: formData,
			headers: headers,
			mode: 'cors'
		})
	.then((response) => {
		return response.json();
	})
	.then((context) => {
		
		data = context.json_data;
		work_text = document.getElementsByClassName("lemma-link")[1];
		
		work_text.textContent = "";

		work_text.textContent = data["title"] + ' ';
		var i_edit = document.createElement("i");
		i_edit.className = "far fa-edit";
		work_text.appendChild(i_edit);
		
	})
	.catch((error) => {
		console.error(error);
		return {};
	});
}

// Fetch data from IRIs
function dataFromIRI(iri) {
	let url = '/tool/annotation/entity?iri=' + encodeURIComponent(iri);
	let result = '';
	return fetch(url)
	.then((response) => {
		return response.json();
	})
	.then((context) => {
		return context;
	})
	.catch((error) => {
		console.error('Error loading IRI:', error);
		return {};
	});
}

// Fetch data from IRIs
function dataFromUsers(user) {
	let url = '/tool/annotation/get_names?user=' + user;
	let result = '';
	return fetch(url)
	.then((response) => {
		return response.json();
	})
	.then((context) => {
		return context;
	})
	.catch((error) => {
		console.error('Error loading IRI:', error);
		return {};
	});
}

// Fetch data from IRIs
function sourceFromIRI(iri, spanFonte, spanSpecific, spanIriSources, div) {
	let url = '/tool/annotation/entity?iri=' + encodeURIComponent(iri);
	let result = '';
	return fetch(url)
	.then((response) => {
		return response.json();
	})
	.then((context) => {
		console.log(context);
		spanFonte.textContent = context.text;
		console.log(spanFonte.textContent);
		div.appendChild(spanFonte);
		div.append(", ");
		div.appendChild(spanSpecific);
		div.appendChild(spanIriSources);
		spanIriSources.hidden = true;
		return div;
	})
	.catch((error) => {
		console.error('Error loading IRI:', error);
		return {};
	});
}

// Fetch data from IRIs
function placeFromIRI(iri, a, text) {
	let url = '/tool/annotation/entity?iri=' + iri;
	let result = '';
	return fetch(url)
	.then((response) => {
		return response.json();
	})
	.then((context) => {
		a.textContent = context.text;
		text.appendChild(a);
		return text;
	})
	.catch((error) => {
		console.error('Error loading IRI:', error);
		return {};
	});
}

// Fetch data from IRIs
function noteFromIRI(iri, node) {
	let url = '/tool/annotation/entity?iri=' + encodeURIComponent(iri);
	let result = '';
	return fetch(url)
	.then((response) => {
		return response.json();
	})
	.then((context) => {
		node.value = context.text;
		context.preventFocus = true;
		$('#'+ node.id).trigger('autocomplete.select', context);
		// return context;
	})
	.catch((error) => {
		console.error('Error loading IRI:', error);
		// return {};
	});
}


async function loadElementGroupFields(field, name){
	
	id = "id_" + name;
	
	idGroup = id + "-group";
	var elementGroup = document.getElementById(idGroup);
	elementGroup.style.display = "inline";

	var deleteFormsetButtons = elementGroup.getElementsByClassName("delete-row");
	
	for (var i = 0; i < field.length; i++) {
		
		new_id_iri = id + "_set-" + i + "-" + name + "_iri";
		if(deleteFormsetButtons.length != field.length){
			if(i!=0){
				var addButton = elementGroup.getElementsByClassName("add-row");
				addButton[0].click();
			}
		}
		new_id = id + "_set-" + i + "-" + name;
		elemText = document.getElementById(new_id);
		noteFromIRI(field[i].href, elemText);
		document.getElementById(new_id_iri).value = field[i].href;

	};

		
}


async function loadElementGroupFieldsSource(field, group, name, specific){
	
	id = "id_" + name;
	
	
	idGroup = "id_"+group+"-group";

	var elementGroup = document.getElementById(idGroup);
	// elementGroup.style.display = "inline";

	var deleteFormsetButtons = elementGroup.getElementsByClassName("delete-row");
	
	for (var i = 0; i < field.length; i++) {
		// document.getElementById(id+"_set-TOTAL_FORMS").value 
		new_id_iri = id + "_set-" + i + "-" + name + "_iri";
		if(deleteFormsetButtons.length != field.length){
			if(deleteFormsetButtons.length < field.length){
				if(i!=0){
					var addButton = elementGroup.getElementsByClassName("add-row");
					addButton[0].click();
					
				}
			}
		}
		
		new_id = id + "_set-" + i + "-" + name;
		id_specific = id + "_set-" + i + "-specific_" + specific;
		// console.log(id_specific)
		elemText = document.getElementById(new_id);
		console.log(elemText)
		noteFromIRI(field[i]["iri"], elemText);
		document.getElementById(new_id_iri).value = field[i]["iri"];
		document.getElementById(id_specific).value = field[i]["specific"];
		

	};
	// console.log(field.length)
	// console.log(deleteFormsetButtons.length)
	// total_form = document.getElementById(id+"_set-TOTAL_FORMS");
	// total_form.value = field.lenght;

	// console.log(document.getElementById(id+"_set-TOTAL_FORMS"))


		
}

function loadAuthorforEdit(){
	// document.getElementById("id_name").value = name;
	var checkBoxBirthDeath = document.getElementById("id_birth_death");
	var checkBoxFloruit = document.getElementById("id_floruit");
	var checkBoxBishop = document.getElementById("id_bishop");

	var blockFloruit = document.getElementById("block-floruit");
	var blockBishop = document.getElementById("block-bishop");
	var blockBirth = document.getElementById("block-birth");
	var blockDeath = document.getElementById("block-death");

	if (checkBoxBirthDeath.checked == true){
		blockBirth.hidden = false;
		blockDeath.hidden = false;
	  } else {
		blockBirth.hidden = true;
		blockDeath.hidden = true;
	  }
	
	  if (checkBoxFloruit.checked == true){
		blockFloruit.hidden = false;
	  } else {
		blockFloruit.hidden = true;
	  }
	  
	  if (checkBoxBishop.checked == true){
		blockBishop.hidden = false;
	  } else {
		blockBishop.hidden = true;
	  }

}


function hideFormsets(formset_id){
	idGroup = formset_id +"-group";
	var elementGroup = document.getElementById(idGroup);
	var deleteFormsetButtons = elementGroup.getElementsByClassName("delete-row");
	console.log(deleteFormsetButtons);
	for (var i = 0; i < deleteFormsetButtons.length; i++) {
		// console.log(i);
		// console.log(deleteFormsetButtons[i]);
		deleteFormsetButtons[i].click();
		}
}


