import { useState, useEffect, useReducer } from "react";
import DigitBtn from "./components/DigitBtn";
import OperatorBtn from "./components/OperatorBtn";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
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
          allClear: false,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentEntry === "0")
        return { ...state, overwrite: false };
      if (payload.digit === "." && state.currentEntry == null)
        return { ...state, overwrite: false };
      if (payload.digit === "." && state.currentEntry.includes("."))
        return { ...state, overwrite: false };
      return {
        ...state,
        currentEntry: `${state.currentEntry || ""}${payload.digit}`,
        allClear: false,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentEntry == null && state.previousEntry == null) {
        return state;
      }
      if (state.currentEntry == null) {
        return {
          ...state,
          operation: payload.operation,
          allClear: true,
        };
      }
      if (state.previousEntry == null) {
        return {
          ...state,
          operation: payload.operation,
          previousEntry: state.currentEntry,
          currentEntry: null,
          allClear: true,
        };
      }
      return {
        ...state,
        previousEntry: evaluate(state),
        operation: payload.operation,
        currentEntry: null,
        allClear: false,
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
        allClear: true,
        currentEntry: evaluate(state),
        previousEntry: null,
        operation: null,
      };
    case ACTIONS.CLEAR:
      if (state.allClear) {
        return {};
      }
      return {
        ...state,
        currentEntry: null,
        previousEntry: state.previousEntry,
        operation: state.operation,
        allClear: true,
      };
    case ACTIONS.DELETE:
      if (state.overwrite) {
        return {
          ...state,
          currentEntry: null,
          overwrite: false,
          allClear: true,
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
    case "/":
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

  const [drkMode, setDrkMode] = useState(false);

  useEffect(() => {
    function listener(e) {
      if (e.key.toLowerCase() === "enter") {
        dispatch({ type: ACTIONS.EQUALS });
      }
      if (e.key.toLowerCase() === "c") {
        dispatch({ type: ACTIONS.CLEAR });
      }
      if (
        e.key.toLowerCase() === "backspace" ||
        e.key.toLowerCase() === "delete"
      ) {
        dispatch({ type: ACTIONS.DELETE });
      }
    }
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [ACTIONS]);

  const drkModeHandler = () => {
    setDrkMode(true);
  };

  const lightModeHandler = () => {
    setDrkMode(false);
  };

  const colorChange = drkMode ? "everything-dark" : "everything-light";

  return (
    <div className={drkMode ? "bodyDark" : "bodyLight"}>
      <main className={colorChange}>
        <div className="container">
          <div className="output">
            <div className="previousEntry">
              {formatInteger(previousEntry)} {operation}
            </div>
            <div className="currentEntry">{formatInteger(currentEntry)}</div>
          </div>
          <button
            className="spanTwo color"
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          >
            {currentEntry != null && previousEntry != null ? "C" : "AC"}
          </button>
          <button
            onClick={() => dispatch({ type: ACTIONS.DELETE })}
            className="color"
          >
            DEL
          </button>
          <OperatorBtn operation="/" dispatch={dispatch} className="color" />
          <DigitBtn digit="1" dispatch={dispatch} />
          <DigitBtn digit="2" dispatch={dispatch} />
          <DigitBtn digit="3" dispatch={dispatch} />
          <OperatorBtn operation="*" dispatch={dispatch} className="color" />
          <DigitBtn digit="4" dispatch={dispatch} />
          <DigitBtn digit="5" dispatch={dispatch} />
          <DigitBtn digit="6" dispatch={dispatch} />
          <OperatorBtn operation="+" dispatch={dispatch} className="color" />
          <DigitBtn digit="7" dispatch={dispatch} />
          <DigitBtn digit="8" dispatch={dispatch} />
          <DigitBtn digit="9" dispatch={dispatch} />
          <OperatorBtn operation="-" dispatch={dispatch} className="color" />
          <DigitBtn digit="." dispatch={dispatch} />
          <DigitBtn digit="0" dispatch={dispatch} />
          <button
            className="spanTwo color"
            onClick={() => dispatch({ type: ACTIONS.EQUALS })}
          >
            =
          </button>
        </div>
        <div className="bottomRow">
          <IoMdSunny onClick={lightModeHandler} className="drk_lt" />
          <IoMdMoon onClick={drkModeHandler} className="drk_lt" />
        </div>
      </main>
    </div>
  );
};

export default App;
