import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AdminHomeHelper from "../../Components/AdminHomeHelper";
import  './AdminHome.css'
import {IoIosPeople} from 'react-icons/io'
import {GiTeacher,GiBookshelf} from 'react-icons/gi'
import TodoAdmin from '../../Components/TodoTaskAdmin'

const AdminHome = () => {
  const store = useSelector((store) => store);

  const history = useHistory();
  return (
    <section className="admin-home-section">
      {store.admin.isAuthenticated ? (
        <>
          <AdminHomeHelper />
          <div className="admin-content">
          
            <div className="cards-container">
              <div className="card">
                <li className="card-link">
                
                  <Link to="/admin/allStudents">
                    <li><IoIosPeople className="icon"/>Nossos Alunos</li>
                  </Link>
                </li>
              </div>
              <div className="card">
                <li className="card-link">
                  <Link to="/admin/allSubject">
                    <li><GiBookshelf className="icon"/>Todas as Matérias</li>
                  </Link>
                </li>
              </div>
              <div className="card">
                <li className="card-link">
                  <Link to="/admin/allFaculties">
                    <li><GiTeacher className="icon"/>Nossos Professores</li>
                  </Link>
                </li>
              </div>
              <div className="card">
                <li className="card-link">
                  <Link to="/admin/events">
                    <li><GiTeacher className="icon"/>Lançar Eventos</li>
                  </Link>
                </li>
              </div>
            </div>
            <TodoAdmin/>
              </div>  
        </>
      ) : (
        history.push("/")
      )}
    </section>
  );
};

export default AdminHome;
