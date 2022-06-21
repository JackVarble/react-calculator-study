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
      if (state.overwrite) {
        return {
          ...state,
          currentEntry: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentEntry === "0") return state;
      if (payload.digit === "." && state.currentEntry == null) return state;
      if (payload.digit === "." && state.currentEntry.includes("."))
        return state;
      return {
        ...state,
        currentEntry: `${state.currentEntry || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentEntry == null && state.previousEntry == null) {
        return state;
      }
      if (state.currentEntry == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousEntry == null) {
        return {
          ...state,
          operation: payload.operation,
          previousEntry: state.currentEntry,
          currentEntry: null,
        };
      }
      return {
        ...state,
        previousEntry: evaluate(state),
        operation: payload.operation,
        currentEntry: null,
      };
    case ACTIONS.EQUALS:
      if (
        state.operation == null ||
        state.currentEntry == null ||
        state.previousEntry == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        currentEntry: evaluate(state),
        previousEntry: null,
        operation: null,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE:
      if (state.overwrite) {
        return {
          ...state,
          currentEntry: null,
          overwrite: false,
        };
      }
      if (state.currentEntry == null) return state;
      if (state.currentEntry.length === 1) {
        return {
          ...state,
          currentEntry: null,
        };
      }
      return {
        ...state,
        currentEntry: state.currentEntry.slice(0, -1),
      };
  }
};

const evaluate = ({ currentEntry, previousEntry, operation }) => {
  const prev = parseFloat(previousEntry);
  const current = parseFloat(currentEntry);
  if (isNaN(current) || isNaN(prev)) return "";
  let computation = "";
  switch (operation) {
    case "÷":
      computation = prev / current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "+":
      computation = prev + current;
      break;
  }
  return computation.toString();
};

const numeral = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

const formatInteger = (number) => {
  if (number == null) return;
  const [integer, decimal] = number.split(".");
  if (decimal == null) return numeral.format(integer);
  return `${numeral.format(integer)}.${decimal}`;
};

const App = () => {
  const [{ currentEntry, previousEntry, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <main className="container">
      <div className="output">
        <div className="previousEntry">
          {formatInteger(previousEntry)} {operation}
        </div>
        <div className="currentEntry">{formatInteger(currentEntry)}</div>
      </div>
      <button
        className="spanTwo"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>DEL</button>
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
      <button
        className="spanTwo"
        onClick={() => dispatch({ type: ACTIONS.EQUALS })}
      >
        =
      </button>
    </main>
  );
};

export default App;
