'use strict';

//Creates CompForm
function initCompForm(name) {
	const newCompForm = new CompForm(name);
	return newCompForm;
  }

//Main CompForm Class
class CompForm {
	constructor(compformname) {
	  this.compformname = compformname;
	  this.CompElements = [];
	  this.id = '';
	}

	ArgValidation(name,YourQue,length){
		if( name === '' || YourQue ==='' || length <= 0)
		{
			console.log('missing arguments in'+ this.compformname);
		}
	}
	
elemShortAnswer(name,YourQue,length){
	this.ArgValidation(name,YourQue,length);
	const newShortAnswer = new TextInput( name,YourQue,length);
    this.CompElements.push(newShortAnswer);
}

// elemMultChoice()

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
	constructor( name,YourQue) {
		
		this.name = name;
		this.YourQue = YourQue;
	  }
	
	  returnElem() {
		const newMultChoice = document.createElement('input');
		
		newMultChoice.type = this.type;
		newMultChoice.name = this.name;
	  
		newTextInput.className = 'compElem compElem-basic-short-'+this.type
	  
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

//Class MultChoice ends	  
}

//More Complex Inputs
