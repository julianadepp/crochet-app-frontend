import React, { useEffect, useState } from 'react';

function StitchCollection(props) {
    const [stitches, setStitches] = useState([]);
    const url = "http://localhost:8000/";
    useEffect(() => {
      fetch(url + "stitches/")
        .then((res) => res.json())
        .then((json) => {
          setStitches(json);
        })
        .catch((err) =>
          console.log("You probably made a mistake somewhere! ", err)
        );
    }, []);
    console.log(stitches);
    return (
        <div>
            <h2>Stitches</h2>
      {stitches.map((stitch) => {
        return (
          <div>
            <a href="">
              <h3>{stitch.name}</h3>
              <img width="100px" src={stitch.stitch_image} alt="stitch"></img>
            </a>
          </div>
        );
      })}
        </div>
    );
}

export default StitchCollection;