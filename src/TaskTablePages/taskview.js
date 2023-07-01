import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TableHeader from '../directives/tableHeader';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useDispatch } from 'react-redux';
import axios from 'axios';


const Taskview = () => {

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
      task: "",
      description: "",
      pyname: "",
      inactive: "",
      notes: ""
    });
  
    const { task, description, pyname, inactive, notes } = user;
    const onInputChange = e => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
  
    useEffect(() => {
      loadUser();
    }, []);

  
    const loadUser = async () => {
      const result = await axios.get(`https://teammember.techpanda.art/api/user/taskmaster/${id}`);
      setUser(result.data);
    };

    const deleteuser = (uid) => {
        // alert(id);
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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
                                <h3>Task Master  - View New Task</h3>
                            </div>
                        </div>

                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-xl-12'>
                            

                            <form  className="form-area">
                            <div className='text-right'>
                                    {/* <button className='main-btn'>
                                        <span>Add</span>
                                    </button> */}
                                    <Link to='/taskmaster'><button className='main-btn'>
                                        <span>Back</span>
                                    </button>
                                    </Link>
                                </div>
                                <div className='views-icons' data-dismiss="modal" aria-label="Close">
                                    <a href="taskadd"><i className="fa fa-plus" aria-hidden="true" /></a>
                                    <Link to={`/taskinactive/${id}`} ><i class="fa fa-times" aria-hidden="true"></i></Link>
                                    <Link to={`/taskactive/${id}`} ><i class="fa fa-check" aria-hidden="true"></i></Link>
                                    <Link to={`/taskmaster/copy/${id}`} >
                                        <i class="fa fa-clipboard" aria-hidden="true"></i>
                                    </Link>
                                    <Link to={`/taskmaster/edit/${id}`} >
                                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                    </Link>
                                    <a><i onClick={()=>deleteuser(id)} class="fa fa-trash" aria-hidden="true"></i></a>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Task Name</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="text" placeholder={taskplaceholder} value={task} onChange={e => onInputChange(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Description</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="text" placeholder={descriptionplaceholder} value={description} onChange={e => onInputChange(e)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Pyname</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="text" placeholder={pynameplaceholder} value={pyname} onChange={e => onInputChange(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Note</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" type="text" placeholder={noteplaceholder} value={notes} onChange={e => onInputChange(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    {/* <button className='main-btn'>
                                        <span>Add</span>
                                    </button> */}
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
        </>
    )
}

export default Taskview