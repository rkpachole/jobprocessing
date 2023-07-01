// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';



// const Loginpagetext = () => {
//     const [user, setuser] = useState();
//     const [pass, setpass] = useState();
//     const loginsuccess = useNavigate()


//     const LoginFunction = async () => {
//       setuser("")
//       setpass("")
//       let url = `https://teammember.techpanda.art/api/user/login/`   //API to render signup
//       var headers = {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         // 'Authorization': 'Barer +',
//       };
//       // console("data>>>>>>>>>>>>>>>>",token)
//       await fetch(url, {
//         method: 'POST',
//         body: JSON.stringify({
//           password: pass,
//           user_code: user,
//         }),
//         headers: headers,
//       })
//         .then((Response) => Response.json())
//         .then((Response) => {
//             console.log("sfdghsfsjhdcjshckskcsc",Response)
//           // if (Response.msg == "Login Success") {
//           //   alert("sssssssssfull")
           
//           //   loginsuccess("/fieldmaster")
//           // }
//            if (Response.errors.non_field_errors == 'Username or Password is not valid') {
//             alert("this name and pass")

//           }

//         })
//         .catch((error) => {
//           console.error("ERROR FOUND---->>>>" + error);
//         })
//     }
//     return (
//       <>
  
//         <h1>loginpage</h1>
//         <div>
//           Username:<input value={user} onChange={(e) => setuser(e.target.value)} /><br />
//           Password:<input value={pass} onChange={(e) => setpass(e.target.value)} /><br />
//           <button onClick={LoginFunction} >login</button>
//         </div>
//       </>
//     )
//   }

// export default Loginpagetext



import React,{useState,useEffect} from 'react';

const Loginpagetext=()=>{
    const[info,setInfo]=useState({
        name   :"task place !!",
        temp:"loading",
        humidity:"loading",
        desc:"loading",
    })
    useEffect(()=>
    {
        getWeather()
    })
    const getWeather=()=>
    {
        fetch('http://api.openweathermap.org/data/2.5/weather?q=chennai&appid=bd2d67a73f2dc8279......')
        .then(data=>data.json())
        .then(results=>{
           //console.log(results)
           setInfo({
               name:results.name,
               temp:results.temp,
               humidity:results.humidity,
               desc:results.weather.description,
           })
        })
    }

    return(
        <div>
            <h1>Placeholder API</h1>
            <div>
                 Place:{info.name} <br/>
                 Temperature:{info.temp} <br/>
                 Humidity:{info.humidity} <br/>
                 Description: {info.desc}
                 <input type='text' placeholder={info.name}/>
            </div>
        </div>
    )
}

export default Loginpagetext;