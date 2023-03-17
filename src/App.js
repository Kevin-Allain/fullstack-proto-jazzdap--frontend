import { useState, useEffect } from 'react';
import './App.css';
import JazzDap from './components/JazzDap';
import { getAllJazzDap, addJazzDap, updateJazzDap, deleteJazzDap } from './utils/HandleApi';

function App() {

  const [jazzDap, setJazzDap] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [jazzDapId, setJazzDapId] = useState("");


  useEffect(() => {
    getAllJazzDap(setJazzDap)
  }, [])

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setJazzDapId(_id);
  }

  return (
    <div className="App">
      <div className="container">
        <h1>JazzDap App</h1>
        <div className="top">
          <input type="text" placeholder="Add Jazzdap" name="AddJazzDap" id="AddJazzDap" value={text} onChange={(e) => setText(e.target.value)} />
          <div className="add" onClick={isUpdating ?
            () => updateJazzDap(jazzDapId, text, setJazzDap, setText, setIsUpdating) :
            () => addJazzDap(text, setText, setJazzDap)}>
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {jazzDap.map((item) =>
            <JazzDap key={item._id}
              text={item.text}
              updateMode = {() => updateMode(item._id, item.text)}
              deleteJazzDap = {() => deleteJazzDap(item._id, setJazzDap)}
            />)}
        </div>
      </div>
    </div>
  );
}

export default App;
