import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { adminLogout } from '../redux/action/adminAction'
import '../Style/GlobalSideBarStyles.css'
import {IoHomeSharp} from 'react-icons/io5'
import {FiUserPlus,FiFolderPlus} from 'react-icons/fi'
import {BsPersonPlusFill} from 'react-icons/bs'
import {RiAdminFill} from 'react-icons/ri'


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
    return (
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
    )
}

export default Home
