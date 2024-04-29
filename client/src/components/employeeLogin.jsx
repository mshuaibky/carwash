import React from 'react'
import { useFormik } from 'formik'
import { employeeLogin } from '../helpers/adminHelpers'

import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'


function EmployeeLogin() {
    const navigate = useNavigate()
    const validate = values => {
        let errors = {}
      
        if(!values.username){
          errors.username = toast.error('name is required')
        }
        
        else if(!values.password){
          errors.password = toast.error('password is required')
        }
        return errors
      }
      const formik = useFormik({
        initialValues: {
          username: '',
          password: ""
        },
        validate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            console.log(values,'namma values');
          let details = employeeLogin(values)
          toast.promise(details, {
            loading: 'loading...',
            success: <b>created succesfully</b>,
            error: <b>username or password not correct</b>
          })
          details.then((data) => {
            console.log(data,'data of admin');
            if(data){
                sessionStorage.clear()
                sessionStorage.setItem('emp',data?.data?.data )
                sessionStorage.setItem('site',data?.data?.site );
                
                navigate('/employee')
            }
            
          }).catch((error) => {
            console.log(error, 'namma error');
          })
        }
      })
  return (
  
<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
<Toaster position='top-center' reverseOrder={false}></Toaster>
 
  <div className="mx-auto max-w-lg">
    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Login</h1>

   

    <form onSubmit={formik.handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
      <p className="text-center text-lg font-medium">Sign in to your account</p>

      <div>
        <label  className="sr-only">User Name</label>

        <div className="relative">
          <input
           name="username"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.username}
            type="text"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter email"
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="password" className="sr-only">Password</label>

        <div className="relative">
          <input
           name="password"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.password}
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter password"
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
        
      </div>
      

      <button
        type="submit"
        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
      >
        Sign in
      </button>

      <Link to={'/adminLogin'}
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            >
            
              LOG IN AS ADMIN
            </Link>
    </form>
  </div>
</div>
  )
}

export default EmployeeLogin