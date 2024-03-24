import React, { useState } from 'react'
import { useFormik } from 'formik'
import{addEmp} from '../helpers/adminHelpers'
import toast,{Toaster} from 'react-hot-toast'

import { useNavigate } from 'react-router-dom'

function AddEmployee() {
  
  const navigate =useNavigate()
  
    const validate = values => {
        const errors = {}
      if(!values.name){
        errors.name = toast.error('name is required')
      }
      else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.name)){
        errors.name = toast.error("invalid name address")
    }
  
      else if(!values.site){
        errors.site =toast.error('site is required')
      }
      else if(!values.password){
        errors.password = toast.error('password is required')
      }
      return errors
      }
    const formik = useFormik({
        initialValues: {
         name:'',
         site:'',
         password:'',
        },
        validate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
      values.site = values.site.toUpperCase();

          console.log(values, 'namma values');
          let details = addEmp(values)
          toast.promise(details, {
            loading: 'adding...',
           success:<b>added</b>,
            error: <b>failed to add </b>
          })
          details.then((data) => {
            console.log(data,'ddld');
           if(data){
            navigate('/employees')
           }
          })
        }
      })
  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div >


          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
    <Toaster position='top-center' reverseOrder={false} ></Toaster>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label className="sr-only" >Contract No</label>
                <input
                  name='name'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="userName or email"
                  type="text"
                  id=""

                />

              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" >Mobile</label>
                  <input
                    name='site'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.site}
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Site"
                    type="text"
                    id=""
                  />
                </div>

                <div>
                  <label className="sr-only" >Building</label>
                  <input
                    name='password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="password"
                    type="tel"
                    id=""
                  />
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddEmployee