const newQuiz_0 = initCompPage('textInput-Demo');
newQuiz_0.elemShortAnswer({
    name: 'short_1',
    YourQue: 'Does this spark joy?',
    length: 25
});
newQuiz_0.createCompPage('textInput-Demo');


const newQuiz_1 = initCompPage('MultChoice-Demo');
newQuiz_1.elemMultChoice({
    name: 'mul_choice_1',
    YourQue: 'Choose reasons for the sparks of joy',
    choices: ['Option_1', 'Option_2', 'Option_3', 'Option_4']
});
newQuiz_1.createCompPage('MultChoice-Demo');


const newQuiz_2 = initCompPage('SingleChoice-Demo');
newQuiz_2.elemMultChoice({
    name: 'rad_choice_1',
    YourQue: 'Choose one reason for the sparks of joy',
    choices: ['Option_1', 'Option_2', 'Option_3', 'Option_4'],
    subtype: 'radio'
});
newQuiz_2.createCompPage('SingleChoice-Demo');

function demo(inputJSON, div_id) {
    var DisplayData = document.getElementById('demo_0');
    const output_JSON_container = document.createElement('pre');
    output_JSON_container.id = 'pre_out';
    output_JSON_container.appendChild(document.createElement('code'));
    const JsonOut = document.createTextNode(JSON.stringify(inputJSON, null, 1));
    output_JSON_container.appendChild(JsonOut);
    output_JSON_container.name = this.name;
    output_JSON_container.className = 'output-JSON';
    DisplayData.appendChild(output_JSON_container);
}


function demo_1(inputJSON) {
    var DisplayData = document.getElementById('demo_1');
    const output_JSON_container = document.createElement('pre');
    output_JSON_container.id = 'pre_out';
    output_JSON_container.appendChild(document.createElement('code'));
    const JsonOut = document.createTextNode(JSON.stringify(inputJSON, null, 1));
    output_JSON_container.appendChild(JsonOut);
    output_JSON_container.name = this.name;
    output_JSON_container.className = 'output-JSON';
    DisplayData.appendChild(output_JSON_container);
}