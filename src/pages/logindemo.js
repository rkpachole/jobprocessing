import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
const Logindemo = () => {
  const [user, setuser] = useState()
  const [pass, setpass] = useState();
  const [loginsuccess, setloginsuccess] = useState(false)
  const [loginerror, setloginerror] = useState(false)
  const [logincommon, setlogincommon] = useState(false)


  const navigate = useNavigate();
  useEffect(() => {
    LoginFunction()
  }, [])

  const LoginFunction = async () => {
    setuser("")
    setpass("")
    let url = `https://teammember.techpanda.art/api/user/login/`   //API to render signup
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': 'Barer +',
    };
    // console("data>>>>>>>>>>>>>>>>",token)
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        password: pass,
        user_code: user,
      }),
      headers: headers,
    })
      .then((Response) => Response.json())
      .then((Response) => {
        if (Response.msg == "Login Success") {
          setloginsuccess(true)
        } else if (Response.errors.password == "This field may not be blank.") {
          setloginerror(true)
        }
        else if (Response.error.data.errors.non_field_errors == "Usercode or password is not valid and please Enter currect info") {
          setlogincommon(true)
        }
      })

      .catch((error) => {
        console.error("ERROR FOUND---->>>>" + error);
        // navigate('/fieldmaster')

      })
  }

  const fieldpagerefresh = () => {
    window.location.reload(false);
  }
  const nextPage = () => {
    navigate('/fieldmaster')
    window.location.reload(false);
  }

  return (
    <>

      {/* {loginsuccess ? (alert("login success")) : null}
      {text ? (alert("password")) : null} */}
      <Navbar />
      <section>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xl-6 mt-4'>
              <div className="form-area">
                <h2>Welcome to Job Processing</h2>
               
                <div >
                  <div className="form-group">
                    <label>User Code</label>
                    <input type="text" className="form-control" value={user} onChange={(e) => setuser(e.target.value)} placeholder="Enter Your Usercode" />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={pass} onChange={(e) => setpass(e.target.value)} placeholder="Enter Your Password" />
                  </div>
                  <div className='text-center'>
                    <button className="main-btn" onClick={LoginFunction} data-toggle="modal" data-target=".error-popup"> Submit</button>
                  </div>
                  <a href='/sendpasswordresetemail' >Forgot Password ?</a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Error modal */}
      <div className="modal fade error-popup" tabIndex={-1} role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header newM">
              {loginsuccess ? (<div className='text-center'><h2>login success.</h2><button className='loginsucc-btn' onClick={nextPage}>OK!</button></div>) : null
              }
              {loginerror ? (<h3>This field may not be blank</h3>) : null
              }
              {logincommon ? (<h3>Usercode or password is not valid and please Enter currect info</h3>) : null
              }
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={fieldpagerefresh}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Logindemo;