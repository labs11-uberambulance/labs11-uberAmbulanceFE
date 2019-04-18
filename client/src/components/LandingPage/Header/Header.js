import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import './Header.css';

const header = (props) => {
  return (
    <header className="landing-header">
        <nav>
            <button className="landing-header--app-button"><a href="https://play.google.com/store/apps?hl=en_US" target="_black" rel="noopener noreferrer" >Download the App</a></button>
            <ul>
                <li><NavLink to="/register">Sign up</NavLink></li>
                <li><button onClick={() => {props.history.push('/login')}} >Log in</button></li>
            </ul>
        </nav>
    </header>
  )
}

export default withRouter(header);
