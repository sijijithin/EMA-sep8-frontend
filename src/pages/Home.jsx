import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hometable from '../components/Hometable'
import Loadingspinner from '../components/Loadingspinner'
import { deleteContext, registerContext,updateContext } from '../components/ContextShare'
import { Alert } from 'react-bootstrap'
import { allUsers, deleteUser } from '../services/allApis'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const { updateData, setUpdateData } = useContext(updateContext)
  const { registerData, setRegisterData } = useContext(registerContext)
  const [showspin, setshowspin] = useState(true)
  const [allUsersData, setAllUsersData] = useState([])
  const [search, setSearch] = useState("")
  const {deleteData, setDeleteData} =useContext(deleteContext)



  const getallEmployees = async () => {
    const response = await allUsers(search)
    if (response.status === 200) {
      setAllUsersData(response.data);
    }
    else {
      toast.error("Cannot Fetch Data !!!")
    }
  }

  const removeUser= async (id)=>{
const response =await deleteUser(id)
if(response.status===200){
getallEmployees()
setDeleteData(response.data)
}
else{
  toast.error(" Operation failed !!! Please try after somtime...")
}
  }
  useEffect(() => {
    getallEmployees()
    setTimeout(() => {
      setshowspin(false)
    }, 2000)
  }, [search]);

  return (
    <>
     {
       updateData && <Alert variant="primary" onClose={() => setUpdateData("")}  dismissible>
          {updateData.fname.toUpperCase()} Updated Successfully !!!...
        </Alert> 

      }
      {
        deleteData && <Alert variant="danger" onClose={() => setDeleteData("")}  dismissible>
          {deleteData.fname.toUpperCase()} Deleted Successfully !!!...
        </Alert> 

      }
      {
        registerData && <Alert variant="success" onClose={() => setRegisterData("")} dismissible>
          {registerData.fname.toUpperCase()} Registered Successfully !!!...
        </Alert>
      }


      {showspin ? (
        <Loadingspinner />

      ) : (
        <div className="container">
          <div className="search-all d-flex mt-3">
            <div className="search d-flex align-items-center mt-2">
              <span className='fw-bolder'> Search: </span>
              <input className='form-controls p-1 rounded' type='text' style={{ width: '400px' }}
                placeholder='Search by Employeename' onChange={e => setSearch(e.target.value)} />
            </div>
            <Link to={'/add'} className='btn btn-warning ms-auto fw-bolder fs-5 '> <i className='fa-solid fa-user-plus'></i> Add </Link>

          </div>
          <div className="table mt-5 ">
            <h1 className='mb-5'>
              List of Employess
            </h1>
            <Hometable displayData={allUsersData} removeUser ={removeUser} />
          </div>
        </div>

      )}

      <ToastContainer position="top-center" theme="light" />

    </>
  )
}

export default Home