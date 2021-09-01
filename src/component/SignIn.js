import Button from "@material-ui/core/Button";
import { auth } from "../firebase";
import firebase from "firebase";
import googleLogo from "../assets/googleLogo.png";

const SignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  const signInHandler = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const credential = result.credential;

        const token = credential.accessToken;

        const user = result.user;
      })
      .catch((error) => {
        console.log(error);
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
      onClick={signInHandler}
    >
      <img
        src={googleLogo}
        alt="logo"
        style={{ width: "20px", height: "20px" }}
      />
      Sign In
    </Button>
  );
};

export default SignIn;
