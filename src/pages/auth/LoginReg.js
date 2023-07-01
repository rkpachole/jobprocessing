import { Grid, Card, Tabs, Typography, Tab, Box } from '@mui/material';
import { useState, useEffect, } from 'react';
import Registration from './Registration';
import UserLogin from './UserLogin';
import { ShoppingBag } from '@mui/icons-material';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import config from '../../config/config';

const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div role='tabpanel' hidden={value !== index}>
      {
        value === index && (
          <Box>{children}</Box>
        )
      }
    </div>
  )
}

const LoginReg = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return <>
    {/* <Navbar /> */}
    <Grid container sx={{ height: '90vh' }} justifyContent='center'>
      <Grid item lg={5} sm={7} xs={12} mt={10}>
        <Card sx={{ width: '100%', height: '100%' }} >
          <Box sx={{ mx: 3, height: 730 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} textColor='secondary' indicatorColor='primary' onChange={handleChange}>
                <h2 className='text-center mt-3'>Welcome to Job Processing </h2>
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <UserLogin />
            </TabPanel>
          </Box>
        </Card>
      </Grid>
    </Grid>
  </>;
};

export default LoginReg;