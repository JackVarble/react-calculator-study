import { useEffect } from "react";
import { ACTIONS } from "../App";

const OperatorBtn = ({ dispatch, operation, className }) => {
  useEffect(() => {
    function listener(e) {
      if (e.key === operation) {
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
      }
    }
    document.addEventListener("keypress", listener);
    return () => {
      document.removeEventListener("keypress", listener);
    };
  }, [operation]);

  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
      className={className}
    >
      {operation}
    </button>
  );
};

export default OperatorBtn;
