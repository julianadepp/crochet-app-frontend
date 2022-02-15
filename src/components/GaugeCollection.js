import React, { useEffect, useState } from 'react';
import Flickity from 'react-flickity-component';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../flickity/flickity.css'
import GaugeInfo from './GaugeInfo';
import NewGaugeForm from './NewGaugeForm';

function GaugeCollection({yarns, stitches, hooks, gauges, setGauges, showGaugeInfo, setShowGaugeInfo }) {
  const initGauge = {
    id: "",
    title: "",
    yarn: "",
    hook: "",
    stitch: "",
    number_of_stitches: '',
    notes: '',
    gauge_image: "",
    patterns: [],
  };

  const [thisGauge, setThisGauge] = useState(initGauge);

  const url = process.env.REACT_APP_API;
    useEffect(() => {
      fetch(url + "gauges/")
        .then((res) => res.json())
        .then((json) => {
          setGauges(json);
        })
        .catch((err) =>
          console.log("You probably made a mistake somewhere! ", err)
        );
    }, [thisGauge.id]);
    console.log(gauges);

  function getId(e) {
    setThisGauge({ ...thisGauge, id: e.currentTarget.id });
    setShowGaugeInfo(true);
    console.log(e.currentTarget.id, "clicked gauge:", thisGauge);
  }
  const flickityOptions={
    wrapAround: true,
    initialIndex:2,
    imagesLoaded:true,
  }

    return (
        <div className="bar">
      <h2 className="barTitle">Gauges</h2>
      <div className="carousel">
        <Flickity options={flickityOptions} >
        {gauges.map((gauge) => {
          return (
            <div id={gauge.id} onClick={getId} className="barItem">
              <Link to={`/gauges/${gauge.id}`}>
                <h3 className="barItemTitle">{gauge.title}</h3>
                <div className="thumbnailWrapper"><img className="barThumbnail" src={gauge.gauge_image} alt="gauge"></img></div>
                </Link>
            </div>
          );
        })}
        </ Flickity>
      </div>
      <div>
        {showGaugeInfo ? (
          <Route
            path="/gauges/:id"
            render={() => (
              <GaugeInfo thisGauge={thisGauge} setThisGauge={setThisGauge} />
            )}
          />
        ) : null}
        <Route
          path="/gauges/new"
          render={() => (
            <NewGaugeForm
              yarns={yarns}
              stitches={stitches}
              hooks={hooks}
              thisGauge={thisGauge}
              setThisGauge={setThisGauge}
              gauges={gauges}
              setGauges={setGauges}
              setShowGaugeInfo={setShowGaugeInfo}
            />
          )}
        />
      </div>            
        </div>
    );
}

export default GaugeCollection;