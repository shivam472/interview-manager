import classes from "./Home.module.css";
import {
  useReducer,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import CountContext from "./context/count-context";

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

  const [noOfInterviewsCount, setNoOfInterviewsCount] = useState([
    { count: 0 },
  ]);

  const updateInterviewsHandler = useCallback(() => {
    db.collection("interviews").onSnapshot((snapshot) => {
      setAllInterviews(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const updateInterviewCountHandler = useCallback(() => {
    db.collection("interviewCounter").onSnapshot((snapshot) => {
      setNoOfInterviewsCount(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    updateInterviewsHandler();
    updateInterviewCountHandler();
  }, [updateInterviewsHandler, updateInterviewCountHandler]);

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

  const allInterviewsContent = allInterviews.map(
    (
      {
        Company_Name,
        Candidate_Name,
        Candidate_Number,
        Current_Company,
        Notice_Period,
        Current_Location,
        Current_CTC,
        Expected_CTC,
        Offered_CTC,
        Total_Experience,
        Relevant_Experience,
        Interview_Date,
        Interview_Time,
        Role,
        Number_Of_Rounds,
        Agent_Name,
      },
      index
    ) => (
      <div key={index} className={classes[`${interviewClassName}`]}>
        <h2>{Company_Name}</h2>
        <p>
          Candidate Name: <strong>{Candidate_Name}</strong>{" "}
        </p>
        <p>
          Candidate's Number <strong>{Candidate_Number}</strong>
        </p>
        <p>
          Current Company: <strong>{Current_Company}</strong>
        </p>
        <p>
          Notice Period: <strong>{Notice_Period}</strong>
        </p>
        <p>
          Current Location: <strong>{Current_Location}</strong>
        </p>
        <p>
          Current CTC: <strong>{Current_CTC}</strong>
        </p>
        <p>
          Expected CTC: <strong>{Expected_CTC}</strong>
        </p>
        <p>
          Offered CTC: <strong>{Offered_CTC}</strong>
        </p>
        <p>
          Total Experience: <strong>{Total_Experience}</strong>
        </p>
        <p>
          Relevant Experience: <strong>{Relevant_Experience}</strong>
        </p>
        <p>
          Interview Date: <strong>{Interview_Date}</strong>
        </p>
        <p>
          Interview Time: <strong>{Interview_Time}</strong>
        </p>
        <p>
          Number Of Rounds: <strong>{Number_Of_Rounds}</strong>
        </p>
        <p>
          Role: <strong>{Role}</strong>
        </p>
        <p>
          Agent Name: <strong>{Agent_Name}</strong>
        </p>
      </div>
    )
  );

  const upcomingInterviewsContent = allInterviews.map(
    (
      {
        Company_Name,
        Candidate_Name,
        Candidate_Number,
        Current_Company,
        Notice_Period,
        Current_Location,
        Current_CTC,
        Expected_CTC,
        Offered_CTC,
        Total_Experience,
        Relevant_Experience,
        Interview_Date,
        Interview_Time,
        Role,
        Number_Of_Rounds,
        Agent_Name,
      },
      index
    ) => (
      <div key={index} className={classes[`${interviewClassName}`]}>
        {new Date(Interview_Date + " " + Interview_Time) > new Date() && (
          <>
            <h2>{Company_Name}</h2>
            <p>
              Candidate Name: <strong>{Candidate_Name}</strong>{" "}
            </p>
            <p>
              Candidate's Number <strong>{Candidate_Number}</strong>
            </p>
            <p>
              Current Company: <strong>{Current_Company}</strong>
            </p>
            <p>
              Notice Period: <strong>{Notice_Period}</strong>
            </p>
            <p>
              Current Location: <strong>{Current_Location}</strong>
            </p>
            <p>
              Current CTC: <strong>{Current_CTC}</strong>
            </p>
            <p>
              Expected CTC: <strong>{Expected_CTC}</strong>
            </p>
            <p>
              Offered CTC: <strong>{Offered_CTC}</strong>
            </p>
            <p>
              Total Experience: <strong>{Total_Experience}</strong>
            </p>
            <p>
              Relevant Experience: <strong>{Relevant_Experience}</strong>
            </p>
            <p>
              Interview Date: <strong>{Interview_Date}</strong>
            </p>
            <p>
              Interview Time: <strong>{Interview_Time}</strong>
            </p>
            <p>
              Number Of Rounds: <strong>{Number_Of_Rounds}</strong>
            </p>
            <p>
              Role: <strong>{Role}</strong>
            </p>
            <p>
              Agent Name: <strong>{Agent_Name}</strong>
            </p>
          </>
        )}
      </div>
    )
  );

  const pastInterviewsContent = allInterviews.map(
    (
      {
        Company_Name,
        Candidate_Name,
        Candidate_Number,
        Current_Company,
        Notice_Period,
        Current_Location,
        Current_CTC,
        Expected_CTC,
        Offered_CTC,
        Total_Experience,
        Relevant_Experience,
        Interview_Date,
        Interview_Time,
        Role,
        Number_Of_Rounds,
        Agent_Name,
      },
      index
    ) => (
      <div key={index} className={classes[`${interviewClassName}`]}>
        {new Date(Interview_Date + " " + Interview_Time) < new Date() && (
          <>
            <h2>{Company_Name}</h2>
            <p>
              Candidate Name: <strong>{Candidate_Name}</strong>{" "}
            </p>
            <p>
              Candidate's Number <strong>{Candidate_Number}</strong>
            </p>
            <p>
              Current Company: <strong>{Current_Company}</strong>
            </p>
            <p>
              Notice Period: <strong>{Notice_Period}</strong>
            </p>
            <p>
              Current Location: <strong>{Current_Location}</strong>
            </p>
            <p>
              Current CTC: <strong>{Current_CTC}</strong>
            </p>
            <p>
              Expected CTC: <strong>{Expected_CTC}</strong>
            </p>
            <p>
              Offered CTC: <strong>{Offered_CTC}</strong>
            </p>
            <p>
              Total Experience: <strong>{Total_Experience}</strong>
            </p>
            <p>
              Relevant Experience: <strong>{Relevant_Experience}</strong>
            </p>
            <p>
              Interview Date: <strong>{Interview_Date}</strong>
            </p>
            <p>
              Interview Time: <strong>{Interview_Time}</strong>
            </p>
            <p>
              Number Of Rounds: <strong>{Number_Of_Rounds}</strong>
            </p>
            <p>
              Role: <strong>{Role}</strong>
            </p>
            <p>
              Agent Name: <strong>{Agent_Name}</strong>
            </p>
          </>
        )}
      </div>
    )
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
        <section
          className={`${classes["interview-section"]} ${classes["without-login"]}`}
        >
          <h2>Sign In to see your Interviews</h2>
        </section>
      )}
      {user && noOfInterviewsCount[0].count > 0 && (
        <section
          className={`${classes["interview-section"]} ${classes["with-login"]}`}
        >
          {clickedState.isClickedFirst && upcomingInterviewsContent}
          {clickedState.isClickedThird && allInterviewsContent}
          {clickedState.isClickedThird && pastInterviewsContent}
        </section>
      )}

      {user && noOfInterviewsCount[0].count === 0 && (
        <section
          className={`${classes["interview-section"]} ${classes["without-login"]}`}
        >
          <h2>You have not added any interviews</h2>
        </section>
      )}
    </div>
  );
};

export default Home;
