import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMarks } from "../../redux/action/studentAction";
import HomeHelper from "../../Components/HomeHelper";
import { useHistory } from "react-router-dom";
import "../../Style/StudentGrades.css";

const StudentTestPerformance = () => {
  const store = useSelector((store) => store);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMarks());
  }, []);

  return (
    <section className="grades-section">
      {store.student.isAuthenticated ? (
        <>
          <HomeHelper />
          
          <div className="grades-container">
          <div className="obs-text">
              <h2>
                <span>OBS:</span> Os campos que estiverem vazios, é por conta da
                nota ainda não ser lançada.
              </h2>
            </div>
            {store.student.allMarks.CycleTest1 && (
              <div className="grades-content">
                <div className="infos">
                  <h3>Português</h3>
                  <div className="note">
                                <p>Nota:</p>
                            </div>
                  {store.student.allMarks.CycleTest1.length !== 0 ? (
                    <>
                      <div className="table">
                        {store.student.allMarks.CycleTest1.map((res, index) => (
                          <div key={index} className="semester">
                            <table>
                              <tr>
                                <th>{index + 1} Bimestre:</th>
                              </tr>
                              <tr>
                                <th></th>
                                <td>{res.marks}</td>
                              </tr>
                            </table>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {store.student.allMarks.CycleTest2 && (
              <div className="grades-content">
                <div className="infos">
                  <h3>Matemática</h3>
                  <div className="note">
                    <p>Nota:</p>
                  </div>
                  {store.student.allMarks.CycleTest2.length !== 0 ? (
                    <>
                      <div className="table">
                        {store.student.allMarks.CycleTest2.map((res, index) => (
                          <div key={index} className="semester">
                            <table>
                              <tr>
                              <th>{index + 1} Bimestre:</th>
                              </tr>
                              <tr>
                                <th></th>
                                <td>{res.marks}</td>
                              </tr>
                            </table>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {store.student.allMarks.CycleTest3 && (
              <div className="grades-content">
                <div className="infos">
                  <h3>Inglês</h3>
                  <div className="note">
                    <p>Nota:</p>
                  </div>
                  {store.student.allMarks.CycleTest3.length !== 0 ? (
                    <>
                      <div className="table">
                        {store.student.allMarks.CycleTest3.map((res, index) => (
                          <div key={index} className="semester">
                            <table>
                              <tr>
                              <th>{index + 1} Bimestre:</th>
                              </tr>
                              <tr>
                                <th></th>
                                <td>{res.marks}</td>
                              </tr>
                            </table>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {store.student.allMarks.CycleTest4 && (
              <div className="grades-content">
                <div className="infos">
                  <h3>Geografia</h3>
                  <div className="note">
                    <p>Nota:</p>
                  </div>
                  {store.student.allMarks.CycleTest4.length !== 0 ? (
                    <>
                      <div className="table">
                        {store.student.allMarks.CycleTest4.map((res, index) => (
                          <div key={index} className="semester">
                            <table>
                              <tr>
                              <th>{index + 1} Bimestre:</th>
                              </tr>
                              <tr>
                                <th></th>
                                <td>{res.marks}</td>
                              </tr>
                            </table>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {store.student.allMarks.CycleTest5 && (
              <div className="grades-content">
                <div className="infos">
                  <h3>Física</h3>
                  <div className="note">
                    <p>Nota:</p>
                  </div>
                  {store.student.allMarks.CycleTest5.length !== 0 ? (
                    <>
                      <div className="table">
                        {store.student.allMarks.CycleTest5.map((res, index) => (
                          <div key={index} className="semester">
                            <table>
                              <tr>
                              <th>{index + 1} Bimestre:</th>
                              </tr>
                              <tr>
                                <th></th>
                                <td>{res.marks}</td>
                              </tr>
                            </table>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {store.student.allMarks.CycleTest6 && (
              <div className="grades-content">
                <div className="infos">
                  <h3>Historia</h3>
                  <div className="note">
                    <p>Nota:</p>
                  </div>
                  {store.student.allMarks.CycleTest6.length !== 0 ? (
                    <>
                      <div className="table">
                        {store.student.allMarks.CycleTest6.map((res, index) => (
                          <div key={index} className="semester">
                            <table>
                              <tr>
                              <th>{index + 1} Bimestre:</th>
                              </tr>
                              <tr>
                                <th></th>
                                <td>{res.marks}</td>
                              </tr>
                            </table>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {store.student.allMarks.CycleTest7 && (
              <div className="grades-content">
                <div className="infos">
                  <h3>Sociologia</h3>
                  <div className="note">
                    <p>Nota:</p>
                  </div>
                  {store.student.allMarks.CycleTest7.length !== 0 ? (
                    <>
                      <div className="table">
                        {store.student.allMarks.CycleTest7.map((res, index) => (
                          <div key={index} className="semester">
                            <table>
                              <tr>
                              <th>{index + 1} Bimestre:</th>
                              </tr>
                              <tr>
                                <th></th>
                                <td>{res.marks}</td>
                              </tr>
                            </table>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {store.student.allMarks.CycleTest8 && (
              <div className="grades-content">
                <div className="infos">
                  <h3>Filosofia</h3>
                  <div className="note">
                    <p>Nota:</p>
                  </div>
                  {store.student.allMarks.CycleTest8.length !== 0 ? (
                    <>
                      <div className="table">
                        {store.student.allMarks.CycleTest8.map((res, index) => (
                          <div key={index} className="semester">
                            <table>
                              <tr>
                              <th>{index + 1} Bimestre:</th>
                              </tr>
                              <tr>
                                <th></th>
                                <td>{res.marks}</td>
                              </tr>
                            </table>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {store.student.allMarks.CycleTest9 && (
              <div className="grades-content">
                <div className="infos">
                  <h3>Biologia/ciências</h3>
                  <div className="note">
                    <p>Nota:</p>
                  </div>
                  {store.student.allMarks.CycleTest9.length !== 0 ? (
                    <>
                      <div className="table">
                        {store.student.allMarks.CycleTest9.map((res, index) => (
                          <div key={index} className="semester">
                            <table>
                              <tr>
                              <th>{index + 1} Bimestre:</th>
                              </tr>
                              <tr>
                                <th></th>
                                <td>{res.marks}</td>
                              </tr>
                            </table>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {store.student.allMarks.CycleTest10 && (
              <div className="grades-content">
                <div className="infos">
                  <h3>Química</h3>
                  <div className="note">
                    <p>Nota:</p>
                  </div>
                  {store.student.allMarks.CycleTest10.length !== 0 ? (
                    <>
                      <div className="table">
                        {store.student.allMarks.CycleTest10.map((res, index) => (
                          <div key={index} className="semester">
                            <table>
                              <tr>
                              <th>{index + 1} Bimestre:</th>
                              </tr>
                              <tr>
                                <th></th>
                                <td>{res.marks}</td>
                              </tr>
                            </table>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        history.push("/")
      )}
    </section>
  );
};

export default StudentTestPerformance;
