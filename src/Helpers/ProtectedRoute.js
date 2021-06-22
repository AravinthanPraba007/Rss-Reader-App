import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.token) {
          return <Component {...props} />;
        } else {
          window.location = "/";
          return (
            <Redirect to="/login" />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;