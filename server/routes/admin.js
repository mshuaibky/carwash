const express =require('express')
const router=express.Router()
const multer = require('multer');

//setting multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {addPendingList,getAllLists
    ,editList,
    getSingleData,
    getallRenewedList,
    downloadadminReneiwedData,
    exportFormData,
    loginAdmin,
    addEmployee,
    getEmployeesList,
    loginEmp,
    getEmpPendList,
    getSearchData,
    addNewList,
    getNewListData,
    downloadDataNewList,
    getAdminList,
    dwnldAdminList,
    newListDelete
} = require('../controller/adminController')

router.post('/pendingList',addPendingList)
router.get('/getPendingList',getAllLists)
router.get('/getListById:id',getSingleData)
router.post('/editList',editList)
router.get('/renewedList',getallRenewedList)
router.get('/admindownloadData',downloadadminReneiwedData)
router.post('/exportList',upload.single('excelFile'),exportFormData)
router.post('/loginAdmin',loginAdmin)
router.post('/addEmployees',addEmployee)
router.get('/getEmployees',getEmployeesList)
router.post('/empLogin',loginEmp)
router.get('/getEmplPendingList',getEmpPendList)
router.post('/searchTerm',getSearchData)
router.post('/newList',addNewList)
router.get('/newListData',getNewListData)
router.get('/downloadNewListData',downloadDataNewList)
router.get('/getadminNewList',getAdminList)
router.get('/dwnloadAdminNewList',dwnldAdminList)
router.get('/deleteNewList',newListDelete)
module.exports= router
