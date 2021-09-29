import react, {useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';

function Login (){
  const history = useHistory();
  const [username, setName]= useState("");
  const [password, setPassword]= useState("");
  const PostData = ()=>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if(re.test(username)){
    //   M.toast({html: "thats an email goofy"});
    //   return;
    // }

    fetch("http://localhost:5000/signin",
    {
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username,
        password
      })
    }).then(res=>res.json()).then(data=>{
        if(data.error){
          M.toast({html: data.error});
        }else{
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          M.toast({html: "Signed in successful"});
          history.push('/');
        }
    }).catch(err=>{
      console.log(err);
    })
  }

  function updateName(e){
    setName(e.target.value);
  }
  function updatePassword(e){
    setPassword(e.target.value);
  }

  return(
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="Username"
          value={username} onChange={updateName}
        />
        <input type="text" placeholder="password"
          value={password} onChange={updatePassword}
        />
        <button className="btn waves-effect waves-light blue darken-1"
          onClick={PostData}
        >Login</button>
        <p className="switch">Don't have an account? <Link className="link" to="/signup">Sign Up</Link></p>
     </div>
    </div>
  )
}

export default Login;
