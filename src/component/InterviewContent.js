const InterviewContent = (props) => {
  return (
    <>
      <h2>{props.interviewObj.Company_Name}</h2>
      <p>
        Candidate Name: <strong>{props.interviewObj.Candidate_Name}</strong>{" "}
      </p>
      <p>
        Candidate's Number{" "}
        <strong>{props.interviewObj.Candidate_Number}</strong>
      </p>
      <p>
        Current Company: <strong>{props.interviewObj.Current_Company}</strong>
      </p>
      <p>
        Notice Period: <strong>{props.interviewObj.Notice_Period}</strong>
      </p>
      <p>
        Current Location: <strong>{props.interviewObj.Current_Location}</strong>
      </p>
      <p>
        Current CTC: <strong>{props.interviewObj.Current_CTC}</strong>
      </p>
      <p>
        Expected CTC: <strong>{props.interviewObj.Expected_CTC}</strong>
      </p>
      <p>
        Offered CTC: <strong>{props.interviewObj.Offered_CTC}</strong>
      </p>
      <p>
        Total Experience: <strong>{props.interviewObj.Total_Experience}</strong>
      </p>
      <p>
        Relevant Experience:{" "}
        <strong>{props.interviewObj.Relevant_Experience}</strong>
      </p>
      <p>
        Interview Date: <strong>{props.interviewObj.Interview_Date}</strong>
      </p>
      <p>
        Interview Time: <strong>{props.interviewObj.Interview_Time}</strong>
      </p>
      <p>
        Number Of Rounds: <strong>{props.interviewObj.Number_Of_Rounds}</strong>
      </p>
      <p>
        Role: <strong>{props.interviewObj.Role}</strong>
      </p>
      <p>
        Agent Name: <strong>{props.interviewObj.Agent_Name}</strong>
      </p>
    </>
  );
};

export default InterviewContent;
