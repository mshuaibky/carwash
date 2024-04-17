import React,{useState,useEffect} from 'react'
import{getrenewedList,downloadData} from '../helpers/adminHelpers'
import { Link } from 'react-router-dom'

function EmpRenewedPage() {
    const [renewedList,setRenewedData]= useState([])

    useEffect(()=>{
      getrenewedList().then((data)=>{
        console.log(data,'renewed data');
        setRenewedData(data?.data?.data)
      })
    },[])
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div>
        <h2 className="text-lg font-semibold">Renewed List</h2>
       
      </div>
      {/* <div>
            <Link 
            onClick={downloadData}
              type="button"
              className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
             Download
            </Link>
          </div> */}
    </div>
    <div className="mt-6 flex flex-col">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="divide-x divide-gray-200">
                <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    Sl No
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    <span>contractNo</span>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    <span>Serial No</span>
                  </th>
                  <th
                    scope="col"
                    className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    Plate No
                  </th>
                  <th
                    scope="col"
                    className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                  Auth Code
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    Renewal Date
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    Amount Recieved
                  </th> <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    Balance
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    Cleaner
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    Site
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    Payment Methord
                  </th>
                </tr>
              </thead>
              {
                renewedList?.map((data,key)=>{
                    const date = new Date(data.newDate);

                      const year = date.getFullYear();
                      const month = (date.getMonth() + 1).toString().padStart(2, '0');
                      const day = date.getDate().toString().padStart(2, '0');
                      
                      const formattedDate = `${day}-${month}-${year}`;
                    return(
                    
              <tbody className="divide-y divide-gray-200 bg-white">
                
                  <tr className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex items-center">
                        
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{key+1}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-12 py-4">
                      <div className="text-sm text-gray-900">{data.contractNo}</div>
                    
                    </td>
                    <td className="whitespace-nowrap px-12 py-4">
                      <div className="text-sm text-gray-900">{data.serialNo}</div>
                    
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                      {data.plateNo}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                      {data.authCode}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                      {formattedDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                      {data.amount}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                      {data.amountRecieved}
                    </td> <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                      {data.balance}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                      {data.cleaner}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                  
                    {data.site}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                  
                    {data.paymentMethod}
                    </td>
                  </tr>
             
              </tbody>
                  
                  )
                })
              }
            </table>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-4 w-full border-gray-300">
      <div className="mt-2 flex items-center justify-end">
        {/* <div className="space-x-2">
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    </div>
  </section>
  )
}

export default EmpRenewedPage