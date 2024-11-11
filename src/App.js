import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/list/List';
import Login from './pages/login/Login';
import New from './pages/new/New';
import Single from './pages/single/Single';
import Register from './pages/users/Register';
import RegisterSuccess from './pages/users/RegisterSuccess';
import { DarkModeContext } from './context/darkModeContext';
import { productInputs, userInputs } from './formSource';
import './style/dark.scss';

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} /> {/* /home 경로 추가 */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-success" element={<RegisterSuccess />} />
          <Route path="/users" element={<List />} />
          <Route path="/users/:userId" element={<Single />} />
          <Route path="/users/new" element={<Register />} />
          <Route path="/products" element={<List />} />
          <Route path="/products/:productId" element={<Single />} />
          <Route
            path="/products/new"
            element={<New inputs={productInputs} title="Add New Product" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
