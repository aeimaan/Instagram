import React, {useState, useEffect} from 'react';


function Home () {
  const [data, setData]= useState([]);

  useEffect(()=>{
    fetch('/allposts',{
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
    .then(result=>{
      // console.log(result);
      setData(result.posts);
    })
  },[])

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
              <i className="material-icons">favorite</i>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type="text" placeholder="comment" />
            </div>
          </div>
        )
      })
    }


    </div>
  )
}

export default Home;
