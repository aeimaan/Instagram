import react, {useState, useContext} from "react";
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from '../../App.js'
import M from 'materialize-css';

function Login (){
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();
  const [username, setName]= useState("");
  const [password, setPassword]= useState("");
  const PostData = ()=>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(username)){
      M.toast({html: "thats an email goofy"});
      return;
    }

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
          let message = ""
          if(data.error.name == "IncorrectPasswordError"){
            message = "Wrong Password bud";
          }else if (data.error.name == "IncorrectUsernameError"){
            message = "BRUH thats not even a user \n go sign up";
          }
          // console.log(message);
          M.toast({html: message});
        }else{
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({type:"USER", payload:data.user})
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
        <input type="password" placeholder="password"
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
