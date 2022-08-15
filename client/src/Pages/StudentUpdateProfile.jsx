import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../Style/StudentUpdate.css'
import { studentUpdate, studentLogout,newerChats, previousChats } from '../redux/action/studentAction'
import HomeHelper from '../Components/HomeHelper'
import { useHistory, withRouter } from 'react-router-dom'

const StudentUpdateProfile = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const history = useHistory()
    const [gender, setGender] = useState('')
    const [studentMobileNumber, setContactNumber] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [fatherMobileNumber, setFatherContactNumber] = useState('')
    const [aadharCard, setAadharCard] = useState('')
    const [error, setError] = useState({})
    const [avatar, setAvatar] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const imagehandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setAvatar(img)
        }
    }

    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])

    const formHandler = async(e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("gender", gender)
        formData.append("studentMobileNumber", studentMobileNumber)
        formData.append("fatherName", fatherName)
        formData.append("fatherMobileNumber", fatherMobileNumber)
        formData.append("aadharCard", aadharCard)
        formData.append("avatar", avatar)
        formData.append("email", store.student.student.student.email)
        dispatch(studentUpdate(formData, history))
        setModal(true)
        alert("Kindly login again to see updates")
        dispatch(studentLogout())
        history.push('/')
    }
        return (
            <section className='student-update-section'>
                {store.student.isAuthenticated ? <>
                    <HomeHelper />
                        <div className="student-update-container">
                            <div className="student-update-content">
                                <form onSubmit={formHandler}>
                                    <div className="form-group">
                                        <label htmlFor="inputId">Foto de Perfil</label>
                                        <input required className="form-control" type="file" accept=".jpg,.png,.jpeg" id="inputId" onChange={imagehandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="genderId">Gênero</label>
                                        <select onChange={(e) => setGender(e.target.value)} className="form-control" id="genderId">
                                            <option>Selecione</option>
                                            <option value="Male">Masculino</option>
                                            <option value="Female">Feminino</option>
                                            <option value="Other">Outro...</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="numberId">Número de Contato</label>
                                        <input onChange={(e) => setContactNumber(e.target.value)} required type="number" className="form-control" id="numberId" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fatherId">Nome do pai/mãe</label>
                                        <input onChange={(e) => setFatherName(e.target.value)} type="text" className="form-control" id="fatherId" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fathercnId">Número do pai/mãe</label>
                                        <input onChange={(e) => setFatherContactNumber(e.target.value)} type="number" className="form-control" id="fathercnId" />
                                    </div>
                                    <button type="submit" className="btn">Atualizar</button>
                                </form>
                            </div>
                        </div>
                </> : (history.push('/'))}
                
            </section>
        )
    }

export default withRouter(StudentUpdateProfile)
