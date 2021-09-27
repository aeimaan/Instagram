import react from "react";
import {Link} from 'react-router-dom';

function Login (){
  return(
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="password" />
        <button className="btn waves-effect waves-light">Login</button>
        <p className="switch">Don't have an account? <Link className="link" to="/signup">Sign Up</Link></p>
     </div>
    </div>
  )
}

export default Login;
