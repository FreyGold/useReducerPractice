import { useEffect, useReducer } from "react";
import Header from "./Header";
import "./index.css";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
   questions: [],
   status: "loading",
   index: 0,
   answer: null,
   points: 0,
   timeRemaining: 600,
};

function reducer(state, action) {
   switch (action.type) {
      case "loadingSuccess":
         return { ...state, questions: action.payload, status: "ready" };
      case "loadingFailed":
         return { ...state, status: "error" };
      case "startQuiz":
         return { ...state, status: "active" };
      case "newAnswer":
         const question = state.questions[state.index];
         return {
            ...state,
            answer: action.payload,
            points:
               action.payload === question.correctOption
                  ? state.points + question.points
                  : state.points,
         };
      case "nextQuestion":
         if (state.index === 14) return { ...state, status: "finished" };
         return {
            ...state,
            answer: null,
            index: state.index + 1,
         };
      case "restart":
         return {
            ...state,
            status: "ready",
            index: 0,
            answer: null,
            points: 0,
         };
      case "decTime":
         return {
            ...state,
            timeRemaining: state.timeRemaining - 1,
            status: state.timeRemaining === 0 ? "finished" : state.status,
         };

      default:
         throw new Error("unknown error type");
   }
}

function App() {
   const [state, dispatch] = useReducer(reducer, initialState);
   const { questions, status, index, answer, points, timeRemaining } = state;

   const maxPossiblePoints = questions.reduce(
      (prev, curr) => prev + curr.points,
      0
   );

   useEffect(function () {
      async function loadQuestions() {
         try {
            const response = await fetch("http://localhost:24102/questions");
            if (!response.ok) return;
            const questions = await response.json();
            dispatch({ type: "loadingSuccess", payload: questions });
         } catch (error) {
            dispatch({ type: "loadingFailed" });
         }
      }
      loadQuestions();
   }, []);

   return (
      <div className="app">
         <Header />
         <Main>
            {status === "loading" && <Loader />}
            {status === "error" && <Error />}
            {status === "ready" && <StartScreen dispatch={dispatch} />}
            {status === "active" && (
               <>
                  <Progress
                     index={index}
                     maxPossiblePoints={maxPossiblePoints}
                     points={points}
                     answer={answer}
                  />
                  <Footer>
                     <Question
                        dispatch={dispatch}
                        answer={answer}
                        question={questions[index]}
                        index={index}
                     />
                     <Timer dispatch={dispatch} timeRemaining={timeRemaining} />
                  </Footer>
               </>
            )}
            {status === "finished" && (
               <FinishScreen
                  points={points}
                  maxPossiblePoints={maxPossiblePoints}
                  dispatch={dispatch}
               />
            )}
         </Main>
      </div>
   );
}

export default App;
