import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TableHeader from '../directives/tableHeader';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useDispatch } from 'react-redux';
import { selectClasses } from '@mui/material';
import axios from 'axios';


const Fieldtaskadd = () => {

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

    // taskfield table////


    const [id, setId] = useState()
    const [field, setfield] = useState()
    const [placeholder_message, setplaceholder_message] = useState()
    const [error_message, seterror_message] = useState()
    const [detail_message, setdetail_message] = useState()
    const [note, setnote] = useState()
    const [task, settask] = useState()
    const [description, setdescription] = useState()
    const [pyname, setpyname] = useState()
    const [notes, setnotes] = useState()
    const [inactive, setinactive] = useState("")
    // const [CustomData, setCustomData] = useState([])
    const [datasave, setData] = useState([]);
    const [newData, setNewData] = useState({
        id: id,

        field: field,
        placeholder_message: placeholder_message,
        error_message: error_message,
        detail_message: detail_message,
        note: note,
        task: task,
        description: description,
        pyname: pyname,
        notes: notes,
        inactive: inactive,
    });
    const LoginFunctiontaskfield = (event) => {
        event.preventDefault();
        setData([...datasave, newData]);
        let Data = {
            id: id,

            field: field,
            placeholder_message: placeholder_message,
            error_message: error_message,
            detail_message: detail_message,
            note: note,
            task: task,
            description: description,
            pyname: pyname,
            notes: notes,
            inactive: inactive,
        }
        setfield("")
        setplaceholder_message("")
        seterror_message("")
        setdetail_message("")
        setnote("")
        settask()
        setdescription("")
        setpyname("")
        setnotes("")
        setinactive("")
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        };
        fetch(`https://teammember.techpanda.art/api/user/taskfieldmaster/`, {
            method: 'POST',
            body: JSON.stringify(Data),
            headers: headers,
        })
            .then((Response) => Response.json())
            .then((Response) => {
                console.log('RESPONSE apiiii-11111111------------->>>>', Response)


            })
            .catch((error) => {
                console.error("ERROR FOUND" + error);
            })
    }


    // selectClassesfield////
    const [getcountry, setCountry] = useState([]);
    const [getCountryid, setCountryid] = useState("");
    const [getrowdata, setGetrowdata] = useState([]);
    useEffect(() => {
        const getcountrydata = async () => {
            const reqData = await fetch("https://teammember.techpanda.art/api/user/fieldmaster/");
            const resData = await reqData.json();
            setCountry(await resData);
        };
        getcountrydata();
    }, []);
    const handlecountry = (event) => {
        const getCountryid = event.target.value;
        setCountryid(getCountryid);
    };
    useEffect(() => {
        const getCountryrowdata = async () => {
            const reqCountryrowdata = await fetch(
                `https://teammember.techpanda.art/api/user/fieldmaster/${getCountryid}`
            );
            const reqcountryrowdata = await reqCountryrowdata.json();
            setGetrowdata(await reqcountryrowdata);
        };
        getCountryrowdata();
    }, [getCountryid]);



    ////slectsearchtask////
    const [getcountry1, setCountry1] = useState([]);
    const [getCountryid1, setCountryid1] = useState("");
    const [getrowdata1, setGetrowdata1] = useState([]);
    useEffect(() => {
        const getcountrydata1 = async () => {
            const reqData = await fetch("https://teammember.techpanda.art/api/user/taskmaster/");
            const resData = await reqData.json();
            setCountry1(await resData);
        };
        getcountrydata1();
    }, []);
    const handlecountry1 = (event) => {
        const getCountryid1 = event.target.value;
        setCountryid1(getCountryid1);
    };
    useEffect(() => {
        const getCountryrowdata1 = async () => {
            const reqCountryrowdata1 = await fetch(
                `https://teammember.techpanda.art/api/user/taskmaster/${getCountryid1}`
            );
            const reqcountryrowdata1 = await reqCountryrowdata1.json();
            setGetrowdata1(await reqcountryrowdata1);
        };
        getCountryrowdata1();
    }, [getCountryid1]);


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
                                <h3>Task Field Master - Add Task Field Master Record</h3>
                            </div>
                        </div>

                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-xl-12'>

                            <form className="form-area"
                                onSubmit={LoginFunctiontaskfield}>
                                <div className='text-right mb-3'>
                                    <button className='main-btn'>
                                        <span>Save</span>
                                    </button>
                                    <Link to='/taskfieldmaster'>
                                        <button className='main-btn'>
                                            <span>Back</span>
                                        </button>
                                    </Link>
                                </div>
                                <div className="container fluid">
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
                                                                {/* <input placeholder="Enter task" list='fieldsearchtfnnpdt' type="text" className="form-control"
                                                                    onChange={(event) => settask(event.target.value)}
                                                                /> */}
                                                                <select
                                                                    name="country"
                                                                    className="form-control p-2"
                                                                    onInput={(e) => handlecountry1(e)}
                                                                    // value={task}
                                                                    onChange={(event) => settask(event.target.value)}
                                                                >
                                                                    <option value="">{taskplaceholder}</option>
                                                                    {getcountry1.map((resCountry, index) => (
                                                                        <option key={index} value={resCountry.id}>
                                                                            {resCountry.task}
                                                                        </option>
                                                                    ))}
                                                                </select>

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
                                                                <input className="form-control" list='fieldsearchtfnnpd' type="text" placeholder={descriptionplaceholder}
                                                                    value={getrowdata1.description} onChange={(e) => handlecountry1(e)} />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Pyname</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='fieldsearchtfnnp' type="text" placeholder={pynameplaceholder}
                                                                    value={getrowdata1.pyname} onChange={(event) => setpyname(event.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Note</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='fieldsearchtfnn' type="text"
                                                                    value={getrowdata1.notes} onChange={(event) => setnotes(event.target.value)} placeholder={noteplaceholder} />

                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Inactive</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='tasksearchfield' type="text"
                                                                    value={getrowdata1.inactive} onChange={(event) => setinactive(event.target.value)} placeholder={inactiveplaceholder} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                        {/* fieldtable  */}


                                        <div className="col-sm-6">
                                            <div className="fieldtasktable-area">
                                                <form>
                                                    <div className="form-group mb-3">
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Field Name</h6></div>
                                                            <div className="col-sm-6">
                                                                {/* <input className="form-control" list='fieldsearchtf' type="text" placeholder="field"
                                                                    value={field} onChange={(event) => setfield(event.target.value)}
                                                                /> */}
                                                                <select
                                                                    name="country"
                                                                    className="form-control p-2"
                                                                    onInput={(e) => handlecountry(e)}
                                                                    onChange={(event) => setfield(event.target.value)}
                                                                // value={field}
                                                                >
                                                                    <option value="">{fieldplaceholder}</option>
                                                                    {getcountry.map((resCountry, index) => (
                                                                        <option key={index} value={resCountry.id}>
                                                                            {resCountry.field}
                                                                        </option>
                                                                    ))}
                                                                </select>

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
                                                                <input className="form-control" type="text"
                                                                    placeholder={placeholdermessage}
                                                                    value={getrowdata.placeholder_message} list='fieldsearchtftt' onChange={(event) => setplaceholder_message(event.target.value)}
                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Error Message</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='fieldsearchtfttee' type="text" placeholder={errormessage}
                                                                    value={getrowdata.error_message} onChange={(event) => seterror_message(event.target.value)}

                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Detail Message</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='fieldsearchtfttee' type="text" placeholder={detailmessage}
                                                                    value={getrowdata.detail_message} onChange={(event) => setdetail_message(event.target.value)}

                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Note</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" list='fieldsearchtftteerr' type="text" placeholder={noteplaceholder}
                                                                    value={getrowdata.note} onChange={(event) => setnote(event.target.value)}
                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className='col-sm-4'><h6>Inactive</h6></div>
                                                            <div className="col-sm-6">
                                                                <input className="form-control" type="text"
                                                                    value={getrowdata.inactive} onChange={(event) => setinactive(event.target.value)} placeholder={inactiveplaceholder} />
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
                                                        <input className="form-control" list='tasksearchnote' type="text" placeholder={noteplaceholder} />

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
                                            <span>Save</span>
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
export default Fieldtaskadd