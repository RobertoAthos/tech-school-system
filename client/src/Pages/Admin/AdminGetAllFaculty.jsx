import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { adminGetAllFaculty } from '../../redux/action/adminAction'
import AdminHomeHelper from '../../Components/AdminHomeHelper'
import classnames from 'classnames'
import Button from '../../Components/Button/Button'
import '../../Style/AdminFaculty.css'

const AdminGetAllFaculty = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const [department, setDepartment] = useState('')
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()


    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(adminGetAllFaculty({ department }))
    }

    useEffect(() => {
        if (store.admin.allFaculty.length !== 0) {
            setIsLoading(false)
        }
        
    }, [store.admin.allFaculty.length])

    
    return (
        <section className='all-faculty-admin'>
            {store.admin.isAuthenticated ? <>
                <AdminHomeHelper />
                <div className="all-faculty-container">
                    <div className="all-faculty-content">
                            <form form-inline noValidate onSubmit={formHandler}>
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
                                                <option value="fundamental 1 e 2">Fundamental 1 e 2</option>
                                                <option value="fundamental 1,2 e ensino médio">Fundamental 1,2 e ensino médio</option>
                                                <option value="ensino Médio">Ensino Médio</option>
                                                <option value="outro...">Outro...</option>
                                    </select>
                                    {error.department && (<div className="invalid-feedback">{error.department}</div>)}
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-md-1">
                                        {
                                            isLoading && <div class="spinner-border text-primary" role="status">
                                                <span class="sr-only">Carregando...</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                                {!isLoading && <Button type='submit' className='btn' title='Procurar'/>}
                            </form>


                        </div>
                        <div className="faculty-info">
                            
                            {store.admin.allFaculty.length !== 0 && <table className="table-border">
                                <thead>
                                    <tr>
                                        <th scope="col">N°</th>
                                        <th scope="col">Número de Registro</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Número de Contato</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.admin.allFaculty.map((res, index) =>
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{res.registrationNumber}</td>
                                                <td>{res.name}</td>
                                                <td>{res.email}</td>
                                                <td>{res.facultyMobileNumber}</td>
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
