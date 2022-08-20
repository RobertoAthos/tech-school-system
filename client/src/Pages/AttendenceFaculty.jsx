import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import {fetchStudents,markAttendence } from '../redux/action/facultyAction'
import FacultyHomeHelper from '../Components/FacultyHomeHelper'
import { useHistory,Link } from 'react-router-dom'
import '../Style/Attendence.css'
import {fetchAttendence} from '../redux/action/facultyAction'

const AttendenceFaculty = () => {
    const store = useSelector((store) => store)
    const history = useHistory()
    const dispatch = useDispatch()
    const [department, setDepartment] = useState("")
    const [year, setYear] = useState("")
    const [section, setSection] = useState("")
    const [subjectCode, setSubjectCode] = useState("")
    const [checkedValue, setCheckedValue] = useState([])
    const [error, setError] = useState({})
    const [flag, setFlag] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)
    const [dob, setDob] = useState('')
    const [presence,setPresence]= useState('')

    useEffect(() => {
        if (store.error || !store.faculty.fetchedStudentsHelper) {
            setIsLoading(false)
        }
        
    }, [store.error, store.faculty.fetchedStudentsHelper])

    const secondFormHandler = (e) => {
        e.preventDefault()
        setIsLoading2(true)
        dispatch(markAttendence(checkedValue, subjectCode, department, year, section,dob,presence))
        setCheckedValue([])
        
    }

    useEffect(() => {
        if (store.faculty.fetchedStudentsHelper) {
            setIsLoading2(false)
        }
        
    },[store.faculty.fetchedStudentsHelper])

    const handleInputChange = (e) => {
        const tempCheck = checkedValue
        let index
        if (e.target.checked)
        {
            tempCheck.push(e.target.value)
            setPresence('Presente')
        }
        else {
            index = tempCheck.indexOf(e.target.value)
            tempCheck.splice(index,1)
        }
        setCheckedValue(tempCheck)
    }

    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])

    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(fetchStudents(department, year, section))
       
    }


    useEffect(() => {
        dispatch(fetchAttendence())  
      },[])

    return (
        <section className='attendence-faculty-section'>
          
            {store.faculty.isAuthenticated ? <>
                <FacultyHomeHelper />
                {store.faculty.fetchedStudentsHelper && <div className="attendence-faculty-container ">
                    <div className="attendence-faculty-content">
                        <form noValidate onSubmit={formHandler}>
                            <div className="form-group">
                                <label htmlFor="branchId">Departamento</label>
                                <select onChange={(e) => setDepartment(e.target.value)} className={classnames("form-control",
                                    {
                                        'is-invalid': error.department

                                    })} id="branchId">
                                    <option>Selecione</option>
                                    <option value={store.faculty.faculty.faculty.department}>{store.faculty.faculty.faculty.department}</option>
                                </select>
                                {error.department && (<div classNameName="invalid-feedback">{error.department}</div>)}
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

                                {error.year && (<div classNameName="invalid-feedback">{error.year}</div>)}
                            </div>
                           
                            <div className="form-group">
                                <label htmlFor="sectionId">Período</label>
                                <select onChange={(e) => setSection(e.target.value)} className={classnames("form-control",
                                    {
                                        'is-invalid': error.section

                                    })} id="sectionId">
                                    <option>Select</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                    <option value="F">F</option>
                                </select>
                                {error.section && (<div classNameName="invalid-feedback">{error.section}</div>)}
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
                            {!isLoading && <button type="submit" className="btn btn-info  ">Procurar</button>}
                        </form>
                    </div>
                </div>}


                {!store.faculty.fetchedStudentsHelper && <div className="attendence-infos">
                    <div className="attendence-infos-container">
                        <form onSubmit={secondFormHandler}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Aluno</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.faculty.fetchedStudents.map((obj, index) =>
                                            <tr key={index}>
                                                <div className="check-box-input">
                                                    <input className="form-check-input" type="checkbox" value={obj.name} onChange={handleInputChange} id="defaultCheck1" />
                                                </div>
                                                <td>{obj.name}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <div class="form-group">
                                            <label htmlFor="dobId">Data da chamada</label>
                                            <input onChange={(e) => setDob(e.target.value)} type="date" className={classnames("form-control",
                                                {
                                                    'is-invalid': error.dob
                                                })} id="dobId" />
                                            {error.dob && (<div className="invalid-feedback">{error.dob}</div>)}
                                        </div>
                                        <table className="table border">
                              {/*   <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Aluno</th>
                                        <th scope="col">Data</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.faculty.attendence.map((res, index) =>
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{res.student}</td>
                                                <td>{res.dob}</td>
                                                
                                            </tr>
                                        )
                                    }
                                </tbody> */}
                            </table>
                            <div class="row justify-content-center">
                                <div class="col-md-1">
                                    {
                                        isLoading2 && <div class="spinner-border text-primary" role="status">
                                            <span class="sr-only">Carregando...</span>
                                        </div>
                                    }
                                </div>
                               
                            </div>
                            {!isLoading2 && <button type="submit" className="btn btn-info ml-1  ">Enviar presenças</button>}
                        </form>
                    </div>
                </div>
                }</> : (history.push('/'))}
            
        </section>
    )
}

export default AttendenceFaculty
