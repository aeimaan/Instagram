import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from '../App';
import {reducer, initialState} from '../reducers/userReducer.js';

function Navbar(){
  const {state, dispatch}= useContext(UserContext);
  const history = useHistory();
  const renderList = ()=>{
    if(state){
      return [
        <li><Link to={"/profile"}>Profile</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li>
        <button className="btn red darken-3"
          onClick={()=>{
            localStorage.clear();
            dispatch({type:"CLEAR"});
            history.push('/login');
          }}
        >LOG OUT</button>
        </li>
      ];
    }else{
      return [
        <li><Link to="/login">Login</Link></li>,
        <li><Link to="/signup">Signup</Link></li>
      ];
    }
  }

  return(
    <nav>
    <div className="nav-wrapper white">
      <Link to={state? "/" : "/login"} className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right">
        {renderList()}
      </ul>
    </div>
  </nav>
  )
}

export default Navbar;
