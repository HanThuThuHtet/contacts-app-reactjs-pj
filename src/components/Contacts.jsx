import React, { useEffect, useState } from 'react'
import axios from "axios";
import {AiFillDelete, AiFillEdit} from "react-icons/ai"
import { Link } from "react-router-dom"
import Swal from 'sweetalert2';

const Contacts = () => {
    const [contacts,setContacts] = useState([]);

    //sweet alert
    const swalWithButtons = Swal.mixin({
        customClass: {
          confirmButton: 'bg-green-600 text-white px-5 py-1 rounded shadow',
          cancelButton: 'bg-red-600 text-white px-5 py-1 rounded shadow mx-4'
        },
        buttonsStyling: false
      })

    const getContacts = async() => {
        const {data} = await axios.get('http://localhost:3000/contacts');
        setContacts(data);
    }
    useEffect(() => {
        getContacts();
    },[]);

    const apiDeleteContact = async(id) => {
       

        //sweet alert
        swalWithButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then(async(result) => {
            if (result.isConfirmed) {
              swalWithButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );
              const {data} = await axios.delete(`http://localhost:3000/contacts/${id}`);
              //console.log(data);
              getContacts();
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })
      }
    

  return (
    
    <>
        <Link to="/create">
        <button className='text-white bg-gray-800 px-4 py-2 rounded shadow-md inline-block mb-5 mt-4'>Create New Contact</button>
        </Link>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email Address
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                        Phone Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {contacts?.map((contact) => (
                    <tr key={contact.id} className="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        {contact.name}
                    </th>
                    <td className="px-6 py-4">
                        {contact.email}
                    </td>
                    <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                        {contact.phone}
                    </td>
                    <td className="px-6 py-4 flex justify-evenly">
                       <Link to={`/edit/${contact.id}`}>
                        <AiFillEdit className='text-2xl text-green-600 cursor-pointer mr-3' />
                       </Link>
                        <AiFillDelete onClick={() => apiDeleteContact(contact.id)} className='text-2xl text-red-600 cursor-pointer' />
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    </>

  );
};

export default Contacts;


//HTTP request method
// GET 
// POST 
// PATCH/PUT 
// DELETE