document.addEventListener("DOMContentLoaded",()=>{


const container = document.getElementById('container');
const quizContainer = document.getElementById('quiz-container');
const quizQuestion = document.getElementById('quiz-question');
const questionText = document.getElementById('question-test');
const questionOptions = document.getElementById('question-options');
const nextButton = document.getElementById('next');
const quizResult = document.getElementById('quiz-result');
const scoreText = document.getElementById('score');
const restartButton = document.getElementById('restart');
const startQuizButton = document.getElementById('Start-Quiz');

const question = [
    {
        question: "What is the capital of India?",
        choices: ["Mumbai", "Chennai", "New Delhi", "Kolkata"],
        answer: "New Delhi"
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        choices: ["Leo Tolstoy", "William Shakespeare", "Charles Dickens", "Jane Austen"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the chemical symbol for water?",
        choices: ["O2", "H2O", "CO2", "NaCl"],
        answer: "H2O"
    },
    {
        question: "Which is the largest mammal in the world?",
        choices: ["African Elephant", "Blue Whale", "Giraffe", "White Rhinoceros"],
        answer: "Blue Whale"
    }
];

    let currentIdx=0;
    let score=0;


startQuizButton.addEventListener("click",startQuiz) // directly executes startQuiz 

function startQuiz(){
    startQuizButton.classList.add("hidden")
    quizResult.classList.add("hidden")
    quizQuestion.classList.remove("hidden")
    showQues();
}

    function showQues(){
        // display the ques
        nextButton.classList.add("hidden")
        questionOptions.innerHTML=""
        

        questionText.textContent=question[currentIdx].question
        // show the options
        question[currentIdx].choices.forEach((choice)=>{

            const li=document.createElement('li')
            li.innerHTML=`
            ${choice}
            `
            li.classList.add("style-options")
            questionOptions.appendChild(li)

            li.addEventListener("click",()=>{
                selectOption(choice)
                // here selectOption function is start executing when li is clicked :-imp

            })

        })


    }

    function selectOption(choice){
        let correctAns=question[currentIdx].answer
        if(correctAns===choice){
            score++
        }
        nextButton.classList.remove("hidden")
    }

    nextButton.addEventListener("click",()=>{
        nextPage()
    })

    function nextPage(){
        currentIdx++;
        if(currentIdx<question.length){
            showQues()
        }
        else{
            restart()
        }
        
    }

    function restart(){
        quizQuestion.classList.add("hidden")
        quizResult.classList.remove("hidden")
        scoreText.textContent=`${score} out of ${question.length}`
        restart.classList.remove("hidden")

    }

    restartButton.addEventListener("click",()=>{
        quizResult.classList.add("hidden")
        score=0
        currentIdx=0
        quizQuestion.classList.remove("hidden")
        startQuiz()

    })

})