import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { adminAddFaculty } from '../redux/action/adminAction'
import AdminHomeHelper from '../Components/AdminHomeHelper'
import '../Style/AdminAddFaculty.css'
import Button from '../Components/Button/Button'


const AdminAddFaculty = () => {
    const store = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [department, setDepartment] = useState('')
    const [designation, setDesignation] = useState('')
    const [facultyMobileNUmber, setFacultyMobileNumber] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [aadharCard, setAadharCard] = useState('')
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        if (store.error) {
           setError(store.error)
       }
    }, [store.error])
    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(adminAddFaculty({
            name,
            email,
            designation,
            facultyMobileNUmber,
            department,
            aadharCard,
            gender,
            dob: dob.split("-").reverse().join("-")}))
    }

    useEffect(() => {
        if (store.admin.adminAddFacultyFlag) {
            setError({})
        }
    }, [store.admin.adminAddFacultyFlag])

    useEffect(() => {
        if (store.error || store.admin.adminAddFacultyFlag) {
            setIsLoading(false)
        }
        else {
            setIsLoading(true)
        }
    },[store.error,store.admin.adminAddFacultyFlag])
    return (
       
        <section className='add-faculty-section'>
            {store.admin.isAuthenticated ? (<><AdminHomeHelper/>
                <div className="add-faculty-content">
                    <div className="inputs-container ">
                           <div className="bg-content">
                           <form noValidate onSubmit={formHandler}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="nameId">Nome</label>
                                            <input onChange={(e) => setName(e.target.value)} type="text" className={classnames("form-control",
                                                {
                                                    'is-invalid': error.name
                                                })} id="nameId" />
                                            {error.name && (<div className="invalid-feedback">{error.name}</div>)}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="emailId">Email</label>
                                            <input onChange={(e) => setEmail(e.target.value)} type="email" className={classnames("form-control",
                                                {
                                                    'is-invalid': error.email
                                                })} id="emailId" />
                                            {error.email && (<div className="invalid-feedback">{error.email}</div>)}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="designationId">Função</label>
                                            <select onChange={(e) => setDesignation(e.target.value)} className={classnames("form-control",
                                                {
                                                    'is-invalid': error.designation
                                                })} id="designationId">
                                                <option>Select</option>
                                                <option value="Assistant Professor">Professor Assitente/Substituto</option>
                                                <option value="Senior Professer">Professor principal</option>
                                            </select>
                                            {error.designation && (<div className="invalid-feedback">{error.designation}</div>)}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="departmentId">Departamento</label>
                                            <select onChange={(e) => setDepartment(e.target.value)} className={classnames("form-control",
                                                {
                                                    'is-invalid': error.department
                                                })} id="departmentId">
                                                <option>Select</option>
                                                <option value="maternal/jardin de infancia/alfabetização">Maternal/jardin de infancia/alfabetização</option>
                                        <option value="fundamental 1">Fundamental 1</option>
                                        <option value="fundamental 2">Fundamental 2</option>
                                        <option value="ensino Médio">Ensino Médio</option>
                                            </select>
                                            {error.department && (<div className="invalid-feedback">{error.department}</div>)}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="dobId">Data de Entrada</label>
                                            <input onChange={(e) => setDob(e.target.value)} type="date" className={classnames("form-control",
                                                {
                                                    'is-invalid': error.dob
                                                })} id="dobId" />
                                            {error.dob && (<div className="invalid-feedback">{error.dob}</div>)}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="genderId">Gênero</label>
                                            <select onChange={(e) => setGender(e.target.value)} className="form-control" id="genderId">
                                                <option>Select</option>
                                                <option value="Male">Masculino</option>
                                                <option value="Female">Feminino</option>
                                                <option value="Other">Outro...</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="numberId">Número de Contato</label>
                                            <input onChange={(e) => setFacultyMobileNumber(e.target.value)} type="number" className="form-control" id="numberId" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-md-1">
                                        {
                                            isLoading && <div class="spinner-border text-primary" role="status">
                                                <span class="sr-only">Cerregando...</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="center-btn">{!isLoading && <Button title='Adicionar Professor(a) +' type='submit'/>}</div>
                            </form>
                           </div>
                        </div>
                </div></>):(history.push('/'))}
            
        </section>



    )
}

export default AdminAddFaculty
