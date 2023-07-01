import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TableHeader from '../directives/tableHeader';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useDispatch } from 'react-redux';
import axios from 'axios';


const Fieldtaskdelete = () => {

    const dispatch = useDispatch()
    const { access_token } = getToken()
    const { data, isSuccess } = useGetLoggedUserQuery(access_token)

    const [userData, setUserData] = useState({
        text: "",
        username: "",
        user_code: "",
        company: ""

    })

    // Store User Data in Local State
    useEffect(() => {
        if (data && isSuccess) {
            setUserData({
                email: data.email,
                username: data.username,
                user_code: data.user_code,
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
                user_code: data.user_code,
                company: data.company
            }))
        }
    }, [data, isSuccess, dispatch])

    const { id } = useParams();
    const [user, setUser] = useState({
        field: "",
        placeholder_message: "",
        error_message: "",
        inactive: "",
        note: "",
        detail_message: ""
    });

    const { field, placeholder_message, error_message, detail_message, inactive, note } = user;
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUser();
    }, []);


    const loadUser = async () => {
        const result = await axios.get(`https://teammember.techpanda.art/api/user/fieldmaster/${id}`);
        setUser(result.data);
    };

    const [usert, setUsert] = useState({
        task: "",
        description: "",
        pyname: "",
        inactive: "",
        notes: ""
    });

    const { task, description, pyname, notes } = usert;
    const onInputChanget = e => {
        setUsert({ ...usert, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUsert();
    }, []);


    const loadUsert = async () => {
        const result = await axios.get(`https://teammember.techpanda.art/api/user/taskmaster/${id}`);
        setUsert(result.data);
    };

    const deleteuser = (uid) => {
        // alert(id);
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${access_token}`,

        };
        fetch(`https://teammember.techpanda.art/api/user/fieldmaster/${uid}`, {
            method: "DELETE",
            headers: headers,
        })
            .then((resp) => {
                console.log(resp)
        // loadUser();
            })
    }

    const deleteusertask = (uid) => {
        // alert(id);
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${access_token}`,

        };
        fetch(`https://teammember.techpanda.art/api/user/taskmaster/${uid}`, {
            method: "DELETE",
            headers: headers,
        })
            .then((resp) => {
                console.log(resp)
        // loadUser();
            })
    }

    return (
        <>
            <TableHeader />
            <section>
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col-lg-3">
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
                                            <label htmlFor="exampleInputEmail1">User Code:</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <h6 className="newAddUser">{userData.user_code}</h6>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-5">
                            <div className='text-center mb-3'>
                                <h3>Task Field Master  - Delete Task Field Master record Forever</h3>
                            </div>
                        </div>

                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-xl-12'>

                            <form className="form-area">

                                <div className="container fluid mb-3">
                                    <div className='text-right'>
                                        <button className='main-btn'>
                                            <span>Confirm</span>
                                        </button>
                                        <Link to='/taskfieldmaster'>
                                            <button className='main-btn'>
                                                <span>Back</span>
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="fieldtasktable-area">
                                                <form>
                                                    <div className="form-group mb-3">
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'>
                                                                <h6>Task Name</h6>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <input placeholder="Enter task" list='tasksearchtask' type="text" value={task} onChange={e => onInputChanget(e)} className="form-control" />
                                                            </div>
                                                            <div className="col-sm-2 p-0">
                                                                <div className="table-recode" data-dismiss="modal" aria-label="Close">
                                                                    <a href="taskadd" ><i class="fa fa-plus" aria-hidden="true"></i></a>
                                                                    <a href="taskview"><i className="fa fa-eye" aria-hidden="true" /></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Description</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder="Enter Description" value={description} onChange={e => onInputChanget(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Pyname</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder="Enter Pyname" value={pyname} onChange={e => onInputChanget(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Note</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder="Enter Note" value={notes} onChange={e => onInputChanget(e)}/>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Inactive</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder="Enter Inactive" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="fieldtasktable-area">
                                                <form>
                                                    <div className="form-group mb-3">
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Field Name</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder="field" value={field} onChange={e => onInputChange(e)} />
                                                            </div>
                                                            <div className="col-sm-2 p-0">
                                                                <div className="table-recode" data-dismiss="modal" aria-label="Close">
                                                                    <a href="fieldadd"><i className="fa fa-plus" aria-hidden="true" /></a>
                                                                    <a href="fieldview"><i className="fa fa-eye" aria-hidden="true" /></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Placeholder Message</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder="Enter Placeholder Message" value={placeholder_message} onChange={e => onInputChange(e)}/>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Error Message</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder="Enter Error Message" value={error_message} onChange={e => onInputChange(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Detail Message</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder="Enter Note" value={detail_message} onChange={e => onInputChange(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Note</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder="Enter Note" value={note} onChange={e => onInputChange(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Inactive</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder="Enter Inactive" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="end-record">
                                        <h6>task field Master Record Information</h6>
                                        <div className="row mt-3">
                                            <div className="col-sm-6">
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <div className="form-label">Note</div>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <input className="form-control" type="text" placeholder="note" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" defaultValue="option2" />
                                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                                        Task Field Record Restricted
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-right'>
                                        <button className='main-btn' onInput={()=>deleteusertask(id)} onClick={()=>deleteuser(id)}>
                                            <span>Confirm</span>
                                        </button>
                                        <Link to='/taskfieldmaster'>
                                            <button className='main-btn'>
                                                <span>Back</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Fieldtaskdelete