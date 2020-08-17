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
		newMixedInput.YourQue = this.CompElements.length + 1 + '.' + newMixedInput.YourQue;
		this.CompElements.push(newMixedInput);
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
		var data = { 'AllQA': allAns };
		for (var i = 0; i < this.CompElements.length; i++) {
			// console.log(this.CompElements[i].constructor)
			if (this.CompElements[i].constructor === TextInput || this.CompElements[i].constructor === MultChoice || this.CompElements[i].constructor === DropDown || this.CompElements[i].constructor === MixedInput) { allAns.push(this.CompElements[i].getdata()) }

			else { console.log('no getdata func'); }
		}

		return data;

	}

	//Class CompPage Ends
}




//TODO add line feature lines can define if long answer or short answer
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
		newTextInput.oninput = function () { increase_area(this); };
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
		console.log(data);
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


			(this.subtype === 'radio') ? this[VarMultChoice + 'op' + i].type = 'radio' : this[VarMultChoice + 'op' + i].type = 'checkbox';
			this[VarMultChoice + 'op' + i].className = 'compElem compElem-basic-checkbox';
			(this.subtype === 'radio') ? this[VarMultChoice + 'op' + i].name = this.name + '-choice' : this[VarMultChoice + 'op' + i].name = this.name + '-choice' + i;
			//Add checkbox to div
			ElemDiv.appendChild(this[VarMultChoice + 'op' + i]);

			//Individual labels for checkboxes
			let Sublabel = document.createElement('label');
			Sublabel.className = 'compElem compElem-basic-choice-label';
			Sublabel.textContent = this.choices[i];
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
		console.log(data);
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
			this[VarRadioChoice + 'op' + i].name = 'this.name-choice';
			//Add radio to div
			ElemDiv.appendChild(this[VarRadioChoice + 'op' + i]);

			//Individual labels for radioes
			let Sublabel = document.createElement('label');
			Sublabel.className = 'compElem compElem-basic-choice-label';
			Sublabel.textContent = this.choices[i];
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
		console.log(data);
		return data;
		//Class RadioChoice ends	  
	}
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
		console.log(data);
		return data;
	}
	//Class DropDown ends	  
}


//More Complex Inputs
class MixedInput {
	constructor(InputJSON) {
		this.Input = (InputJSON);
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
		Mainlabel.textContent = this.Input.YourQue;

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
		var Mixeddata = { 'VariousInputs': VariousInputs };
		for (var i = 0; i < this.MixedElements.length; i++) {

			// console.log(this.CompElements[i].constructor)
			if (this.MixedElements[i].constructor === TextInput || this.MixedElements[i].constructor === MultChoice || this.MixedElements[i].constructor === DropDown) {
				VariousInputs.push(this.MixedElements[i].getdata())

			}
			else { console.log('nomore'); }
		}
		console.log(JSON.stringify(Mixeddata));
		return Mixeddata;
	}

	//Class MixedInput ends
}

class RubricTable {
	constructor(InputJSON) {
		this.Input = (InputJSON);
	}



}
class getDataButton {
	constructor(InputJSON) {
		this.CompForm = InputJSON.CompForm;
		this.text = InputJSON.text;
	}

	returnElem() {
		const newButton = document.createElement('BUTTON');
		newButton.className = 'compElem compElem-basic-button';
		newButton.type = 'button';
		const buttonContainer = document.createElement('div');
		buttonContainer.className = 'compElem compElem-basic-div';
		newButton.value = this.text;
		buttonContainer.appendChild(newButton);
		newButton.onclick = this.CompForm.getdata;

		return buttonContainer;
	}
}
