'use strict';

//Creates CompForm
function initCompForm(name) {
	const newCompForm = new CompForm(name);
	return newCompForm;
  }

//Main CompForm Class
class CompForm {
	// constructor(compformname, question_num_option) {
		constructor(compformname) {
	  this.compformname = compformname;
	  this.CompElements = [];
	  this.id = '';
	//   this.question_num_option = question_num_option;
	}

	ArgValidation(name,YourQue,length){
		if( name === '' || YourQue ==='' || length <= 0)
		{
			console.log('missing arguments in'+ this.compformname);
		}
	}
	//TODO add various question number options such as numerical, alphabetical, NIL
	// numberSys(){
	// 	if(this.question_num_option === 'roman')

	// }

elemShortAnswer(name,YourQue,length){
	this.ArgValidation(name,YourQue,length);
	const newShortAnswer = new TextInput( name,YourQue,length);
	newShortAnswer.YourQue = this.CompElements.length+1 + '.'+ newShortAnswer.YourQue;
    this.CompElements.push(newShortAnswer);
}

elemMultChoice(name,YourQue,choices){
	this.ArgValidation(name,YourQue);
	const newMultChoice = new MultChoice( name,YourQue,choices);
	newMultChoice.YourQue = this.CompElements.length+1 + '.'+ newMultChoice.YourQue;
    this.CompElements.push(newMultChoice);
}

elemDropDown(name,YourQue,choices){
	this.ArgValidation(name,YourQue);
	const newMultChoice = new MultChoice( name,YourQue,choices);
	newMultChoice.YourQue = this.CompElements.length+1 + '.'+ newMultChoice.YourQue;
    this.CompElements.push(newMultChoice);
}

elemRadioChoice(name,YourQue,choices){
	this.ArgValidation(name,YourQue);
	const newRadioChoice = new RadioChoice( name,YourQue,choices);
	newRadioChoice.YourQue = this.CompElements.length+1 + '.'+ newRadioChoice.YourQue;
    this.CompElements.push(newRadioChoice);
}

createCompForm(id) {
    const form = this.returnCompForm();
    this.id = id;
    const completeForm = this.CompElements.reduce(function (thisForm, formItem) {
      if (formItem.constructor.name === 'SubmitButton') {
        thisForm.appendChild(formItem.returnElem(thisForm));
      } else {
        thisForm.appendChild(formItem.returnElem());
      }
      return thisForm;
    }, form);

    document.querySelector('#'+id).appendChild(completeForm);
  }

  
returnCompForm() {
    const form = document.createElement('form');
    form.className = 'compElem compElem-div';
    return form;
  }

  //Class CompForm Ends
}


//TODO add line feature lines can define if long answer or short answer
//Basic Inputs
class TextInput{
	constructor( name,YourQue,length) {
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
		let  labelInputArea = document.createElement('label');
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

class MultChoice{
	constructor( name,YourQue,choices) {
		
		this.name = name;
		this.YourQue = YourQue;
		this.choices = choices;
	  }
	
	  returnElem() {
		  
		//create Div to contain question(label) and Multiple_choice
		const ElemDiv = document.createElement('div');
		ElemDiv.className = 'compElem compElem-basic-short-div';
	  
		//Question(label)
		let  Mainlabel = document.createElement('label');
		Mainlabel.className = 'compElem compElem-basic-short-label';
		Mainlabel.textContent = this.YourQue;
		
		  ElemDiv.appendChild(Mainlabel);

		var VarMultChoice = 'newMultChoice';


		  for(var i = 0;i< this.choices.length;i++){
		this[VarMultChoice + 'op' + i] = document.createElement('input');
		this[VarMultChoice + 'op' + i].type = 'checkbox';
		this[VarMultChoice + 'op' + i].className = 'compElem compElem-basic-checkbox';
		this[VarMultChoice + 'op' + i].name = 'this.name-choice' + i;
		//Add checkbox to div
		ElemDiv.appendChild(this[VarMultChoice + 'op' + i]);

		//Individual labels for checkboxes
		let  Sublabel = document.createElement('label');
		Sublabel.className = 'compElem compElem-basic-choice-label';
		Sublabel.textContent = this.choices[i];
			//Add checkbox to div
		ElemDiv.appendChild(Sublabel);
		  }


		return ElemDiv;
	  }

//Class MultChoice ends	  
}


class RadioChoice{
	constructor( name,YourQue,choices) {
		
		this.name = name;
		this.YourQue = YourQue;
		this.choices = choices;
	  }
	
	  returnElem() {
		  
		//create Div to contain question(label) and Radio_choice
		const ElemDiv = document.createElement('div');
		ElemDiv.className = 'compElem compElem-basic-short-div';
	  
		//Question(label)
		let  Mainlabel = document.createElement('label');
		Mainlabel.className = 'compElem compElem-basic-short-label';
		Mainlabel.textContent = this.YourQue;
		
		  ElemDiv.appendChild(Mainlabel);

		var VarRadioChoice = 'newRadioChoice';


		  for(var i = 0;i< this.choices.length;i++){
		this[VarRadioChoice + 'op' + i] = document.createElement('input');
		this[VarRadioChoice + 'op' + i].type = 'radio';
		this[VarRadioChoice + 'op' + i].className = 'compElem compElem-basic-radio';
		this[VarRadioChoice + 'op' + i].name = 'this.name-choice';
		//Add radio to div
		ElemDiv.appendChild(this[VarRadioChoice + 'op' + i]);

		//Individual labels for radioes
		let  Sublabel = document.createElement('label');
		Sublabel.className = 'compElem compElem-basic-choice-label';
		Sublabel.textContent = this.choices[i];
			//Add radio to div
		ElemDiv.appendChild(Sublabel);
		  }


		return ElemDiv;
	  }

//Class MultChoice ends	  
}


//More Complex Inputs
