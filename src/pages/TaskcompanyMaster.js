import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, Route } from 'react-router-dom';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import ChangePassword from './auth/ChangePassword';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useEffect, useState } from 'react';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import TableHeader from "../directives/tableHeader";
import axios from 'axios';


const TaskcompanyMaster = () => {
    let { id1 } = useParams();

    const handleLogout = () => {
        dispatch(unsetUserInfo({ username: "", text: "", company: "" }))
        dispatch(unSetUserToken({ access_token: null }))
        removeToken()
        navigate('/login')
    }
    const navigate = useNavigate()
    const showdata = useNavigate()
    const dispatch = useDispatch()
    const { access_token } = getToken()
    const { data, isSuccess } = useGetLoggedUserQuery(access_token)


    const [userData, setUserData] = useState({
        text: "",
        username: "",
        company: ""

    })

    // Store User Data in Local State
    useEffect(() => {
        if (data && isSuccess) {
            setUserData({
                email: data.email,
                username: data.username,
                company: data.company,
            })
        }
    }, [data, isSuccess])

    // Store User Data in Redux Store
    useEffect(() => {
        if (data && isSuccess) {
            dispatch(setUserInfo({
                email: data.email,
                username: data.username,
                company: data.company
            }))
        }
    }, [data, isSuccess, dispatch])


    // ..//////////tarun/////
    const [id, setID] = useState()
    const [company, setcompany] = useState()
    const [user, setuser] = useState()
    const [task, settask] = useState()
    const [field, setfield] = useState()
    const [restricted, setrestricted] = useState()
    const [inactive, setinactive] = useState()
    const [note, setnote] = useState()
    // const [lastupdateusercompany, setlastupdateusercompany] = useState()
    // const [lastupdatetaskcompany, setlastupdatetaskcompany] = useState()
    // const [lastupdateipcompany, setlastupdateipcompany] = useState()
    const [CustomData, setCustomData] = useState([])
    const [datasave, setData] = useState([]); // state to hold the API data
    const [newData, setNewData] = useState({
        id: id,
        company: company,
        user: user,
        task: task,
        field: field,
        restricted: restricted,
        inactive: inactive,
        note: note,
        // lastupdateusercompany: lastupdateusercompany,
        // lastupdatetaskcompany: lastupdatetaskcompany,
        // lastupdateipcompany: lastupdateipcompany,
    }); // state to hold the data to be posted to the API
    useEffect(() => {
        get()
    }, [])
    // // function to handle form submission
    const LoginFunctioncompany = (event) => {
        event.preventDefault();
        setData([...datasave, newData]);
        let Data = {
            id: id,
            company: company,
            user: user,
            task: task,
            field: field,
            restricted: restricted,
            inactive: inactive,
            note: note,
            // lastupdateusercompany: lastupdateusercompany,
            // lastupdatetaskcompany: lastupdatetaskcompany,
            // lastupdateipcompany: lastupdateipcompany,
        }
        setcompany("")
        setuser("")
        settask("")
        setfield("")
        setrestricted("")
        setinactive("")
        setnote("")
        // setlastupdateusercompany("")
        // setlastupdatetaskcompany("")
        // setlastupdateipcompany("")
        // console.log("costemdata", Data)
        // let url = `https://jps.pythonanywhere.com/account/api//taskmasterview/`   //API to render signup
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'authorization': `Bearer ${access_token}`,
        };
        // console.log("token")
        fetch(`https://teammember.techpanda.art/api/user/taskfieldmaster/`, {
            method: 'POST',
            // credentials: 'same-origin',
            body: JSON.stringify(Data),
            headers: headers,
        })
            .then((Response) => Response.json())
            .then((Response) => {
                //  const loggedIn = AsyncStorage.setItem('loggedIn', JSON.stringify(true))
                console.log('RESPONSE apiiii-11111111------------->>>>', Response)
                // setData(data)
            })
            .catch((error) => {
                console.error("ERROR FOUND" + error);
            })
    }
    const get = () => {
        // event.preventDefault();
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'authorization': `Bearer ${access_token}`,
        };
        fetch(`https://teammember.techpanda.art/api/user/taskfieldmaster/`, {
            method: 'GET',
            // credentials: 'same-origin',
            headers: headers,
        })
            .then((Response) => Response.json())
            .then((Response) => {
                //  const loggedIn = AsyncStorage.setItem('loggedIn', JSON.stringify(true))
                // setData(Response)
                console.log('RESPONS get api-------------->>>>', Response)
                var states = Object.keys(Response).length;
                console.log('length api data states----->>>>>', states)
                let CityArray = [];
                for (var i = 0; i < states; i++) {
                    // console.log('for loop',states)
                    CityArray.push({
                        id: Response[i].id,
                        company: Response[i].company,
                        user: Response[i].user,
                        task: Response[i].task,
                        field:Response[i].field,
                        restricted:Response[i].restricted,
                        inactive: Response[i].inactive,
                        note: Response[i].note,
                        // lastupdateusercompany: Response[i].lastupdateusercompany,
                        // lastupdatetaskcompany: Response[i].lastupdatetaskcompany,
                        // lastupdateipcompany: Response[i].lastupdateipcompany,
                    })
                }
                console.log('custom aray data', CityArray)
                setCustomData(CityArray)
            })
            .catch((error) => {
                console.error("ERROR FOUND" + error);
            })
    }
    const deleteuser = (id) => {
        // alert(id);
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'authorization': `Bearer ${access_token}`,
        };
        fetch(`https://teammember.techpanda.art/api/user/taskfieldmaster/${id}`, {
            method: "DELETE",
            headers: headers,
        })
            .then((resp) => {
                console.log(resp)
                get()
            })

    }
    const edituser = (id) => {
        // e.preventDefault();
        // alert(id)

        setID(id);
        axios.get(`https://teammember.techpanda.art/api/user/taskfieldmaster/${id}`)

            .then((result) => {
                const dt = result.data;
                setcompany(result.data.company)
                setuser(result.data.user);
                settask(result.data.task);
                setfield(result.data.field);
                setrestricted(result.data.restricted);
                setinactive(result.data.inactive);
                setnote(result.data.note);
                // setlastupdateusercompany(result.data.lastupdateusercompany);
                // setlastupdatetaskcompany(result.data.lastupdatetaskcompany)
                // setlastupdateipcompany(result.data.lastupdateipcompany)
                setID(id);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const copypage = (id) => {

        setID(id);
        axios.get(`https://teammember.techpanda.art/api/user/taskfieldmaster/${id}`)

            .then((result) => {
                const dt = result.data;
                setcompany(result.data.company)
                setuser(result.data.user);
                settask(result.data.task);                
                setfield(result.data.field);
                setrestricted(result.data.restricted);
                setinactive(result.data.inactive);
                setnote(result.data.note);
                // setlastupdateusercompany(result.data.lastupdateusercompany);
                // setlastupdatetaskcompany(result.data.lastupdatetaskcompany)
                // setlastupdateipcompany(result.data.lastupdateipcompany)
                setID(id);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const showlistdaa = (item) => {

        showdata("/showlist", {
            state: {
                Item: item,
                active: 'tab-pane fade show active'
            }
        });
    }

    return <>
        <TableHeader />
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <form>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <label htmlFor="exampleInputEmail1">Company:</label>
                                    </div>
                                    <div className="col-sm-4">
                                        <h6 className="newAddUser">{userData.company}</h6>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4">
                        <form>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <label htmlFor="exampleInputEmail1">User:</label>
                                    </div>
                                    <div className="col-sm-4">
                                        <h6 className="newAddUser">{userData.username}</h6>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="table-search mt-3">
                    <div className="row">
                        <div className="col-lg-2">
                            <form>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="Search company Name" />
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-1 text-center">
                            <div className="plus-icon">
                                <a href="" data-toggle="modal" data-target="#companytableadd"><i className="fa fa-plus" aria-hidden="true" /></a>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <form>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="Search Message 1" />
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-2">
                            <form>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="Search Message 2" />
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-1"></div>
                        <div className="col-lg-2">
                            <form>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="Search Note" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="company-table">
                    <div class="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">company </th>
                                    <th scope="col">User</th>
                                    <th scope="col">task</th>
                                    <th scope="col">Field</th>                                    
                                    <th scope="col">restricted</th>
                                    <th scope="col">Inactive</th>
                                    <th scope="col">Note</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CustomData.map((item, index) => (
                                    <tr key={index} >
                                        {/* <td>{item.id}</td> */}
                                        <td>
                                            {item.company}
                                        </td>
                                        <td><i onClick={() => copypage(item.id)} data-toggle="modal" data-target="#exampleModalTwo" class="fa fa-clipboard" aria-hidden="true"></i></td>
                                        <td>{item.user}</td>
                                        <td>{item.task}</td>
                                        <td>{item.field}</td>
                                        <td><input className="form-check-input" type="checkbox" id="defaultCheck1" defaultValue="true" />{item.inactive}</td>
                                        
                                        <td><input className="form-check-input" type="checkbox" id="defaultCheck1" defaultValue="true" />{item.inactive}</td>
                                        <td>{item.note}</td>
                                        <td>
                                            <i onClick={() => showlistdaa(item)} class="fa fa-eye" aria-hidden="true"></i>
                                        </td>
                                        {/* <td>{item.lastupdateusercompany}</td> */}
                                        {/* <td>{item.lastupdatetaskcompany}</td>
                                        <td>{item.lastupdateipcompany}</td> */}
                                        <td>
                                            <button className='btn btn-info btn-sm' onClick={() => edituser(item.id)} ><i data-toggle="modal" data-target="#companyedit" class="fa fa-pencil" aria-hidden="true"></i></button>
                                            <button className='btn btn-danger btn-sm ml-2' onClick={() => deleteuser(item.id)}><i data-toggle="modal" data-target="#companydelete" class="fa fa-trash" aria-hidden="true"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>



        {/* All Models code */}
        <form onSubmit={LoginFunctioncompany}>
            <div className="modal fade" id="companyedit" tabIndex={-1} role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">company Master  - Edit company</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                {/* <Form.Group className="" controlId="formBasicEmail"> */}
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">company name</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input placeholder="Enter company" type="text" className="form-control" value={company} onChange={(event) => setcompany(event.target.value)} readonly="readonly" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Message 1 *</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Enter message 1" value={user} onChange={(event) => setuser(event.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Message 2 *</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Enter message 2" value={task} onChange={(event) => settask(event.target.value)} />
                                        </div>
                                    </div>

                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">inactive</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="note" value={inactive} onChange={(event) => setinactive(event.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Note</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Enter note" value={note} onChange={(event) => setnote(event.target.value)} />
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className='main-btn' >
                                Edit
                            </button>
                            <button className='main-btn' data-dismiss="modal" aria-label="Close">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form onSubmit={LoginFunctioncompany}>
            <div className="modal fade" id="companytableadd" tabIndex={-1} role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">company Master  - Add New company</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* <form> */}
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-label">company name</div>
                                    </div>
                                    <div className="col-sm-9">
                                        <input className="form-control" type="text" placeholder="Enter company" value={company} onChange={(event) => setcompany(event.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-label">message 1 *</div>
                                    </div>
                                    <div className="col-sm-9">
                                        <input className="form-control" type="text" placeholder="Enter message 1" value={user} onChange={(event) => setuser(event.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-label">message 2 *</div>
                                    </div>
                                    <div className="col-sm-9">
                                        <input className="form-control" type="text" placeholder="Enter message 2" value={task} onChange={(event) => settask(event.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-label">inactive</div>
                                    </div>
                                    <div className="col-sm-9">
                                        <input className="form-control" type="text" placeholder="note" value={inactive} onChange={(event) => setinactive(event.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-label">Note</div>
                                    </div>
                                    <div className="col-sm-9">
                                        <input className="form-control" type="text" placeholder="Enter note" value={note} onChange={(event) => setnote(event.target.value)} />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">lastupdateusercompany</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Enter note" value={lastupdateusercompany} onChange={(event) => setlastupdateusercompany(event.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">lastupdatetaskcompany</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Enter note" value={lastupdatetaskcompany} onChange={(event) => setlastupdatetaskcompany(event.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">lastupdateipcompany</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Enter note" value={lastupdateipcompany} onChange={(event) => setlastupdateipcompany(event.target.value)} />
                                        </div>
                                    </div>
                                </div> */}
                            {/* </form> */}
                        </div>
                        <div className="modal-footer">
                            <button className='main-btn'>
                                Add
                            </button>
                            <button className='main-btn' data-dismiss="modal" aria-label="Close">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <form onSubmit={LoginFunctioncompany}>
            <div className="modal fade" id="exampleModalTwo" tabIndex={-1} role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">company Master  - Make copy of company</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">company name</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Enter company" value={company} onChange={(event) => setcompany(event.target.value)} readonly="readonly" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">message 1 *</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="message 1" value={user} onChange={(event) => setuser(event.target.value)} readonly="readonly" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">message 2 *</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Enter message 2" value={task} onChange={(event) => settask(event.target.value)} readonly="readonly" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Note</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Enter note" value={note} onChange={(event) => setnote(event.target.value)} readonly="readonly" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className='main-btn'>
                                Add
                            </button>
                            <button className='main-btn' data-dismiss="modal" aria-label="Close">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <div className="modal fade" id="exampleModalThree" tabIndex={-1} role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">company Master  - Make company Inactive</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-label">company name</div>
                                    </div>
                                    <div className="col-sm-9">
                                        {/* <input className="form-control" type="text" placeholder="Enter company" /> */}
                                        <input placeholder="Enter company" type="text" className="form-control" value={company} onChange={(event) => setcompany(event.target.value)} />

                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-label">message 1 *</div>
                                    </div>
                                    <div className="col-sm-9">
                                        {/* <input className="form-control" type="text" placeholder="Enter message 1" /> */}
                                        <input className="form-control" type="text" placeholder="Enter message 1" value={user} onChange={(event) => setuser(event.target.value)} />

                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-label">message 2 *</div>
                                    </div>
                                    <div className="col-sm-9">
                                        {/* <input className="form-control" type="text" placeholder="Enter message 2" /> */}
                                        <input className="form-control" type="text" placeholder="Enter message 2" value={task} onChange={(event) => settask(event.target.value)} />

                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-label">Note</div>
                                    </div>
                                    <div className="col-sm-9">
                                        {/* <input className="form-control" type="text" placeholder="Enter note" /> */}
                                        <input className="form-control" type="text" placeholder="Enter note" value={note} onChange={(event) => setnote(event.target.value)} />

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className='main-btn'>
                            Confirm
                        </button>
                        <button className='main-btn' data-dismiss="modal" aria-label="Close">Cancel</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="exampleModalFour" tabIndex={-1} role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">company Master  - Make company Active Again</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-label">company name</div>
                                    </div>
                                    <div className="col-sm-9">
                                        {/* <input className="form-control" type="text" placeholder="Enter company" /> */}
                                        <input placeholder="Enter company" type="text" className="form-control" value={company} onChange={(event) => setcompany(event.target.value)} />

                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-label">message 1 *</div>
                                    </div>
                                    <div className="col-sm-9">
                                        {/* <input className="form-control" type="text" placeholder="Enter message 1" /> */}
                                        <input className="form-control" type="text" placeholder="Enter message 1" value={user} onChange={(event) => setuser(event.target.value)} />

                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-label">message 2 *</div>
                                    </div>
                                    <div className="col-sm-9">
                                        {/* <input className="form-control" type="text" placeholder="Enter message 2" /> */}
                                        <input className="form-control" type="text" placeholder="Enter message 2" value={task} onChange={(event) => settask(event.target.value)} />

                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-label">Note</div>
                                    </div>
                                    <div className="col-sm-9">
                                        {/* <input className="form-control" type="text" placeholder="Enter note" /> */}
                                        <input className="form-control" type="text" placeholder="Enter note" value={note} onChange={(event) => setnote(event.target.value)} />

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className='main-btn'>
                            Confirm
                        </button>
                        <button className='main-btn' data-dismiss="modal" aria-label="Close">Cancel</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="exampleModalFive" tabIndex={-1} role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">company Master  - View company</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-label">company name</div>
                                    </div>
                                    <div className="col-sm-9">
                                        {/* <input className="form-control" type="text" placeholder="Enter company" /> */}
                                        <input placeholder="Enter company" type="text" className="form-control" value={company} onChange={(event) => setcompany(event.target.value)} />

                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-label">message 1 *</div>
                                    </div>
                                    <div className="col-sm-9">
                                        {/* <input className="form-control" type="text" placeholder="Enter message 1" /> */}
                                        <input className="form-control" type="text" placeholder="Enter message 1" value={user} onChange={(event) => setuser(event.target.value)} />

                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-label">message 2 *</div>
                                    </div>
                                    <div className="col-sm-9">
                                        {/* <input className="form-control" type="text" placeholder="Enter message 2" /> */}
                                        <input className="form-control" type="text" placeholder="Enter message 2" value={task} onChange={(event) => settask(event.target.value)} />

                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-label">Note</div>
                                    </div>
                                    <div className="col-sm-9">
                                        {/* <input className="form-control" type="text" placeholder="Enter note" /> */}
                                        <input className="form-control" type="text" placeholder="Enter note" value={note} onChange={(event) => setnote(event.target.value)} />

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className='main-btn' data-dismiss="modal" aria-label="Close">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <form onSubmit={LoginFunctioncompany}>
            <div className="modal fade" id="companydelete" tabIndex={-1} role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content" style={{ background: '#d86868' }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">company Master  - Delete company Forever</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">company name</div>
                                        </div>
                                        <div className="col-sm-9">
                                            {/* <input className="form-control" type="text" placeholder="Enter company" /> */}
                                            <input placeholder="Enter company" type="text" className="form-control" value={company} onChange={(event) => setcompany(event.target.value)} readonly="readonly" />

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">message 1 *</div>
                                        </div>
                                        <div className="col-sm-9">
                                            {/* <input className="form-control" type="text" placeholder="Enter message 1" /> */}
                                            <input className="form-control" type="text" placeholder="Enter message 1" value={user} onChange={(event) => setuser(event.target.value)} readonly="readonly" />

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">message 2 *</div>
                                        </div>
                                        <div className="col-sm-9">
                                            {/* <input className="form-control" type="text" placeholder="Enter message 2" /> */}
                                            <input className="form-control" type="text" placeholder="Enter message 2" value={task} onChange={(event) => settask(event.target.value)} readonly="readonly" />

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Note</div>
                                        </div>
                                        <div className="col-sm-9">
                                            {/* <input className="form-control" type="text" placeholder="Enter note" /> */}
                                            <input className="form-control" type="text" placeholder="Enter note" value={note} onChange={(event) => setnote(event.target.value)} readonly="readonly" />

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className='main-btn'>Confirm</button>
                            <a href="companytable"><button className='main-btn' data-dismiss="modal" aria-label="Close">Cancel</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </>;
};

export default TaskcompanyMaster;