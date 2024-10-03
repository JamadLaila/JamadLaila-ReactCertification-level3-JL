import './App.css';
import LocalStorageSetter from './Components/LocalStorageSetter';
import LocalStorageDisplayer from './Components/LocalStorageDisplayer';

function App() {
  return (
    <div className="App">
      <h1>Exercise 1 - LocalStorage Handler</h1>
      
      <LocalStorageSetter/>

      <LocalStorageDisplayer/>
    </div>
  );
}

export default App;
