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

	createCompPage(id) {
		const MainCompPage = this.returnCompPage();
		this.id = id;
		const completePage = this.CompElements.reduce(function (thisPage, formItem) {
			if (formItem.constructor.name === 'SubmitButton') {
				thisPage.appendChild(formItem.returnElem(thisPage));
			} else {
				thisPage.appendChild(formItem.returnElem());
			}
			return thisPage;
		}, MainCompPage);

		document.querySelector('#' + id).appendChild(completePage);
	}


	returnCompPage() {
		const MainCompPage = document.createElement('div');
		MainCompPage.className = 'compElem compElem-div';
		return MainCompPage;
	}

	//Class CompPage Ends
}


//TODO add line feature lines can define if long answer or short answer
//Basic Inputs
class TextInput {
	constructor(name, YourQue, length) {
		this.length = length;
		this.name = name;
		this.YourQue = YourQue;
	}

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

		ElemDiv.appendChild(labelInputArea)
		ElemDiv.appendChild(newTextInput)
		return ElemDiv;
	}

	//Class TextInput ends	  
}

class MultChoice {
	constructor(type, name, YourQue, choices) {
		this.type = type;
		this.name = name;
		this.YourQue = YourQue;
		this.choices = choices;
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


			(this.type === 'radio') ? this[VarMultChoice + 'op' + i].type = 'radio' : this[VarMultChoice + 'op' + i].type = 'checkbox';
			this[VarMultChoice + 'op' + i].className = 'compElem compElem-basic-checkbox';
			(this.type === 'radio') ? this[VarMultChoice + 'op' + i].name = 'this.name-choice' : this[VarMultChoice + 'op' + i].name = 'this.name-choice' + i;
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
	constructor(name, YourQue, choices) {

		this.name = name;
		this.YourQue = YourQue;
		this.choices = choices;
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
	constructor(name, YourQue, choices) {

		this.name = name;
		this.YourQue = YourQue;
		this.choices = choices;
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

		ElemDiv.id = this.Input.id;

		//Question(label)
		let Mainlabel = document.createElement('label');
		Mainlabel.className = 'compElem compElem-basic-short-label';
		Mainlabel.textContent = this.Input.YourQue;

		ElemDiv.appendChild(Mainlabel);



		var ParseInputTypes = 'MixedInput-';


		for (let Inputtypes of this.Input.VariousInputs) {
			// console.log(this.Input.VariousInputs);
			// Inputtypes.type === 'text' ? this[ParseInputTypes + Inputtypes.type] = new TextInput(Inputtypes.name, Inputtypes.YourQue, Inputtype.length) : new TextInput(Inputtypes.name, Inputtypes.YourQue, Inputtype.length)
			this[ParseInputTypes + Inputtypes.type] = new TextInput(Inputtypes.name, Inputtypes.YourQue, Inputtypes.length)
			ElemDiv.appendChild(this[ParseInputTypes + Inputtypes.type]);


		}


		return ElemDiv;
	}

}