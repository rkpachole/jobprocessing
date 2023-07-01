import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TableHeader from '../directives/tableHeader';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useDispatch } from 'react-redux';
import axios from 'axios';


const Taskadd = () => {

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


    const [id, setID] = useState()
    const [task, settask] = useState()
    const [description, setdescription] = useState()
    const [pyname, setpyname] = useState()
    const [inactive, setinactive] = useState()
    const [notes, setnotes] = useState()
    const [CustomData, setCustomData] = useState([])
    const [datasave, setData] = useState([]);
    const [newData, setNewData] = useState({
        id: id,
        task: task,
        description: description,
        pyname: pyname,
        inactive: inactive,
        notes: notes,
    }); // state to hold the data to be posted to the API
    const LoginFunctiontask = (event) => {
        event.preventDefault();
        setData([...datasave, newData]);
        let Data = {
            id: id,
            task: task,
            description: description,
            pyname: pyname,
            inactive: inactive,
            notes: notes,
        }
        settask("")
        setdescription("")
        setpyname("")
        setinactive("")
        setnotes("")
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(`https://teammember.techpanda.art/api/user/taskmaster/`, {
            method: 'POST',
            body: JSON.stringify(Data),
            headers: headers,
        })
            .then((Response) => Response.json())
            .then((Response) => {
                //  const loggedIn = AsyncStorage.setItem('loggedIn', JSON.stringify(true))
                console.log('RESPONSE apiiii-11111111------------->>>>', Response)
                // setData(data)
                if (Response.msg == "Created") {
                    // alert("sssssssssfull"),
                    settaskaddsuc(true)
                } else if (Response.task == "task master with this task already exists.") {
                    // alert("this name and pass"),
                    settaskaddin(true)
                } else if (Response.task == "This field is required.") {
                    settaskerror(true)
                }
                else if (Response.description == "This field is required.") {
                    settaskerror(true)
                }
                else if (Response.pyname == "This field is required.") {
                    settaskerror(true)
                }
            })
            .catch((error) => {
                // console.error("ERROR FOUND" + error);

            })

    }

    const [taskaddsuc, settaskaddsuc] = useState(false)
    const [taskaddin, settaskaddin] = useState(false)
    const [taskerror, settaskerror] = useState(false)


    useEffect(() => {
        const searchfetchData3 = async () => {
            const response = await fetch(`https://teammember.techpanda.art/api/user/taskmaster/`);
            const apiData = await response.json();
            setCustomData(apiData);
            // setsearchapi3(apiData);
        };
        searchfetchData3();
    }, []);

    const fieldpagerefresh = () => {
        window.location.reload(false);
    }


    // ============= Soniya code ===============
    // Placeholder

    const [features, setFeatures] = useState([]);
    const [taskplaceholder, setTaskPlaceholder] = useState("")
    const [descriptionplaceholder, setDescriptionPlaceholder] = useState("")
    const [pynameplaceholder, setPynamePlaceholder] = useState("")
    const [noteplaceholder, setNoteplaceholder] = useState("")


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
                    if (tFeatures[i].field === "note") {
                        console.log(tFeatures[i].placeholder_message);
                        setNoteplaceholder(tFeatures[i].placeholder_message)
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
            {/* {taskaddsuc ? (alert("loginsuccess")) : null}
            {taskaddin ? (alert("task master with this task already exists.")) : null} */}
            <TableHeader />
            <section>
                <div className='container-fluid'>
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
                                            <label htmlFor="exampleInputEmail1">User Code:</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <h6 className="newAddUser">{userData.user_code}</h6>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-4">
                        <div className='text-center mb-3'>
                                <h3>Task Master  - Add New task</h3>
                            </div>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-xl-12'>
                            
                            <form onSubmit={LoginFunctiontask} className="form-area">
                            <div className='text-right mb-3'>
                                    <button className='main-btn' data-toggle="modal" data-target=".error-popup">
                                        <span>Add</span>
                                    </button>
                                    <Link to='/taskmaster'><button className='main-btn'>
                                        <span>Back</span>
                                    </button>
                                    </Link>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Task Name</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" list='tasksearch' type="text" placeholder={taskplaceholder} value={task} onChange={(event) => settask(event.target.value)} />
                                            <datalist id='tasksearch'>
                                                {
                                                    CustomData.map(res => {
                                                        return (
                                                            <option>{res.task}</option>
                                                        )
                                                    })
                                                }
                                            </datalist>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Description</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" list='tasksearchmass1' type="text" value={description} placeholder={descriptionplaceholder} onChange={(event) => setdescription(event.target.value)} />
                                            <datalist id='tasksearchmass1'>
                                                {
                                                    CustomData.map(res => {
                                                        return (
                                                            <option>{res.description}</option>
                                                        )
                                                    })
                                                }
                                            </datalist>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Pyname</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" list='tasksearchmass2' type="text" value={pyname} placeholder={pynameplaceholder} onChange={(event) => setpyname(event.target.value)} />
                                            <datalist id='tasksearchmass2'>
                                                {
                                                    CustomData.map(res => {
                                                        return (
                                                            <option>{res.pyname}</option>
                                                        )
                                                    })
                                                }
                                            </datalist>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Notes</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" list='tasksearchnotes' type="text" value={notes} placeholder={noteplaceholder} onChange={(event) => setnotes(event.target.value)} />
                                            <datalist id='tasksearchnotes'>
                                                {
                                                    CustomData.map(res => {
                                                        return (
                                                            <option>{res.notes}</option>
                                                        )
                                                    })
                                                }
                                            </datalist>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <button className='main-btn' data-toggle="modal" data-target=".error-popup">
                                        <span>Add</span>
                                    </button>
                                    <Link to='/taskmaster'><button className='main-btn'>
                                        <span>Back</span>
                                    </button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Error modal */}
            <div className="modal fade error-popup" tabIndex={-1} role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header newM">
                            {taskaddsuc ? (<h2>Your Task is Created.</h2>) : null
                            }
                            {taskaddin ? (<h3>Task Master with this Task already exists.</h3>) : null
                            }
                            {taskerror ? (<h3>This Task , description and pyname is Required.</h3>) : null
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
export default Taskadd

