import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "../flickity/flickity.css";
import Flickity from "react-flickity-component";
import NewStitchForm from "./NewStitchForm";
import StitchInfo from "./StitchInfo";

function StitchCollection({
  stitches,
  setStitches,
  showStitchInfo,
  setShowStitchInfo,
}) {
  const initStitch = {
    id: "",
    name: "",
    instructions: "",
    description: "",
    pattern_code: "",
    stitch_image: "",
    notes: "",
    related_stitches: [],
  };
  const [thisStitch, setThisStitch] = useState(initStitch);

  const url = process.env.REACT_APP_API;

  useEffect(() => {
    fetch(url + "stitches/")
      .then((res) => res.json())
      .then((json) => {
        setStitches(json);
      })
      .catch((err) =>
        console.log("You probably made a mistake somewhere! ", err)
      );
  }, [thisStitch.id]);
  console.log(stitches);

  function getId(e) {
    setThisStitch({ ...thisStitch, id: e.currentTarget.id });
    setShowStitchInfo(true);
    console.log(e.currentTarget.id, "clicked stitch:", thisStitch);
  }
  const flickityOptions = {
    wrapAround: true,
    initialIndex: 2,
    imagesLoaded: true,
  };

  return (
    <div className="bar">
      <h2 className="barTitle">Stitches</h2>
      <div className="carousel">
        <Flickity options={flickityOptions}>
          {stitches.map((stitch) => {
            return (
              <div id={stitch.id} onClick={getId} className="barItem">
                <Link to={`/stitches/${stitch.id}`}>
                  <h3 className="barItemTitle">{stitch.name}</h3>
                  <div className="thumbnailWrapper">
                    <img
                      className="barThumbnail"
                      src={stitch.stitch_image}
                      alt="stitch"
                    ></img>
                  </div>
                </Link>
              </div>
            );
          })}
        </Flickity>
      </div>
      <div>
        {showStitchInfo ? (
          <Route
            path="/stitches/:id"
            render={() => (
              <StitchInfo
                thisStitch={thisStitch}
                setThisStitch={setThisStitch}
                stitches={stitches}
              />
            )}
          />
        ) : null}
        <Route
          path="/stitches/new"
          render={() => (
            <NewStitchForm
              thisStitch={thisStitch}
              setThisStitch={setThisStitch}
              stitches={stitches}
              setStitches={setStitches}
              setShowStitchInfo={setShowStitchInfo}
            />
          )}
        />
      </div>
    </div>
  );
}

export default StitchCollection;
