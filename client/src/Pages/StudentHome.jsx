import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import HomeHelper from "../Components/HomeHelper";
import "../Style/StudentHome.css";
import {AiOutlineWechat} from 'react-icons/ai'
import {MdUpdate} from 'react-icons/md'

const Home = () => {
  const store = useSelector((store) => store);
  const history = useHistory();

  return (
    <section className="student-home">
      {store.student.isAuthenticated ? (
        <>
          <HomeHelper />
          <div className="student-container">
            <div className="cards-container">
              <div className="card">
                <li className="nav-item-links">
                  <Link to="/studentDetails">
                    <li><AiOutlineWechat className="icon"/>Chat</li>
                  </Link>
                </li>
              </div>
              <div className="card">
                <li className="nav-item-links">
                  <Link to="/student/updatePassword">
                    <li><MdUpdate className="icon"/>Atualizar Senha</li>
                  </Link>
                </li>
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
