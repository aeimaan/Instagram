import react from "react";
import {Link} from 'react-router-dom';

function Login (){
  return(
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Password" />
        <button className="btn waves-effect waves-light">Signup</button>
        <p className="switch">Already have an account? <Link className="link" to="/login">Login</Link></p>
     </div>
    </div>
  )
}

export default Login;
