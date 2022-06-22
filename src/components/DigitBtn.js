import { useEffect } from "react";
import { ACTIONS } from "../App";

const DigitBtn = ({ dispatch, digit }) => {
  useEffect(() => {
    function listener(e) {
      if (e.key === digit) {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
      }
    }
    document.addEventListener("keypress", listener);
    return () => {
      document.removeEventListener("keypress", listener);
    };
  }, [digit]);

  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
};

export default DigitBtn;
