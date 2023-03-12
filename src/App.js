import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom';
import './App.css';
import About from './Component/About';
import Home from './Component/Home';
import Login from './Component/Login';
import Navbar from './Component/Nav Comp/Navbar';
import Signup from './Component/Signup';

function App() {
  return (
    <div className='app_main'>
      <Router>
      <Navbar/>
      <Routes>
      <Route exact path="/home" element={<Home/>}/>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/signup" element={<Signup/>}/>
      <Route exact path="/about" element={<About/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
