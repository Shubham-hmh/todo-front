

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Edit from './components/Edit';
import Form from './components/Form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App(props) {
  return (
    <>
      <BrowserRouter>
        <Routes>
       
            <Route path="/" element={<Home />} />
            <Route path='/form' element={<Form />} />
            <Route exact path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;

