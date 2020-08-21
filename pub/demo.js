const newQuiz_0 = initCompPage({
    id: 'textInput-Demo',
    question_num_option: 'num'
});
newQuiz_0.elemTextInput({
    name: 'short_1',
    YourQue: 'Does this spark joy?',
    length: 40
});
newQuiz_0.createCompPage('textInput-Demo');


const newQuiz_1 = initCompPage({
    id: 'MultChoice-Demo',
    question_num_option: 'num'
});
newQuiz_1.elemMultChoice({
    name: 'mul_choice_1',
    YourQue: 'Choose reasons for the sparks of joy',
    choices: ['Option_1', 'Option_2', 'Option_3', 'Option_4']
});
newQuiz_1.createCompPage('MultChoice-Demo');


const newQuiz_2 = initCompPage({
    id: 'SingleChoice-Demo',
    question_num_option: 'num'
});
newQuiz_2.elemMultChoice({
    name: 'rad_choice_1',
    YourQue: 'Choose one reason for the sparks of joy',
    choices: ['Option_1', 'Option_2', 'Option_3', 'Option_4'],
    subtype: 'radio'
});
newQuiz_2.createCompPage('SingleChoice-Demo');


const newQuiz_3 = initCompPage({
    id: 'DropDown-Demo',
    question_num_option: 'num'
});
newQuiz_3.elemDropDown({
    name: 'drop_down_1',
    YourQue: 'Which one sparks the joy',
    choices: ['Option_1', 'Option_2', 'Option_3', 'Option_4']
});
newQuiz_3.createCompPage('DropDown-Demo');



const newQuiz_4 = initCompPage({
    id: 'ImageChooser-Demo',
    question_num_option: 'num'
});
newQuiz_4.elemImageChooser({
    name: 'img_choice_1',
    YourQue: 'Choose the image that best describes your mood',
    choices: ['./imgs/1.png', './imgs/2.png', './imgs/3.png', './imgs/4.png']
});
newQuiz_4.createCompPage('ImageChooser-Demo');



const newQuiz_5 = initCompPage({
    id: 'RubricTable-Demo',
    question_num_option: 'num'
});
var Rubric = {
    name: 'Evaluate your joy',
    YourQue: 'Select appropriate response for each row',
    cols: ['col1', 'col2', 'col3', 'col4'],
    rows: [{
            id: 'row1',
            value: 'row_one'
        },
        {
            id: 'row2',
            value: 'row_two'
        },
        {
            id: 'row3',
            value: 'row_three'
        },
        {
            id: 'row4',
            value: 'row_four'
        }
    ],
    cells: {
        'row1': ['cell11', 'cell12', 'cell13', 'cell14'],
        'row2': ['cell11', 'cell12', 'cell13', 'cell14'],
        'row3': ['cell11', 'cell12', 'cell13', 'cell14'],
        'row4': ['cell11', 'cell12', 'cell13', 'cell14'],
    }
};
newQuiz_5.elemRubricTable(Rubric);
newQuiz_5.createCompPage('RubricTable-Demo');



const newQuiz_6 = initCompPage({
    id: 'MixedInput-Demo',
    question_num_option: 'num'
});
var MixedInputJSON = {
    name: 'classEvaluation',
    YourQue: 'Fill out Below class Eval',
    VariousInputs: [{
            type: TextInput,
            name: 'short_2',
            YourQue: 'describe your experience',
            length: 50,
        },
        {
            type: ImageChooser,
            name: 'img_choice_2',
            YourQue: 'Choose the image that best describes your mood',
            choices: ['./imgs/1.png', './imgs/2.png', './imgs/3.png', './imgs/4.png']

        },
        {
            type: DropDown,
            name: 'drop_down_1',
            YourQue: 'Which one sparks the joy',
            choices: ['Option_1', 'Option_2', 'Option_3', 'Option_4']
        }
    ],
};
newQuiz_6.elemMixedInput(MixedInputJSON);
newQuiz_6.createCompPage('MixedInput-Demo');


function demo(inputJSON, div_id) {
    var DisplayData = document.getElementById(div_id);
    const output_JSON_container = document.createElement('pre');
    output_JSON_container.id = 'pre_out';
    output_JSON_container.appendChild(document.createElement('code'));
    const JsonOut = document.createTextNode(JSON.stringify(inputJSON, null, 1));
    output_JSON_container.appendChild(JsonOut);
    output_JSON_container.name = this.name;
    output_JSON_container.className = 'output-JSON';
    DisplayData.appendChild(output_JSON_container);
}


window.onscroll = function () {
    var SubMenu = document.getElementById("SubMenu");
    var TopButton = document.getElementById("GoToTop");
    if (window.pageYOffset >= 110) {
        SubMenu.classList.add("sticky");
        TopButton.style.display = "block";
    } else if (window.pageYOffset == 0) {
        SubMenu.classList.remove("sticky");
        TopButton.style.display = "none";
    }


};

function addFunctoButton(button, handler) {
    if (button.addEventListener) {
        button.addEventListener('click', handler, false);
    } else if (button.attachEvent) {
        button.attachEvent('on' + 'click', handler);
    } else {
        button['on' + 'click'] = handler;
    }
}

function GotoTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    console.log('test');
}
addFunctoButton(document.getElementById('GoToTop'), GotoTop);
// onclick = "demo(newQuiz_0.getdata(),'demo_0');"


addFunctoButton(document.getElementById('demobutton_0'), function () {
    demo(newQuiz_0.getdata(), 'demo_0');
});

addFunctoButton(document.getElementById('demobutton_1'), function () {
    demo(newQuiz_1.getdata(), 'demo_1');
});

addFunctoButton(document.getElementById('demobutton_2'), function () {
    demo(newQuiz_2.getdata(), 'demo_2');
});

addFunctoButton(document.getElementById('demobutton_3'), function () {
    demo(newQuiz_3.getdata(), 'demo_3');
});

addFunctoButton(document.getElementById('demobutton_4'), function () {
    demo(newQuiz_4.getdata(), 'demo_4');
});

addFunctoButton(document.getElementById('demobutton_5'), function () {
    demo(newQuiz_5.getdata(), 'demo_5');
});


addFunctoButton(document.getElementById('demobutton_6'), function () {
    demo(newQuiz_6.getdata(), 'demo_6');
});