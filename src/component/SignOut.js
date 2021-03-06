import Button from "@material-ui/core/Button";
import { auth } from "../firebase";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

const SignOut = () => {
  const signOutHandler = () => {
    auth
      .signOut()
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => {
        console.error(error);
      });
  };
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
      onClick={signOutHandler}
      startIcon={<ExitToAppOutlinedIcon />}
    >
      Sign Out
    </Button>
  );
};

export default SignOut;
