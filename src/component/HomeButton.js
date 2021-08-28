import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";

const HomeButton = () => {
  const history = useHistory();

  return (
    <Button
      variant="contained"
      style={{
        marginRight: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "130px",
      }}
      onClick={() => history.push("/")}
      startIcon={<HomeRoundedIcon />}
    >
      Home
    </Button>
  );
};

export default HomeButton;
