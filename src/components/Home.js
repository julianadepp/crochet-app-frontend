import React, { useState } from "react";
import "../flickity/flickity.css"
import GaugeCollection from "./GaugeCollection";
import HooksCollection from "./HooksCollection";
import StitchCollection from "./StitchCollection";
import YarnCollection from "./YarnCollection";

function Home({
  showInfo,
  setShowInfo,
  showYarnInfo,
  setShowYarnInfo,
  showStitchInfo,
  setShowStitchInfo,
  showGaugeInfo,
  setShowGaugeInfo,
  showPatternInfo,
  setShowPatternInfo,
}) {
  const [hooks, setHooks] = useState([]);
  const [stitches, setStitches] = useState([]);
  const [yarns, setYarns] = useState([]);
  const [gauges, setGauges] = useState([]);
  const [patterns, setPatterns] = useState([]);
  return (
    <div className="body">
      <div className="homeChild">
        <HooksCollection
          showInfo={showInfo}
          setHooks={setHooks}
          hooks={hooks}
          setShowInfo={setShowInfo}
        />
      </div>
      <div className="homeChild">
        <YarnCollection
          yarns={yarns}
          setYarns={setYarns}
          showYarnInfo={showYarnInfo}
          setShowYarnInfo={setShowYarnInfo}
          hooks={hooks}
        />
      </div>
      <div className="homeChild">
        <StitchCollection
          stitches={stitches}
          setStitches={setStitches}
          showStitchInfo={showStitchInfo}
          setShowStitchInfo={setShowStitchInfo}
        />
      </div>
      <div className="homeChild">
        <GaugeCollection
          hooks={hooks}
          yarns={yarns}
          stitches={stitches}
          showGaugeInfo={showGaugeInfo}
          setShowGaugeInfo={setShowGaugeInfo}
          gauges={gauges}
          setGauges={setGauges}
          patterns={patterns}
          setPatterns={setPatterns}
        />
      </div>
        </div>
  );
}

export default Home;
