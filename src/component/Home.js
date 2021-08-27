import classes from "./Home.module.css";
import { useReducer } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const initialState = {
  isClickedFirst: true,
  isClickedSecond: false,
  isClickedThird: false,
};

const clickReducer = (state, action) => {
  if (action.type === "SECOND") {
    return {
      isClickedFirst: false,
      isClickedSecond: true,
      isClickedThird: false,
    };
  }
  if (action.type === "THIRD") {
    return {
      isClickedFirst: false,
      isClickedSecond: false,
      isClickedThird: true,
    };
  }
  return initialState;
};
const Home = () => {
  const [user] = useAuthState(auth);

  const [clickedState, dispatchClick] = useReducer(clickReducer, initialState);

  const isClickedFirstStyle = clickedState.isClickedFirst ? (
    <li
      onClick={() => dispatchClick({ type: "FIRST" })}
      className={classes.isClicked}
    >
      Upcoming Interviews
    </li>
  ) : (
    <li onClick={() => dispatchClick({ type: "FIRST" })}>
      Upcoming Interviews
    </li>
  );

  const isClickedSecondStyle = clickedState.isClickedSecond ? (
    <li
      onClick={() => dispatchClick({ type: "SECOND" })}
      className={classes.isClicked}
    >
      Past Interviews
    </li>
  ) : (
    <li onClick={() => dispatchClick({ type: "SECOND" })}>Past Interviews</li>
  );

  const isClickedThirdStyle = clickedState.isClickedThird ? (
    <li
      onClick={() => dispatchClick({ type: "THIRD" })}
      className={classes.isClicked}
    >
      All Interviews
    </li>
  ) : (
    <li onClick={() => dispatchClick({ type: "THIRD" })}>All Interviews</li>
  );

  return (
    <div className={classes["home-container"]}>
      <nav>
        <ul>
          {isClickedFirstStyle}
          {isClickedSecondStyle}
          {isClickedThirdStyle}
        </ul>
      </nav>

      {!user && (
        <section className={classes["interview-section-without-login"]}>
          <h2>Sign In to see your Interviews</h2>
        </section>
      )}
    </div>
  );
};

export default Home;
