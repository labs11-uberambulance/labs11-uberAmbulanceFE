import React from 'react'
import firebase, { auth, googleProvider } from '../../firebase';

import Button from '@material-ui/core/Button';
import gIcon from '../../assests/images/btn_google_light_normal_ios.svg';

const oauthForm = () => {
    const initOauthWithGoogle = () => {
        auth.signInWithPopup(googleProvider).then((result) => {
            const user = result.user;
            console.log(user)
          });
    }
  return (
    <div>
        <Button onClick={initOauthWithGoogle}> 
            <img src={gIcon} style={{marginRight: "5px"}} /> Sign in with Google
        </Button>
    </div>
  )
}

export default oauthForm
