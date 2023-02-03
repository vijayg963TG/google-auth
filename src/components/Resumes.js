import React, { useContext, useEffect } from "react";import axios from "axios";
import { BASE_URL } from "../constant";
import { Loader } from "./Loader";
import { dataContext } from "../context/dataContext";

export default function Resumes() {
  const { user, allCv, setAllCv } = useContext(dataContext);
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  async function fetchData() {
    try {
      const res = await axios.get(
        `${BASE_URL}api/getpdf/${user._id}`,
        config
      );
      if (res.status !== 200) {
        throw new Error("API response was not successful");
      }
      setAllCv(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  if (!allCv) {
    return <Loader />;
  }
  return (
    <div className="container">
      <div className={"main"}>
        <h1>All Resume List ...</h1>
        <div>
          {JSON.stringify(allCv[0],null,5)}
        </div>
         </div>
    </div>
  );
}
