import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { BASE_URL } from "../src/constant";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { dataContext } from "./context/dataContext";
import NotFound from "./pages/NotFound";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [allCv, setAllCv] = useState(null)

  const url = `${BASE_URL}auth/verify?token=${
    token || localStorage.getItem("token")
  }`;
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    if (token) {
      async function fetchData() {
        try {
          const res = await axios.get(url, config);
          if (res.status !== 200) {
            throw new Error("API response was not successful");
          }
          setUser(res.data.data.user);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }
  }, []);

  return (
    <div className="App container">
      <dataContext.Provider
        value={{
          token,
          user,
          allCv,
          setAllCv,
          setUser,
          setToken,
        }}
      >
        <Routes>
          <Route
            exact
            path="/"
            element={token ? <Navigate to="/home" /> : <Login />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </dataContext.Provider>
    </div>
  );
}

export default App;
