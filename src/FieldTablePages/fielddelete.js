import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TableHeader from '../directives/tableHeader';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useDispatch } from 'react-redux';
import axios from 'axios';
const Fielddelete = () => {
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
        detail_message:"",
        inactive: "",
        note: ""
    });
    const { field, placeholder_message, error_message, detail_message,inactive, note } = user;
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



    // ============= Soniya code ===============
    // Placeholder

    const [features, setFeatures] = useState([]);
    const [fieldplaceholder, setFieldPlaceholder] = useState("")
    const [placeholdermessage, setPlaceholderMessage] = useState("")
    const [errormessage, setErrorMessage] = useState("")
    const [detailmessage, setDetailMessage] = useState("")
    const [noteplaceholder, setNotePlaceholder] = useState("")


    useEffect(() => {
        showData();
    }, []);
    const showData = () => {
        axios.get("http://teammember.techpanda.art/api/user/fieldmaster", {
            headers: {
            'authorization': `Bearer ${access_token}`,
            "content-type": "application/json",
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
                <div className='container'>
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
                            <form>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <label htmlFor="exampleInputEmail1">Username:</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <h6 className="newAddUser">{userData.username}</h6>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-xl-12'>
                            <div className='text-center mb-3'>
                                <h3>Field Master  - Delete Field Forever</h3>
                            </div>
                            <form  className="form-area" >
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Field Name</div>
                                        </div>
                                        <div className="col-sm-8">
                                            {/* <input className="form-control" type="text" placeholder="Enter Field" /> */}
                                            <input placeholder={fieldplaceholder} type="text" className="form-control" value={field} readonly="readonly"onChange={e => onInputChange(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Placeholder Message</div>
                                        </div>
                                        <div className="col-sm-8">
                                            {/* <input className="form-control" type="text" placeholder="Enter message 1" /> */}
                                            <input className="form-control" type="text" placeholder={placeholdermessage} value={placeholder_message}  readonly="readonly" onChange={e => onInputChange(e)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Error Message</div>
                                        </div>
                                        <div className="col-sm-8">
                                            {/* <input className="form-control" type="text" placeholder="Enter message 2" /> */}
                                            <input className="form-control" type="text" placeholder={errormessage} value={error_message} readonly="readonly" onChange={e => onInputChange(e)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Detail Message</div>
                                        </div>
                                        <div className="col-sm-8">
                                            {/* <input className="form-control" type="text" placeholder="Enter message 2" /> */}
                                            <input className="form-control" maxLength={40} type="text" placeholder={detailmessage} value={detail_message} readonly="readonly" onChange={e => onInputChange(e)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Note</div>
                                        </div>
                                        <div className="col-sm-8">
                                            {/* <input className="form-control" type="text" placeholder="Enter note" /> */}
                                            <input className="form-control" type="text" placeholder={noteplaceholder} value={note}  readonly="readonly" onChange={e => onInputChange(e)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <button className='main-btn'
                                    onClick={()=>deleteuser(id)}
                                     >
                                        <span>confirm</span>
                                    </button>
                                    <Link to='/fieldmaster'><button className='main-btn'>
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
export default Fielddelete