import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AdminHomeHelper from "../../Components/AdminHomeHelper";
import '../../Style/AdminHome.css'
import {IoIosPeople} from 'react-icons/io'
import {GiTeacher,GiBookshelf} from 'react-icons/gi'
import Fade from 'react-reveal/Fade';
import TodoTasksAdmin from "../../Components/TodoTaskAdmin";

const AdminHome = () => {
  const store = useSelector((store) => store);

  const history = useHistory();
  return (
    <section className="admin-home-section">
      {store.admin.isAuthenticated ? (
        <>
          <AdminHomeHelper />

          <Fade bottom>
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
            </div>
            <TodoTasksAdmin/>
              </div>  
          </Fade>
        </>
      ) : (
        history.push("/")
      )}
    </section>
  );
};

export default AdminHome;
