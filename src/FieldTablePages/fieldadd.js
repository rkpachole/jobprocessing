import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TableHeader from '../directives/tableHeader';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios';


const Fieldadd = () => {
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
    const [field, setfield] = useState()
    const [placeholder_message, setplaceholder_message] = useState()
    const [error_message, seterror_message] = useState()
    const [inactive, setinactive] = useState()
    const [note, setnote] = useState()
    const [detail_message, setdetail_message] = useState()
    const [CustomData, setCustomData] = useState([])
    const [datasave, setData] = useState([]);
    const [newData, setNewData] = useState({
        id: id,
        field: field,
        placeholder_message: placeholder_message,
        error_message: error_message,
        inactive: inactive,
        note: note,
        detail_message: detail_message,
    }); // state to hold the data to be posted to the API

    const LoginFunctionfield = (event) => {
        event.preventDefault();
        setData([...datasave, newData]);
        let Data = {
            id: id,
            field: field,
            placeholder_message: placeholder_message,
            error_message: error_message,
            inactive: inactive,
            note: note,
            detail_message: detail_message,
        }
        setfield("")
        setplaceholder_message("")
        seterror_message("")
        setinactive("")
        setnote("")
        setdetail_message("")
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${access_token}`,

        };
        fetch(`https://teammember.techpanda.art/api/user/fieldmaster/`, {
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
                    setfieldaddsuc(true)
                } else if (Response.field == "field master with this field already exists.") {
                    // alert("this name and pass"),
                    setfieldaddin(true)
                } else if (Response.field == "This field is required.") {
                    setfielderror(true)
                }
            })
            .catch((error) => {
                console.error("ERROR FOUND" + error);

            })

    }

    const [fieldaddsuc, setfieldaddsuc] = useState(false)
    const [fieldaddin, setfieldaddin] = useState(false)
    const [fielderror, setfielderror] = useState(false)

    useEffect(() => {
        const searchfetchData3 = async () => {
            const response = await fetch(`https://teammember.techpanda.art/api/user/fieldmaster/`);
            const apiData = await response.json();
            setCustomData(apiData);
            // setsearchapi3(apiData);
        };
        searchfetchData3();
    }, []);


    const fieldpagerefresh = () => {
        window.location.reload(false);
    }

    /////placeholder//////

    // const [plac,setPlace]= useState()
    // const placeholder = () => {
    //     // event.preventDefault();
    //     var headers = {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',

    //     };
    //     fetch(``, {
    //         method: 'GET',
    //         headers: headers,
    //     })
    //         .then((Response) => Response.json())
    //         .then((Response) => {


    //             console.log('RESPONS  placeholder------321------->>>>', Response)

    //         })
    //         .catch((error) => {
    //             console.error("ERROR FOUND" + error);
    //         })
    // }



    // import toast, { Toaster } from 'react-hot-toast';
    const NOW = () => {
        toast.success("hello")
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
                "content-type": "application/json",
            'authorization': `Bearer ${access_token}`,

                
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
            <Toaster />
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
                            <h3>Field Master  - Add New Field</h3>
                        </div>


                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-xl-12'>



                            <form onSubmit={LoginFunctionfield} className="form-area">
                                <div className='text-right mb-3'>
                                    <button className='main-btn' data-toggle="modal" data-target=".error-popup">
                                        <span>Add</span>
                                    </button>
                                    <Link to='/fieldmaster'><button className='main-btn'>
                                        <span>Back</span>
                                    </button>
                                    </Link>
                                </div>

                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="form-label">Field Name</div>
                                        </div>

                                        <div className="col-sm-8">

                                            <input className="form-control" list='fieldsearch' type="text" placeholder={fieldplaceholder} value={field} onChange={(event) => setfield(event.target.value)} />

                                            <datalist id='fieldsearch'>
                                                {CustomData.map(res => {
                                                    return (
                                                        <option>{res.field}</option>
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
                                            <div className="form-label">Placeholder Message</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" list='fieldsearchmass1' type="text" value={placeholder_message} placeholder={placeholdermessage} onChange={(event) => setplaceholder_message(event.target.value)} />
                                            <datalist id='fieldsearchmass1'>
                                                {
                                                    CustomData.map(res => {
                                                        return (
                                                            <option>{res.placeholder_message}</option>
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
                                            <div className="form-label">Error Message</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" list='fieldsearchmass2' type="text" value={error_message} placeholder={errormessage} onChange={(event) => seterror_message(event.target.value)} />
                                            <datalist id='fieldsearchmass2'>
                                                {
                                                    CustomData.map(res => {
                                                        return (
                                                            <option>{res.error_message}</option>
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
                                            <div className="form-label">Detail Message</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" maxLength={40} list='fieldsearchmassdetail' type="text" value={detail_message} placeholder={detailmessage} onChange={(event) => setdetail_message(event.target.value)} />
                                            <datalist id='fieldsearchmassdetail'>
                                                {
                                                    CustomData.map(res => {
                                                        return (
                                                            <option>{res.detail_message}</option>
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
                                            <div className="form-label">Note</div>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="form-control" list='fieldsearchnote' type="text" value={note} placeholder={noteplaceholder} onChange={(event) => setnote(event.target.value)} />
                                            <datalist id='fieldsearchnote'>
                                                {
                                                    CustomData.map(res => {
                                                        return (
                                                            <option>{res.note}</option>
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


            <button onClick={NOW}>NOW</button>

            {/* Error modal */}
            <div className="modal fade error-popup" tabIndex={-1} role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header newM">
                            {fieldaddsuc ? (<h2>Your Field is Created.</h2>) : null
                            }
                            {fieldaddin ? (<h3>Field Master with this Field already exists.</h3>) : null
                            }
                            {fielderror ? (<h3>This Field is Required.</h3>) : null
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
export default Fieldadd

