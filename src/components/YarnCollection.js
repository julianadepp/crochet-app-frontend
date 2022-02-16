import React from "react";
import Flickity from "react-flickity-component";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../flickity/flickity.css";
import NewYarnForm from "./NewYarnForm";
import YarnInfo from "./YarnInfo";

function YarnCollection({
  yarns,
  setYarns,
  showYarnInfo,
  setShowYarnInfo,
  hooks,
}) {
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
  const flickityOptions = {
    wrapAround: true,
    initialIndex: 2,
    imagesLoaded: true,
  };

  return (
    <div className="bar">
      <h2 className="barTitle">Yarn</h2>
      <div className="carousel">
        <Flickity options={flickityOptions}>
          {yarns.map((yarn) => {
            return (
              <div id={yarn.id} onClick={getId} className="barItem">
                <Link to={`/yarns/${yarn.id}`}>
                  <h3 className="barItemTitle">{yarn.nickname}</h3>
                  <div className="thumbnailWrapper">
                    <img
                      className="barThumbnail"
                      src={yarn.yarn_image}
                      alt="yarn"
                    ></img>
                  </div>
                </Link>
              </div>
            );
          })}
        </Flickity>
      </div>
      <div>
        {showYarnInfo ? (
          <Route
            path="/yarns/:id"
            render={() => (
              <YarnInfo
                thisYarn={thisYarn}
                setThisYarn={setThisYarn}
                hooks={hooks}
              />
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
