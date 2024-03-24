
import './App.css'
import {BrowserRouter,Routes,Route,}from 'react-router-dom'


import PendingPage from './pages/pendingListPage'
import PendingFormPage from './pages/pendingFormPage'
import EditListPage from './pages/editListPage'
import RenewedListPage from './pages/renewedListPage'
import AdminLogin from './components/adminLogin'
import EmployeePage from './pages/emplooyeePage'
import EditEmployeePage from './pages/addEmployeePage'
import EmpLoginPage from './pages/empLoginPage'
import EmpHomePage from './pages/empHomePage'
import EmployeeEdit from './components/employeeEdit'
import EmpRenewListPage from './pages/empRenewPage'
import AddNewListPage from './pages/addNewListPage'
import ShowNewListPage from './pages/shoNewListPage'
import AdminnewListPage from './pages/adminNewListPage'
//employee 


function App() {

  return (
    <>
     <BrowserRouter>
<Routes>
  <Route path='/' element={<PendingPage/>} />
  <Route path='/pendingForm' element={<PendingFormPage/>} />
  <Route path='/edit/:id' element={<EditListPage/>} />
  <Route path='/renewedPage' element={<RenewedListPage/>} />
  <Route path='/adminLogin' element={<AdminLogin/>} />
  <Route path='/employees' element={<EmployeePage/>} />
  <Route path='/editEmployee' element={<EditEmployeePage/>} />
  <Route path='/emplogin' element={<EmpLoginPage/>} />
  <Route path='/employee' element={<EmpHomePage/>} />
  <Route path='/employeeedit/:id' element={<EmployeeEdit/>} />

  <Route path='/empreniew' element={<EmpRenewListPage/>} />
  <Route path='/newList' element={<AddNewListPage/>} />
  <Route path='/showList' element={<ShowNewListPage/>} />
  <Route path='/adminNewList' element={<AdminnewListPage/>} />









</Routes>
     </BrowserRouter>
    </>
  )
}

export default App
