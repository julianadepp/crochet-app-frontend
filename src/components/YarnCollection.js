import React from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development";
import NewYarnForm from "./NewYarnForm";
import YarnInfo from "./YarnInfo";

function YarnCollection({yarns, setYarns, showYarnInfo, setShowYarnInfo, hooks}) {
  const initYarn = {
    id: "",
    nickname: "",
    weight: '',
    weight_description: '',
    brand: '',
    material: '',
    yarn_image: "",
    notes: '',
    suggested_hooks: [],
  };
  const [thisYarn, setThisYarn] = useState(initYarn);
  const url = process.env.REACT_APP_API;
    useEffect(() => {
    fetch(url + "yarns/")
      .then((res) => res.json())
      .then((json) => {
        setYarns(json);
      })
      .catch((err) =>
        console.log("You probably made a mistake somewhere! ", err)
      );
  }, [thisYarn.id]);
  console.log(yarns);

  function getId(e) {
    setThisYarn({ ...thisYarn, id: e.currentTarget.id });
    setShowYarnInfo(true);
    console.log(e.currentTarget.id, "clickedyarn:", thisYarn);
  }

  return (
    <div>
      <h2>Yarn</h2>
      {yarns.map((yarn) => {
        return (
          <div id={yarn.id} onClick={getId}>
            <Link to={`/yarns/${yarn.id}`}>
              <h3>{yarn.nickname}</h3>
              <img width="100px" src={yarn.yarn_image} alt="yarn"></img>
              </Link>
          </div>
        );
      })}
      <div>
      {showYarnInfo ? (
          <Route
            path="/yarns/:id"
            render={() => (
              <YarnInfo thisYarn={thisYarn} setThisYarn={setThisYarn}  hooks={hooks} />
            )}
          />
        ) : null}
        <Route
          path="/yarns/new"
          render={() => (
            <NewYarnForm
              thisYarn={thisYarn}
              setThisYarn={setThisYarn}
              yarns={yarns}
              setYarns={setYarns}
              setShowYarnInfo={setShowYarnInfo}
              hooks={hooks} 
            />
          )}
        />
      </div>
    </div>
  );
}

export default YarnCollection;
