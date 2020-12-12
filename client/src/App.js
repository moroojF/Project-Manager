import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Link } from '@reach/router';
import All from './components/All';
import One from './components/One';
import AddForm from './components/AddForm';

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#E8D0BC" }}>
        <div className="container">
          <h2 className="textStyle text-center" style={{ fontSize: '50px' }}>Project Manager</h2>
        </div>
      </nav>
      <div className="container">
        <Router>
          <All path="/" />
          <AddForm path="/new" />
          <One path="/view/:_id" />
        </Router>
      </div>
    </>
  );
}

export default App;
