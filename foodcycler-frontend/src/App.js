import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Market from './pages/Market'
import Home from './pages/Home';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
      </Routes>
    </>
  );
}

export default App;
