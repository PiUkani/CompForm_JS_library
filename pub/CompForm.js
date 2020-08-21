'use strict';

//Creates CompPage
function initCompPage(name) {
	const newCompPage = new CompPage(name);
	return newCompPage;
}

//Main CompPage Class
class CompPage {
	// constructor(comppagename, question_num_option) {
	constructor(comppagename) {
		this.comppagename = comppagename;
		this.CompElements = [];
		this.id = '';
		this.data;
		//   this.question_num_option = question_num_option;
	}

	ArgValidation(name, YourQue, length) {
		if (name === '' || YourQue === '' || length <= 0) {
			console.log('missing arguments in' + this.comppagename);
		}
	}
	//TODO add various question number options such as numerical, alphabetical, NIL
	// numberSys(){
	// 	if(this.question_num_option === 'roman')

	// }

	elemShortAnswer(name, YourQue, length) {
		this.ArgValidation(name, YourQue, length);
		const newShortAnswer = new TextInput(name, YourQue, length);
		newShortAnswer.YourQue = this.CompElements.length + 1 + '.' + newShortAnswer.YourQue;
		this.CompElements.push(newShortAnswer);
	}

	elemMultChoice(type, name, YourQue, choices) {
		this.ArgValidation(name, YourQue);
		const newMultChoice = new MultChoice(type, name, YourQue, choices);
		newMultChoice.YourQue = this.CompElements.length + 1 + '.' + newMultChoice.YourQue;
		this.CompElements.push(newMultChoice);
	}

	elemDropDown(name, YourQue, choices) {
		this.ArgValidation(name, YourQue);
		const newDropDown = new DropDown(name, YourQue, choices);
		newDropDown.YourQue = this.CompElements.length + 1 + '.' + newDropDown.YourQue;
		this.CompElements.push(newDropDown);
	}

	elemRadioChoice(name, YourQue, choices) {
		this.ArgValidation(name, YourQue);
		const newRadioChoice = new RadioChoice(name, YourQue, choices);
		newRadioChoice.YourQue = this.CompElements.length + 1 + '.' + newRadioChoice.YourQue;
		this.CompElements.push(newRadioChoice);
	}

	elemMixedInput(InputJSON) {
		// this.ArgValidation(name, YourQue);
		const newMixedInput = new MixedInput(InputJSON);
		newMixedInput.YourQue = this.CompElements.length + 1 + '.' + InputJSON.YourQue;
		this.CompElements.push(newMixedInput);
	}

	elemImageChooser(type, name, YourQue, choices) {
		this.ArgValidation(name, YourQue);
		const newImageChooser = new ImageChooser(type, name, YourQue, choices);
		newImageChooser.YourQue = this.CompElements.length + 1 + '.' + newImageChooser.YourQue;
		this.CompElements.push(newImageChooser);
	}


	elemRubricTable(InputJSON) {
		this.ArgValidation(InputJSON.name, InputJSON.YourQue);
		const newRubricTable = new RubricTable(InputJSON);
		newRubricTable.YourQue = this.CompElements.length + 1 + '.' + InputJSON.YourQue;
		this.CompElements.push(newRubricTable);
	}

	elemgetDataButton(InputJSON) {
		// this.ArgValidation(name, YourQue);
		const newgetDataButton = new getDataButton(InputJSON);
		//  newMixedInput.YourQue = this.CompElements.length + 1 + '.' + newMixedInput.YourQue;
		this.CompElements.push(newgetDataButton);
	}


	createCompPage(id) {
		this.id = id;
		const completePage = this.returnCompPage();
		for (var i = 0; i < this.CompElements.length; i++) {
			completePage.appendChild(this.CompElements[i].returnElem());
		}
		document.querySelector('#' + id).appendChild(completePage);
	}

	returnCompPage() {
		const MainCompPage = document.createElement('div');
		MainCompPage.id = 'main-Comp-page';
		MainCompPage.className = 'compElem compElem-div';
		return MainCompPage;
	}

	getdata() {
		// console.log(this.CompElements)
		var allAns = [];
		var data = {
			'AllQA': allAns
		};
		for (var i = 0; i < this.CompElements.length; i++) {
			// console.log(this.CompElements[i].constructor)
			allAns.push(this.CompElements[i].getdata())


		}

		return data;

	}

	//Class CompPage Ends
}



//Basic Inputs

class TextInput {
	constructor(InputJSON) {
		this.length = InputJSON.length;
		this.name = InputJSON.name;
		this.YourQue = InputJSON.YourQue;
	}
	static name = 'TextInput'
	returnElem() {
		const newTextInput = document.createElement('textarea');

		// newTextInput.type = 'textarea';
		newTextInput.id = this.name;
		newTextInput.style.width = this.length * 10 + 'px';
		newTextInput.className = 'compElem compElem-basic-text';
		newTextInput.oninput = function () {
			increase_area(this);
		};
		//create label
		let labelInputArea = document.createElement('label');
		labelInputArea.className = 'compElem compElem-basic-label';
		labelInputArea.textContent = this.YourQue;

		//create Div to contain label and text input
		const ElemDiv = document.createElement('div');
		ElemDiv.className = 'compElem compElem-basic-div';
		ElemDiv.id = this.name;
		newTextInput.id = ElemDiv.id + '-label';
		labelInputArea.id = ElemDiv.id + '-input';
		ElemDiv.appendChild(labelInputArea)
		ElemDiv.appendChild(newTextInput)
		return ElemDiv;
	}

	getdata() {
		var data = {};
		const mainDiv = document.getElementById(this.name);
		const YourQue = mainDiv.getElementsByTagName('label')[0].textContent; //or this.YourQueue
		const answer = mainDiv.getElementsByTagName('textarea')[0].value;
		var ElemName = YourQue;
		data[ElemName] = answer;
		//console.log(data);
		return data;
	}



	//Class TextInput ends	  
}
//Misc for TextInput
function increase_area(element) {
	element.style.height = "1px";
	element.style.height = (element.scrollHeight) + "px";
}



class MultChoice {
	constructor(InputJSON) {
		this.subtype = InputJSON.subtype;
		this.name = InputJSON.name;
		this.YourQue = InputJSON.YourQue;
		this.choices = InputJSON.choices;
	}

	returnElem() {
		//create Div to contain question(label) and Multiple_choice
		const ElemDiv = document.createElement('div');
		ElemDiv.className = 'compElem compElem-basic-div';
		ElemDiv.id = this.name;
		//Question(label)
		let Mainlabel = document.createElement('label');
		Mainlabel.className = 'compElem compElem-basic-label';
		Mainlabel.textContent = this.YourQue;

		ElemDiv.appendChild(Mainlabel);

		var VarMultChoice = 'newMultChoice';


		for (var i = 0; i < this.choices.length; i++) {
			this[VarMultChoice + 'op' + i] = document.createElement('input');


			(this.subtype === 'radio') ? this[VarMultChoice + 'op' + i].type = 'radio': this[VarMultChoice + 'op' + i].type = 'checkbox';
			this[VarMultChoice + 'op' + i].className = 'compElem compElem-basic-checkbox';
			(this.subtype === 'radio') ? this[VarMultChoice + 'op' + i].name = this.name + '-choice': this[VarMultChoice + 'op' + i].name = this.name + '-choice' + i;
			this[VarMultChoice + 'op' + i].id = this.name + '-choice' + i;
			//Add checkbox to div
			ElemDiv.appendChild(this[VarMultChoice + 'op' + i]);

			//Individual labels for checkboxes
			let Sublabel = document.createElement('label');
			Sublabel.className = 'compElem compElem-basic-choice-label';
			Sublabel.innerHTML = this.choices[i];
			Sublabel.htmlFor = this.name + '-choice' + i;
			//Add checkbox to div
			ElemDiv.appendChild(Sublabel);
		}


		return ElemDiv;
	}

	getdata() {
		var data = {};
		const mainDiv = document.getElementById(this.name);
		const YourQue = mainDiv.getElementsByTagName('label')[0].textContent; //or this.YourQueue
		var answer = [];
		for (var i = 0; i < this.choices.length; i++) {
			if (mainDiv.getElementsByTagName('input')[i].checked)
				answer.push(mainDiv.getElementsByTagName('label')[i + 1].textContent);
		}
		var ElemName = YourQue;
		data[ElemName] = answer;
		//console.log(data);
		return data;
	}

	//Class MultChoice ends	  
}


class RadioChoice {
	constructor(InputJSON) {

		this.name = InputJSON.name;
		this.YourQue = InputJSON.YourQue;
		this.choices = InputJSON.choices;
	}

	returnElem() {

		//create Div to contain question(label) and Radio_choice
		const ElemDiv = document.createElement('div');
		ElemDiv.className = 'compElem compElem-basic-div';
		ElemDiv.id = this.name;
		//Question(label)
		let Mainlabel = document.createElement('label');
		Mainlabel.className = 'compElem compElem-basic-label';
		Mainlabel.textContent = this.YourQue;

		ElemDiv.appendChild(Mainlabel);

		var VarRadioChoice = 'newRadioChoice';


		for (var i = 0; i < this.choices.length; i++) {
			this[VarRadioChoice + 'op' + i] = document.createElement('input');
			this[VarRadioChoice + 'op' + i].type = 'radio';
			this[VarRadioChoice + 'op' + i].className = 'compElem compElem-basic-radio';
			this[VarRadioChoice + 'op' + i].name = this.name + '-choice';
			this[VarRadioChoice + 'op' + i].id = this.name + '-choice' + i;
			//Add radio to div
			ElemDiv.appendChild(this[VarRadioChoice + 'op' + i]);

			//Individual labels for radioes
			let Sublabel = document.createElement('label');
			Sublabel.className = 'compElem compElem-basic-choice-label';
			Sublabel.textContent = this.choices[i];
			Sublabel.htmlFor = this.name + '-choice' + i;
			//Add radio to div
			ElemDiv.appendChild(Sublabel);
		}


		return ElemDiv;
	}
	getdata() {
		var data = {};
		const mainDiv = document.getElementById(this.name);
		const YourQue = mainDiv.getElementsByTagName('label')[0].textContent; //or this.YourQueue
		var answer = [];
		for (var i = 0; i < this.choices.length; i++) {
			if (mainDiv.getElementsByTagName('input')[i].checked)
				answer.push(mainDiv.getElementsByTagName('label')[i + 1].textContent);
		}
		var ElemName = YourQue;
		data[ElemName] = answer;
		//console.log(data);
		return data;

	}
	//Class RadioChoice ends
}

class DropDown {
	constructor(InputJSON) {

		this.name = InputJSON.name;
		this.YourQue = InputJSON.YourQue;
		this.choices = InputJSON.choices;
	}

	returnElem() {

		//create Div to contain question(label) and DropDown
		const ElemDiv = document.createElement('div');
		ElemDiv.className = 'compElem compElem-basic-div';
		ElemDiv.id = this.name;
		//Question(label)
		let Mainlabel = document.createElement('label');
		Mainlabel.className = 'compElem compElem-basic-label';
		Mainlabel.textContent = this.YourQue;

		ElemDiv.appendChild(Mainlabel);

		let newDropDown = document.createElement('select');
		newDropDown.id = this.name + '-dropdown';
		newDropDown.className = 'compElem compElem-basic-DropDown';
		newDropDown.name = 'this.name-choice';
		//Add DropDown to div
		ElemDiv.appendChild(newDropDown);
		var Sublabel = document.createElement('option');
		Sublabel.className = 'compElem compElem-basic-choice-label';
		Sublabel.textContent = 'Choose an option';
		Sublabel.disabled = true;
		Sublabel.selected = true;
		newDropDown.appendChild(Sublabel);
		for (var i = 0; i < this.choices.length; i++) {
			//Individual labels for radioes
			Sublabel = document.createElement('option');
			Sublabel.className = 'compElem compElem-basic-choice-label';
			Sublabel.textContent = this.choices[i];
			//Add radio to div
			newDropDown.appendChild(Sublabel);
		}

		return ElemDiv;
	}

	getdata() {
		var data = {};
		const mainDiv = document.getElementById(this.name);
		const YourQue = mainDiv.getElementsByTagName('label')[0].textContent; //or this.YourQueue
		const select_box = mainDiv.getElementsByTagName('select')[0];
		const answer = select_box.options[select_box.selectedIndex].text;
		var ElemName = YourQue;
		data[ElemName] = answer;
		//console.log(data);
		return data;
	}
	//Class DropDown ends	  
}


//More Complex Inputs
class MixedInput {
	constructor(InputJSON) {
		this.Input = (InputJSON);
		this.YourQue = InputJSON.YourQue;
		this.MixedElements = [];
	}

	returnElem() {

		//create Div to contain question(label) and Radio_choice
		const ElemDiv = document.createElement('div');
		ElemDiv.className = 'compElem compElem-comp-vertical-div';

		// ElemDiv.id = this.Input.id;
		ElemDiv.name = this.Input.name;
		//Question(label)
		let Mainlabel = document.createElement('label');
		Mainlabel.className = 'compElem compElem-basic-label';
		Mainlabel.textContent = this.YourQue;

		ElemDiv.appendChild(Mainlabel);

		var ParseInputTypes = 'MixedInput-';


		for (let Inputtypes of this.Input.VariousInputs) {
			this[ParseInputTypes + Inputtypes.type] = new Inputtypes.type(Inputtypes)

			// this[ParseInputTypes + Inputtypes.type] = new TextInput(Inputtypes.name, Inputtypes.YourQue, Inputtypes.length)
			this.MixedElements.push(this[ParseInputTypes + Inputtypes.type]);
			ElemDiv.appendChild(this[ParseInputTypes + Inputtypes.type].returnElem());
			// ElemDiv.childNodes.reduce()
		}

		return ElemDiv;
	}

	getdata() {
		// console.log(this.CompElements)

		var VariousInputs = [];
		var Mixeddata = {
			[this.YourQue]: VariousInputs
		};
		for (var i = 0; i < this.MixedElements.length; i++) {

			// console.log(this.CompElements[i].constructor)

			VariousInputs.push(this.MixedElements[i].getdata())


		}
		return Mixeddata;
	}

	//Class MixedInput ends
}


class ImageChooser {
	constructor(InputJSON) {
		this.name = InputJSON.name;
		this.YourQue = InputJSON.YourQue;
		this.choices = InputJSON.choices;
	}

	returnElem() {
		//create Div to contain question(label) and 
		const ElemDiv = document.createElement('div');
		ElemDiv.className = 'compElem compElem-basic-div';
		ElemDiv.id = this.name;
		//Question(label)
		let Mainlabel = document.createElement('label');
		Mainlabel.className = 'compElem compElem-basic-label';
		Mainlabel.textContent = this.YourQue;

		ElemDiv.appendChild(Mainlabel);

		var VarImageChooser = 'newImageChooser';


		for (var i = 0; i < this.choices.length; i++) {
			this[VarImageChooser + 'op' + i] = document.createElement('input');


			this[VarImageChooser + 'op' + i].type = 'checkbox';
			this[VarImageChooser + 'op' + i].className = 'compElem compElem-basic-img-checkbox';
			this[VarImageChooser + 'op' + i].id = this.name + '-imgchoice' + i;
			//Add checkbox to div
			ElemDiv.appendChild(this[VarImageChooser + 'op' + i]);

			//Individual labels for checkboxes
			let Sublabel = document.createElement('label');
			Sublabel.className = 'compElem compElem-basic-image-label';
			Sublabel.htmlFor = this.name + '-imgchoice' + i;
			let image = document.createElement('img');
			image.className = 'compElem compElem-basic-img-choice'
			image.src = this.choices[i];
			//Add checkbox to div
			Sublabel.appendChild(image);
			ElemDiv.appendChild(Sublabel);

		}


		return ElemDiv;
	}

	getdata() {
		var data = {};
		const mainDiv = document.getElementById(this.name);
		const YourQue = mainDiv.getElementsByTagName('label')[0].textContent; //or this.YourQueue
		var answer = [];
		for (var i = 0; i < this.choices.length; i++) {
			if (mainDiv.getElementsByTagName('input')[i].checked)
				answer.push(mainDiv.getElementsByTagName('img')[i].src);
		}
		var ElemName = YourQue;
		data[ElemName] = answer;
		//console.log(data);
		return data;
	}

	//Class ImageChooser ends	  
}

class RubricTable {
	constructor(InputJSON) {
		this.name = InputJSON.name;
		this.YourQue = InputJSON.YourQue;
		this.Input = (InputJSON);
		this.cols = InputJSON.cols;
		this.rows = InputJSON.rows;
		this.cells = InputJSON.cells;
	}

	returnElem() {
		//create Div to contain question(label) and YourQue
		const ElemDiv = document.createElement('div');
		ElemDiv.className = 'compElem compElem-basic-div';
		ElemDiv.id = this.name;
		//Question(label)
		let Mainlabel = document.createElement('label');
		Mainlabel.className = 'compElem compElem-basic-label';
		Mainlabel.textContent = this.YourQue;

		ElemDiv.appendChild(Mainlabel);

		var VarRubricTable = 'newRubricTable';

		this[VarRubricTable] = document.createElement('table');

		this[VarRubricTable].className = 'compElem compElem-rubric-table';
		this[VarRubricTable].id = 'compElem compElem-rubric-table';
		this[VarRubricTable + '-cols'] = document.createElement('tr');

		//Add column title cells
		for (var i = 0; i < this.cols.length + 1; i++) {

			this[VarRubricTable + 'col' + i] = document.createElement('th');
			this[VarRubricTable + 'col' + i].className = 'compElem compElem-table-col-title';
			this[VarRubricTable + 'col' + i].id = this.name + '-table_col_title' + i;

			(i == 0) ? this[VarRubricTable + 'col' + i].innerHTML = '': this[VarRubricTable + 'col' + i].innerHTML = this.cols[i - 1];
			//Add column cell to table
			this[VarRubricTable + '-cols'].appendChild(this[VarRubricTable + 'col' + i]);
		}

		this[VarRubricTable].appendChild(this[VarRubricTable + '-cols']);


		//Add row title cells
		for (var i = 0; i < this.rows.length; i++) {
			this[VarRubricTable + '-rows' + i] = document.createElement('tr');

			this[VarRubricTable + '-row_title' + i] = document.createElement('td');

			this[VarRubricTable + '-row_title' + i].innerHTML = this.rows[i].value;

			this[VarRubricTable + '-row_title' + i].className = 'compElem compElem-table-row-title';

			this[VarRubricTable + '-rows' + i].id = this.name + '-table_row_title' + i;

			//Add row_title td to tr
			this[VarRubricTable + '-rows' + i].appendChild(this[VarRubricTable + '-row_title' + i]);




			//Add cells to table
			for (var j = 0; j < this.rows.length; j++) {
				this[VarRubricTable + 'main-row-cell' + j] = document.createElement('td');
				this[VarRubricTable + 'main-row-cell' + j].className = 'compElem compElem-main-table-row-cell';

				this[VarRubricTable + 'main-row-cell' + j].id = this.name + '-table_main_row_cell' + j;



				this[VarRubricTable + 'row-radio' + i] = document.createElement('input');
				this[VarRubricTable + 'row-radio' + i].type = 'radio';
				this[VarRubricTable + 'row-radio' + i].name = this.name + '-row-radio' + i;

				this[VarRubricTable + 'row-radio' + i].className = 'compElem compElem-basic-table-row-radio';
				this[VarRubricTable + 'row-radio' + i].id = this.name + '-table-row-radio-' + i + j;
				//Add checkbox to div
				this[VarRubricTable + 'main-row-cell' + j].appendChild(this[VarRubricTable + 'row-radio' + i]);

				//Individual labels for checkboxes
				let Cell_label = document.createElement('label');
				Cell_label.className = 'compElem compElem-basic-table-cell-label';
				Cell_label.htmlFor = this.name + '-table-row-radio-' + i + j;

				this[VarRubricTable + '-row-cell' + j] = document.createElement('td');

				this[VarRubricTable + '-row-cell' + j].innerHTML = this.cells[this.rows[i].id][j];

				this[VarRubricTable + '-row-cell' + j].className = 'compElem compElem-table-row-cell';

				this[VarRubricTable + '-row-cell' + j].id = this.name + '-table_row_cell' + j;

				// this[VarRubricTable + '-rows' + i].appendChild(this[VarRubricTable + '-row-cell' + j]);


				//Add label to tr
				Cell_label.appendChild(this[VarRubricTable + '-row-cell' + j]);
				this[VarRubricTable + 'main-row-cell' + j].appendChild(Cell_label);

				this[VarRubricTable + '-rows' + i].appendChild(this[VarRubricTable + 'main-row-cell' + j]);
			}
			this[VarRubricTable].appendChild(this[VarRubricTable + '-rows' + i]);
		}

		ElemDiv.appendChild(this[VarRubricTable]);
		return ElemDiv;
	}

	getdata() {


		var RowInputs = [];

		// var answer = [];
		for (var i = 0; i < this.cols.length; i++) {
			var ElemName = this.rows[i].value;
			console.log(ElemName);
			const mainDiv = document.getElementById(this.name + '-table_row_title' + i);

			for (var j = 0; j < this.rows.length; j++) {
				if (mainDiv.getElementsByTagName('input')[j].checked)
					console.log(mainDiv.getElementsByTagName('input')[j]);
				RowInputs[ElemName] = document.getElementById(this.name + '-table_row_cell' + j).innerHTML;

			}

		}


		var Rubricdata = {
			[this.YourQue]: RowInputs
		};
		return Rubricdata;

	}
	//Class RubricTable ends	  


}