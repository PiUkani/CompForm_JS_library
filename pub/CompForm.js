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
		// newMixedInput.YourQue = this.CompElements.length + 1 + '.' + newMixedInput.YourQue;
		this.CompElements.push(newMixedInput);
	}

	elemgetDataButton(InputJSON) {
		// this.ArgValidation(name, YourQue);
		const newgetDataButton = new getDataButton(InputJSON);
		// newMixedInput.YourQue = this.CompElements.length + 1 + '.' + newMixedInput.YourQue;
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
		for (var i = 0; i < this.CompElements.length; i++) {
			console.log(this.CompElements[i].constructor)
			if (this.CompElements[i].constructor === TextInput) { this.CompElements[i].getdata() }

			else { console.log('nomore'); }
		}
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
		const newTextInput = document.createElement('input');

		newTextInput.type = 'text';
		newTextInput.name = this.name;
		newTextInput.size = this.length;
		newTextInput.className = 'compElem compElem-basic-short-text'

		//create label
		let labelInputArea = document.createElement('label');
		labelInputArea.className = 'compElem compElem-basic-short-label';
		labelInputArea.textContent = this.YourQue;

		//create Div to contain label and text input
		const ElemDiv = document.createElement('div');
		ElemDiv.className = 'compElem compElem-basic-short-div';
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
		const answer = mainDiv.getElementsByTagName('input')[0].value;
		var ElemName = YourQue;
		data[ElemName] = answer;
		console.log(data);
		// return data;
	}

	//Class TextInput ends	  
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
		ElemDiv.className = 'compElem compElem-basic-short-div';

		//Question(label)
		let Mainlabel = document.createElement('label');
		Mainlabel.className = 'compElem compElem-basic-short-label';
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
		ElemDiv.className = 'compElem compElem-basic-short-div';

		//Question(label)
		let Mainlabel = document.createElement('label');
		Mainlabel.className = 'compElem compElem-basic-short-label';
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

	//Class RadioChoice ends	  
}


class DropDown {
	constructor(InputJSON) {

		this.name = InputJSON.name;
		this.YourQue = InputJSON.YourQue;
		this.choices = InputJSON.choices;
	}

	returnElem() {

		//create Div to contain question(label) and Radio_choice
		const ElemDiv = document.createElement('div');
		ElemDiv.className = 'compElem compElem-basic-short-div';

		//Question(label)
		let Mainlabel = document.createElement('label');
		Mainlabel.className = 'compElem compElem-basic-short-label';
		Mainlabel.textContent = this.YourQue;

		ElemDiv.appendChild(Mainlabel);

		let newDropDown = document.createElement('select');
		// newDropDown.type = 'radio';
		newDropDown.className = 'compElem compElem-basic-radio';
		newDropDown.name = 'this.name-choice';
		//Add radio to div
		ElemDiv.appendChild(newDropDown);

		for (var i = 0; i < this.choices.length; i++) {
			//Individual labels for radioes
			let Sublabel = document.createElement('option');
			Sublabel.className = 'compElem compElem-basic-choice-label';
			Sublabel.textContent = this.choices[i];
			//Add radio to div
			newDropDown.appendChild(Sublabel);
		}

		return ElemDiv;
	}

	//Class DropDown ends	  
}


//More Complex Inputs
class MixedInput {
	constructor(InputJSON) {
		this.Input = (InputJSON);

	}

	returnElem() {

		//create Div to contain question(label) and Radio_choice
		const ElemDiv = document.createElement('div');
		ElemDiv.className = 'compElem compElem-comp-vertical-div';

		// ElemDiv.id = this.Input.id;
		ElemDiv.name = this.Input.name;
		//Question(label)
		let Mainlabel = document.createElement('label');
		Mainlabel.className = 'compElem compElem-basic-short-label';
		Mainlabel.textContent = this.Input.YourQue;

		ElemDiv.appendChild(Mainlabel);



		var ParseInputTypes = 'MixedInput-';


		for (let Inputtypes of this.Input.VariousInputs) {
			this[ParseInputTypes + Inputtypes.type] = new Inputtypes.type(Inputtypes)

			// this[ParseInputTypes + Inputtypes.type] = new TextInput(Inputtypes.name, Inputtypes.YourQue, Inputtypes.length)
			ElemDiv.appendChild(this[ParseInputTypes + Inputtypes.type].returnElem());
			// ElemDiv.childNodes.reduce()
		}

		return ElemDiv;
	}

	//Class MixedInput ends
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
		buttonContainer.className = 'compElem compElem-basic-short-div';
		newButton.value = this.text;
		buttonContainer.appendChild(newButton);
		newButton.onclick = this.CompForm.getdata;

		return buttonContainer;
	}
}

// const returnJSON = elements => {
// 	// This is the function that is called on each element of the array.
// 	const reducerFunction = (CompPage.CompElements, element) => {
// 	// Add the current field to the object.
// 	data[element.name] = element.value;
// 	// For the demo only: show each step in the reducer’s progress.
// 	console.log(JSON.stringify(data));
// 	return data;
// };
// // This is used as the initial value of `data` in `reducerFunction()`.
// const reducerInitialValue = {};
// // To help visualize what happens, log the inital value.
// console.log('Initial `data` value:', JSON.stringify(reducerInitialValue));
// // Now we reduce by `call`-ing `Array.prototype.reduce()` on `elements`.
// const formData = [].reduce.call(elements, reducerFunction, reducerInitialValue);
// // The result is then returned for use elsewhere.
// return formData;
// };