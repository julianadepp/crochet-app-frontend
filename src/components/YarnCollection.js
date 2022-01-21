import React from "react";
import { useState, useEffect } from "react/cjs/react.development";

function YarnCollection(props) {
  const [yarns, setYarns] = useState([]);
  const url = "http://localhost:8000/";
  useEffect(() => {
    fetch(url + "yarns/")
      .then((res) => res.json())
      .then((json) => {
        setYarns(json);
      })
      .catch((err) =>
        console.log("You probably made a mistake somewhere! ", err)
      );
  }, []);
  console.log(yarns);
  return (
    <div>
      <h2>Yarn</h2>
      {yarns.map((yarn) => {
        return (
          <div>
            <a href="">
              <h3>{yarn.nickname}</h3>
              <img width="100px" src={yarn.yarn_image} alt="yarn"></img>
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default YarnCollection;
