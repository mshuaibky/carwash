import React, { useEffect, useState } from 'react'
import{useNavigate,Link} from 'react-router-dom'
import{getAdminNewList,downloadAdminNewListData,deleteNewList} from '../helpers/adminHelpers'

function AdminNewList() {
  console.log('hai');
    const [adminList,setAdminList] = useState([])
    useEffect(()=>{
      getAdminNewList().then((Data)=>{
        setAdminList(Data?.data)
        console.log(Data,'frontEnd');
      })
    },[])
  return (
    <div>
         <div>
       <section className="mx-auto w-full max-w-7xl px-4 py-4">
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div>
        <h2 className="text-lg font-semibold">Admin New List</h2>
       
      </div>
      <div>
            <Link 
            onClick={downloadAdminNewListData}
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
             Download
            </Link>
          </div>
          <div>
            <Link 
            onClick={deleteNewList}
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
             Delete
            </Link>
          </div>
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
                    <span>Name</span>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    <span>Mobile </span>
                  </th>
                  <th
                    scope="col"
                    className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                   Building
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                   Plate No
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    Flat
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                Lot No
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                   Payment Method
                  </th> 
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                    Auth code
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
                  Renewal Date
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                  >
                  Schedule
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
                  date
                  </th>
                </tr>
              </thead>
              {
                adminList?.map((data,key)=>{
                    console.log(data,',,,,');
                    // const date = new Date(data.newDate);

                    //   const year = date.getFullYear();
                    //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    //   const day = date.getDate().toString().padStart(2, '0');
                      
                    //   const formattedDate = `${day}-${month}-${year}`;
                    return(
                    
                    <tbody className="divide-y divide-gray-200 bg-white">
  <tr className="divide-x divide-gray-200">
    <td className="whitespace-nowrap px-4 py-4">
      <div className="flex items-center">
        
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{data?.serialNo}</div>
        </div>
      </div>
    </td>
    <td className="whitespace-nowrap px-12 py-4">
      <div className="text-sm text-gray-900">{data?.name}</div>
    
    </td>
    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
      {data?.mobile}
    </td>
    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
      {data?.building}
    </td>
    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
      {data?.plateNo}
    </td>
    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
      {data?.flat}
    </td>
    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
      {data?.lotnumber}
    </td>
    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
      {data?.paymentMethod}
    </td>
    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
      {data?.authcode}
    </td>
    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
      {data?.amount}
    </td>
    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
      {data?.renewaldate}
    </td>
    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
      {data?.schedule}
    </td>
    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
     {data?.cleaner}
    </td>
    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
      {data?.site}
    </td>
    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
      {data?.date}
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
        <div className="space-x-2">
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
        </div>
      </div>
    </div>
  </section>  
    </div>
    </div>
  )
}

export default AdminNewList