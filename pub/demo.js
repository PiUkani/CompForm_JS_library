const newQuiz_0 = initCompPage({
    id: 'textInput-Demo',
    question_num_option: 'num'
});
newQuiz_0.elemTextInput({
    name: 'short_1',
    YourQue: 'Does this spark joy?',
    length: 25
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
    id: 'ImageChooser-Demo',
    question_num_option: 'num'
});
newQuiz_6.elemImageChooser({
    name: 'img_choice_1',
    YourQue: 'Choose the image that best describes your mood',
    choices: ['./imgs/1.png', './imgs/2.png', './imgs/3.png', './imgs/4.png']
});
newQuiz_6.createCompPage('ImageChooser-Demo');


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