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

      <div>
        <div>{(hooks!==[])?
          <Route
            exact
            path="/"
            render={() => (
              <Home
                showInfo={showInfo}
                setShowInfo={setShowInfo}
                setShowYarnInfo={setShowYarnInfo}
                setShowStitchInfo={setShowStitchInfo}
                setShowGaugeInfo={setShowGaugeInfo}
                gauges={gauges}
                setGauges={setGauges}
                patterns={patterns}
                setPatterns={setPatterns}
                hooks={hooks}
                yarns={yarns}
                stitches={stitches}
                setHooks={setHooks}
                setYarns={setYarns}
                setStitches={setStitches}
                showYarnInfo={showYarnInfo}
                showStitchInfo={showStitchInfo}
                showGaugeInfo={showGaugeInfo}
                showPatternInfo={showPatternInfo}
              />
            )}
          />:<h2>Gathering Data from Heroku...</h2>}
        </div>
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
    </div>
  );
}

export default App;
