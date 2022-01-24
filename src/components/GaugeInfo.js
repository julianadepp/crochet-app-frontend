import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GaugeUpdateForm from './GaugeUpdateForm';

function GaugeInfo({ thisGauge, setThisGauge, hooks }) {
    const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const initGauge = {
    id: "",
    title: "",
    yarn: "",
    hook: "",
    stitch: "",
    number_of_stitches: '',
    notes: '',
    gauge_image: "",
  };

  useEffect(() => {
    if (thisGauge.id) {
      fetch(process.env.REACT_APP_API + "gauges/" + thisGauge.id)
        .then((res) => res.json())
        .then((json) => setThisGauge(json))
        .catch((err) => console.log("fetching this gauge isnt working...", err));
    }
  }, [thisGauge.id]);

  console.log("currentId: ", thisGauge.id, "gauge info: ", thisGauge);

  function deleteGauge() {
    fetch(process.env.REACT_APP_API + "gauges/" + thisGauge.id, {
      method: "DELETE",
    }).then((res) => {
      res.status === 204 ? setThisGauge(initGauge) : console.log(res.status);
    });
  }
  function handleEditClick() {
    setCurrentlyEditing(!currentlyEditing);
  }
  console.log(currentlyEditing);
    return (
        <div>
            {thisGauge.id ? (
        <div>
          <h2>gauge details...</h2>
          <h3>{thisGauge.title}</h3>
          <img
            src={thisGauge.gauge_image}
            alt={thisGauge.title}
            width="200px"
          ></img>
          <h4>number of stitches: {thisGauge.number_of_stitches} </h4>
          <p>{thisGauge.notes}</p>
          <h4>yarn: {thisGauge.yarn.nickname}</h4>
          <h4>hook size: {thisGauge.hook.size_name}</h4>
          <h4>stitch: {thisGauge.stitch.name}</h4>
          {/* <ul>
            {thisGauge.patterns.map((pattern) => (
              <li>
                <Link to={`/patterns/${pattern.id}`}>{pattern.name}</Link>
              </li>
            ))}
          </ul> */}

          <button onClick={handleEditClick}>edit</button>
          <button onClick={deleteGauge}>delete</button>
          {currentlyEditing ? (
            <GaugeUpdateForm
              hooks={hooks}
              setThisGauge={setThisGauge}
              thisGauge={thisGauge}
            />
          ) : null}
        </div>
      ) : null}
        </div>
    );
}

export default GaugeInfo;