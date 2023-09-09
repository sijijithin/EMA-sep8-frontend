import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, FloatingLabel, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import Loadingspinner from '../components/Loadingspinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addUser } from '../services/allApis';
import { registerContext } from '../components/ContextShare';

function Add() {

  const {registerData,setRegisterData}=useContext(registerContext)
 const navigate= useNavigate()

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
    if (!fname || !lname || !email || !mobile || !gender || !location || !status || !profile) {
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
      data.append("profile", profile)

      const headers = {
        "Content-Type": "multipart/form-data"
      }

      // make a api call 
      const result = await addUser(data, headers)
      console.log(result);
      if(result.status===200){
        setNormalUserInputs({...normalUserInputs,
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: ""
        })
        setStatus("")
        setProfile("")
        setRegisterData(result.data)
        navigate("/")
      }
      else{
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
              <h1 className='text-center text-light'>Add New Employee Details</h1>
              <div className="mt-3 rounded shadow border p-2">
                <div className="image w-100 text-center mb-3">
                  <img style={{ width: '60px', height: "60px" }} className='rounded'
                    src={preview ? preview : "https://th.bing.com/th?id=OIP.zL-kcsk0MHOuocKqLkjbPQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"} alt="" />
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
                      />
                      <Form.Check // prettier-ignore
                        type={"radio"}
                        name="gender"
                        value={"Female"}
                        label={"Female"}
                        onChange={e => getandsetUserNormalInputs(e)}
                      />
                    </Form.Group>

                    <Form.Group className='mb-3 col-lg-6'>
                      <Form.Label> Select Employee Status</Form.Label>
                      <Select options={options} onChange={e => setStatus(e.value)} >
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

export default Add