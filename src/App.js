import { useReducer } from "react";
import DigitBtn from "./components/DigitBtn";
import OperatorBtn from "./components/OperatorBtn";
import "./App.scss";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  CHOOSE_OPERATION: "choose-operation",
  DELETE: "delete",
  EQUALS: "equals",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentEntry === "0") return state;
      if (payload.digit === "." && state.currentEntry.includes("."))
        return state;
      return {
        ...state,
        currentEntry: `${state.currentEntry || ""}${payload.digit}`,
      };
    case ACTIONS.CLEAR:
      return {};
  }
};

const App = () => {
  const [{ currentEntry, previousEntry, operator }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <main className="container">
      <div className="output">
        <div className="previousEntry">
          {previousEntry} {operator}
        </div>
        <div className="currentEntry">{currentEntry}</div>
      </div>
      <button
        className="spanTwo"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button>DEL</button>
      <OperatorBtn operation="÷" dispatch={dispatch} />
      <DigitBtn digit="1" dispatch={dispatch} />
      <DigitBtn digit="2" dispatch={dispatch} />
      <DigitBtn digit="3" dispatch={dispatch} />
      <OperatorBtn operation="*" dispatch={dispatch} />
      <DigitBtn digit="4" dispatch={dispatch} />
      <DigitBtn digit="5" dispatch={dispatch} />
      <DigitBtn digit="6" dispatch={dispatch} />
      <OperatorBtn operation="+" dispatch={dispatch} />
      <DigitBtn digit="7" dispatch={dispatch} />
      <DigitBtn digit="8" dispatch={dispatch} />
      <DigitBtn digit="9" dispatch={dispatch} />
      <OperatorBtn operation="-" dispatch={dispatch} />
      <DigitBtn digit="." dispatch={dispatch} />
      <DigitBtn digit="0" dispatch={dispatch} />
      <button className="spanTwo">=</button>
    </main>
  );
};

export default App;
