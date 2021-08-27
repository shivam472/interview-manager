import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const NewInterview = () => {
  const history = useHistory();

  return (
    <Button
      variant="contained"
      style={{
        marginRight: "50px",
        backgroundColor: "purple",
        color: "white",
      }}
      onClick={() => history.push("/form")}
    >
      New Interview
    </Button>
  );
};

export default NewInterview;
