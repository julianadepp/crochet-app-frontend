import React, { useEffect, useState } from "react";

// {
//     size: '',
//     hookImage: '',
//     id: '',
//     sizeName: '',
// }

function HooksCollection({hooks, setHooks, setCurrentId, currentId}) {
  const url = process.env.REACT_APP_API;
  useEffect(() => {
    fetch(url + "hooks/")
      .then((res) => res.json())
      .then((json) => {
        setHooks(json);
      })
      .catch((err) =>
        console.log("You probably made a mistake somewhere! ", err)
      );
  }, []);
  console.log(hooks);
  console.log('current', currentId)

  function getId(e){
       setCurrentId(e.currentTarget.id)
      console.log(e.currentTarget.id)
  }

  return (
    <div>
      <h2>Hooks</h2>
      {hooks.map((hook) => {
        return (
          <div id={hook.id} onClick={getId} >
            {/* <a href=''> */}
                <h3>{hook.size_name}</h3>
                <img width='100px' src={hook.hook_image} alt="hook"></img>
            {/* </a> */}
          </div>
        );
      })}
    </div>
  );
}

export default HooksCollection;
