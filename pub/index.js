const newQuiz = initCompPage('Demo_1');
newQuiz.elemShortAnswer('short_1', 'Does this spark joy?',50);
 newQuiz.elemMultChoice('checkbox','mul_choice_1','Choose reasons for the sparks of joy',['1','2','3','4']);

 newQuiz.elemMultChoice('radio','rad_choice_1','Choose one reason for the sparks of joy',['1','2','3','4']);
newQuiz.createCompPage('Demo_1');