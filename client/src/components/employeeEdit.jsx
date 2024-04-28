import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'

import { useParams, useNavigate, Link } from 'react-router-dom'

import { editList, getListbyId } from '../helpers/adminHelpers'



function EmployeeEdit() {

  console.log('ithe eeehtaa');
  const today = new Date().toISOString().split('T')[0];
  const navigate = useNavigate()
  const emp = sessionStorage.getItem('emp');
  if (!emp) {
    navigate('/emplogin')
  }
  const { id } = useParams()

  const [singleData, setSingleData] = useState([])
  console.log(singleData, 'namma data');
  const [contractNo, setcontractNo] = useState('')
  const [cleaner, setCleaner] = useState('')
  const [VAT, setVat] = useState('')
  const [site, setSite] = useState('')
  const [plateNo, setPlateNo] = useState('')
  const [renewalDate, setRenewalDate] = useState('')



  const [selectedValue, setSelectedValue] = useState('cash');
  const date = new Date(singleData?.renewalDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const formattedDate = `${day}-${month}-${year}`;
  console.log(formattedDate, 'ffff');
  useEffect(() => {

    getListbyId(id).then((singleData => {


      formik.setValues({
        contractNo: singleData.data.data.contractNo,
        cleaner: singleData.data.data.cleaner,
        VAT: singleData.data.data.VAT,
        site: singleData.data.data.site,
        plateNo: singleData.data.data.plateNo,
        renewalDate: formattedDate
      })
      setSingleData(singleData.data.data)
      setCleaner(singleData.data.data.cleaner)
      setcontractNo(singleData.data.data.contractNo)
      setVat(singleData.data.data.VAT)
      setSite(singleData.data.data.site)
      setPlateNo(singleData.data.data.plateNo)
      setRenewalDate(formattedDate)
    }))
  }, [])

  const Change = (event) => {
    setSelectedValue(event.target.value);


  };


  //calculating balance
  const calculateBalance = (e) => {

    const amountReceived = parseFloat(e.target.value) || 0;
    const amount = parseFloat(VAT) || 0;
    console.log(amountReceived, 'amountrecievd');
    console.log(amount, 'amout');
    const balance = amount - amountReceived;
    console.log(balance, 'balance');
    formik.setFieldValue('balance', balance.toFixed(2));
  };
  const validate = values => {

    const errors = {}
    if (!values.serialNo) {

      errors.serialNo = toast.error("serialNo is required")
    }
    else if (!values.serialNo.match(/^\d+/)) {
      errors.serialNo = toast.error('Enter a valid number')
    }
    //amount
    else if (!values.amountRecieved) {
      errors.amountRecieved = toast.error('amountRecieved is required')
    }
    else if (!values.amountRecieved.match(/^\d+/)) {
      errors.amountRecieved = toast.error('Enter amount')
    }
    //auth code

    else if (!values.authcode && values.paymentMethod === 'card') {
      errors.authcode = toast.error('Auth code cant be embpty')
    }
    //renewal date
    else if (!values.newDate) {
      errors.newDate = toast.error('provide renewal date')
    }
    // else if (!values.Payment){
    //   errors.Payment = toast.error('Invalid Payment methord')
    // }
   
    return errors
  }
  const formik = useFormik({
    initialValues: {
      contractNo,
      serialNo: '',
      VAT,
      renewalDate,
      amountRecieved: '',
      balance: '',
      cleaner,
      site,
      newDate: '',
      authCode: '',
      Payment: selectedValue
    },
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log('fjkjfkjf');
      console.log(values, 'formik values');
      const datas = { values, id }
      console.log(datas);
      let details = editList(datas)
      toast.promise(details, {
        loading: 'adding...',
        success: <b>successfully edited</b>,
        error: <b>failed to add </b>
      })
      details.then((data) => {
        console.log(data, 'data frontednd');
        if (data) {

          navigate('/employee')
        }
      })
    }
  })
  return (
    <div>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div >


            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <Toaster position='top-center' reverseOrder={false} ></Toaster>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>

                  <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Contract No</label>
                  <input
                    name='contractNo'
                    value={contractNo}
                    {...formik.getFieldProps('contractNo')}
                    className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                    placeholder="Contract No"
                    type="text"
                    id="name"
                    readOnly
                  />
                </div>

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
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Site</label>
                    <input
                      name='site'
                      value={site}

                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"

                      placeholder="site"
                      type="text"
                      readOnly

                    />
                  </div>


                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Plate No</label>
                    <input
                      name='plateNo'
                      value={plateNo}

                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"

                      placeholder="Plate no"
                      type="text"
                      readOnly

                    />
                  </div>

                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Renewal Date</label>
                    <input
                      name='renewalDate'
                      value={formattedDate}

                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"

                      placeholder=" Renewal Date"
                      type="text"
                      id="phone"
  readOnly

                    />
                  </div>
                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">New Date</label>
                    <input
                      name='newDate'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.newDate}
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"

                      placeholder=" New Date"
                      type="date"
                      min={today}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Payment</label>
                    <select
                      onChange={(e) => {
                        Change(e);
                        formik.handleChange(e)
                        console.log(e.target.value, 'payment');
                      }}

                      name="Payment"
                      type="text"
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"

                    >
                      <option value="select one">select one</option>

                      <option value="cash">Cash</option>
                      <option value="card">Card</option>
                    </select>

                  </div>
                  {
                    selectedValue === 'card' ?
                      <div>
                        <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Auth Code</label>
                        <input
                          name='authCode'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.authCode}
                          className="w-full rounded-lg border border-gray-500 p-3 text-sm"

                          placeholder="Auth Code "
                          type="text"
                          id="phone"
                        />
                      </div> : ""
                  }
                </div>


                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Amount Recieved</label>
                    <input
                      name="amountRecieved"
                      onChange={(e) => {

                        formik.handleChange(e);
                        calculateBalance(e);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.amountRecieved}
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"

                      placeholder="Amount Received"
                      type="text"
                      id="amount"
                    />
                  </div>
                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Balance</label>
                    <input
                      name="balance"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.balance}
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                      placeholder="Balance"
                      type="text"
                      id="balance"
                    />
                  </div>
                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Amount</label>
                    <input
                      name='amount'
                      value={VAT}

                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"

                      placeholder="Amount"
                      type="text"
                      id="email"
  readOnly

                    />
                  </div>

                  <div>
                    <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">Cleaner</label>
                    <input
                      name='cleaner'
                      value={cleaner}
                      onChange={(e) => { setCleaner(e.target.value) }}
                      className="w-full rounded-lg border border-gray-500 p-3 text-sm"

                      placeholder="Cleaner Name "
                      type="text"
                      id="phone"
  readOnly

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

export default EmployeeEdit