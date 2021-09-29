import react, {useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';

function Login (){
  const history = useHistory();
  const [username, setName]= useState("");
  const [password, setPassword]= useState("");
  const [email, setEmail]= useState("");
  const PostData = ()=>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email)){
      M.toast({html: "invalid email goofy"});
      return;
    }

    fetch("http://localhost:5000/signup",
    {
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username,
        password,
        email
      })
    }).then(res=>res.json()).then(data=>{
        if(data.error){
          M.toast({html: data.error});
        }else{
          M.toast({html: data.message});
          history.push('/login');
        }
    }).catch(err=>{
      console.log(err);
    })
  }

  function updateName(e){
    setName(e.target.value);
  }
  function updateEmail(e){
    setEmail(e.target.value);
  }
  function updatePassword(e){
    setPassword(e.target.value);
  }


  return(
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="Email"
          value={email} onChange={updateEmail}
        />
        <input type="text" placeholder="Username"
          value={username} onChange={updateName}
        />
        <input type="text" placeholder="Password"
          value={password} onChange={updatePassword}
        />
        <button className="btn waves-effect waves-light blue darken-1"
          onClick={()=>PostData()}>
        Signup</button>
        <p className="switch">Already have an account? <Link className="link" to="/login">Login</Link></p>
     </div>
    </div>
  )
}

export default Login;
