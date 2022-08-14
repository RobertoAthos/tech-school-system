import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AdminHomeHelper from "../../Components/AdminHomeHelper";
import '../../Style/AdminHome.css'

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
                    <li>Nossos Alunos</li>
                  </Link>
                </li>
              </div>
              <div className="card">
                <li className="card-link">
                  <Link to="/admin/allSubject">
                    <li>Todas as Matérias</li>
                  </Link>
                </li>
              </div>
              <div className="card">
                <li className="card-link">
                  <Link to="/admin/allFaculties">
                    <li>Nossos Professores</li>
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

export default AdminHome;
