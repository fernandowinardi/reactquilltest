import React, {Component} from 'react';
import {Link} from "react-router-dom";

import "./NavBar.css";

class NavBar extends Component {
    render(){
        return ( 
            <div>
                <nav>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/editpage">Edit Page</Link>
                    </li>
                    <li>
                        <Link to="/quiz">Editable Quiz</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </nav>
            </div>
        )
    }
}

export default NavBar;