import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PageNotFound from "./components/PageNotFound";
import Register from "./components/Register";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
function App(){
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </BrowserRouter>  
   

  )
}
export default App;