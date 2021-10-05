import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../App.js'
import {Link} from 'react-router-dom';


function Home () {
  const [data, setData]= useState([]);
  const [liked, setLiked] = useState(false);
  const {state, dispatch} = useContext(UserContext);
  const [loadMore, setLoadMore]= useState(false);

  let num = 0;

  function updateLiked(id){
    setLiked(!liked)
    if(!liked){
      likePost(id);
    }else{
      unlikePost(id);
    }
  }

  useEffect(()=>{
    fetch('/allposts',{
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
    .then(result=>{
      console.log(result);
      setData(result.posts);
    })
  },[])

  function likePost(id){
    fetch('/like', {
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization": "Bearer "+ localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then(result=>{
      console.log(result);
      const newData = data.map(item=>{
        if(item._id == result._id){
          return result;
        }else{
          return item;
        }
      })
      setData(newData)
    })
  }

  function unlikePost(id){
    fetch('/unlike', {
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization": "Bearer "+ localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then(result=>{
      console.log(result);
      const newData = data.map(item=>{
        if(item._id == result._id){
          return result;
        }else{
          return item;
        }
      })
      setData(newData)
    })
  }

  const makeComment = (text, postId)=>{
    fetch('/comment', {
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+ localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        text:text,
        postId:postId
      })
    }).then(res=>res.json())
    .then(result=>{
      console.log(result);
      const newData = data.map(item=>{
        if(item._id == result._id){
          return result;
        }else{
          return item;
        }
      })
      setData(newData)
    })
  }

  const deletePost = (postId)=>{
    fetch(`/deletepost/${postId}` , {
      method:"delete",
      headers:{
        "Authorization": "Bearer "+ localStorage.getItem("jwt")
      }
    }).then(res=> res.json())
    .then(result=>{
      console.log(result);
      console.log("id: ",result._id);
      const newData = data.filter(item=>{
        console.log(item._id);
        return item._id !== result._id
      })
      console.log(newData);
      setData(newData);
    })
  }
  const deleteComment = (itemId, commentId)=>{
    console.log(commentId);
    fetch(`/deletecomment/${itemId}/${commentId}` , {
      method:"delete",
      headers:{
        "Authorization": "Bearer "+ localStorage.getItem("jwt")
      }
    }).then(res=> res.json())
    .then(result=>{
      console.log(result);
      const newData = data.map(item=>{
        if(item._id == result._id){
          return result;
        }else{
          return item;
        }
      })
      setData(newData);
    })
  }

  return(
    <div className="home">
      {
        data.map(item=>{
          num = 0;
          // console.log(item);
        return(
          <div className="card home-card" key={item._id}>
            <h5><Link to={item.postedBy._id==state._id? '/profile'  : "/profile/"+item.postedBy._id}>{item.postedBy.username}</Link></h5>
            <div className="card-img">
              <img className="image" src={item.photo} />
            </div>
            <div className="card-content">
              <i className= {item.likes.includes(state._id)? " material-icons likes": "material-icons"}
                onClick={!item.likes.includes(state._id)? ()=>likePost(item._id):  ()=>unlikePost(item._id)}
              >favorite</i>

              {item.postedBy._id==state._id
                && <i className="material-icons" onClick={()=>deletePost(item._id)} style={{float:"right"}}>delete</i>}


              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <form onSubmit={(e)=>{
                e.preventDefault();
                // console.log(e.target[0].value);
                makeComment(e.target[0].value, item._id)
                e.target[0].value= "";
              }}>
                <input type="text" placeholder="comment"  />
              </form>

              {item.comments.reverse().map(record=>{
                // console.log(record.text);
                num++;
                if(loadMore){
                  return(
                    <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.username}  </span>
                     {record.text} {record.postedBy._id==state._id
                       && <i className="material-icons" onClick={()=>deleteComment(item._id, record._id)} style={{float:"right"}}>delete</i>}
                    </h6>
                  )
                }else if (num<6) {
                  return(
                    <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.username}  </span>
                     {record.text} {record.postedBy._id==state._id
                       && <i className="material-icons" onClick={()=>deleteComment(item._id, record._id)} style={{float:"right"}}>delete</i>}
                    </h6>
                  )
                }
              })}

              <button className={loadMore || (item.comments.length<5)? "clear": ""} onClick={()=>{
                setLoadMore(true);
              }}>Load More</button>


            </div>
          </div>
        )
      })
    }


    </div>
  )
}

export default Home;
