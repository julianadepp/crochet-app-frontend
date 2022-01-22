import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import HookUpdateForm from "./HookUpdateForm";

function HookInfo({ currentId, setCurrentId}) {
    const [currentlyEditing, setCurrentlyEditing] = useState(false)
  const [thisHook, setThisHook] = useState({
    id: "",
    size: "",
    size_name: "",
    hook_image: "",
    yarns: [],
  });

  useEffect(() => {
    fetch(process.env.REACT_APP_API + "hooks/" + currentId)
      .then((res) => res.json())
      .then((json) => setThisHook(json))
      .catch((err) => console.log("fetching this hook isnt working...", err));
  }, [currentId]);
  console.log("currentId: ", currentId, "hook info: ", thisHook);

  function deleteHook() {
    fetch(process.env.REACT_APP_API + "hooks/" + thisHook.id, {
      method: "DELETE",
    }).then((res) =>{ 
        (res.status === 204)? setCurrentId(null):
        console.log(res.status)});
  }
  function handleEditClick(){
      setCurrentlyEditing(!currentlyEditing)
  }
  console.log(currentlyEditing)
  function editHook() {
    fetch(process.env.REACT_APP_API + "hooks/" + thisHook.id, {
        method: "PUT",
      }).then((res) =>{ 
          (res.status === 204)? setCurrentId(null):
          console.log(res.status)});
  }

  return (
    <div>
      {currentId ? (
        <div>
          <h2>Hook details...</h2>
          <h3>{thisHook.size_name}</h3>
          <img
            src={thisHook.hook_image}
            alt={thisHook.size_name}
            width="200px"
          ></img>
          <ul>
            {thisHook.yarns.map((yarn) => (
              <li>
                yarn name with href to yarn info page using id... but for now
                this instead:<a href="">{yarn}</a>
              </li>
            ))}
          </ul>
          <button onClick={handleEditClick} >edit</button>
          <button onClick={deleteHook}>delete</button>
          {(currentlyEditing) ? <HookUpdateForm setThisHook={setThisHook} thisHook={thisHook}/> :null }
        </div>
      ) : (
        <h3>Click a hook to see more info!</h3>
      )}
    </div>
  );
}

export default HookInfo;
