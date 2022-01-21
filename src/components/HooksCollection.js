import React, { useEffect, useState } from "react";

// {
//     size: '',
//     hookImage: '',
//     id: '',
//     sizeName: '',
// }

function HooksCollection({hooks, setHooks}) {
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
  return (
    <div>
      <h2>Hooks</h2>
      {hooks.map((hook) => {
        return (
          <div>
            <a href=''>
                <h3>{hook.size_name}</h3>
                <img width='100px' src={hook.hook_image} alt="hook"></img>
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default HooksCollection;
