import { TextField, Button, Box, Alert, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { setUserToken } from '../../features/authSlice';
import { getToken, storeToken } from '../../services/LocalStorageService';
import { useLoginUserMutation } from '../../services/userAuthApi';
import toast, { Toaster } from 'react-hot-toast'
const UserLogin = () => {
  const [user, setUser] = useState([]);
  const [server_error, setServerError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation(true)
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      //email: data.get('email'),
      user_code: data.get('user_code'),
      password: data.get('password'),
    }
    const res = await loginUser(actualData)
    // console.log(res.data);
    if (res.error) {
      // console.log(typeof (res.error.data.errors))
      // console.log(res.error.data.errors)
      setServerError(res.error.data.errors)
      showDataError();
    }
    if (res.data) {
      // console.log(typeof (msg == "Login Success"res.data))
      storeToken(res.data.token)
      setUser(res.data.data);
      console.log(user);
      let { access_token } = getToken()
      dispatch(setUserToken({ access_token: access_token }))
      navigate('/fieldmaster')
    }
    else {
      // showDataError();
    }
  }
  let { access_token } = getToken()
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }))
  }, [access_token, dispatch])
  // const [data, setData] = useState([]);
  const [features, setFeatures] = useState([]);
  const [placeholder, setPlaceholder] = useState("")
  const [usercode, setUsercode] = useState("")
  const [error01, setErro01] = useState("")
  const [errorBlank, setErrorBlank] = useState("")
  useEffect(() => {
    showData();
  }, []);
  const showData = () => {
    axios.get("http://teammember.techpanda.art/api/user/fieldmaster", {
      headers: {
        "content-type": "application/json"
      },
    })
      .then((data) => {
        // console.log(data.data);
        const tttt = [];
        tttt.push(data.data);
        // console.log("dddd", tttt[0].length);
        const tFeatures = [];
        for (var i = 0; i < tttt[0].length; i++) {
          tFeatures.push(data.data[i]);
          // console.log("tFeatures", tFeatures[i].id);
          if (tFeatures[i].field === "password") {
            // console.log(tFeatures[i].placeholder_message);
            setPlaceholder(tFeatures[i].placeholder_message)
          } if (tFeatures[i].field === "usercode") {
            // console.log(tFeatures[i].placeholder_message);
            setUsercode(tFeatures[i].placeholder_message)
          } else {
            // console.log("false");
          }
        }
        tFeatures.push(data.data[3].placeholder_message);
        // console.log(tFeatures);
        setFeatures(tFeatures)
      })
  }
  const showDataError = () => {
    console.log("hello user............####");
    // console.log("logdata", actualData);
    axios.get(`http://teammember.techpanda.art/api/user/fieldmaster/`, {
      headers: {
        "content-type": "application/json"
      },
    })
      .then((data) => {
        // console.log("all array data", data);
        const tttt = [];
        tttt.push(data.data);
        // console.log("array lenth", tttt[0].length);
        const tFeatures = [];
        for (var i = 0; i < tttt[0].length; i++) {
          tFeatures.push(data.data[i]);
          // fEAT.push(data.data[i]);
          // console.log("all erroe msg", tFeatures[i].error_message);
          if (tFeatures[i].field ==="error01") {
             toast.error(tFeatures[i].error_message)
            // alert(".error_message")
          }
    
        }
        // tFeatures.push(data.data[3].placeholder_message);
        // console.log(tFeatures);
        // setFeatures(tFeatures)
      })
  }
  const Errormsg = () => {
    // toast.error("hello")
  }
  return <>
    <Toaster />
    {/* {server_error.msg ? console.log(server_error.msg[0]):"" } */}
    {server_error.error01 ? console.log(server_error.error01[0]) : ""}
    {server_error.user_code ? console.log(server_error.user_code[0]) : ""}
    {server_error.password ? console.log(server_error.password[0]) : ""}
    <Box component='form' noValidate sx={{ mt: 1 }} id='login-form' onSubmit={handleSubmit}>
      <TextField margin='normal' required fullWidth id='user_code' name='user_code' label={usercode} />
      {/* {server_error.user_code ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.user_code[0]}</Typography> : ""} */}
      <TextField margin='normal' required fullWidth id='password' name='password' label={placeholder} type='password' />
      {/* {server_error.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography> : ""} */}
      <Box textAlign='center'>
        {isLoading ? <CircularProgress /> : <Button  type='submit' data-toggle="modal" data-target=".error-popup" variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Login</Button>}
      </Box>
      <NavLink to='/sendpasswordresetemail' >Forgot Password ?</NavLink>
    </Box>
    {/* <button >Click</button> */}
  </>;
};
export default UserLogin;