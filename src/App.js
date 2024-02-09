import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './component/Register/Register';
import Login from './component/Login/Login';
import Profile from './component/Profile/Profile';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path='/profile' element={<Profile/>} />
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
