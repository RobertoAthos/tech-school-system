import React from "react";
import { useSelector } from "react-redux";
import {useHistory } from "react-router-dom";
import FacultyHomeHelper from "../Components/FacultyHomeHelper";
import TodoTasks from "../Components/TodoTasks";
import "../Style/FacultyInterface.css";

const FacultyInterface = () => {
  const history = useHistory();
  const store = useSelector((store) => store);
  return (
    <section className="faculty-interface">
      {store.faculty.isAuthenticated ? (
        <>
          <FacultyHomeHelper />
          <div className="faculty-interface-container">
            <div className="faculty-interface-content">
              <div className="card">
                <img
                  className="card-img-top"
                  src={store.faculty.faculty.faculty.avatar}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {store.faculty.faculty.faculty.name}
                  </h5>
                  <h5 className="card-title">
                    {store.faculty.faculty.faculty.registrationNumber}
                  </h5>
                </div>
              </div>
            </div>
            <div className="tasks-section">
              <TodoTasks />
            </div>
          </div>
        </>
      ) : (
        history.push("/")
      )}
    </section>
  );
};

export default FacultyInterface;
