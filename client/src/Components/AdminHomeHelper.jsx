import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { adminLogout } from '../redux/action/adminAction'
import '../Style/GlobalSideBarStyles.css'
import {FiUserPlus,FiFolderPlus} from 'react-icons/fi'
import {BsPersonPlusFill} from 'react-icons/bs'
import {RiAdminFill} from 'react-icons/ri'
import {HiMenuAlt3} from 'react-icons/hi'
import { IoHomeSharp, IoCheckmarkSharp } from "react-icons/io5";
import { MdUpdate } from "react-icons/md";
import { GiPencilRuler } from "react-icons/gi";
import { RiLockPasswordLine } from "react-icons/ri";

const Home = () => {
    const store = useSelector(store => store)
    const [name, setName] = useState("")
    useEffect(() => {

        if (store.admin.admin.name) {
            setName(store.admin.admin.name)
        }
    }, [store.admin.admin.name])
    const history = useHistory()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(adminLogout())
        history.push('/')
    }

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
              <div className="logout"><button onClick={logoutHandler} type="button" className="btn-logout">LOGOUT</button></div>
              
                  <ul className="navbar-nav">
                  <li className="nav-item">
                          <Link to="/admin"><li><IoHomeSharp className='icon'/>Home</li></Link>
                      </li>
                      <li className="nav-item">
                          <Link to="/admin/addFaculty"><li><FiUserPlus className='icon'/>Adicionar Professor</li></Link>
                      </li>
                      <li className="nav-item">
                          <Link to="/admin/addStudent"><li><BsPersonPlusFill className='icon'/>Adicionar Aluno</li></Link>
                      </li>
                      <li className="nav-item">
                          <Link to="/admin/addSubject"><li><FiFolderPlus className='icon'/>Adicionar Matéria</li></Link>
                      </li>
                      <li className="nav-item">
                         <Link to="/admin/addAdmin"><li><RiAdminFill className='icon'/>Adicionar Admin</li></Link>
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
          <li className="nav-item">
          <Link to="/admin"><li><IoHomeSharp className='icon'/>Home</li></Link>
          </li>
          <li className="nav-item">
          <Link to="/admin/addFaculty"><li><FiUserPlus className='icon'/>Adicionar Professor</li></Link>
          </li>
          <li className="nav-item">
          <Link to="/admin/addStudent"><li><BsPersonPlusFill className='icon'/>Adicionar Aluno</li></Link>
          </li>
          <li className="nav-item">
          <Link to="/admin/addSubject"><li><FiFolderPlus className='icon'/>Adicionar Matéria</li></Link>
          </li>
          <li className="nav-item">
          <Link to="/admin/addAdmin"><li><RiAdminFill className='icon'/>Adicionar Admin</li></Link>
          </li>
        </ul>
      </nav>
        </>
    )
}

export default Home
