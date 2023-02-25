import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Market from './pages/Market'
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import CreateUserPage from './pages/CreateUserPage';
import Recipes from './pages/Recipes';
import FridgeContentsPage from './pages/FridgeContentsPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/loginUser" element={<LoginPage />} />
        <Route path="/createUser" element={<CreateUserPage />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/fridgeContents" element={<FridgeContentsPage />} />
      </Routes>
    </>
  );
}

export default App;
