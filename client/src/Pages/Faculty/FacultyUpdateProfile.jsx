import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, withRouter } from 'react-router-dom'
import { facultyUpdate, facultyLogout} from '../../redux/action/facultyAction'
import FacultyHomeHelper from '../../Components/FacultyHomeHelper'
import '../../Style/FacultyUpdate.css'
import Button from '../../Components/Button/Button'


const FacultyUpdateProfile = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const history = useHistory()
    const [gender, setGender] = useState('')
    const [facultyMobileNumber, setContactNumber] = useState('')
    const [aadharCard, setAadharCard] = useState('')
    const [avatar, setAvatar] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const imagehandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setAvatar(img)
        }
    }


    const formHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("gender", gender)
        formData.append("facultyMobileNumber", facultyMobileNumber)
        formData.append("aadharCard", aadharCard)
        formData.append("avatar", avatar)
        formData.append("email", store.faculty.faculty.faculty.email)
        setIsLoading(true)
        dispatch(facultyUpdate(formData, history))
        alert("Kindly login again to see updates")
        dispatch(facultyLogout())
        history.push('/')
    }

    useEffect(() => {
        if (store.faculty.updateProfileFlag) {
            setIsLoading(false)
        }
    }, [store.faculty.updateProfileFlag])
    return (
        <section className='faculty-update-section'>
            {store.faculty.isAuthenticated ? <>
                <FacultyHomeHelper />
                <div className="faculty-update-container">
                    <div className="faculty-update-content ">
                            <form onSubmit={formHandler}>
                                <div className="form-group">
                                    <label htmlFor="inputId">Foto de Perfil</label>
                                    <input required className="form-control" type="file" accept=".jpg,.png,.jpeg" id="inputId" onChange={imagehandler}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="genderId">Gênero</label>
                                    <select onChange={(e) => setGender(e.target.value)} className="form-control" id="genderId">
                                        <option>Selecione</option>
                                        <option value="Male">Masculinoe</option>
                                        <option value="Female">Feminino</option>
                                        <option value="Other">Outro...</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="numberId">Número de Contato</label>
                                    <input onChange={(e) => setContactNumber(e.target.value)} required type="number" className="form-control" id="numberId" />
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
                                <div className="center-btn">{!isLoading && <Button type='submit' className='btn' title='Atualizar'/>}</div>
                            </form>
                        </div>
                    </div>
                </> : (history.push('/'))}
            
        </section>
    )
}

export default withRouter(FacultyUpdateProfile)
