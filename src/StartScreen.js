function StartScreen({ dispatch }) {
   return (
      <div className="start">
         <h2>Welcome to the React Quiz!</h2>
         <h3>15 Questions to test your React mastery</h3>
         <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "startQuiz" })}>
            Let's start
         </button>
      </div>
   );
}

export default StartScreen;
