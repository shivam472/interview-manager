import classes from "./Home.module.css";
import { useReducer, useState, useEffect, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import InterviewContent from "./InterviewContent";

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

  const [allInterviews, setAllInterviews] = useState([]);

  const updateInterviewsHandler = useCallback(() => {
    db.collection("interviews").onSnapshot((snapshot) => {
      setAllInterviews(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    updateInterviewsHandler();
  }, [updateInterviewsHandler]);

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

  const interviewClassName = "interview-container";

  const allInterviewsContent = allInterviews.map((interview, index) => (
    <div key={index} className={classes[`${interviewClassName}`]}>
      <InterviewContent interviewObj={interview} />
    </div>
  ));

  const upcomingInterviewsContent = allInterviews.map((interview, index) => (
    <>
      {new Date(interview.Interview_Date + " " + interview.Interview_Time) >
        new Date() && (
        <div key={index} className={classes[`${interviewClassName}`]}>
          <InterviewContent interviewObj={interview} />
        </div>
      )}
    </>
  ));

  const pastInterviewsContent = allInterviews.map((interview, index) => (
    <>
      {new Date(interview.Interview_Date + " " + interview.Interview_Time) <
        new Date() && (
        <div key={index} className={classes[`${interviewClassName}`]}>
          <InterviewContent interviewObj={interview} />
        </div>
      )}
    </>
  ));

  const allInterviewsArr = allInterviews.map((interview) => {
    if (interview) {
      return interview;
    }
    return null;
  });

  const upcomingInterviewsArr = allInterviews.filter((interview) => {
    if (
      new Date(interview.Interview_Date + " " + interview.Interview_Time) >
      new Date()
    ) {
      return interview;
    }
    return null;
  });

  const pastInterviewsArr = allInterviews.filter((interview) => {
    if (
      new Date(interview.Interview_Date + " " + interview.Interview_Time) <
      new Date()
    ) {
      return interview;
    }
    return null;
  });

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
        <section
          className={`${classes["interview-section"]} ${classes["without-login"]}`}
        >
          <h2>Sign In to see your Interviews</h2>
        </section>
      )}

      {user && allInterviewsArr.length === 0 && (
        <section
          className={`${classes["interview-section"]} ${classes["without-login"]}`}
        >
          <h2>You have not added any interviews</h2>
        </section>
      )}

      {user &&
        clickedState.isClickedFirst &&
        upcomingInterviewsArr.length !== 0 && (
          <section
            className={`${classes["interview-section"]} ${classes["with-login"]}`}
          >
            {upcomingInterviewsContent}
          </section>
        )}
      {user &&
        clickedState.isClickedFirst &&
        upcomingInterviewsArr.length === 0 &&
        allInterviewsArr.length > 0 && (
          <section
            className={`${classes["interview-section"]} ${classes["without-login"]}`}
          >
            <h2>You have no Upcoming Interviews</h2>
          </section>
        )}

      {user &&
        clickedState.isClickedSecond &&
        pastInterviewsArr.length !== 0 && (
          <section
            className={`${classes["interview-section"]} ${classes["with-login"]}`}
          >
            {pastInterviewsContent}
          </section>
        )}
      {user &&
        clickedState.isClickedSecond &&
        pastInterviewsArr.length === 0 &&
        allInterviewsArr.length > 0 && (
          <section
            className={`${classes["interview-section"]} ${classes["without-login"]}`}
          >
            <h2>You have no Past Interviews</h2>
          </section>
        )}

      {user && clickedState.isClickedThird && (
        <section
          className={`${classes["interview-section"]} ${classes["with-login"]}`}
        >
          {allInterviewsContent}
        </section>
      )}
    </div>
  );
};

export default Home;
