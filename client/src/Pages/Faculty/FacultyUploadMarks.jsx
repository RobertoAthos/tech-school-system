import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import { fetchStudents, uploadMarks } from '../../redux/action/facultyAction'
import FacultyHomeHelper from '../../Components/FacultyHomeHelper'
import { useHistory } from 'react-router-dom'
import './UploadGrades.css'


const FacultyUploadMarks = () => {
    const store = useSelector((store) => store)
    const history = useHistory()
    const dispatch = useDispatch() 
    const [department, setDepartment] = useState("")
    const [year, setYear] = useState("")
    const [marks, setMarks] = useState([])
    const [section, setSection] = useState("")
    const [subjectCode, setSubjectCode] = useState("")
    const [totalMarks, setTotalMarks] = useState()
    const [exam ,setExam] = useState("")
    const [error, setError] = useState({})
    const [errorHelper, setErrorHelper] = useState({})
    const [semester, setSemester] = useState("")
   


    const handleInputChange = (value, _id) => {
    
        const newMarks = [...marks]
        let index = newMarks.findIndex(m => m._id === _id)
        if (index === -1) {
            newMarks.push({ _id, value })
        }
        else {
           newMarks[index].value = value
        }
        setMarks(newMarks)
    }

    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])

    useEffect(() => {
        if (store.errorHelper) {
            setErrorHelper(store.errorHelper)
        }
    }, [store.errorHelper])

    const formHandler = (e) => {
        e.preventDefault()
    
       dispatch(fetchStudents(department, year,  section))

    }



    const secondFormHandler = (e) => {
        e.preventDefault()
        dispatch(uploadMarks( subjectCode,exam, totalMarks, marks, department, section,semester
        ))
    }

    return (
        <section className='upload-grades-section'>
            {store.faculty.isAuthenticated ? <>
                <FacultyHomeHelper />
                {store.faculty.fetchedStudentsHelper && <div className="upload-grades-container ">
                    <div className="upload-grades-content">
                        <form noValidate onSubmit={formHandler}>
                            <div className="form-group">
                                <label htmlFor="branchId">Departamento</label>
                                <select onChange={(e) => setDepartment(e.target.value)} className={classnames("form-control",
                                    {
                                        'is-invalid': error.department

                                    })} id="bramchId">
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
                                    <option>Selecione</option>
                                    <option value="1">Maternal/jardin de infancia/alfabetiza????o</option>
                                        <option value="2">1?? ano ensino fundamental</option>
                                        <option value="3">2?? ano ensino fundamental</option>
                                        <option value="4">3?? ano ensino fundamental</option>
                                        <option value="5">4?? ano ensino fundamental</option>
                                        <option value="6">5?? ano ensino fundamental</option>
                                        <option value="7">6?? ano ensino fundamental</option>
                                        <option value="8">7?? ano ensino fundamental</option>
                                        <option value="9">8?? ano ensino fundamental</option>
                                        <option value="10">9?? ano ensino fundamental</option>
                                        <option value="11">1?? ano ensino m??dio</option>
                                        <option value="12">2?? ano ensino m??dio</option>
                                        <option value="13">3?? ano ensino m??dio</option>
                                </select>

                                {error.year && (<div classNameName="invalid-feedback">{error.year}</div>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="sectionId">Per??odo</label>
                                <select onChange={(e) => setSection(e.target.value)} className={classnames("form-control",
                                    {
                                        'is-invalid': error.section

                                    })} id="sectionId">
                                    <option>Selecione</option>
                                    <option value="MANH??">Manh??</option>
                                    <option value="TARDE">Tarde</option>
                                    <option value="NOITE">Noite</option>
                                </select>
                                {error.section && (<div classNameName="invalid-feedback">{error.section}</div>)}
                            </div>
                            <button type="submit" className="btn btn-primary">Procurar</button>
                        </form>
                    </div>
                </div>}


                {!store.faculty.fetchedStudentsHelper && 
                <div className="upload-grades-container-info ">
                    <div className="upload-grades-content-info">
                        <form onSubmit={secondFormHandler} className='info-grades'>
                            <div className="inputs-grades">
                            <div className="form-group">
                                <label htmlFor="subjectId">C??digo da Mat??ria</label>
                                <select onChange={(e) => setSubjectCode(e.target.value)} className={classnames("form-control",
                                    {
                                        'is-invalid': errorHelper.subjectCode

                                    })} id="subjectId">
                                    <option>Selecione</option>
                                    {
                                        store.faculty.allSubjectCodeList.map(subjectCodeName =>
                                            <option>{subjectCodeName}</option>
                                        )
                                    }
                                </select>
                                {errorHelper.subjectCode && (<div classNameName="invalid-feedback">{errorHelper.subjectCode}</div>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="examId">Mat??ria</label>
                                <select onChange={(e) => setExam(e.target.value)} value={exam} className={classnames("form-control",
                                    {
                                        'is-invalid': errorHelper.exam

                                    })} id="examId">
                                    <option>Selecione</option>
                                   {/*  <option value="CycleTest1">Trabalho</option>
                                    <option value="CycleTest2">Prova</option>
                                    <option value="CycleTest3">Trabalhos/Teste</option>
                                    <option value="CycleTest4">Simulado</option>
                                    <option value="CycleTest5">Atividades</option> */}
                                    <option value="CycleTest1">Portugu??s</option>
                                    <option value="CycleTest2">Matem??tica</option>
                                    <option value="CycleTest3">Ingl??s</option>
                                    <option value="CycleTest4">Geografia</option>
                                    <option value="CycleTest5">F??sica</option>
                                    <option value="CycleTest6">Historia</option>
                                    <option value="CycleTest7">Sociologia</option>
                                    <option value="CycleTest8">Filosofia</option>
                                    <option value="CycleTest9">Biologia/ci??ncias</option>
                                    <option value="CycleTest10">Qu??mica</option> 
                                </select>
                                {errorHelper.exam && (<div classNameName="invalid-feedback">{errorHelper.exam}</div>)}
                            </div>

                            <div className="form-group">
                                <label htmlFor="marksId">Valor</label>
                                <input type="number" className={classnames("form-control",
                                    {
                                        'is-invalid': errorHelper.totalMarks

                                    })} id="marksId"
                                    value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} />
                                {errorHelper.totalMarks && (<div classNameName="invalid-feedback">{errorHelper.totalMarks}</div>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="semesterId">Bimestre</label>
                                <select onChange={(e) => setSemester(e.target.value)} className={classnames("form-control",
                                    {
                                        'is-invalid': error.semester
                                    })} id="semesterId">
                                    <option>Selecione</option>
                                    <option value="1">1?? Bimestre</option>
                                    <option value="2">2?? Bimestre</option>
                                    <option value="3">3?? Bimestre</option>
                                    <option value="4">4?? Bimestre</option>
                                </select>
                                {error.semester && (<div classNameName="invalid-feedback">{error.semester}</div>)}
                            </div>
                            </div>
                            
                          <div className="student-grades">
                          <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Aluno</th>
                                        <th scope="col">Nota</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.faculty.fetchedStudents.map((obj, index) =>
                                            <tr key={index}>
                                                <td>{obj.name}</td>
                                                <td><div className="form-check">
                                                    <input required type="number" value={obj.marks} onChange={(e) => handleInputChange(e.target.value, obj._id)} id="defaultCheck1" />
                                                </div></td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <button type="submit" className="btn">Enviar</button>
                          </div>
                        </form>
                    </div>
                </div>
                }
            </> : (history.push('/'))}
            
        </section>
    )
}

export default FacultyUploadMarks
