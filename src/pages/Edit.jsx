import React, { useEffect, useState, useContext } from 'react'
import { Button, FloatingLabel, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import Loadingspinner from '../components/Loadingspinner'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editUser, allUsers } from '../services/allApis';
import {  updateContext } from '../components/ContextShare';
import { BASE_URL } from '../services/baseurl';

function Edit() {

  const { updateData, setUpdateData } = useContext(updateContext)
  const navigate = useNavigate()

  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },

  ]

  const [showspin, setshowspin] = useState(true)

  const [normalUserInputs, setNormalUserInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""
  })

  const [status, setStatus] = useState("")
  const [profile, setProfile] = useState("")
  const [preview, setPreview] = useState("")

  const getandsetUserNormalInputs = (e) => {
    const { name, value } = e.target
    setNormalUserInputs({ ...normalUserInputs, [name]: value })
  }
  console.log(normalUserInputs);
  console.log(status);
  console.log(profile);
  const { id } = useParams()
  const [exsistingImg, setExsistingImg] = useState("")


  const getUser = async () => {
    const { data } = await allUsers("")
    let exsistingUser = data.find(item => item._id === id)
    console.log(exsistingUser);
    setNormalUserInputs(exsistingUser)
    setStatus(exsistingUser.status)
    setExsistingImg(exsistingUser.profile)
  }

  useEffect(() => {
    getUser()
  }, [id])


  useEffect(() => {
    if (profile) {
      setPreview(URL.createObjectURL(profile))
    }
    setTimeout(() => {
      setshowspin(false)
    }, 2000)
  }, [profile])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { fname, lname, email, mobile, gender, location } = normalUserInputs
    if (!fname || !lname || !email || !mobile || !gender || !location || !status) {
      toast.warning("Please fill the form completely !!! ")

    }
    else {
      //  toast.success( " Form filled completely")
      const data = new FormData()
      data.append("fname", fname)
      data.append("lname", lname)
      data.append("email", email)
      data.append("mobile", mobile)
      data.append("gender", gender)
      data.append("status", status)
      data.append("location", location)
     profile?data.append("profile", profile):data.append("profile",exsistingImg)

     if(profile){
      var headers = {
        "Content-Type": "multipart/form-data"
      }
     }
     else{
      var headers=""
     }
      

      // make a api call 
      const result = await editUser(id,data, headers)
      console.log(result);
      if (result.status === 200) {
        setUpdateData(result.data)
        navigate('/')
      }
      else {
        toast.error("Request Failed")
      }
    }
  }

  return (


    <>
      {
        showspin ? (
          <Loadingspinner />
        ) :
          (

            <div className='container'>
              <h1 className='text-center text-light'>Update Employee Details</h1>
              <div className="mt-3 rounded shadow border p-2">
                <div className="image w-100 text-center mb-3">
                  <img style={{ width: '60px', height: "60px" }} className='rounded'
                    src={preview ? preview :`${BASE_URL}/Uploads/${exsistingImg }` } alt="" />
                </div>

                <Form>
                  <Row>
                    <FloatingLabel
                      controlId="floatingInputfname"
                      label="First Name"
                      className="mb-3 col-lg-6">
                      <Form.Control type="text" placeholder="First Name" name="fname" value={normalUserInputs.fname}
                        onChange={e => getandsetUserNormalInputs(e)} />

                    </FloatingLabel>

                    <FloatingLabel
                      controlId="floatingInputLname"
                      label="last Name"
                      className="mb-3 col-lg-6" >
                      <Form.Control type="text" placeholder="Last Name" name="lname" value={normalUserInputs.lname}
                        onChange={e => getandsetUserNormalInputs(e)} />
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="floatingInputmail"
                      label="Email"
                      className="mb-3 col-lg-6" >
                      <Form.Control type="email" placeholder="Email" name="email" value={normalUserInputs.email}
                        onChange={e => getandsetUserNormalInputs(e)} />
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="floatingInputMobile"
                      label="Mobile"
                      className="mb-3 col-lg-6" >
                      <Form.Control type="text" placeholder="Mobile" name="mobile" value={normalUserInputs.mobile}
                        onChange={e => getandsetUserNormalInputs(e)} />
                    </FloatingLabel>

                    <Form.Group className='mb-3 col-lg-6'>
                      <Form.Label> Select Gender</Form.Label>
                      <Form.Check
                        type={"radio"}
                        name="gender"
                        value={"Male"}
                        label={"Male"}
                        onChange={e => getandsetUserNormalInputs(e)}
                        checked={normalUserInputs.gender==="Male"?true:false}
                      />
                      <Form.Check // prettier-ignore
                        type={"radio"}
                        name="gender"
                        value={"Female"}
                        label={"Female"}
                        onChange={e => getandsetUserNormalInputs(e)}
                        checked={normalUserInputs. 
                          gender==="Female"?true:false}
                      />
                    </Form.Group>

                    <Form.Group className='mb-3 col-lg-6'>
                      <Form.Label> Select Employee Status</Form.Label>
                      <Select placeholder={status} options={options} onChange={e => setStatus(e.value)} >
                      </Select>
                    </Form.Group>

                    <Form.Group className=' mb-3 col-lg-6'>
                      <Form.Label>
                        Choose Profile Picture
                      </Form.Label>
                      <Form.Control type="file" name="user_profile" onChange={e => setProfile(e.target.files[0])} >

                      </Form.Control>
                    </Form.Group>

                    <Form.Group className=' mb-3 col-lg-6'>
                      <Form.Label> Employee Location </Form.Label>
                      <Form.Control type="text" placeholder="Location" name="location" value={normalUserInputs.location}
                        onChange={e => getandsetUserNormalInputs(e)} />
                    </Form.Group>
                    <Button type="submit" variant="primary" onClick={e => handleSubmit(e)} >Submit</Button>
                  </Row>
                </Form>
              </div>

            </div>)}
      <ToastContainer position="top-center" theme="light" />
    </>
  )
}


export default Edit