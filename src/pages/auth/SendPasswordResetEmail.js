import { Grid, TextField, Button, Box, Alert, Typography } from "@mui/material";
import { useState } from 'react';
import { useSendPasswordResetEmailMutation } from "../../services/userAuthApi";
import toast, { Toaster } from 'react-hot-toast'
import axios from "axios";
const SendPasswordResetEmail = () => {
  const [server_error, setServerError] = useState({})
  const [server_msg, setServerMsg] = useState({})
  const [sendPasswordResetEmail, { isLoading }] = useSendPasswordResetEmailMutation()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
    }
    const res = await sendPasswordResetEmail(actualData)
    if (res.error) {
      console.log(typeof (res.error.data.errors))
      console.log(res.error.data.errors)
      setServerMsg({})
      showDataError()
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      console.log(typeof (res.data))
      console.log(res.data)
      setServerError({})
      setServerMsg(res.data)
      document.getElementById('password-reset-email-form').reset()
    }
  }
  const fieldpagerefresh = () => {
    window.location.reload(false);
  }
  const showDataError = () => {
    console.log("hello user............####");
    // console.log("logdata", actualData);
    axios.get("http://teammember.techpanda.art/api/user/fieldmaster", {
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
          // console.log("all erroe msg", tFeatures[i].error_message);
          if (tFeatures[i].field === "error03") {
            // console.log("messege", tFeatures[i].error_message);
            // setErro01(tFeatures[i].error_message)
            toast.error(tFeatures[i].error_message)
          }
          // else if (tFeatures[i].field === "error_blank") {
          // console.log("messege", tFeatures[i].error_message);
          // setErrorBlank(tFeatures[i].error_message)
          // toast.error(tFeatures[i].error_message)
          // }
          // else {
          //   toast.error(tFeatures[i].error_message)
          // }
        }
        // tFeatures.push(data.data[3].placeholder_message);
        // console.log(tFeatures);
        // setFeatures(tFeatures)
      })
  }
  return <>
    <Toaster />
    <section>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-7'>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: 600, mx: 4 }}>
              <h1>Reset Password</h1>
              <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-email-form' onSubmit={handleSubmit}>
                <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
                {/* {server_error.email ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</Typography> : ""} */}
                <Box textAlign='center'>
                  <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }} data-toggle="modal" data-target=".error-popup">Send</Button>
                </Box>
                {/* {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''} */}
                {/* {server_msg.msg ? <Alert severity='success'>{server_msg.msg}</Alert> : ''} */}
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </section>
    {/* Error modal */}
    {/* <div className="modal fade error-popup" tabIndex={-1} role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header newM">
            {server_error.email ? <Typography style={{ fontSize: 17, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</Typography> : ""}
            {server_error.non_field_errors ? <Typography style={{ fontSize: 17, color: 'red', paddingLeft: 10 }} severity='error'>{server_error.non_field_errors[0]}</Typography> : ''}
            {server_msg.msg ? <Typography style={{ fontSize: 17, color: 'red', paddingLeft: 10 }} severity='success'>{server_msg.msg}</Typography> : ''}
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={fieldpagerefresh}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
      </div>
    </div> */}
  </>;
};
export default SendPasswordResetEmail;