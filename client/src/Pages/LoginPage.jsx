import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { adminLogin } from '../redux/action/adminAction'
import classnames from 'classnames'
import '../Style/LoginPage.css'
import '../Style/Loader.css'


const LoginPage = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch( )
    const [registrationNumber, setRegistrationNumber] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()
    useEffect(() => {
        if (store.admin.isAuthenticated) {
            history.push('/admin')
        }
    }, [store.admin.isAuthenticated])
    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])

    const fromHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(adminLogin({registrationNumber, password}))
       
    }

    useEffect(() => {
        if (store.error ||
            store.admin.isAuthenticated) {
            setIsLoading(false)
        }
        
        else {
            setIsLoading(true)
        }
    }, [store.error, store.admin.isAuthenticated])

    
    return (
        <section className="admin-login-section" layoutId="underline">
            <div className="admin-login-container">
                    <div className="admin-login-content">
                            <h1>Admin Login</h1>
                            <form noValidate onSubmit={fromHandler}>
                                <div className="form-group">
                                    <input onChange={(e) => setRegistrationNumber(e.target.value)} placeholder='Número de Registro' type="text" value={registrationNumber} className={classnames("form-control form-control-lg",
                                        {'is-invalid' : error.registrationNumber
                                        
                                        })} id="emailId" />
                                    {error.registrationNumber && (<div className="invalid-feedback">{error.registrationNumber}</div>)}
                                </div>
                                <div className="form-group">
                                    <input onChange={(e) => setPassword(e.target.value)} placeholder='Senha' value={password} className={classnames("form-control form-control-lg", {
                                        "is-invalid": error.password
                                    })} type="password" id="passwordId" />
                                    {error.password && (<div className="invalid-feedback">{error.password}</div>)}
                                </div>
                                <div>
                                    <div class="col-md-1">
                                        {
                                            isLoading && <div class="spinner-border text-primary" role="status">
                                                <div class="loader">Carregando...</div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                {!isLoading && <button type="submit" className="btn-login">Login</button>}
                            </form>
                        </div>
                    </div>
        </section>
    )
}

export default LoginPage
