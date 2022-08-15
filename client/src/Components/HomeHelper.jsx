import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  studentLogout,
  newerChats,
  previousChats,
} from "../redux/action/studentAction";
import "../Style/GlobalSideBarStyles.css";
import {IoHomeSharp} from 'react-icons/io5'
import {MdUpdate} from 'react-icons/md'
import {GiPencilRuler} from 'react-icons/gi'
import {BsFillChatQuoteFill} from 'react-icons/bs'

const Home = () => {
  const history = useHistory();
  const store = useSelector((store) => store);
  const [name, setName] = useState("");
  useEffect(() => {
    if (store.student.student.student.name) {
      setName(store.student.student.student.name);
    }
  }, [store.student.student.student.name]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(newerChats(store.student.student.student.name));
    dispatch(previousChats(store.student.student.student.name));
  }, [store.student.newerChats.length]);
  const logoutHandler = () => {
    dispatch(studentLogout());
    history.push("/");
  };
  return (
    <div className="sidebar-section">
      <nav className="navigation-container">
        <div className="links-container">
          <h2>Bem Vindo de Volta !</h2>
          <div className="name-profile">
            <h3>{name.toUpperCase()}</h3>
          </div>
          <div className="logout">
            <button
              onClick={logoutHandler}
              type="button"
              className="btn-logout"
            >
              LOGOUT
            </button>
          </div>

          <ul className="navbar-nav">
            <li className="nav-item active">       
                <Link to="/home">
                  <li><IoHomeSharp className='icon'/>Home</li>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/student/updateProfile">
                  <li><MdUpdate className="icon"/>Atualizar Perfil</li>
                </Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="dropdown-item"  to="/student/testPerformance">
                <li><GiPencilRuler className="icon"/>Notas Gerais</li>
              </Link>
            </li>
            <li className="nav-item">
                  <Link to="/studentDetails">
                    <li><BsFillChatQuoteFill className='icon'/>Nova Conversa ({store.student.newerChats.length})</li>
                  </Link>
                </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Home;

{
  /*  */
}
