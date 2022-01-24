import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import YarnUpdateForm from "./YarnUpdateForm";

function YarnInfo({ thisYarn, setThisYarn, hooks }) {
    console.log(hooks)
  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const initYarn = {
    id: "",
    nickname: "",
    weight: "",
    weight_description: "",
    brand: "",
    material: "",
    yarn_image: "",
    notes: "",
    suggested_hooks: [],
  };

  useEffect(() => {
    if (thisYarn.id) {
      fetch(process.env.REACT_APP_API + "yarns/" + thisYarn.id)
        .then((res) => res.json())
        .then((json) => setThisYarn(json))
        .catch((err) => console.log("fetching this yarn isnt working...", err));
    }
  }, [thisYarn.id]);

  console.log("currentId: ", thisYarn.id, "yarn info: ", thisYarn);

  function deleteYarn() {
    fetch(process.env.REACT_APP_API + "yarns/" + thisYarn.id, {
      method: "DELETE",
    }).then((res) => {
      res.status === 204 ? setThisYarn(initYarn) : console.log(res.status);
    });
  }
  function handleEditClick() {
    setCurrentlyEditing(!currentlyEditing);
  }
  console.log(currentlyEditing);
  return (
    <div>
      {thisYarn.id ? (
        <div>
          <h2>yarn details...</h2>
          <h3>{thisYarn.nickname}</h3>
          <img
            src={thisYarn.yarn_image}
            alt={thisYarn.nickname}
            width="200px"
          ></img>
          <h4>weight: {thisYarn.weight} </h4>
          <p>{thisYarn.weight_description}</p>
          <h4>brand: {thisYarn.brand}</h4>
          <h4>material: {thisYarn.material}</h4>
          <ul>
            {thisYarn.suggested_hooks.map((hook) => (
              <li>
                <Link to={`/hooks/${hook.id}`}>{hook.size_name}</Link>
              </li>
            ))}
          </ul>
          <h4>Notes: {thisYarn.notes}</h4>

          <button onClick={handleEditClick}>edit</button>
          <button onClick={deleteYarn}>delete</button>
          {currentlyEditing ? (
            <YarnUpdateForm
              hooks={hooks}
              setThisYarn={setThisYarn}
              thisYarn={thisYarn}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default YarnInfo;
