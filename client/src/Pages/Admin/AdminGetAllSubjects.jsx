import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { adminGetAllSubject } from '../../redux/action/adminAction'
import AdminHomeHelper from '../../Components/AdminHomeHelper'
import classnames from 'classnames'
import '../../Style/AdminSubjects.css'
import Button from '../../Components/Button/Button'

const AdminGetAllSubjects = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const [department, setDepartment] = useState('')
    const [year, setYear] = useState('')
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()


    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(adminGetAllSubject({ department, year }))

    }
    useEffect(() => {
        if (store.admin.allSubject.length !== 0) {
            setIsLoading(false)
        }

    }, [store.admin.allSubject.length])
    return (
            <section className='all-subject-admin'>
                {store.admin.isAuthenticated ? <>
                    <AdminHomeHelper />
                    <div className="all-subject-container">
                        <div className="all-subject-content">
                                <form noValidate onSubmit={formHandler}>
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
                                        <option value="ensino médio">Ensino Médio</option>
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
                                                     <div className='loader-2'>Loading...</div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {!isLoading && <Button type='submit' className='btn' title='Procurar'/>}
                                   
                                </form>


                            </div>
                            <div className="subject-info">

                                {store.admin.allSubject.length !== 0 && <table className="table-border">
                                    <thead>
                                        <tr>
                                            <th scope="col">N°</th>                      
                                            <th scope="col">Matérias</th>  
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            store.admin.allSubject.map((res, index) =>
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{res.subjectName}</td>
                                                   
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>}

                            </div>
                        </div>
                </> : (history.push('/'))}
            </section>
            
    )
}

export default AdminGetAllSubjects
