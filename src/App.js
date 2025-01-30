import Header from './components/header';
import './App.css';
import ClothHeader from './components/ClothHeader';
import Footer from './components/Footer';
import MidSection from './components/MidSection';
import { Routes,Route,useLocation} from 'react-router-dom';
import NoPage from './pages/NoPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Login from './pages/Login';


function App() {

  const location = useLocation();
  return (
    <div className="App">
      <Header/>

      <ClothHeader/>
      <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MidSection />} /> 
          <Route path="/About" element={<About/>}/>
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/SignUp" element={<Signup/>}/>
          <Route path="/LogIn" element={<Login/>}/>
          <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
