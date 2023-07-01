import React from 'react'
import { Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import { Button, CssBaseline, Grid, List, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { unsetUserToken } from '../features/authSlice';
import { useGetLoggeUserQuery } from '../services/userAuthApi';
import { useEffect, useState } from 'react';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { Table, Container, Row, Col, Form } from 'react-bootstrap';
import { unSetUserToken } from '../features/authSlice';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
const TableHeader = () => {
    const handleLogout = () => {
        dispatch(unsetUserInfo({
            username: "", email: "", company: "", menugroup1: "", menugroup2: "",
            menu_name1: "", menu_name2: "", menu_name3: "", menu_name4: "", menu_name5: "", menu_name6: "", menu_name7: "",
            menu_name8: "", menu_name9: "", task1: "", task2: "", task3: "", task4: "", task5: "", task6: "", task7: "", task8: "",
            task9: "",
        }))
        dispatch(unSetUserToken({ access_token: null }))
        removeToken()
        navigate('/login')
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { access_token } = getToken()
    const { data, isSuccess } = useGetLoggedUserQuery(access_token)
    const [userData, setUserData] = useState({
        email: "",
        username: "",
        company: "",
    })
    // Store User Data in Local State
    useEffect(() => {
        if (data && isSuccess) {
            setUserData({
                email: data.email,
                username: data.username,
                company: data.company,
                menugroup1: data.menugroup1,
                menugroup2: data.menugroup2,
                menu_name1: data.menu_name1,
                menu_name2: data.menu_name2,
                menu_name3: data.menu_name3,
                menu_name4: data.menu_name4,
                menu_name5: data.menu_name5,
                menu_name6: data.menu_name6,
                menu_name7: data.menu_name7,
                menu_name8: data.menu_name8,
                menu_name9: data.menu_name9,
                task1: data.task1,
                task2: data.task2,
                task3: data.task3,
                task4: data.task4,
                task5: data.task5,
                task6: data.task6,
                task7: data.task7,
                task8: data.task8,
                task9: data.task9,
            })
        }
    }, [data, isSuccess])
    const [CustomData, setCustomData] = useState([])
    useEffect(() => {
        get()
    }, [])
    const get = () => {
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(`https://teammember.techpanda.art/api/user/menu/`, {
            method: 'GET',
            // credentials: 'same-origin',
            headers: headers,
        })
            .then((Response) => Response.json())
            .then((Response) => {
                setCustomData(Response)
                console.log('RESPONS get api-------------->>>>', Response)
                var states = Object.keys(Response).length;
                console.log('length api data states----->>>>>', states)
                let CityArray = [];
                for (var i = 0; i < states; i++) {
                    // console.log('for loop',states)
                    CityArray.push({
                        group: Response[i].group,
                        submenu: Response[i].submenu,
                        subsubname: Response[i].subsubname,
                    })
                }
                console.log('custom aray data', CityArray)
                setCustomData(CityArray)
            })
            .catch((error) => {
                console.error("ERROR FOUND" + error);
            })
    }
    const taskmaster = useNavigate()
    const fieldmaster = useNavigate()
    // const taskfieldmaster = useNavigate()
    // const usermaster = useNavigate()
    // const usertaskaccess = useNavigate()
    const menuclick = (data) => {
        // alert("id")
        if (data === "Task Master ANYTHING") {
            taskmaster("/taskmaster")
        }
        else if (data === "Field Master") {
            fieldmaster("/fieldmaster")
        }
        // else if (data === "User Master") {
        //     usermaster("/usermaster")
        // }
        // else if (data === "User Task Master") {
        //     usertaskaccess("/usertaskaccess")
        // }
        // else if (data === "Task Field Master") {
        //     taskfieldmaster("/taskfieldmaster")
        // }
    }
    // }, )
    return (
        <>
            <>
                <Navbar className='nav-main'>
                    <Container>
                        <Navbar.Brand href='fieldmaster'>Job Processing System</Navbar.Brand>
                        <Nav className="ms-auto">
                            {/* {CustomData.map((item, index) => (
                                <div className="dropdown">
                                    <Nav.Link href="fieldmaster" className="dropdown-toggle" type="button" data-toggle="dropdown">
                                        {item.group}
                                        <span className="caret" />
                                    </Nav.Link>
                                    <ul className="dropdown-menu">
                                        {item.submenu.map((data) =>
                                            <li onClick={() => menuclick(data.subsubname)}>{data.subsubname}</li>
                                        )}
                                    </ul>
                                </div>
                            ))} */}
                            {CustomData.map((item, index) => (
                                <NavDropdown title={item.group} id="basic-nav-dropdown">
                                    <NavDropdown.Item >
                                        {item.submenu.map((data) =>
                                            <li onClick={() => menuclick(data.subsubname)}>{data.subsubname}</li>
                                        )}
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ))}
                            <NavDropdown title={userData.username} id="basic-nav-dropdown">
                                <NavDropdown.Item href="changepassword">Change Password</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout} >
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Container>
                </Navbar>
            </>
        </>
    )
}
export default TableHeader