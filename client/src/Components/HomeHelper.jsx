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
import {HiMenuAlt3} from 'react-icons/hi'

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
  const [nav, setNav] = useState(false);
  const handleNav = () => setNav(!nav);
  return (
    <>
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
            <li className="nav-item">
              <Link className="dropdown-item"  to="/student/testPerformance">
                <li><GiPencilRuler className="icon"/>Notas Gerais</li>
              </Link>
            </li>
            <li className="nav-item">
                  <Link to="/student/updatePassword">
                    <li><MdUpdate className="icon"/>Atualizar Senha</li>
                  </Link>
                </li>
          </ul>
        </div>
      </nav>
    </div>
    <div className="mobile-header">
          <div className="welcome-text">
          <h2>Bem Vindo de Volta !</h2>
            <div className="name-profile">
              <h3>{name.toUpperCase()}</h3>
            </div>
          </div>
          <HiMenuAlt3
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                fontSize: "3rem",
                cursor: "pointer",
                zIndex: '10'
              }}
              onClick={handleNav}
            />
      </div>
          <nav className={nav ? 'menu menuOpen' : 'menu menuClose'}>
            <ul className="navbar-nav-mobile">
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
            </ul>
          </nav>
    </>
    
  );
};

export default Home;

{
  /*  */
}
