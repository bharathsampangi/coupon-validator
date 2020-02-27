import React, { ComponentProps } from "react";
import { exists } from "fs";

interface showStatusProps {
  location?: {
    state: {
      valid?: boolean;
      success?: boolean;
      discount?: number;
      message?: string;
    };
  };
}

export default (props: showStatusProps) => {
  let state;
  if (props.location && props.location.state) {
    state = props.location.state;
  }

  console.log(state);

  if (state && state.valid) {
    return (
      <div
        className="alert alert-success"
        role="alert"
        style={{ margin: "1.5em" }}
      >
        {state.message || "Success"}
        <br />
        You have recieved a discount of: {state.discount || "0"}
      </div>
    );
  }

  if (state && state.valid === false) {
    return (
      <div
        className="alert alert-warning"
        role="alert"
        style={{ margin: "1.5em" }}
      >
        {state.message || "Sorry, we couldn't validate your coupon"}
      </div>
    );
  }

  if (state && state.success) {
    return (
      <div
        className="alert alert-success"
        role="alert"
        style={{ margin: "1.5em" }}
      >
        {state.message || "Success"}
      </div>
    );
  }

  if (state && state.success === false) {
    return (
      <div
        className="alert alert-warning"
        role="alert"
        style={{ margin: "1.5em" }}
      >
        {state.message || "Sorry, we couldn't add your coupon"}
      </div>
    );
  }

  return (
    <div
      className="alert alert-danger"
      role="alert"
      style={{ margin: "1.5em" }}
    >
      Sorry, we couldn't process your request
    </div>
  );
};
