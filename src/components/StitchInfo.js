import React, { useEffect, useState } from 'react';
import StitchUpdateForm from './StitchUpdateForm';

function StitchInfo({ setThisStitch, thisStitch, stitches }) {
    const [currentlyEditing, setCurrentlyEditing] = useState(false)
    const initStitch = {
        id: "",
        name: "",
        instructions: "",
        description: "",
        pattern_code: "",
        stitch_image: "",
        notes: "",
        related_stitches: [],
    }

  useEffect(() => {
    if (thisStitch.id){
    fetch(process.env.REACT_APP_API + "stitches/" + thisStitch.id)
      .then((res) => res.json())
      .then((json) => setThisStitch(json))
      .catch((err) => console.log("fetching this stitch isnt working...", err));
  }}, [thisStitch.id]);

  console.log("currentId: ", thisStitch.id, "stitch info: ", thisStitch);

  function deleteStitch() {
    fetch(process.env.REACT_APP_API + "stitches/" + thisStitch.id, {
      method: "DELETE",
    }).then((res) =>{ 
        (res.status === 204)? setThisStitch(initStitch):
        console.log(res.status)});
  }
  function handleEditClick(){
      setCurrentlyEditing(!currentlyEditing)
  }
  console.log(currentlyEditing)
    return (
        <div>
            {thisStitch.id ? (
        <div>
          <h2>Stitch details...</h2>
          <h3>{thisStitch.name}</h3>
          <img
            src={thisStitch.stitch_image}
            alt={thisStitch.name}
            width="200px"
          ></img>
          <ul>
            {thisStitch.related_stitches.map((stitch) => (
              <li>
                stitch name with href to stitch info page using id... but for now
                this instead:<a href="">{stitch}</a>
              </li>
            ))}
          </ul>
          <button onClick={handleEditClick} >edit</button>
          <button onClick={deleteStitch}>delete</button>
          {(currentlyEditing) ? <StitchUpdateForm stitches={stitches} setThisStitch={setThisStitch} thisStitch={thisStitch}/> :null }
        </div>
      ) : ( null
        
      )}
        </div>
    );
}

export default StitchInfo;