'use client'

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const menuItems = [
  {
    name: 'Home',
    href: '/employee',
  },
  {
    name: 'Renewed List',
    href: '/empreniew',
  },
  {
    name: 'Add New List',
    href: '/newList',
  },
  {
    name: 'New List',
    href: '/showList',
  },
]

function EmpNav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const navigate = useNavigate()
    const emp =sessionStorage.getItem('emp');
           
           const logout=()=>{
            console.log('calling');
            sessionStorage.clear()
            navigate('/emplogin')
            
           }
  return (
     <div className="relative w-full bg-white border">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
      <div className="inline-flex items-center space-x-2">
       
        <span className="font-bold text-teal-600">Employ Portal</span>
      </div>
      <div className="hidden lg:block">
        <ul className="inline-flex space-x-8">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-sm font-semibold text-gray-800 hover:text-teal-900"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden lg:block">
        <button
        onClick={()=>{logout()}}
          type="button"
          className="rounded-md bg-teal-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
      Logout
        </button>
      </div>
      <div className="lg:hidden">
        <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
      </div>
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
          <div className="divide-y-2 divide-teal-500 rounded-lg bg-teal-500 shadow-lg ring-1 ring-teal-600 ring-opacity-5">
            <div className="px-5 pb-6 pt-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-2">
                 
                  
                  <span className="font-bold ">Employ Portal</span>
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-4">
                  {menuItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                    >
                      <span className="ml-3 text-base font-medium text-gray-900">
                        {item.name}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
              <button
              onClick={()=>{logout()}}
                type="button"
                className="mt-4 w-full rounded-md bg-teal-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
              Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  )
}

export default EmpNav