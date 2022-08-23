import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { facultyLogout } from "../redux/action/facultyAction";
import "../Style/GlobalSideBarStyles.css";
import { IoHomeSharp, IoCheckmarkSharp } from "react-icons/io5";
import { MdUpdate } from "react-icons/md";
import { GiPencilRuler } from "react-icons/gi";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiMenuAlt3 } from "react-icons/hi";

const Home = () => {
  const store = useSelector((store) => store);
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  useEffect(() => {
    if (store.faculty.faculty.faculty.name) {
      setName(store.faculty.faculty.faculty.name);
    }
  }, [store.faculty.faculty.faculty.name]);
  const logoutHandler = () => {
    dispatch(facultyLogout());
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
                  <li>
                    <IoHomeSharp className="icon" />
                    Home
                  </li>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/faculty/updateProfile">
                  <li>
                    <MdUpdate className="icon" />
                    Atualizar Perfil
                  </li>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/attendenceFaculty">
                  <li>
                    <IoCheckmarkSharp className="icon" />
                    Marcar Presença
                  </li>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/faculty/uploadMarks">
                  <li>
                    <GiPencilRuler className="icon" />
                    Lançar Notas
                  </li>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/faculty/updatePassword">
                  <li>
                    <RiLockPasswordLine className="icon" />
                    Atualizar Senha
                  </li>
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
              <li className="nav-item-mobile">
                <Link to="/home">
                  <li className="nav-item active">
                    <IoHomeSharp className="icon" />
                    Home
                  </li>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/faculty/updateProfile">
                  <li>
                    <MdUpdate className="icon" />
                    Atualizar Perfil
                  </li>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/attendenceFaculty">
                  <li>
                    <IoCheckmarkSharp className="icon" />
                    Marcar Presença
                  </li>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/faculty/uploadMarks">
                  <li>
                    <GiPencilRuler className="icon" />
                    Lançar Notas
                  </li>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/faculty/updatePassword">
                  <li>
                    <RiLockPasswordLine className="icon" />
                    Atualizar Senha
                  </li>
                </Link>
              </li>
            </ul>
          </nav>
    </>
  );
};

export default Home;
