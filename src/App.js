
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Register from './Register';
import CreateRespo from './CreateRespo';
import Codemirror from './Codemirror';
import Editrepo from './Editrepo';

function App() {
  return (

    <BrowserRouter>      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/newrepo" element={<CreateRespo />} />
        <Route path="/codemirror" element={<Codemirror></Codemirror>} />
        <Route path="/editrepo/:id" element={<Editrepo></Editrepo>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
