import classes from "./InterviewForm.module.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useState, useReducer, useCallback, useEffect } from "react";
import { db } from "../firebase";

const initialDetails = {
  companyName: "",
  candidateName: "",
  candidateNumber: "",
  currentCompany: "",
  noticePeriod: "",
  currentLocation: "",
  currentCTC: "",
  expectedCTC: "",
  offeredCTC: "",
  totalYOE: "",
  totalMOE: "",
  relevantYOE: "",
  relevantMOE: "",
  role: "",
  numberOfRounds: "",
  interviewDate: "",
  interviewTime: "",
  agentName: "",
};

const detailsReducer = (state, action) => {
  if (action.type === "COMPANY_NAME") {
    return { ...state, companyName: action.value };
  }
  if (action.type === "CANDIDATE_NAME") {
    return { ...state, candidateName: action.value };
  }
  if (action.type === "CANDIDATE_NUMBER") {
    return { ...state, candidateNumber: action.value };
  }
  if (action.type === "CURRENT_COMPANY") {
    return { ...state, currentCompany: action.value };
  }
  if (action.type === "NOTICE_PERIOD") {
    return { ...state, noticePeriod: action.value };
  }
  if (action.type === "CURRENT_LOCATION") {
    return { ...state, currentLocation: action.value };
  }
  if (action.type === "CURRENT_CTC") {
    return { ...state, currentCTC: action.value };
  }
  if (action.type === "EXPECTED_CTC") {
    return { ...state, expectedCTC: action.value };
  }
  if (action.type === "OFFERED_CTC") {
    return { ...state, offeredCTC: action.value };
  }
  if (action.type === "TOTAL_YOE") {
    return { ...state, totalYOE: action.value };
  }
  if (action.type === "TOTAL_MOE") {
    return { ...state, totalMOE: action.value };
  }
  if (action.type === "RELEVANT_YOE") {
    return { ...state, relevantYOE: action.value };
  }
  if (action.type === "RELEVANT_MOE") {
    return { ...state, relevantMOE: action.value };
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
  if (action.type === "AGENT_NAME") {
    return { ...state, agentName: action.value };
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
    justifyContent: "space-between",
    margin: "4px",
  };

  const checkValidity = useCallback(() => {
    if (
      interviewDetails.companyName.trim() !== "" &&
      interviewDetails.candidateName.trim() !== "" &&
      interviewDetails.candidateNumber.trim().length === 10 &&
      interviewDetails.currentCompany.trim() !== "" &&
      interviewDetails.noticePeriod.trim() !== "" &&
      interviewDetails.currentLocation.trim() !== "" &&
      interviewDetails.currentCTC.trim() !== "" &&
      interviewDetails.expectedCTC.trim() !== "" &&
      interviewDetails.offeredCTC.trim() !== "" &&
      interviewDetails.totalYOE.trim() !== "" &&
      interviewDetails.totalMOE.trim() !== "" &&
      interviewDetails.relevantYOE.trim() !== "" &&
      interviewDetails.relevantMOE.trim() !== "" &&
      interviewDetails.role.trim() !== "" &&
      interviewDetails.numberOfRounds > 0 &&
      new Date(interviewDetails.interviewDate) >= new Date() &&
      interviewDetails.interviewTime.trim() !== "" &&
      interviewDetails.agentName.trim() !== ""
    ) {
      setFormIsNotFilled(false);
    } else {
      setFormIsNotFilled(true);
    }
  }, [
    interviewDetails.companyName,
    interviewDetails.candidateName,
    interviewDetails.candidateNumber,
    interviewDetails.currentCompany,
    interviewDetails.noticePeriod,
    interviewDetails.currentLocation,
    interviewDetails.currentCTC,
    interviewDetails.expectedCTC,
    interviewDetails.offeredCTC,
    interviewDetails.totalYOE,
    interviewDetails.totalMOE,
    interviewDetails.relevantYOE,
    interviewDetails.relevantMOE,
    interviewDetails.role,
    interviewDetails.numberOfRounds,
    interviewDetails.interviewDate,
    interviewDetails.interviewTime,
    interviewDetails.agentName,
  ]);

  useEffect(() => {
    checkValidity();
  }, [checkValidity]);

  const addInterviewHanlder = (e) => {
    e.preventDefault();

    console.log(interviewDetails);

    const docData = {
      Company_Name: interviewDetails.companyName,
      Candidate_Name: interviewDetails.candidateName,
      Candidate_Number: interviewDetails.candidateNumber,
      Current_Company: interviewDetails.currentCompany,
      Notice_Period: interviewDetails.noticePeriod + " months",
      Current_Location: interviewDetails.currentLocation,
      Current_CTC: interviewDetails.currentCTC,
      Expected_CTC: interviewDetails.expectedCTC,
      Offered_CTC: interviewDetails.offeredCTC,
      Total_Experience:
        interviewDetails.totalYOE +
        " years " +
        interviewDetails.totalMOE +
        " months",
      Relevant_Experience:
        interviewDetails.relevantYOE +
        " years " +
        interviewDetails.relevantMOE +
        " months",
      Role: interviewDetails.role,
      Number_Of_Rounds: interviewDetails.numberOfRounds,
      Interview_Date: interviewDetails.interviewDate,
      Interview_Time: interviewDetails.interviewTime,
      Agent_Name: interviewDetails.agentName,
    };

    db.collection("interviews")
      .add(docData)
      .then((docRef) => {
        console.log(
          "document successfully written with document id: " + docRef.id
        );
        detailsDispatch({ type: "INITIAL" });
      })
      .catch((err) => console.log(err));
  };

  const companyNameChangeHandler = (e) => {
    detailsDispatch({ type: "COMPANY_NAME", value: e.target.value });
  };

  const candidateNameChangeHandler = (e) => {
    detailsDispatch({ type: "CANDIDATE_NAME", value: e.target.value });
  };

  const candidateNumberChangeHandler = (e) => {
    detailsDispatch({ type: "CANDIDATE_NUMBER", value: e.target.value });
  };

  const currentCompanyNameChangeHandler = (e) => {
    detailsDispatch({ type: "CURRENT_COMPANY", value: e.target.value });
  };

  const noticePeriodChangeHandler = (e) => {
    detailsDispatch({ type: "NOTICE_PERIOD", value: e.target.value });
  };

  const currentLocationNameChangeHandler = (e) => {
    detailsDispatch({ type: "CURRENT_LOCATION", value: e.target.value });
  };

  const currentCTCChangeHandler = (e) => {
    detailsDispatch({ type: "CURRENT_CTC", value: e.target.value });
  };

  const expectedCTCChangeHandler = (e) => {
    detailsDispatch({ type: "EXPECTED_CTC", value: e.target.value });
  };

  const offeredCTCChangeHandler = (e) => {
    detailsDispatch({ type: "OFFERED_CTC", value: e.target.value });
  };

  const totalYOEChangeHandler = (e) => {
    detailsDispatch({ type: "TOTAL_YOE", value: e.target.value });
  };
  const totalMOEChangeHandler = (e) => {
    detailsDispatch({ type: "TOTAL_MOE", value: e.target.value });
  };

  const relevantYOEChangeHandler = (e) => {
    detailsDispatch({ type: "RELEVANT_YOE", value: e.target.value });
  };
  const relevantMOEChangeHandler = (e) => {
    detailsDispatch({ type: "RELEVANT_MOE", value: e.target.value });
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

  const agentNameChangeHandler = (e) => {
    detailsDispatch({ type: "AGENT_NAME", value: e.target.value });
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
          <label htmlFor="canditate_name">Canditate Name</label>
          <TextField
            id="canditate_name"
            label="Candidate Name"
            variant="outlined"
            style={{ width: "350px" }}
            onChange={candidateNameChangeHandler}
            value={interviewDetails.candidateName}
          />
        </div>

        <div style={style}>
          <label htmlFor="phone_number">Candidate's Number</label>
          <TextField
            id="phone_number"
            label="Phone Number"
            variant="outlined"
            style={{ width: "350px" }}
            onChange={candidateNumberChangeHandler}
            value={interviewDetails.candidateNumber}
          />
        </div>

        <div style={style}>
          <label htmlFor="current_company">Current Company</label>
          <TextField
            id="current_company"
            label="Current Company"
            variant="outlined"
            style={{ width: "350px" }}
            onChange={currentCompanyNameChangeHandler}
            value={interviewDetails.currentCompany}
          />
        </div>

        <div style={style}>
          <label htmlFor="notice_period">Notice Period</label>
          <TextField
            id="notice_period"
            label="Months"
            variant="outlined"
            style={{ width: "350px" }}
            onChange={noticePeriodChangeHandler}
            value={interviewDetails.noticePeriod}
          />
        </div>

        <div style={style}>
          <label htmlFor="current_location">Current Location</label>
          <TextField
            id="current_location"
            label="Current Location"
            variant="outlined"
            style={{ width: "350px" }}
            onChange={currentLocationNameChangeHandler}
            value={interviewDetails.currentLocation}
          />
        </div>

        <div style={style}>
          <label htmlFor="current_ctc">Current CTC</label>
          <TextField
            id="current_ctc"
            label="Current CTC"
            variant="outlined"
            style={{ width: "350px" }}
            onChange={currentCTCChangeHandler}
            value={interviewDetails.currentCTC}
          />
        </div>

        <div style={style}>
          <label htmlFor="expected_ctc">Expected CTC</label>
          <TextField
            id="expected_ctc"
            label="Expected CTC"
            variant="outlined"
            style={{ width: "350px" }}
            onChange={expectedCTCChangeHandler}
            value={interviewDetails.expectedCTC}
          />
        </div>

        <div style={style}>
          <label htmlFor="offered_ctc">Offered CTC</label>
          <TextField
            id="offered_ctc"
            label="Offered CTC"
            variant="outlined"
            style={{ width: "350px" }}
            onChange={offeredCTCChangeHandler}
            value={interviewDetails.offeredCTC}
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
          <label htmlFor="total_exp">Total Experience</label>
          <div style={{ width: "350px" }}>
            <TextField
              id="total_exp"
              label="Years"
              variant="outlined"
              style={{ width: "172px", marginRight: "5px" }}
              onChange={totalYOEChangeHandler}
              value={interviewDetails.totalYOE}
            />

            <TextField
              id="total_months"
              label="Months"
              variant="outlined"
              style={{ width: "172px" }}
              onChange={totalMOEChangeHandler}
              value={interviewDetails.totalMOE}
            />
          </div>
        </div>

        <div style={style}>
          <label htmlFor="relevant_exp">Relevant Experience</label>
          <div style={{ width: "350px" }}>
            <TextField
              id="relevant_exp"
              label="Years"
              variant="outlined"
              style={{ width: "172px", marginRight: "5px" }}
              onChange={relevantYOEChangeHandler}
              value={interviewDetails.relevantYOE}
            />

            <TextField
              id="relevant_months"
              label="Months"
              variant="outlined"
              style={{ width: "172px" }}
              onChange={relevantMOEChangeHandler}
              value={interviewDetails.relevantMOE}
            />
          </div>
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

        <div style={style}>
          <label htmlFor="agent_name">Agent Name</label>
          <TextField
            id="agent_name"
            label="Agent Name"
            variant="outlined"
            style={{ width: "350px" }}
            onChange={agentNameChangeHandler}
            value={interviewDetails.agentName}
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
