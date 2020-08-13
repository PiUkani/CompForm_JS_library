const newQuiz = initCompPage('Demo_1');
newQuiz.elemShortAnswer({ name: 'short_1', YourQue: 'Does this spark joy?', length: 50 });

newQuiz.elemMultChoice('mul_choice_1', 'Choose reasons for the sparks of joy', ['1', '2', '3', '4']);

newQuiz.elemMultChoice('rad_choice_1', 'Choose one reason for the sparks of joy', ['1', '2', '3', '4'], 'radio');

newQuiz.elemDropDown('rad_choice_1', 'Which one sparks the joy', ['1', '2', '3', '4']);



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
            choices: ['1', '2', '3', '4'],
        },
        //   {
        //         type: 'radio',
        //         name: 'radio_2',
        //         YourQue: 'select one of the following',
        //         choices: ['1','2','3','4'],
        //     }
    ],
};

newQuiz.elemMixedInput(MixedInputJSON);
newQuiz.createCompPage('Demo_1');

