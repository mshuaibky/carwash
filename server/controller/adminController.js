const PendingList= require('../model/pendingListModel')
const RenewedList = require('../model/renewedList')
const ExcelJS = require('exceljs');
const ExcelJS2 = require('exceljs')
const Admin = require('../model/admin')
const Employee = require('../model/employee')
const bcrypt = require('bcrypt')
const userName =require('../config/adminDetail')
const newPassword= require('../config/adminDetail');
const NewList = require('../model/newList');


exports.addPendingList=async(req,res)=>{
    try {
const {contractNo,mobile,building,plateNo,flatNo,VAT,renewalDate,
    status,pem,cleaner,site,lotNo
}= req.body

const dateString = renewalDate;
const newDate = new Date(dateString);

const addlist = new PendingList ({
    contractNo,
    mobile,
    building,
    plateNo,
    flatNo,
    VAT,
    renewalDate:newDate,
    status,
    pem,
    site,
    cleaner,
    lotNo
})
addlist.save().then((result)=>{
    if(result){
        
        res.status(200).send({ success: "added" });
    }else{
        res.status(500).send({error:error.message})
    }
 })

    } catch (error) {
        console.log(error,'nmaa error');
    }
}
const ITEMS_PER_PAGE = 10;
exports.getAllLists = async (req, res) => {
    console.log( req.query,'calling', 'back');
    try {
      const currentPage = req.query.page || 1;
      const pageSize = req.query.pageSize || ITEMS_PER_PAGE;
  console.log(currentPage,'..currnt');
      const skipItems = (currentPage - 1) * pageSize;
  
      const allPendingList = await PendingList.find({})
        .skip(skipItems)
        .limit(pageSize);
  
      const totalItems = await PendingList.countDocuments({});
  console.log(totalItems,'totalitems');
      if (allPendingList) {
        res.status(200).send({ data: allPendingList, totalItems });
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error, 'namma error');
      res.send(error.message);
    }
  };

exports.editList = async(req,res)=>{
    try {
       const {id}=req.body
      console.log(req.body,'namma body');
       const {Payment,contractNo,cleaner,VAT,site,plateNo,renewalDate,newDate,balance,amountRecieved,authCode,serialNo}= req.body.values
    
       const dateString = newDate;
const updatedDate = new Date(dateString);
        const updateList = await PendingList.updateOne({_id:id},
            {
                $set:{
              renewalDate:updatedDate,
              status:'renewed'
                }
            })
     
        if(updateList){
            const renewedList = new RenewedList({
                contractNo,
                plateNo,
                serialNo,
                amount:VAT,
                newDate:updatedDate,            
                site,
                cleaner,
                amountRecieved,
                balance,
                paymentMethod:Payment,
                 authCode
            })
            renewedList.save().then((result)=>{
               
                res.status(200).send({success:'added'})
            }).catch((error)=>{
                console.log(error);
            })
           
        }
        res.status(200).send({data:updateList})

    } catch (error) {
    res.send(error)
        
    }
}

 
exports.getSingleData=async(req,res)=>{
try {
    const {id}= req.params

const singlData =await PendingList.findById(id)

if(singlData){
    res.status(200).send({data:singlData})
}
} catch (error) {
    res.send(error)
}
}

exports.getallRenewedList= async(req,res)=>{
    console.log('dkkdkd');
    try {
        const allData = await RenewedList.find({})
        process.on('unhandledRejection', (reason, promise) => {
            console.error('Unhandled Rejection at:', promise, 'reason:', reason);
            // Handle the rejection or terminate the process if necessary
          });
        console.log(allData,'kjflksjdflksd');
        if(allData){
            console.log('dkdj');
            res.status(200).send({data:allData})
        }
    } catch (error) {
        
    }
}

exports.downloadadminReneiwedData = async(req,res)=>{
    try {
        const allData =await RenewedList.find({})
        console.log(allData,';;;;;;');
        if(allData){
            exportToExcelAndSendResponseadmin(allData,res)
        }
        
    } catch (error) {
        
    }
}
async function exportToExcelAndSendResponseadmin(data, res) {
    console.log(data ,'download');
    const workbook2 = new ExcelJS2.Workbook();
    const worksheet2 = workbook2.addWorksheet('Sheet 2');
    worksheet2.columns = [
      { header: 'Serial No', key: 'serialNo', width: 15 },
      { header: 'Contract No', key: 'contractNo', width: 15 },
      { header: 'Plate No', key: 'plateNo', width: 15 },
      { header: 'Renewal Date', key: 'newDate', width: 15 },
      { header: 'Amount Recieved', key: 'amountRecieved', width: 15 },

      { header: 'Auth Code', key: 'authCode', width: 15 },
      { header: 'Cleaner', key: 'cleaner', width: 15 },
      { header: 'Site', key: 'site', width: 15 },


     
    ];
  
    data.forEach((data) => {
        console.log(data,'ietmss');
        worksheet2.addRow({
            serialNo: data.serialNo,
            contractNo: data.contractNo,
            plateNo: data.plateNo,
            newDate: data.newDate,
            amountRecieved:data.amountRecieved,
            authCode: data.authCode,
            cleaner: data.cleaner,
            site: data.site,

        

      });
    });
  
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=output.xlsx');
  
   await  workbook2.xlsx.write(res);
  
   
    res.end();
    
  
    console.log('Excel file sent successfully');
  }


  //export Form Data

  exports.exportFormData = async (req, res) => {
    try {
        console.log('calling ');
   
     if(req.file.buffer){
        const result = await PendingList.deleteMany({});

        console.log(`${result.deletedCount} documents deleted`);
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(req.file.buffer);

        
        const sheetNames = workbook.worksheets.map(ws => ws.name);

        const worksheet = workbook.getWorksheet('Pending');
        if (!worksheet) {
            throw new Error("Worksheet 'Pending' not found in the workbook.");
        }

        const dataToImport = [];

        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
            if (rowNumber === 1) {
                return;
            }

            const rowData = {
                contractNo: row.getCell(1).value === 'CONTRACT NO' ? '' : row.getCell(1).value,
                mobile: row.getCell(2).value === 'MOBILE ' ? '' : row.getCell(2).value,
                building: row.getCell(3).value === 'BUILDING ' ? '' : row.getCell(3).value,
                plateNo: row.getCell(4).value === 'PLATE NO ' ? '' : row.getCell(4).value,
                flatNo: row.getCell(5).value === 'FLAT NO ' ? '' : row.getCell(5).value,
                VAT: row.getCell(7).value === 'RATE OF MONTHLY CONTRACT INCLUDE VAT' ? '' : row.getCell(7).value,
                renewalDate: row.getCell(8).value === 'RENEWAL DATE' ? '' : row.getCell(8).value,
                status: row.getCell(15).value === 'CONTRACT STATUS' ? '' : row.getCell(15).value,
                cleaner: row.getCell(17).value === 'CLEANER NOW' ? '' : row.getCell(17).value,
                site: row.getCell(18).value === 'SITE ' ? '' : row.getCell(18).value,
            };
            dataToImport.push(rowData);
        });
        await PendingList.deleteMany({})
        await RenewedList.deleteMany({})

        await PendingList.insertMany(dataToImport);

         
        res.status(200).json({ message: 'File uploaded and data imported successfully' });
     }else{
        console.log('something went wrong');
     }

    } catch (error) {
        console.error('Error processing file:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// login admin
exports.loginAdmin=async(req,res)=>{
    
    console.log('calling login');
    try {
        const {email,password}= req.body
    
      if(password===newPassword){
        const data = {
            email: email,
          
          };
          
      console.log(data,'data');
        res.status(200).send(data.email)
      }else{
        res.status(500).send({message:'invalid email or password'})
      }
    } catch (error) {
       res.send(error) 
    }
}
//add employee
 exports.addEmployee= async (req,res)=>{
    try {

        console.log(req.body,'body');
        const {name,site,password,} =req.body
        const employee = await Employee.find({name})
      console.log(employee,'dndndn');
       if(employee.length===0){
        bcrypt.hash(password,10,function(err,hash){
            if(err){
                res.status(500).send({msg:'err'})
            }
            const newEmp =new Employee({
                name:name,
                password:hash,
                site:site
            })
            newEmp.save().then((data)=>{
                console.log('data saved');

            })
        })
        res.status(200).send({msg:'success '})
       }else{
        res.status(500).send({msg:'failed'})
       }
    } catch (error) {
        res.send(error)
    }
 }

 //getting getEmployeesList

 exports.getEmployeesList = async (req,res)=>{
    try {
        const emp = await Employee.find({})
        if(emp){
            res.status(200).send(emp)
        }
    } catch (error) {
       res.send(error) 
    }
 }

 //login Employee
 exports.loginEmp=async(req,res)=>{
    try {
        console.log(req.body,'bodyy');
        const {username
            ,password
        } = req.body
        const emp = await Employee.find({name:username})
        console.log(emp,'emp');
        if(emp.length!==0){

            console.log(emp[0].password,'emp');
            console.log('kfdlkjdkl');
            const validateEmp=await bcrypt.compare(password,emp[0]?.password)
            console.log(validateEmp,'kkj');
                if(validateEmp){
                    console.log('kayaa');
                    const update= await Employee.updateOne({name:username},
                        {
                            $set:{
                                isEmploye:true
                            }
                        })
                       
                    }
                 console.log(emp[0].name);
                    res.status(200).send({data:emp[0]?.name})

        }

    } catch (error) {
        res.send(error)
    }
 }

 exports.getEmpPendList =async(req,res)=>{
    console.log(req.query,'queryy...');
    try {
        const currentPage = req.query.page || 1;
        const pageSize = req.query.pageSize || ITEMS_PER_PAGE;
        const data = req.query.data
        console.log(req.query,'..dataa');
    console.log(currentPage,'..currnt');
        const skipItems = (currentPage - 1) * pageSize;
    const site = await Employee.find({name:data})
    const empSite = site[0]?.site
   
    console.log(empSite,'site ');
        const allPendingList = await PendingList.find({site:empSite})
        .skip(skipItems)
        .limit(pageSize);
        console.log(allPendingList,'dkpending lis');
        const totalItems = await PendingList.countDocuments({site:empSite});
    console.log(totalItems,'totalitems');
        if (allPendingList) {
          res.status(200).send({ data: allPendingList, totalItems });
        } else {
          console.log('error');
        }
    } catch (error) {
        
    }
 }
 //seerch data
 exports.getSearchData =async(req,res)=>{
    console.log(req.body,'bodyyyy');
    const data = req?.body?.data
    const empData = req?.body?.emp
    // const contact = Object.keys(data)[0];
    
    try {
        console.log(data,'backend');
        const site = await Employee.find({name:empData})
        console.log(site,'kdlkdj');
    const empSite = site[0]?.site
 console.log(empSite,'site..');
    const Data =await PendingList.find({contractNo:data , site:empSite})
   console.log(Data,'namma data,lll');
    if(Data){
        res.status(200).send(Data)
    }
    } catch (error) {
        res.send(error)
    }
 }



 exports.addNewList=async(req,res)=>{
  console.log(req.body,'namma body backend');
  let datenew={}
  const {serialNo,name,mobile,building,plateNo,flat,lotnumber,paymentMethod,authcode,amount,site,
    renewaldate,schedule,cleaner,date

}=req.body
  const originalDate = req.body.renewaldate;
  const dateParts = originalDate.split('-');
  if (dateParts.length === 3) {
    const [year, month, day] = dateParts;
    const formattedDate = `${day}-${month}-${year.slice(2)}`;
    
   datenew = formattedDate
  } else {
    console.log("Invalid date format.");
  }
 
  console.log(datenew,'eheeee');
    const newList = new  NewList({
        serialNo,
        name,
        mobile,
        building,
        plateNo,
        flat,
        lotnumber,
        paymentMethod,
        authcode,
        amount,
       renewaldate:datenew,
       site,
    schedule,
    cleaner,
    date
    })
    newList.save().then((response)=>{
        console.log(response,'jiui');
      if(response){
        console.log(response,'saved succesfully');
          res.status(200).send({success:true})
      }
    }).catch((error)=>{
      console.log(error);
      res.status(500).send({ success: false })
    })
 }
 //getting new List
 exports.getNewListData =async (req,res)=>{
try {
    const employee = req.query.data

    const emp = await  Employee.find({name:employee})
    const empData = emp[0]?.site
    const data = await NewList.find({site:empData})
    if(data){
        res.status(200).send(data)
    }
} catch (error) {
   res.send(error) 
}
 }
 //download new List data
 exports.downloadDataNewList = async (req,res)=>{
    try {
        const allData =await NewList.find({})
        if(allData){
            exportToExcelAndSendResponse(allData,res)
        }
    } catch (error) {
        
    }
 }
 async function exportToExcelAndSendResponse(data, res) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    worksheet.columns = [
      { header: 'Serial No', key: 'serialNo', width: 15 },
      { header: 'Name', key: 'name', width: 15 },

      { header: 'Mobile ', key: 'mobile', width: 15 },
      { header: 'Building', key: 'building', width: 15 },
      { header: 'Plate No', key: 'PlateNo', width: 15 },

      { header: 'Flat  ', key: 'flat', width: 15 },
      { header: 'Lot Number', key: 'lotnumber', width: 15 },
      { header: 'payment Method', key: 'paymentMethod', width: 15 },

      { header: 'AuthCode', key: 'authcode', width: 15 },
      { header: 'Amount ', key: 'amount', width: 15 },
      { header: 'Renewal Date ', key: 'renewaldate', width: 15 },
      { header: 'Schedule ', key: 'schedule', width: 16 },
      { header: 'Cleaner ', key: 'cleaner', width: 17 },
      { header: 'Site ', key: 'site', width: 17 },

      { header: 'Date ', key: 'date', width: 18 },




    ];
  
    data.forEach((item) => {
        console.log(item,'ietmss');
      worksheet.addRow({
        serialNo: item.serialNo,
        name:item.name,
        mobile: item.mobile,
        building: item.building,
        PlateNo:item.plateNo,
        flat: item.flat,
        lotnumber: item.lotnumber,
        paymentMethod: item.paymentMethod,

        authcode: item.authCode,
        amount: item.amount,
        renewaldate : item.renewaldate,
        schedule : item.schedule,
        cleaner : item.cleaner,
        site : item.site,
        date : item.date,



      });
    });
  
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=output.xlsx');
  
   await  workbook.xlsx.write(res);
  
   
    res.end();
    
  
    console.log('Excel file sent successfully');
  }
  
  //get admin list
 exports.getAdminList =async(req,res)=>{
    try {
        const data = await NewList.find({})
        console.log(data,'new lsit data');
        if(data){
            res.status(200).send(data)
        }
    } catch (error) {
       res.send(error) 
    }
 }

 exports.dwnldAdminList = async(req,res)=>{
    try {
        const allData =await NewList.find({})
        if(allData){
            exportToExcelAndSendResponse(allData,res)
        }
    } catch (error) {
        
    }
 }
 async function exportToExcelAndSendResponse(data, res) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    worksheet.columns = [
      { header: 'Serial No', key: 'serialNo', width: 15 },
      { header: 'Name', key: 'name', width: 15 },

      { header: 'Mobile ', key: 'mobile', width: 15 },
      { header: 'Building', key: 'building', width: 15 },
      { header: 'Plate No', key: 'PlateNo', width: 15 },

      { header: 'Flat  ', key: 'flat', width: 15 },
      { header: 'Lot Number', key: 'lotnumber', width: 15 },
      { header: 'payment Method', key: 'paymentMethod', width: 15 },

      { header: 'AuthCode', key: 'authcode', width: 15 },
      { header: 'Amount ', key: 'amount', width: 15 },
      { header: 'Renewal Date ', key: 'renewaldate', width: 15 },
      { header: 'Schedule ', key: 'schedule', width: 16 },
      { header: 'Cleaner ', key: 'cleaner', width: 17 },
      { header: 'Site ', key: 'site', width: 17 },

      { header: 'Date ', key: 'date', width: 18 },




    ];
  
    data.forEach((item) => {
        console.log(item,'ietmss');
      worksheet.addRow({
        serialNo: item.serialNo,
        name:item.name,
        mobile: item.mobile,
        building: item.building,
        PlateNo:item.plateNo,
        flat: item.flat,
        lotnumber: item.lotnumber,
        paymentMethod: item.paymentMethod,

        authcode: item.authcode,
        amount: item.amount,
        renewaldate : item.renewaldate,
        schedule : item.schedule,
        cleaner : item.cleaner,
        site : item.site,
        date : item.date,



      });
    });
  
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=output.xlsx');
  
   await  workbook.xlsx.write(res);
  
   
    res.end();
    
  
    console.log('Excel file sent successfully');
 }
 //Delete New List 

 exports.newListDelete=async(req,res)=>{
    try {
        const data = await NewList.deleteMany({})
        if(data){
            console.log(data,'data');
        }
    } catch (error) {
        
    }
 }