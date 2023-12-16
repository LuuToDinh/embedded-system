import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DefaultLayout from './components/DefaultLayout';
import Overview from './pages/Overview';
import Notification from './pages/Notification';
import Controll from './pages/Controll';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/overview'
          element={<DefaultLayout Component={Overview} />}
        />
        <Route
          path='/notification'
          element={<DefaultLayout Component={Notification} />}
        />
        {/* <Route path="/controll" element={<DefaultLayout Component={Controll} />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
