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
import Dashboard from './pages/Dashboard';
import DashboardHeader from './components/DashboardHeader';
import DashboardFooter from './components/DashboardFooter';
import CatalogForm from './pages/CatalogForm';
import Catalog from './pages/Catalog';
import ShoppingCart from './pages/ShoppingCart'
import Sweaters from './pages/Sweaters';
import Bags from './pages/Bags';
import Tops from './pages/Tops';
import Pants from './pages/Pants';
function App() {

  const location = useLocation();
  const isDashboard= location.pathname.startsWith('/Dashboard');

  return (
    <div className="App">
      {isDashboard ? <DashboardHeader/> :<Header/>}

      {!isDashboard && <ClothHeader/>}
      <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MidSection />} /> 
          <Route path="/About" element={<About/>}/>
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/SignUp" element={<Signup/>}/>
          <Route path="/LogIn" element={<Login/>}/>
          <Route path ="/Dashboard" element={<Dashboard/>}/>
          <Route path="/Catalog" element={<Catalog/>}/>
          <Route path="/ShoppingCart" element={<ShoppingCart/>}/>
          <Route path="/Catalog/Sweaters" element={<Sweaters/>}/>
          <Route path="/Catalog/Bags" element={<Bags/>}/>
          <Route path="/Catalog/Tops" element={<Tops/>}/>
          <Route path="/Catalog/Pants" element={<Pants/>}/>
          <Route path="/Catalog/newProduct" element={<CatalogForm/>}/>
          <Route path="*" element={<NoPage />} />
      </Routes>
      {isDashboard ? <DashboardFooter/>:<Footer/>}
    </div>
  );
}

export default App;
