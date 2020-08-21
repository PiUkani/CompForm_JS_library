const newQuiz_0 = initCompPage('textInput-Demo');
newQuiz_0.elemShortAnswer({
    name: 'short_1',
    YourQue: 'Does this spark joy?',
    length: 25
});
newQuiz_0.createCompPage('textInput-Demo');


function demo_0(inputJSON) {
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