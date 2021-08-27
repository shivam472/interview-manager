import classes from "./InterviewForm.module.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useState, useReducer, useCallback, useEffect } from "react";

const initialDetails = {
  companyName: "",
  recruiterName: "",
  recruiterNumber: "",
  role: "",
  numberOfRounds: "",
  interviewDate: "",
  interviewTime: "",
};

const detailsReducer = (state, action) => {
  if (action.type === "COMPANY_NAME") {
    return { ...state, companyName: action.value };
  }
  if (action.type === "RECRUITER_NAME") {
    return { ...state, recruiterName: action.value };
  }
  if (action.type === "RECRUITER_NUMBER") {
    return { ...state, recruiterNumber: action.value };
  }
  if (action.type === "ROLE") {
    return { ...state, role: action.value };
  }
  if (action.type === "NOR") {
    return { ...state, numberOfRounds: action.value };
  }
  if (action.type === "INTERVIEW_DATE") {
    return { ...state, interviewDate: action.value };
  }
  if (action.type === "INTERVIEW_TIME") {
    return { ...state, interviewTime: action.value };
  }
  return initialDetails;
};
const InterviewForm = () => {
  const [formIsNotFilled, setFormIsNotFilled] = useState(true);

  const [interviewDetails, detailsDispatch] = useReducer(
    detailsReducer,
    initialDetails
  );

  const style = {
    display: "flex",
    width: "100%",
    alignItems: "center",
    margin: "10px 0",
    justifyContent: "space-between",
  };

  const checkValidity = useCallback(() => {
    if (
      interviewDetails.companyName.trim() !== "" &&
      interviewDetails.recruiterName.trim() !== "" &&
      interviewDetails.recruiterNumber.trim().length === 10 &&
      interviewDetails.role.trim() !== "" &&
      interviewDetails.numberOfRounds.trim().length > 0 &&
      new Date(interviewDetails.interviewDate) >= new Date() &&
      interviewDetails.interviewTime.trim() !== ""
    ) {
      setFormIsNotFilled(false);
    } else {
      setFormIsNotFilled(true);
    }
  }, [
    interviewDetails.companyName,
    interviewDetails.recruiterName,
    interviewDetails.recruiterNumber,
    interviewDetails.role,
    interviewDetails.numberOfRounds,
    interviewDetails.interviewDate,
    interviewDetails.interviewTime,
  ]);

  useEffect(() => {
    checkValidity();
  }, [checkValidity]);

  const addInterviewHanlder = (e) => {
    e.preventDefault();

    console.log(interviewDetails);
  };

  const companyNameChangeHandler = (e) => {
    detailsDispatch({ type: "COMPANY_NAME", value: e.target.value });
  };

  const recruiterNameChangeHandler = (e) => {
    detailsDispatch({ type: "RECRUITER_NAME", value: e.target.value });
  };

  const recruiterNumberChangeHandler = (e) => {
    detailsDispatch({ type: "RECRUITER_NUMBER", value: e.target.value });
  };

  const roleChangeHandler = (e) => {
    detailsDispatch({ type: "ROLE", value: e.target.value });
  };

  const NORChangeHandler = (e) => {
    detailsDispatch({ type: "NOR", value: e.target.value });
  };

  const interviewDateChangeHandler = (e) => {
    detailsDispatch({ type: "INTERVIEW_DATE", value: e.target.value });
  };

  const interviewTimeChangeHandler = (e) => {
    detailsDispatch({ type: "INTERVIEW_TIME", value: e.target.value });
  };

  return (
    <div className={classes["form-container"]}>
      <form onSubmit={addInterviewHanlder}>
        <div style={style}>
          <label htmlFor="company_name">Company Name</label>
          <TextField
            id="company_name"
            label="Company Name"
            variant="outlined"
            style={{ width: "350px" }}
            onChange={companyNameChangeHandler}
            value={interviewDetails.companyName}
          />
        </div>

        <div style={style}>
          <label htmlFor="recruiter_name">Recruiter's Name</label>
          <TextField
            id="recruiter_name"
            label="Recruiter Name"
            variant="outlined"
            style={{ width: "350px" }}
            onChange={recruiterNameChangeHandler}
            value={interviewDetails.recruiterName}
          />
        </div>

        <div style={style}>
          <label htmlFor="phone_number">Recruiter's Number</label>
          <TextField
            id="phone_number"
            label="Phone Number"
            variant="outlined"
            style={{ width: "350px" }}
            onChange={recruiterNumberChangeHandler}
            value={interviewDetails.recruiterNumber}
          />
        </div>

        <div style={style}>
          <label htmlFor="role">Role</label>
          <TextField
            id="role"
            label="Role"
            variant="outlined"
            style={{ width: "350px" }}
            onChange={roleChangeHandler}
            value={interviewDetails.role}
          />
        </div>

        <div style={style}>
          <label htmlFor="rounds">Number of rounds</label>
          <TextField
            id="rounds"
            label="No. Of Rounds"
            variant="outlined"
            style={{ width: "350px" }}
            onChange={NORChangeHandler}
            value={interviewDetails.numberOfRounds}
          />
        </div>

        <div style={style}>
          <label htmlFor="date">Interview Date</label>
          <TextField
            id="date"
            label="Interview Date"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "340px" }}
            onChange={interviewDateChangeHandler}
            value={interviewDetails.interviewDate}
          />
        </div>

        <div style={style}>
          <label htmlFor="date">Interview Time</label>
          <TextField
            id="time"
            label="Interview Time"
            type="time"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            style={{ width: "340px" }}
            onChange={interviewTimeChangeHandler}
            value={interviewDetails.interviewTime}
          />
        </div>
        <Button variant="contained" type="submit" disabled={formIsNotFilled}>
          Add Interview
        </Button>
      </form>
    </div>
  );
};

export default InterviewForm;
