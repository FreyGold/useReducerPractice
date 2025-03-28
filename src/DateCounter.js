import { useReducer, useState } from "react";

const initialState = { step: 1, count: 0 };

function reducer(state, action) {
   switch (action.type) {
      case "dec":
      case "inc":
         return { ...state, count: state.count + action.payload };

      case "setCount":
         return { ...state, count: action.payload };

      case "setStep":
         return { ...state, step: action.payload };

      case "reset":
         return initialState;

      default:
         throw new Error("unknown action type");
   }
}
function DateCounter() {
   // const [count, setCount] = useState(0);
   //  const [step, setStep] = useState(1);
   const [state, dispatch] = useReducer(reducer, initialState);
   const { step, count } = state;

   const date = new Date("june 21 2027");
   date.setDate(date.getDate() + count);

   const dec = function () {
      // setCount((count) => count - step);
      dispatch({ type: "dec", payload: -step });
   };

   const inc = function () {
      // setCount((count) => count + step);
      dispatch({ type: "inc", payload: step });
   };

   const defineCount = function (e) {
      dispatch({ type: "setCount", payload: Number(e.target.value) });
   };

   const defineStep = function (e) {
      // setStep(Number(e.target.value));
      dispatch({ type: "setStep", payload: Number(e.target.value) });
   };

   const reset = function () {
      // setCount(0);
      dispatch({ type: "reset" });
   };

   return (
      <div className="counter">
         <div>
            <input
               type="range"
               min="0"
               max="10"
               value={step}
               onChange={defineStep}
            />
            <span>{step}</span>
         </div>

         <div>
            <button onClick={dec}>-</button>
            <input value={count} onChange={defineCount} />
            <button onClick={inc}>+</button>
         </div>

         <p>{date.toDateString()}</p>

         <div>
            <button onClick={reset}>Reset</button>
         </div>
      </div>
   );
}
export default DateCounter;
