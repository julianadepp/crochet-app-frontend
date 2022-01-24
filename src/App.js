import { useState } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import GaugeCollection from "./components/GaugeCollection";
import Home from "./components/Home";
import HooksCollection from "./components/HooksCollection";
import Nav from "./components/Nav";
import PatternCollection from "./components/PatternCollection";
import StitchCollection from "./components/StitchCollection";
import YarnCollection from "./components/YarnCollection";

function App() {
  const [hooks, setHooks] = useState([]);
  const [stitches, setStitches] = useState([]);
  const [yarns, setYarns] = useState([]);
  const [gauges, setGauges] = useState([]);
  const [patterns, setPatterns] = useState([]);

  const [showInfo, setShowInfo] = useState(false);
  const [showYarnInfo, setShowYarnInfo] = useState(false);
  const [showStitchInfo, setShowStitchInfo] = useState(false);
  const [showGaugeInfo, setShowGaugeInfo] = useState(false);
  const [showPatternInfo, setShowPatternInfo] = useState(false);
  return (
    <div className="App">
      <div className="nav">
        <Nav
          setShowInfo={setShowInfo}
          setShowYarnInfo={setShowYarnInfo}
          setShowStitchInfo={setShowStitchInfo}
          setShowGaugeInfo={setShowGaugeInfo}
        />
      </div>
      {/* <Route
        exact path="/"
        render={() => (
          <Home
            showInfo={showInfo}
            setShowInfo={setShowInfo}
            showYarnInfo={showYarnInfo}
            setShowYarnInfo={setShowYarnInfo}
            showStitchInfo={showStitchInfo}
            setShowStitchInfo={setShowStitchInfo}
            showGaugeInfo={showGaugeInfo}
            setShowGaugeInfo={setShowGaugeInfo}
            showPatternInfo={showPatternInfo}
            setShowPatternInfo={setShowPatternInfo}
          />
        )}
      /> */}
      <HooksCollection
        showInfo={showInfo}
        setHooks={setHooks}
        hooks={hooks}
        setShowInfo={setShowInfo}
      />
      <YarnCollection
        yarns={yarns}
        setYarns={setYarns}
        showYarnInfo={showYarnInfo}
        setShowYarnInfo={setShowYarnInfo}
        hooks={hooks}
      />
      <StitchCollection
        stitches={stitches}
        setStitches={setStitches}
        showStitchInfo={showStitchInfo}
        setShowStitchInfo={setShowStitchInfo}
      />
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
      <PatternCollection
        setShowPatternInfo={setShowPatternInfo}
        showPatternInfo={showPatternInfo}
        gauges={gauges}
        setGauges={setGauges}
        patterns={patterns}
        setPatterns={setPatterns}
      />
    </div>
  );
}

export default App;
