import React, { useState } from "react";
import { Route } from "react-router-dom";
import GaugeCollection from "./GaugeCollection";
import HooksCollection from "./HooksCollection";
import PatternCollection from "./PatternCollection";
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
    <div>
      <Route
        path="/hooks"
        render={() => (
          <HooksCollection
            showInfo={showInfo}
            setHooks={setHooks}
            hooks={hooks}
            setShowInfo={setShowInfo}
          />
        )}
      />
      <Route
        path="/yarns"
        render={() => (
          <YarnCollection
            yarns={yarns}
            setYarns={setYarns}
            showYarnInfo={showYarnInfo}
            setShowYarnInfo={setShowYarnInfo}
            hooks={hooks}
          />
        )}
      />
      <Route
        path="/stitches"
        render={() => (
          <StitchCollection
            stitches={stitches}
            setStitches={setStitches}
            showStitchInfo={showStitchInfo}
            setShowStitchInfo={setShowStitchInfo}
          />
        )}
      />
      <Route
        path="/gauges"
        render={() => (
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
        )}
      />
      <Route
        path="/patterns"
        render={() => (
          <PatternCollection
            setShowPatternInfo={setShowPatternInfo}
            showPatternInfo={showPatternInfo}
            gauges={gauges}
            setGauges={setGauges}
            patterns={patterns}
            setPatterns={setPatterns}
          />
        )}
      />
    </div>
  );
}

export default Home;
