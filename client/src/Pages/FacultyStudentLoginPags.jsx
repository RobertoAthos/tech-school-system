import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { facultyLogin } from '../redux/action/facultyAction'
import { studentLogin } from '../redux/action/studentAction'
import classnames from 'classnames'
import '../Style/FacultyStudentLogin.css'
import Bg from '../Style/Images/Saly-103d.svg'



const FacultyStudentLoginPags = () => {
    const store = useSelector((state) => state)
    const dispatch = useDispatch()
    const [facultyRegNum, setFacultyRegNum] = useState('')
    const [facultyPassword, setFacultyPassword] = useState('')
    const [studentRegNum, setStudentRegNum] = useState('')
    const [studentPassword, setStudentPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [errorsHelper, setErrorsHelper] = useState({})
    const [isFacultyLoading, setIsFacultyLoading] = useState(false)
    const [isStudentLoading, setIsStudentLoading] = useState(false)


    const history = useHistory()

    useEffect(() => {
        if (store.faculty.isAuthenticated) {
            history.push('/faculty')
        }
    }, [store.faculty.isAuthenticated])

    useEffect(() => {
        if (store.error) {
            setErrors(store.error)
        }
    }, [store.error])
    useEffect(() => {
        if (store.student.isAuthenticated) {
            history.push('/home')
        }
    }, [store.student.isAuthenticated])

    useEffect(() => {
        if (store.errorHelper) {
            setErrorsHelper(store.errorHelper)
        }
    }, [store.errorHelper])






    const facultyFormHandler = (e) => {
        e.preventDefault()
        let registrationNumber;
        let password;
        setIsFacultyLoading(true)
        dispatch(facultyLogin({ registrationNumber: facultyRegNum, password: facultyPassword }))
    }

    useEffect(() => {
        if (store.error || store.faculty.isAuthenticated) {
            setIsFacultyLoading(false)
        }
        else {
            setIsFacultyLoading(true)
        }
    }, [store.error, store.faculty.isAuthenticated])

    const studentFormHandler = (e) => {
        e.preventDefault()
        let registrationNumber;
        let password;
        setIsStudentLoading(true)
        dispatch(studentLogin({ registrationNumber: studentRegNum, password: studentPassword }))
    }

    useEffect(() => {
        if (store.errorHelper ||
            store.student.isAuthenticated) {
            setIsStudentLoading(false)
        }
        else {
            setIsStudentLoading(false)
        }

    }, [store.errorHelper, store.student.isAuthenticated])

    return (
        <section className="main-login-section">
            <div className="login-container">
                <div className="login-content">
                    <h1 className='title'>Tech School</h1>
                    <div className="box-wrap">
                          <div className="inputs-login-container">
                        <div className="card-box" style={{ backgroundColor: "white", borderRadius: "1.2rem", padding: "1rem 1rem 0rem 1rem" }}>
                                <h3 >Aluno</h3>
                                <p>Logar como aluno do colégio.</p>
                                <form noValidate onSubmit={studentFormHandler}>
                                    <div className="form-group">
                                        <input onChange={(e) => setStudentRegNum(e.target.value)} placeholder='Número de Registro' type="text" value={studentRegNum} className={classnames('form-control', {
                                            'is-invalid': errorsHelper.registrationNumber
                                        })}
                                            id="studentId" />
                                        {errorsHelper.registrationNumber && (
                                            <div className="invalid-feedback">{errorsHelper.registrationNumber}</div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <input onChange={(e) => setStudentPassword(e.target.value)} placeholder='Senha' value={studentPassword} className={classnames("form-control", {
                                            'is-invalid': errorsHelper.password
                                        })}
                                            type="password" id="passwordId" />
                                        {errorsHelper.password && (
                                            <div className="invalid-feedback">{errorsHelper.password}</div>
                                        )}
                                    </div>
                                    <div className="password-link"><Link className="text-center" to="/forgotPassword/student">Esqueci a Senha</Link></div>
                                    <div class="row justify-content-center">
                                        <div class="col-md-1">
                                            {
                                                isStudentLoading && <div class="spinner-border text-primary" role="status">
                                                    <span class="sr-only">Carregando...</span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    
                                    <div className="login-button">{!isStudentLoading && <button type="submit" className="btn-login">Login</button>}</div>

                                </form>
                                
                        </div>
                    </div>
                     <div className="inputs-login-container">
                        <div className="card-box" style={{ backgroundColor: "white", borderRadius: "1.2rem", padding: "1rem 1rem 0rem 1rem" }}>
                                <h3 >Professor(a)</h3>
                                <p>Logar como professor(a) do colégio.</p>
                                <form noValidate onSubmit={facultyFormHandler}>
                                    <div className="form-group">
                                        <input onChange={(e) => setFacultyRegNum(e.target.value)} placeholder='Número de Registro' type="text" value={facultyRegNum} className={classnames('form-control', {
                                            'is-invalid': errors.registrationNumber
                                        })}
                                            id="facRegId" />
                                        {errors.registrationNumber && (
                                            <div className="invalid-feedback">{errors.registrationNumber}</div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <input onChange={(e) => setFacultyPassword(e.target.value)} placeholder='Senha' value={facultyPassword} className={classnames("form-control", {
                                            'is-invalid': errors.password
                                        })}
                                            type="password" id="passwordFacId" />
                                        {errors.password && (
                                            <div className="invalid-feedback">{errors.password}</div>
                                        )}
                                    </div>
                                    <div className="password-link"><Link className="text-center" to="/forgotPassword/faculty">Esqueci a Senha</Link></div>
                                    <div class="row justify-content-center">
                                        <div class="col-md-1">
                                            {
                                                isFacultyLoading && <div class="spinner-border text-primary" role="status">
                                                    <span class="sr-only">Carregando...</span>
                                                </div>
                                            }
                                        </div>
                                    </div>

                                    <div className="login-button">{!isFacultyLoading&& <button type="submit" className="btn-login">Login</button>}</div>
                                </form>
                               
                            </div>
                    </div> 
                    </div>
                   
                </div>

                <div className="img-background">
                    <img src={Bg} alt="Cartoon de uma pessoa estudando" />
                </div>
            </div>
        </section>
    )
}

export default FacultyStudentLoginPags
