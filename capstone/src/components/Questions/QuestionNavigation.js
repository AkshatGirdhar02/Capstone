// import React from "react";

// function QuestionNavigation({ totalQuestions, currentQuestion, setCurrentQuestion }) {
//     const questionNumbers = Array.from({ length: totalQuestions }, (_, index) => index + 1);

//     return (
//         <div className="question-navigation">
//             {questionNumbers.map((questionNumber) => (
//                 <button
//                     key={questionNumber}
//                     onClick={() => setCurrentQuestion(questionNumber - 1)} // Adjust for zero-based indexing
//                     className={currentQuestion === questionNumber - 1 ? "active" : ""}
//                 >
//                     {questionNumber}
//                 </button>
//             ))}
//         </div>
//     );
// }

// export default QuestionNavigation;
// QuestionNavigation.js
import React from "react";

function QuestionNavigation({ totalQuestions, currentQuestion, setCurrentQuestion, selectedAnswers }) {
    const questionNumbers = Array.from({ length: totalQuestions }, (_, index) => index + 1);

    const buttonStyle = {
        default: {
            // Define the default button style
            backgroundColor: "blue",
            color: "white",
        },
        active: {
            // Define the style for the currently active (focused) button
            backgroundColor: "lightgray",
        },
        selected: {
            // Define the style for selected (answered) questions
            backgroundColor: "black",
            color: "white",
        },
    };

    return (
        <div className="question-navigation">
            {questionNumbers.map((questionNumber) => (
                <button
                    key={questionNumber}
                    onClick={() => setCurrentQuestion(questionNumber - 1)}
                    style={{
                        ...buttonStyle.default,
                        ...(currentQuestion === questionNumber - 1 && buttonStyle.active),
                        ...(selectedAnswers[questionNumber - 1] !== null && buttonStyle.selected),
                    }}
                >
                    {questionNumber}
                </button>
            ))}
        </div>
    );
}

export default QuestionNavigation;
