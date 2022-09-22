import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import classnames from "classnames";
import FacultyHomeHelper from "../../Components/FacultyHomeHelper";
import { facultyUpdatePassword } from "../../redux/action/facultyAction";
import "./FacultyPassword.css";

const FacultyUpdatePassword = () => {
  const store = useSelector((store) => store);
  const history = useHistory();
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    if (store.error) {
      setError(store.error);
    }
  }, [store.error]);
  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(
      facultyUpdatePassword({
        registrationNumber: store.faculty.faculty.faculty.registrationNumber,
        oldPassword,
        newPassword,
        confirmNewPassword,
      })
    );
  };
  useEffect(() => {}, [store.faculty]);
  return (
    <section className="update-password-faculty">
      {store.faculty.isAuthenticated ? (
        <>
          <FacultyHomeHelper />
          <div className="update-password-container">
            <div className="update-password-content">
                <form noValidate onSubmit={formHandler}>
                  <div className="form-group">
                    <label htmlFor="emailId">Senha Antiga</label>
                    <input
                      onChange={(e) => setOldPassword(e.target.value)}
                      type="password"
                      value={oldPassword}
                      className={classnames("form-control", {
                        "is-invalid": error.oldPassword,
                      })}
                      id="emailId"
                    />
                    {error.oldPassword && (
                      <div classNameName="invalid-feedback">
                        {error.oldPassword}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordId">Nova Senha</label>
                    <input
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                      className={classnames("form-control", {
                        "is-invalid": error.newPassword,
                      })}
                      type="password"
                      id="passwordId"
                    />
                    {error.newPassword && (
                      <div classNameName="invalid-feedback">
                        {error.newPassword}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordCId">Confirmar Nova senha</label>
                    <input
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      value={confirmNewPassword}
                      className={classnames("form-control", {
                        "is-invalid": error.confirmNewPassword,
                      })}
                      type="password"
                      id="passwordCId"
                    />
                    {error.confirmNewPassword && (
                      <div classNameName="invalid-feedback">
                        {error.confirmNewPassword}
                      </div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-info btn-block ">
                   Atualizar Senha
                  </button>
                </form>
              </div>
            </div>
        </>
      ) : (
        history.push("/")
      )}
    </section>
  );
};

export default FacultyUpdatePassword;
