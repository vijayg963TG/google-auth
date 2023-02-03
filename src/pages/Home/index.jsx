import { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import jwt_decode from "jwt-decode";
import { Loader } from "../../components/Loader";
import { dataContext } from "../../context/dataContext";
import { BASE_URL } from "../../constant";
import Resumes from "../../components/Resumes";

function Home() {
  const { user, setUser} = useContext(dataContext);
  const [display, setDisplay] = useState(false);

  const handleDisplay = () => {
    setDisplay(!display);
  };

  const logout = () => {
    window.open(`${BASE_URL}auth/logout`, "_self");
    localStorage.clear();
  };

  useEffect(() => {
    setUser(jwt_decode(localStorage.getItem("token")).user);
  }, []);

// console.log(user)

  if (!user) {
    return <Loader />;
  }
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
        <h2 className={styles.from_heading}>{user.name}</h2>
          <div className={styles.profile}>
            <div className="tooltip">
              <img
                onClick={handleDisplay}
                src={user.photo ? user.photo : "🙂"}
                alt="profile"
                className={styles.profile_img}
              />
              {display && (
                <div className="tooltiptext">
                  {/* <h2>{user.email}</h2> */}
                  <h2 className={styles.from_heading}>{user.name}</h2>
                  <button className={styles.btn} onClick={logout}>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main>
          <Resumes />
        </main>
      </div>
    </>
  );
}

export default Home;
