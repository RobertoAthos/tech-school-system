import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import FacultyHomeHelper from "../../Components/FacultyHomeHelper";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import "./FacultyInterface.css";

const FacultyInterface = () => {
  const history = useHistory();
  const store = useSelector((store) => store);
  const dispatch = useDispatch();

  const {
    isLoadingPost,
    successPost,
    errorPost,
    isLoading,
    events,
    error,
    isLoadingDelete,
  } = useSelector((state) => state.events);

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
                    {store.faculty.faculty.faculty.registrationNumber}
                  </h5>
                </div>
              </div>
            </div>
            <div className="features-container">
              <div className="events-container">
                <div className="events">
                  <h2>Eventos da escola</h2>
                  {isLoading && <h2>Carregando...</h2>}

                  {events.length === 0 ? (
                    <h3>Nenhum evento encontrado</h3>
                  ) : (
                    events.events.map((event, index) => (
                      <div key={index} className="tasks-card">
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="calendar">
                      <Calendar/>
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

export default FacultyInterface;
