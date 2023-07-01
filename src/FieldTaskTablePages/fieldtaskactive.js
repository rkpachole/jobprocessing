import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import TableHeader from '../directives/tableHeader';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Fieldtaskactive = () => {

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


// ============= Soniya code ===============
    // Placeholder

    const [features, setFeatures] = useState([]);
    const [fieldplaceholder, setFieldPlaceholder] = useState("")
    const [placeholdermessage, setPlaceholderMessage] = useState("")
    const [errormessage, setErrorMessage] = useState("")
    const [detailmessage, setDetailMessage] = useState("")
    const [noteplaceholder, setNotePlaceholder] = useState("")
    const [taskplaceholder, setTaskPlaceholder] = useState("")
    const [descriptionplaceholder, setDescriptionPlaceholder] = useState("")
    const [pynameplaceholder, setPynamePlaceholder] = useState("")
    const [inactiveplaceholder, setInactivePlaceholder] = useState("")

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
                console.log(data.data);
                const tttt = [];
                tttt.push(data.data);
                console.log("dddd", tttt[0].length);
                const tFeatures = [];
                for (var i = 0; i < tttt[0].length; i++) {
                    tFeatures.push(data.data[i]);
                    console.log("tFeatures", tFeatures[i].id);
                    if (tFeatures[i].field === "field") {
                        console.log(tFeatures[i].placeholder_message);
                        setFieldPlaceholder(tFeatures[i].placeholder_message)
                    }
                    if (tFeatures[i].field === "placeholder_message") {
                        console.log(tFeatures[i].placeholder_message);
                        setPlaceholderMessage(tFeatures[i].placeholder_message)
                    }
                    if (tFeatures[i].field === "error_message") {
                        console.log(tFeatures[i].placeholder_message);
                        setErrorMessage(tFeatures[i].placeholder_message)
                    }
                    if (tFeatures[i].field === "detail_message") {
                        console.log(tFeatures[i].placeholder_message);
                        setDetailMessage(tFeatures[i].placeholder_message)
                    }
                    if (tFeatures[i].field === "note") {
                        console.log(tFeatures[i].placeholder_message);
                        setNotePlaceholder(tFeatures[i].placeholder_message)
                    }
                    if (tFeatures[i].field === "task") {
                        console.log(tFeatures[i].placeholder_message);
                        setTaskPlaceholder(tFeatures[i].placeholder_message)
                    }
                    if (tFeatures[i].field === "description") {
                        console.log(tFeatures[i].placeholder_message);
                        setDescriptionPlaceholder(tFeatures[i].placeholder_message)
                    }
                    if (tFeatures[i].field === "pyname") {
                        console.log(tFeatures[i].placeholder_message);
                        setPynamePlaceholder(tFeatures[i].placeholder_message)
                    }
                    if (tFeatures[i].field === "inactive") {
                        console.log(tFeatures[i].placeholder_message);
                        setInactivePlaceholder(tFeatures[i].placeholder_message)
                    }
                    else {
                        // console.log("false");
                    }
                }
                tFeatures.push(data.data[3].placeholder_message);
                console.log(tFeatures);
                setFeatures(tFeatures)
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
                                <h3>Task Field Master  - Make Task Field Master record Active Again</h3>
                            </div>
                        </div>

                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-xl-12'>

                            <form className="form-area">
                                
                                <div className="container fluid">
                                <div className='text-right mb-3'>
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
                                                                <input placeholder={taskplaceholder} list='tasksearchtask' type="text" className="form-control" />
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
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder={descriptionplaceholder} />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Pyname</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder={pynameplaceholder} />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Note</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder={noteplaceholder} />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Inactive</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder={inactiveplaceholder} />
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
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder={fieldplaceholder} />
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
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder={placeholdermessage} />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Error Message</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder={errormessage} />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Detail Message</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder={detailmessage} />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Note</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder={noteplaceholder} />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Inactive</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text" placeholder={inactiveplaceholder} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="end-record">
                                        <h6>Task field Master Record Information</h6>
                                        <div className="row mt-3">
                                            <div className="col-sm-6">
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <div className="form-label">Note</div>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <input className="form-control" type="text" placeholder={noteplaceholder} />
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
                                        <button className='main-btn'>
                                            <span>Confirm</span>
                                        </button>
                                        <Link to='/fieldtasktable'>
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

export default Fieldtaskactive