import React, { useEffect, useState } from 'react';

function GaugeCollection(props) {
    const [gauges, setGauges] = useState([]);
    const url = "http://localhost:8000/";
    useEffect(() => {
      fetch(url + "gauges/")
        .then((res) => res.json())
        .then((json) => {
          setGauges(json);
        })
        .catch((err) =>
          console.log("You probably made a mistake somewhere! ", err)
        );
    }, []);
    console.log(gauges);
    return (
        <div>
      <h2>Gauges</h2>
      {gauges.map((gauge) => {
        return (
          <div>
            <a href="">
              <h3>{gauge.title}</h3>
              <img width="100px" src={gauge.gauge_image} alt="gauge"></img>
            </a>
          </div>
        );
      })}            
        </div>
    );
}

export default GaugeCollection;