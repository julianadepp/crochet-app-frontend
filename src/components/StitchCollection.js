import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NewStitchForm from './NewStitchForm';
import StitchInfo from './StitchInfo';

function StitchCollection({ showStitchInfo, setShowStitchInfo }) {
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
    const [stitches, setStitches] = useState([]);
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

    return (
        <div>
            <h2>Stitches</h2>
      {stitches.map((stitch) => {
        return (
          <div id={stitch.id} onClick={getId}>
            <Link to={`/stitches/${stitch.id}`}>
              <h3>{stitch.name}</h3>
              <img width="100px" src={stitch.stitch_image} alt="stitch"></img>
              </Link>
          </div>
        );
      })}
      <div>
        {showStitchInfo ? (
          <Route
            path="/stitches/:id"
            render={() => (
              <StitchInfo thisStitch={thisStitch} setThisStitch={setThisStitch} stitches={stitches} />
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