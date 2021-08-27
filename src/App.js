import "./App.css";
import React, { useState } from "react";
import { auth } from "./firebase";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./component/Header";
import FormPage from "./pages/FormPage";
import HomePage from "./pages/HomePage";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {user && (
          <Route path="/form">
            <FormPage />
          </Route>
        )}
      </Switch>
    </div>
  );
}

export default App;
