const newQuiz = initCompPage('Demo_1');
newQuiz.elemShortAnswer({ name: 'short_1', YourQue: 'Does this spark joy?', length: 50 });

newQuiz.elemMultChoice({ name: 'mul_choice_1', YourQue: 'Choose reasons for the sparks of joy', choices: ['1', '2', '3', '4'] });

newQuiz.elemMultChoice({ name: 'rad_choice_1', YourQue: 'Choose one reason for the sparks of joy', choices: ['1', '2', '3', '4'], type: 'radio' });

newQuiz.elemDropDown({ name: 'rad_choice_1', YourQue: 'Which one sparks the joy', choices: ['1', '2', '3', '4'] });



var MixedInputJSON = {
    id: "classEvaluation",
    YourQue: "Fill out Below class Eval",
    VariousInputs: [
        {
            type: TextInput,
            name: 'short_2',
            YourQue: 'describe your experience',
            length: 100,
        },
        {
            type: MultChoice,
            name: 'check_2',
            YourQue: 'select whichever applies',
            choices: ['5', '2', '3', '4'],
        },
        {
            subtype: 'radio',
            type: MultChoice,
            name: 'radio_2',
            YourQue: 'select one of the following',
            choices: ['1', '2', '3', '4'],
        }
    ],
};

newQuiz.elemMixedInput(MixedInputJSON);
newQuiz.createCompPage('Demo_1');

