import { useState } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import GaugeCollection from './components/GaugeCollection';
import HooksCollection from './components/HooksCollection';
import Nav from './components/Nav';
import PatternCollection from './components/PatternCollection';
import StitchCollection from './components/StitchCollection';
import YarnCollection from './components/YarnCollection';

function App() {
  const [hooks, setHooks] = useState([]);

  const [showInfo, setShowInfo] = useState(false)
  const [showYarnInfo, setShowYarnInfo] =useState(false)
  const [showStitchInfo, setShowStitchInfo] =useState(false)
  const [showGaugeInfo, setShowGaugeInfo] =useState(false)
  console.log(showInfo)
  return (
    <div className="App">
      <Nav setShowInfo={setShowInfo} setShowYarnInfo={setShowYarnInfo} setShowStitchInfo={setShowStitchInfo}/>
        <Route path="/hooks" render={() => <HooksCollection showInfo={showInfo} setHooks={setHooks} hooks={hooks} setShowInfo={setShowInfo} />}/>
        <Route path="/yarns" render={() => <YarnCollection showYarnInfo={showYarnInfo} setShowYarnInfo={setShowYarnInfo} setHooks={setHooks} hooks={hooks} />}/>
        <Route path="/stitches" render={() => <StitchCollection showStitchInfo={showStitchInfo} setShowStitchInfo={setShowStitchInfo} />}/>
        <Route path="/gauges" render={() => <GaugeCollection showGaugeInfo={showGaugeInfo} setShowGaugeInfo={setShowGaugeInfo} />}/>
        <Route path="/patterns" render={() => <PatternCollection />}/>
    </div>
  );
}

export default App;