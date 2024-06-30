import { Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import LandingPage from "./pages/Landing/LandingPage";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/LogIn/LoginPage";

const App = () => {
  return (
    <Routes>
      <Route path="/music-first" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<Navigate to="/music-first" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
