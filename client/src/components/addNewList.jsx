import React, { useState } from 'react'
import { useFormik } from 'formik'
import { newList } from '../helpers/adminHelpers'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function AddNewList() {
  const todayDate = new Date().toISOString().split('T')[0]
  const Navigate = useNavigate()
  const [selectedValue, setSelectedValue] = useState('cash');

  const validate = values => {

    const errors = {};

    if (!values.serialNo) {
      errors.serialNo = toast.error("serialNo is required")
    }
    else if (!values.serialNo.match(/^\d+/)) {
      errors.serialNo = toast.error('Enter a valid number')
    }
    else if (!values.name) {
      errors.name = toast.error('name is required')
    }
    else if (!values.mobile) {
      errors.mobile = toast.error('Mobile is required')
    }
    else if (!values.mobile.match(/^\d+/)) {
      errors.mobile = toast.error('Enter a valid number')
    }

    //building
    else if (!values.building) {
      errors.building = toast.error('building No is required')
    }
   
    //plate no
    else if (!values.plateNo) {
      errors.plateNo = toast.error('Plate no is required')
    }
    
    //flat
    else if (!values.flat.match(/^\d+/)) {
      errors.flat = toast.error('Flat no is required')
    }

   
    //lot number
    else if (!values.lotnumber) {
      errors.lotnumber = toast.error('lotnumber is required')
    }
   

    //amount
    else if (!values.amount) {
      errors.amount = toast.error('Amount is required')
    }
    else if (!values.amount.match(/^\d+/)) {
      errors.amount = toast.error('Enter amount')
    }
//auth code

else if(!values.authcode&&values.paymentMethod==='card'){
  errors.authcode = toast.error('Auth code cant be embpty')
}
//renewal date
else if(!values.renewaldate){
  errors.renewaldate = toast.error('provide renewal date')
}
    return errors
  }

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  console.log(formattedDate,'formatted date');
  const Change = (event) => {
    setSelectedValue(event.target.value);


  };
  const formik = useFormik({
    initialValues: {
      serialNo: '',
      name: '',
      mobile: '',
      building: '',
      plateNo: '',
      flat: '',
      lotnumber: '',
      paymentMethod: selectedValue,
      authcode: '',
      amount: '',
      renewaldate: '',
      schedule: '',
      cleaner: '',
      site: '',
      date: formattedDate,
      instanceid: ''
    },
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values.site = values.site.toUpperCase();

      const selectedDays = document.querySelectorAll('input[name="day"]:checked');
      const daysOfWeek = Array.from(selectedDays).map(checkbox => checkbox.value);
      const updatedValues = {
        ...values,
        schedule: daysOfWeek.join(','),
      };
    
      console.log(updatedValues, 'namma values');
      let details = await newList(updatedValues)
      console.log(details, 'namma details');
      if(details.data.success){
        toast.success('saved succesfully')
        setTimeout(() => {
          
          Navigate('/showList')
        }, 700);
      }else{
        toast.error('something went wrong')
      }
    
   

    }
  })
  return (
    <div>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div >


            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <Toaster position='top-center' reverseOrder={false} ></Toaster>
              <form className="space-y-4" onSubmit={formik.handleSubmit} >
                {/* <div>
             
            <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Sl No</label>
            <input
  name='slno'
  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.slno}
 
  className="w-full rounded-lg border border-gray-500 p-3 text-sm"
  placeholder="Sl No"
  type="text"
  id="slno"
/>
            </div> */}

                <div>

                  <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Serial NO</label>
                  <input
                    name='serialNo'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.serialNo}

                    className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                    placeholder="serialNo"
                    type="text"
                    id="serialNo"
                  />
                </div>


                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                      name='name'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"

                      placeholder="Name"
                      type="text"
                    />
                  </div>


                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Mobile</label>
                    <input
                      name='mobile'

                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.mobile}
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"

                      placeholder="mobile"
                      type="text"

                    />
                  </div>

                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Building</label>
                    <input
                      name='building'

                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.building}
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"

                      placeholder=" Building"
                      type="text"
                      id="phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Plate No</label>
                    <input
                      name='plateNo'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.plateNo}
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"

                      placeholder=" PlateNo"
                      type="text"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Flat</label>
                    <input
                      name='flat'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.flat}
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"

                      placeholder=" Mobile "
                      type="text"
                      id="phone"
                    />
                  </div>

                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Lot Number</label>
                    <input
                      name='lotnumber'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lotnumber}
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"

                      placeholder="Lot Number "
                      type="text"
                      id="phone"
                    />
                  </div>

                </div>


                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Payment Method</label>
                    <select
                      onChange={(e) => {
                        Change(e);
                        formik.handleChange(e)
                      }}

                      name="paymentMethod"
                      type="text"
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"

                    >
                      <option value="select one">select one</option>

                      <option value="cash">Cash</option>
                      <option value="card">Card</option>
                    </select>

                  </div>
                  {
                    selectedValue==='card'?
                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Auth Code</label>
                    <input
                      name="authcode"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.authcode}
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                      placeholder="Auth code"
                      type="text"
                      id="balance"
                    />
                  </div>:""
                  }
                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Amount</label>
                    <input
                      name='amount'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.amount}
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"

                      placeholder="Amount"
                      type="text"
                      id="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Renewal Date</label>
                    <input
                      name='renewaldate'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.renewaldate}
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                      placeholder="Cleaner Name "
                      type="date"
                      min={todayDate}
                      id="phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Schedule</label>
     <label className='m-3' ><input  type="checkbox" name="day" value="Mon"/> Mon</label>
    <label className='m-3'><input type="checkbox" name="day" value="Tue"/> Tue</label>
    <label className='m-3'><input type="checkbox" name="day" value="Wed"/> Wedn</label>
    <label className='m-3'><input type="checkbox" name="day" value="Thu"/> Thu</label>
    <label className='m-3'><input type="checkbox" name="day" value="Fri"/> Fri</label>
    <label className='m-3'><input type="checkbox" name="day" value="Sat"/> Sat</label>
    <label className='m-3'><input type="checkbox" name="day" value="Sun "/> Sun</label>
                  </div>
                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Cleaner</label>
                    <input
                      name='cleaner'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.cleaner}
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"

                      placeholder="Cleaner Name "
                      type="text"
                      id="phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Site</label>
                    <input
                      name='site'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.site}
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm "
                
                      placeholder="Cleaner Name "
                      type="text"
                      id="phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2"> Date</label>
                    <input disabled
                      name='date'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.date}
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"

                      placeholder="Cleaner Name "
                      type="text"
                      id="phone"
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
    </div>
  )
}

export default AddNewList