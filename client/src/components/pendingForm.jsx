import React, { useState } from 'react'
import { useFormik } from 'formik'
import toast,{Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { pendinglist } from '../helpers/adminHelpers'


function PendingForm() {
 
  const [selectedValue, setSelectedValue] = useState('');
  const Change = (event) => {
    console.log(event.target.value, 'value in fn');
    setSelectedValue(event.target.value);

    console.log(selectedValue, 'selected value');
  };
  const validate = values => {
    const errors = {}

  }
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      contractNo: '',
      mobile: '',
      building: '',
      plateNo: '',
      flatNo: '',
      lotNo: '',
      VAT: '',
      renewalDate: '',
      status: selectedValue,
      pem: '',
      cleaner: '',
      site: ''
    },
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values, 'namma values');
      let details = pendinglist(values)
      toast.promise(details, {
        loading: 'adding...',
        success: <b>successfully added</b>,
        error: <b>failed to add </b>
      })
      details.then((data) => {
        console.log(data,'data frontednd');
        if (data) {
          navigate('/')
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
                  name='contractNo'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contractNo}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Contract No"
                  type="text"
                  id=""

                />

              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" >Mobile</label>
                  <input
                    name='mobile'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile}
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Mobile"
                    type="text"
                    id=""
                  />
                </div>

                <div>
                  <label className="sr-only" >Building</label>
                  <input
                    name='building'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.building}
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Building"
                    type="tel"
                    id=""
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" >Plate No</label>
                  <input
                    name='plateNo'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.plateNo}
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Plate No"
                    type="text"
                    id=""
                  />
                </div>

                <div>
                  <label className="sr-only" >Flat no</label>
                  <input
                    name='flatNo'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.flatNo}
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Flat no"
                    type="text"
                    id=""
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" >Lot No</label>
                  <input
                    name='lotNo'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lotNo}
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Lot no"
                    type="text"
                    id=""
                  />
                </div>

                <div>
                  <label className="sr-only" > VAT</label>
                  <input
                    name='VAT'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.VAT}
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Rate of monthly Contract "
                    type="text"
                    id=""
                  />
                </div>
              </div>


              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" >Renewal Date</label>
                  <input
                    name='renewalDate'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.renewalDate}
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Renewal Date"
                    type="date"
                    id=""
                  />
                </div>

                <div>
                  <label className="sr-only"> Contract Status</label>
                  <select
                    onChange={(e) => {
                      Change(e);
                      formik.handleChange(e)
                    }}
                    onBlur={formik.handleBlur}
                    value={selectedValue}
                    name="status"
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  >
                    <option value="renewed">Renewed</option>
                    <option value="pending renewal">Pending Renewal</option>
                  </select>
                 
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" >PEM</label>
                  <input
                    name='pem'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pem}
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="PEM"
                    type="text"
                    id=""
                  />
                </div>

                <div>
                  <label className="sr-only"> Cleaner Now</label>
                  <input
                    name='cleaner'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cleaner}
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Cleaner Now"
                    type="text"
                    id=""
                  />
                </div>
                <div>
                  <label className="sr-only" > site</label>
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

export default PendingForm