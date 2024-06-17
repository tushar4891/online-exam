import "./App.css";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { Toaster } from "react-hot-toast";
import Questions from "./Questions";
import ThankYou from "./ThankYou";
import Review from "./Review";
import Response from "./Response";
import { AuthProvider } from "./AuthContext"; // Import the AuthProvider
import Header from "./Header";
import Result from "./Result";

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" and element={<Home />} />
            <Route path="/login" and element={<Login />} />
            <Route path="/register" and element={<Register />} />
            <Route path="/:name/questions" and element={<Questions />} />
            <Route path="/thankYou" and element={<ThankYou />} />
            <Route path="/:name/review" and element={<Review />} />
            <Route path="/response/:username" and element={<Response />} />
            <Route path="/:name/result" and element={<Result />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
