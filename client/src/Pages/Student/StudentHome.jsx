import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import HomeHelper from "../../Components/HomeHelper";
import "./StudentHome.css";
import { AiOutlineWechat } from 'react-icons/ai'
import { MdUpdate } from 'react-icons/md'
const Home = () => {
  const store = useSelector((store) => store);
  const history = useHistory();

  return (
    <section className="faculty-interface">
    {store.student.isAuthenticated ? (
      <>
        <HomeHelper />
        <div className="faculty-interface-container">
          <div className="faculty-interface-content">
          <div className="card">
          <img
                className="card-img-top"
                src={store.student.student.student.avatar}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">
                  {store.student.student.student.registrationNumber}
                </h5>
              </div>
              
            </div>
          </div>
        </div>
      </>
    ) : (
      history.push("/")
    )}
  </section>
  );
};

export default Home;
