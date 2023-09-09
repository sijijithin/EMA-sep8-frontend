import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../services/baseurl';

function Hometable({ displayData ,removeUser }) {
    console.log(displayData);
    return (
        <>
            <Table striped bordered hover className='text-center' >
                <thead  >
                    <tr  >
                        <th  className='p-3' >#</th>
                        <th className='p-3' >Full Name</th>
                        <th className='p-3'>Email</th>
                        <th className='p-3'>Mobile</th>
                        <th className='p-3'>Status </th>
                        <th className='p-3'>Profile</th>
                        <th className='p-3'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
             displayData.length>0?displayData.map((item,index)=>(

          

                        <tr  >
                        <td>{index+1}</td>
                        <td>{item.fname} {item.lname}</td>
                        <td>{item.email}</td>
                        <td>{item.mobile}</td>
                        <td>
                            <span className={item.status==="Active"?"btn btn-success":"btn btn-danger"}>
                            {item.status} </span>
                       </td>
                        <td>
                            <img style={{ width: '60px', height: "60px" }} className='rounded'
                                src={`${BASE_URL}/Uploads/${item.profile}`} alt="profile" />
                        </td>
                        <td>
                            {/* view */}
                            <Link to={`/view/${item._id}`} > <i className="fa-solid fa-eye text-light fs-4"></i>   </Link>
                            {/* Edit */}
                            <Link to={`/edit/${item._id}`} > <i className="fa-solid fa-pen-to-square text-info fs-4"></i> </Link>

                            {/* delete */}
                            <span> <i onClick={()=>removeUser(item._id)} className="fa-solid fa-trash  text-danger ms-2 fs-4"></i> </span>

                        </td>

                    </tr>
                       )):
                       <tr className=' text-center text-danger mt-5 w-100 fs-3'>
                        Nothing to display !!!
                       </tr>
                       }
            </tbody>
        </Table >
        </>
    )
}

export default Hometable