import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { adminGetAllStudent } from '../../redux/action/adminAction'
import AdminHomeHelper from '../../Components/AdminHomeHelper'
import classnames from 'classnames'
import '../../Style/AdminStudent.css'
import Button from '../../Components/Button/Button'

const AdminGetAllFaculty = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const [department, setDepartment] = useState('')
    const [year, setYear] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    

    const [error, setError] = useState({})
    const history = useHistory()


    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(adminGetAllStudent({ department, year }))
    }

    useEffect(() => {
        if (store.admin.allStudent.length !== 0) {
            setIsLoading(false)
        }

    }, [store.admin.allStudent.length])
    return (
        <section className='all-student-admin'>
            {store.admin.isAuthenticated ? <>
                <AdminHomeHelper />
                <div className="all-student-container">
                    <div className="all-student-content">
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
                                        <option>Select</option>
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
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                                {!isLoading && <Button type='submit' className='btn' title='Procurar'/>}
                              
                               
                            </form>


                        </div>
                        <div className="student-info">

                            {store.admin.allStudent.length !== 0 && <table className="table-border">
                                <thead>
                                    <tr>
                                        <td scope="col">N°</td>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Período</th>
                                        <th scope="col">Número do aluno</th>
                                        <th scope="col">Número do Pai/Mãe</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.admin.allStudent.map((res, index) =>
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{res.name}</td>
                                                <td>{res.email}</td>
                                                <td>{res.section}</td>
                                                <td>{res.studentMobileNumber}</td>
                                                <td>{res.fatherMobileNumber}</td>
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

export default AdminGetAllFaculty
