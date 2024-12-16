document.addEventListener('DOMContentLoaded', function () {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#000000', '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF7F', '#00CED1', '#1E90FF', '#9370DB', '#FF1493', '#000000'];
    let colorIndex = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);

    const questions = [
        {
            question: "What is your favorite color?",
            answers: ["Red", "Blue", "Green", "Yellow"],
            personality: ["A", "B", "C", "D"]
        },
        {
            question: "What is your favorite animal?",
            answers: ["Dog", "Cat", "Bird", "Fish"],
            personality: ["B", "A", "D", "C"]
        },
        {
            question: "What is your favorite hobby?",
            answers: ["Reading", "Sports", "Cooking", "Traveling"],
            personality: ["C", "D", "A", "B"]
        }
    ];

    const personalities = {
        "A": "You are creative and imaginative.",
        "B": "You are logical and analytical.",
        "C": "You are kind and empathetic.",
        "D": "You are adventurous and bold."
    };

    let currentQuestionIndex = 0;
    // ok so as to why I decided to go with this approach is because I felt like I shouldn't overcomplicate things
    let personalityScores = { "A": 0, "B": 0, "C": 0, "D": 0 };

    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const nextButton = document.getElementById('nextButton');
    const resultContainer = document.getElementById('resultContainer');
    const resultElement = document.getElementById('result');

    function showQuestion(questionIndex) {
        const question = questions[questionIndex];
        questionElement.textContent = question.question;
        answersElement.innerHTML = '';
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.addEventListener('click', () => selectAnswer(index));
            answersElement.appendChild(button);
        });
    }

    function selectAnswer(answerIndex) {
        const question = questions[currentQuestionIndex];
        const personalityType = question.personality[answerIndex];
        personalityScores[personalityType]++;
        nextButton.style.display = 'block';
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
            nextButton.style.display = 'none';
        } else {
            showResult();
        }
    });

    function showResult() {
        const highestScore = Math.max(...Object.values(personalityScores));
        const personalityType = Object.keys(personalityScores).find(key => personalityScores[key] === highestScore);
        resultElement.textContent = personalities[personalityType];
        resultContainer.style.display = 'block';
        document.getElementById('quizContainer').style.display = 'none';
    }

    showQuestion(currentQuestionIndex);
});