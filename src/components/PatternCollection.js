import React, { useEffect, useState } from 'react';

function PatternCollection(props) {
    const [patterns, setPatterns] = useState([]);
    const url = "http://localhost:8000/";
    useEffect(() => {
      fetch(url + "patterns/")
        .then((res) => res.json())
        .then((json) => {
          setPatterns(json);
        })
        .catch((err) =>
          console.log("You probably made a mistake somewhere! ", err)
        );
    }, []);
    console.log(patterns);
    return (
        <div>
            <h2>Patterns</h2>
      {patterns.map((pattern) => {
        return (
          <div>
            {/* <a href=""> */}
              <h3>{pattern.name}</h3>
              <img width="100px" src={pattern.pattern_image} alt="pattern"></img>
            {/* </a> */}
          </div>
        );
      })}
        </div>
    );
}

export default PatternCollection;