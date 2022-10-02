import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import HomeHelper from "../../Components/HomeHelper";
import "./StudentHome.css";
import Calendar from "react-calendar";

const Home = () => {
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
    {store.student.isAuthenticated ? (
      <>
        <HomeHelper />
        <div className="faculty-interface-container">
          <div className="faculty-interface-content">
          <div className="card">
          <img
                className="card-img-top"
                src={store.student.student.student.avatar}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">
                  {store.student.student.student.registrationNumber}
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

export default Home;
