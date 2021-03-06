import classes from "./Header.module.css";

import SignIn from "./SignIn";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SignOut from "./SignOut";
import NewInterview from "./NewInterview";
import HomeButton from "./HomeButton";

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <header className={classes.header}>
      {user && <HomeButton />}
      {!user && <SignIn />}
      {user && <SignOut />}
      {user && <NewInterview />}
    </header>
  );
};

export default Header;
