import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import './Header.css';

const header = (props) => {
  return (
    <header className="landing-header">
        <nav>
            <ul>
                <li><NavLink to="/">Drivers</NavLink></li>
                <li><NavLink to="/">Riders</NavLink></li>
                <li><NavLink to="/register">Sign up</NavLink></li>
                <li><button onClick={() => {props.history.push('/login')}} >Log in</button></li>
            </ul>
        </nav>
    </header>
  )
}

export default withRouter(header);
