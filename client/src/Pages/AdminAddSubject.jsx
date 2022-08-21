import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { adminAddSubject } from '../redux/action/adminAction'
import AdminHomeHelper from '../Components/AdminHomeHelper'
import '../Style/AdminAddSubject.css'
import Button from '../Components/Button/Button'

const AdminAddSubject = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const history = useHistory()
    const [subjectName, setSubjectName] = useState('')
    const [subjectCode, setSubjectCode] = useState('')
    const [totalLectures, setTotalLectures] = useState('')
    const [department, setDepartment] = useState('')
    const [year, setYear] = useState('')
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
        dispatch(adminAddSubject({
            subjectCode,
            subjectName,
            totalLectures,
            department,
            year
        }))
    }

    useEffect(() => {
        if (store.admin.adminAddSubjectFlag) {
            setError({})
        }
    }, [store.admin.adminAddSubjectFlag])

    useEffect(() => {
        if (store.error || store.admin.adminAddSubjectFlag) {
            setIsLoading(false)
        }
    }, [store.error, store.admin.adminAddSubjectFlag])

    return (
        <section className='add-subject-admin'>
            {store.admin.isAuthenticated ? <> <AdminHomeHelper />
                <div className="add-subject-container">
                        <div className="add-subject-content">
                                <form noValidate onSubmit={formHandler}>
                                    <div className="form-group">
                                        <label htmlFor="snameId">Nome da Matéria</label>
                                        <input onChange={(e) => setSubjectName(e.target.value)} type="text" className={classnames("form-control",
                                            {
                                                'is-invalid': error.subjectName
                                            })} id="snameId" />
                                        {error.subjectName && (<div className="invalid-feedback">{error.subjectName}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="scodeId">Código da Matéria</label>
                                        <input onChange={(e) => setSubjectCode(e.target.value)} type="text" className={classnames("form-control",
                                            {
                                                'is-invalid': error.subjectCode
                                            })} id="scodeId" />
                                        {error.subjectCode && (<div className="invalid-feedback">{error.subjectCode}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="totalLectures">Total de Bimestres</label>
                                        <input onChange={(e) => setTotalLectures(e.target.value)} type="number" className={classnames("form-control",
                                            {
                                                'is-invalid': error.totalLectures
                                            })} id="totalLectures" />
                                        {error.totalLectures && (<div className="invalid-feedback">{error.totalLectures}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="departmentId">Departamento</label>
                                        <select onChange={(e) => setDepartment(e.target.value)} className={classnames("form-control",
                                            {
                                                'is-invalid': error.department
                                            })} id="departmentId">
                                            <option>Selecione</option>
                                            <option value="maternal/jardin de infancia/alfabetização">Maternal/jardin de infancia/alfabetização</option>
                                        <option value="fundamental 1">Fundamental 1</option>
                                        <option value="fundamental 2">Fundamental 2</option>
                                        <option value="ensino Médio">Ensino Médio</option>
                                        </select>
                                        {error.department && (<div className="invalid-feedback">{error.department}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="yearId">Ano</label>
                                        <select onChange={(e) => setYear(e.target.value)} className={classnames("form-control",
                                            {
                                                'is-invalid': error.year

                                            })} id="yearId">
                                            <option>Selecione</option>
                                            <option value="1">Maternal/jardin de infancia/alfabetização</option>
                                        <option value="2">1° ano ensino fundamental</option>
                                        <option value="3">2° ano ensino fundamental</option>
                                        <option value="4">3° ano ensino fundamental</option>
                                        <option value="5">4° ano ensino fundamental</option>
                                        <option value="6">5° ano ensino fundamental</option>
                                        <option value="7">6° ano ensino fundamental</option>
                                        <option value="8">7° ano ensino fundamental</option>
                                        <option value="9">8° ano ensino fundamental</option>
                                        <option value="10">9° ano ensino fundamental</option>
                                        <option value="11">1° ano ensino médio</option>
                                        <option value="12">2° ano ensino médio</option>
                                        <option value="13">3° ano ensino médio</option>
                                        </select>

                                        {error.year && (<div className="invalid-feedback">{error.year}</div>)}
                                    </div>
                                    <div class="row justify-content-center">
                                        <div class="col-md-1">
                                            {
                                                isLoading && <div class="spinner-border text-primary" role="status">
                                                    <div class="loader-2">Cerregando...</div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {!isLoading && <Button type='submit' className='btn' title='Adicionar Matéria'/>}
                                   
                                    
                                </form>
                            </div>
                    </div>
                </>: (history.push('/'))}
        </section>
    )
}

export default AdminAddSubject
