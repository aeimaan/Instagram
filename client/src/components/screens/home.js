import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../App.js'


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

  return(
    <div className="home">
      {
        data.map(item=>{
          // console.log(item);
        return(
          <div className="card home-card" key={item._id}>
            <h5>{item.postedBy.username}</h5>
            <div className="card-img">
              <img className="image" src={item.photo} />
            </div>
            <div className="card-content">
              <i className= {item.likes.includes(state._id)? " material-icons likes": "material-icons"}
                onClick={!item.likes.includes(state._id)? ()=>likePost(item._id):  ()=>unlikePost(item._id)}
              >favorite</i>
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

              {item.comments.map(record=>{

                num++;

                if(loadMore){
                  return(
                    <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.username}  </span>
                     {record.text}
                    </h6>
                  )
                }else if (num<6) {
                  return(
                    <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.username}  </span>
                     {record.text}
                    </h6>
                  )
                }



              })}

              <button className={loadMore? "clear": ""} onClick={()=>{
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
