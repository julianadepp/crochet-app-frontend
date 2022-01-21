import { useState } from 'react';
import './App.css';
import GaugeCollection from './components/GaugeCollection';
import HookInfo from './components/HookInfo';
import HooksCollection from './components/HooksCollection';
import NewHookForm from './components/NewHookForm';
import PatternCollection from './components/PatternCollection';
import StitchCollection from './components/StitchCollection';
import YarnCollection from './components/YarnCollection';

function App() {
  const [hooks, setHooks] = useState([]);
  const [currentId, setCurrentId] = useState(null)

  return (
    <div className="App">
      <HooksCollection className="horizontal-scroll-bar" currentId={currentId} setCurrentId={setCurrentId} hooks={hooks} setHooks={setHooks}/>
      <YarnCollection className="horizontal-scroll-bar"/>
      <StitchCollection className="horizontal-scroll-bar"/>
      <GaugeCollection className="horizontal-scroll-bar"/>
      <PatternCollection className="horizontal-scroll-bar"/>

      <div>
        <HookInfo currentId={currentId}/>
        <NewHookForm hooks={hooks} currentId={currentId} setHooks={setHooks} />
      </div>
    </div>
  );
}

export default App;
