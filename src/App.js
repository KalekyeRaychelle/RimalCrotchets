import Header from './components/header';
import './App.css';
import ClothHeader from './components/ClothHeader';
import Footer from './components/Footer';
import MidSection from './components/MidSection';
import { Routes,Route,useLocation} from 'react-router-dom';
import NoPage from './pages/NoPage';
function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Header/>
      <ClothHeader/>
      <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MidSection />} /> 
          <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
