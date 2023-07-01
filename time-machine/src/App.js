import logo from "./logo.svg";
import "./App.css";
import DateForm from "./DateForm";
import Navigation from "./navigation";
import { DateProvider } from './DateContext';

function App() {
  return (
    <DateProvider>
      <div className="App">
      <header className="App-header">
        <DateForm />
      </header>
      <Navigation />
    </div>
    </DateProvider>
    
  );
}

export default App;
