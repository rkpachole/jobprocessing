import { Grid, TextField, Button, Box, Alert, Typography } from "@mui/material";
import axios from "axios";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from "../../services/userAuthApi";
import toast, { Toaster } from 'react-hot-toast'


const ResetPassword = () => {
  const [server_error, setServerError] = useState({})
  const [server_msg, setServerMsg] = useState({})
  const [resetPassword] = useResetPasswordMutation()
  const { id, token } = useParams()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get('password'),
      password2: data.get('password2'),
    }
    const res = await resetPassword({ actualData, id, token })
    if (res.error) {
      setServerMsg({})
      setServerError(res.error.data.errors)
     
    }
    if (res.data) {
      setServerError({})
      setServerMsg(res.data)
      document.getElementById('password-reset-form').reset()
      setTimeout(() => {
        navigate("/login")
      }, 3000)
    }

  }

  


  const fieldpagerefresh = () => {
    window.location.reload(false);
  }
  return <>
  <Toaster/>
    <section>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-7'>

            <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: 600, mx: 4 }}>
              <h1>Reset Password</h1>
              <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-form' onSubmit={handleSubmit}>
                <TextField margin='normal' required fullWidth id='password' name='password' label='New Password' type='password' />
                <TextField margin='normal' required fullWidth id='password' name='password' label='Confirm New Password' type='password' />
                <Box textAlign='center'>
                  <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }} data-toggle="modal" data-target=".error-popup">Save</Button>
                </Box>

              </Box>
            </Box>
          </div>
        </div>
      </div>
    </section>

    {/* Error modal */}
    <div className="modal fade error-popup" tabIndex={-1} role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header newM">
            {server_error.password ? <Typography style={{ fontSize: 17, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography> : ""}
            {/* {server_error.password2 ? <Typography style={{ fontSize: 17, color: 'red', paddingLeft: 10 }}>{server_error.password2[0]}</Typography> : ""} */}
            {server_error.non_field_errors ? <Typography style={{ fontSize: 17, color: 'red', paddingLeft: 10 }} severity='error'>{server_error.non_field_errors[0]}</Typography> : ''}
            {server_msg.msg ? <Typography style={{ fontSize: 17, color: 'red', paddingLeft: 10 }} severity='success'>{server_msg.msg}</Typography> : ''}
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={fieldpagerefresh}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default ResetPassword;
