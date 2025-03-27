function Question({ question, dispatch, answer, index }) {
   return (
      <div>
         <h4>{question.question}</h4>
         <div className="options">
            {question.options.map((option, curIndex) => (
               <button
                  className={`btn btn-option 
                  ${
                     answer !== null
                        ? curIndex === question.correctOption
                           ? "correct"
                           : "wrong"
                        : ""
                  } 
                  ${curIndex === answer ? "answer" : ""}`}
                  key={option}
                  disabled={answer !== null}
                  onClick={() =>
                     dispatch({ type: "newAnswer", payload: curIndex })
                  }>
                  {option}
               </button>
            ))}
         </div>
         <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "nextQuestion" })}
            disabled={answer === null}>
            {index !== 14 ? "Next Question" : "Finish"}
         </button>
      </div>
   );
}

export default Question;
