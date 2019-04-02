import React from "react";

function OnboardConfirm(props) {
  console.log("OnboardingConfirm: ", props);
  const confirmValues = Object.keys(props.formValues).map(key => {
    return (
      <p key={key}>
        {key} : {props.formValues[key]}
      </p>
    );
  });
  return <>{confirmValues}</>;
}

export default OnboardConfirm;
