import { useState } from 'react';
import './App.css';
import GaugeCollection from './components/GaugeCollection';
import HooksCollection from './components/HooksCollection';
import NewHookForm from './components/NewHookForm';
import PatternCollection from './components/PatternCollection';
import StitchCollection from './components/StitchCollection';
import YarnCollection from './components/YarnCollection';

function App() {
  const [hooks, setHooks] = useState([]);

  return (
    <div className="App">
      <HooksCollection className="horizontal-scroll-bar" hooks={hooks} setHooks={setHooks}/>
      <YarnCollection className="horizontal-scroll-bar"/>
      <StitchCollection className="horizontal-scroll-bar"/>
      <GaugeCollection className="horizontal-scroll-bar"/>
      <PatternCollection className="horizontal-scroll-bar"/>
      <NewHookForm hooks={hooks} setHooks={setHooks} />
    </div>
  );
}

export default App;
