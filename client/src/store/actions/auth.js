import { authTypes } from './actionTypes';
import axios from '../../axios-instance';

export const initOauth = (user) => dispatch => {
    console.log(user)
    dispatch({
        type: authTypes.OAUTH_STARTING
    })
    axios.post('/api/user/register', user).then(result => {
        console.log(result.data)
        dispatch({
            type: authTypes.OAUTH_SUCCESS,
            payload: result.data
        })
    }).catch(err => {
        console.log(err)
        dispatch({
            type: authTypes.OAUTH_FAIL
        })
    })
}