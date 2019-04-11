import React from 'react'
import OauthForm from '../../components/Forms/OauthForm';

const authenticationView = (props) => {
  const isSignUp = props.match.path === "/register";
  return (
    <div>
      <OauthForm history={props.history} signup={isSignUp} />
    </div>
  )
}

export default authenticationView
