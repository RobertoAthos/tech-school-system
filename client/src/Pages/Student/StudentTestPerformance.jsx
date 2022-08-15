import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMarks } from "../../redux/action/studentAction";
import HomeHelper from "../../Components/HomeHelper";
import { useHistory } from "react-router-dom";
import '../../Style/StudentGrades.css'

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
            {store.student.allMarks.CycleTest1 && (
              <div className="grades-content">
                <div className="infos">
                  {store.student.allMarks.CycleTest1.length !== 0 ? (
                    <>
                      
                      <h3>Português</h3>
                       <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Total Marks</th>
                            <th scope="col">Nota</th>
                          </tr>
                        </thead>
                        <tbody>
                          {store.student.allMarks.CycleTest1.map(
                            (res, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{res.totalMarks}</td>
                                <td>{res.marks}%</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {store.student.allMarks.CycleTest2 && (
              <div className="grades-content">
                <div className="infos">
                  {store.student.allMarks.CycleTest2.length !== 0 ? (
                    <>
                      <h3>Matemática</h3>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Matéria</th>
                            <th scope="col">Total Marks</th>
                            <th scope="col">Nota</th>
                          </tr>
                        </thead>
                        <tbody>
                          {store.student.allMarks.CycleTest2.map(
                            (res, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{res.subjectName}</td>
                                <td>{res.totalMarks}</td>
                                <td>{res.marks}%</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {store.student.allMarks.CycleTest3 && (
              <div  className="grades-content">
                <div className="infos">
                  {store.student.allMarks.CycleTest3.length !== 0 ? (
                    <>
                       <h3>Inglês</h3>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Matéria</th>
                            <th scope="col">Total Marks</th>
                            <th scope="col">Nota</th>
                          </tr>
                        </thead>
                        <tbody>
                          {store.student.allMarks.CycleTest3.map(
                            (res, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{res.subjectName}</td>
                                <td>{res.totalMarks}</td>
                                <td>{res.marks}%</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {store.student.allMarks.CycleTest4 && (
              <div className="grades-content">
                <div className="col-md-8 m-auto">
                  {store.student.allMarks.CycleTest4.length !== 0 ? (
                    <>
                      <h3>Geografia</h3>
                       <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Matéria</th>
                            <th scope="col">Total Marks</th>
                            <th scope="col">Nota</th>
                          </tr>
                        </thead>
                        <tbody>
                          {store.student.allMarks.CycleTest4.map(
                            (res, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{res.subjectName}</td>
                                <td>{res.totalMarks}</td>
                                <td>{res.marks}%</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {store.student.allMarks.CycleTest5 && (
              <div  className="grades-content">
                <div className="infos">
                  {store.student.allMarks.CycleTest5.length !== 0 ? (
                    <>
                        <h3>Física</h3>
                       <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Matéria</th>
                            <th scope="col">Total Marks</th>
                            <th scope="col">Nota</th>
                          </tr>
                        </thead>
                        <tbody>
                          {store.student.allMarks.CycleTest5.map(
                            (res, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{res.subjectName}</td>
                                <td>{res.totalMarks}</td>
                                <td>{res.mark}%</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {store.student.allMarks.CycleTest6 && (
              <div  className="grades-content">
                <div className="infos">
                  {store.student.allMarks.CycleTest6.length !== 0 ? (
                    <>
                        <h3>Historia</h3>
                       <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Matéria</th>
                            <th scope="col">Total Marks</th>
                            <th scope="col">Nota</th>
                          </tr>
                        </thead>
                        <tbody>
                          {store.student.allMarks.CycleTest6.map(
                            (res, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{res.subject.subjectName}</td>
                                <td>{res.totalMarks}</td>
                                <td>{res.marks}%</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </>
                  ) : null}
                </div>
              </div>
            )} 

            {store.student.allMarks.CycleTest7 && (
              <div  className="grades-content">
                <div className="infos">
                  {store.student.allMarks.CycleTest7.length !== 0 ? (
                    <>
                       <h3>Sociologia</h3>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Matéria</th>
                            <th scope="col">Total Marks</th>
                            <th scope="col">Nota</th>
                          </tr>
                        </thead>
                        <tbody>
                          {store.student.allMarks.CycleTest7.map(
                            (res, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{res.subject.subjectName}</td>
                                <td>{res.totalMarks}</td>
                                <td>{res.marks}%</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {store.student.allMarks.CycleTest8 && (
              <div  className="grades-content">
                <div className="infos">
                  {store.student.allMarks.CycleTest8.length !== 0 ? (
                    <>
                      <h3>Filosofia</h3>
                       <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Matéria</th>
                            <th scope="col">Total Marks</th>
                            <th scope="col">Nota</th>
                          </tr>
                        </thead>
                        <tbody>
                          {store.student.allMarks.CycleTest8.map(
                            (res, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{res.subject.subjectName}</td>
                                <td>{res.totalMarks}</td>
                                <td>{res.marks}%</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </>
                  ) : null}
                </div>
              </div>
            )} 

             {store.student.allMarks.CycleTest9 && (
              <div  className="grades-content">
                <div className="infos">
                  {store.student.allMarks.CycleTest2.length !== 0 ? (
                    <>
                        <h3>Biologia/ciências</h3>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Matéria</th>
                            <th scope="col">Total Marks</th>
                            <th scope="col">Nota</th>
                          </tr>
                        </thead>
                        <tbody>
                          {store.student.allMarks.CycleTest2.map(
                            (res, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{res.subject.subjectName}</td>
                                <td>{res.totalMarks}</td>
                                <td>{res.marks }%</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </>
                  ) : null}
                </div>
              </div>
            )}

          {store.student.allMarks.CycleTest10 && (
              <div className="grades-content">
                <div className="infos">
                  {store.student.allMarks.CycleTest2.length !== 0 ? (
                    <>
                       <h3>Química</h3>
                       <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Matéria</th>
                            <th scope="col">Total Marks</th>
                            <th scope="col">Nota</th>
                          </tr>
                        </thead>
                        <tbody>
                          {store.student.allMarks.CycleTest2.map(
                            (res, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{res.subject.subjectName}</td>
                                <td>{res.totalMarks}</td>
                                <td>{res.marks} %</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
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
