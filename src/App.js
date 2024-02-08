

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Edit from './components/Edit';
import Form from './components/Form';

function App(props) {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/'> */}
            {/* <Route index element={<Home />} /> */}
            <Route path="/" element={<Home />} />
            <Route path='/form' element={<Form />} />
            <Route exact path="/edit/:id" element={<Edit />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
