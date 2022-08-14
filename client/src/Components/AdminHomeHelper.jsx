import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { adminLogout } from '../redux/action/adminAction'
import '../Style/GlobalSideBarStyles.css'


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
                <button style={{ listStyle: "None" }} onClick={logoutHandler} type="button" className="btn"><li>LOGOUT</li></button>
                <h2>Bem Vindo de Volta !</h2>
                <div className="name-profile">
                    <h3>{name.toUpperCase()}</h3>
                </div>
                    <ul className="navbar-nav">
                    <li className="nav-item">
                            <Link to="/admin"><li>Home</li></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/addFaculty"><li>Adicionar Professor</li></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/addStudent"><li>Adicionar Aluno</li></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/addSubject"><li>Adicionar Matéria</li></Link>
                        </li>
                        <li className="nav-item">
                           <Link to="/admin/addAdmin"><li>Adicionar Admin</li></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Home
