import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Register from './Register';
import CreateRespo from './CreateRespo';
import Editrepo from './Editrepo';
import Viewrepo from './Viewrepo';

function App() {
  return (
   <BrowserRouter>      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/newrepo" element={<CreateRespo />} />
        <Route path="/editrepo/:id" element={<Editrepo></Editrepo>} />
        <Route path="/viewrepo/:id" element={<Viewrepo></Viewrepo>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
