import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import ChangePassword from './auth/ChangePassword';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useEffect, useState } from 'react';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import TableHeader from "../directives/tableHeader";
import axios from 'axios';
import _ from 'lodash';


const Taskfieldmaster = () => {
    const handleLogout = () => {
        dispatch(unsetUserInfo({ username: "", email: "", company: "", user_code: "" }))
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
        user_code: "",
        company: ""
    })

    // //////fieldview///







    // Store User Data in Local State
    useEffect(() => {
        if (data && isSuccess) {
            setUserData({
                email: data.email,
                username: data.username,
                company: data.company,
                user_code: data.user_code,
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



    // ..//////////tarun/////
    // ..//////////tarun/////


    // For Field Table...
    const { id } = useParams();
    // const [CustomData, setCustomData] = useState([])

    const [CustomData, setCustomData] = useState([])

    // state to hold the API data
    // state to hold the data to be posted to the API
    useEffect(() => {
        get()
    }, [])
    // // function to handle form submission
    const get = () => {
        // event.preventDefault();
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        };
        fetch(`https://teammember.techpanda.art/api/user/fieldmaster/`, {
            method: 'GET',
            // credentials: 'same-origin',
            headers: headers,
        })
            .then((Response) => Response.json())
            .then((Response) => {
                // setpagined(_(Response).slice(0).take(pageSize).value());

                console.log('RESPONS get api-------------->>>>', Response)
                var states = Object.keys(Response).length;
                console.log('length api data states----->>>>>', states)
                let CityArray = [];
                for (var i = 0; i < states; i++) {
                    // console.log('for loop',states)
                    CityArray.push({
                        // id: Response[i].id,
                        field: Response[i].field,
                        placeholder_message: Response[i].placeholder_message,
                        error_message: Response[i].error_message,
                        inactive: Response[i].inactive,
                        note: Response[i].note,
                    })
                }
                console.log('custom aray data', CityArray)
                setCustomData(CityArray)
            })
            .catch((error) => {
                console.error("ERROR FOUND" + error);
            })
    }
    const [searchTerm4, setSearchTerm4] = useState('');
    const [searchapi4, setsearchapi4] = useState([])
    useEffect(() => {
        const searchfetchData4 = async () => {
            const response = await fetch(`https://teammember.techpanda.art/api/user/fieldmaster/`);
            const apiData = await response.json();
            setCustomData(apiData);
            setsearchapi4(apiData);
        };
        searchfetchData4();
    }, []);
    const inputsearch4 = (e) => {
        if (e.target.value == '') {
            setCustomData(searchapi4)
        }
        else {
            const filterres = searchapi4.filter(item => item.field.toLowerCase().includes(e.target.value.toLowerCase()))
            setCustomData(filterres)
        }
        setSearchTerm4(e.target.value)

    }
    const fieldtabledatashow = useLocation()
    // console.log("fieldtabledatashow", fieldtabledatashow.state.Item)

    ////task table///


    // const [id, setID] = useState()
    const { uid } = useParams();

    const [CustomData1, setCustomData1] = useState([])
    // state to hold the data to be posted to the API
    useEffect(() => {
        get1()
        urlapi()
        getacesstaskfield()
    }, [])
    // // function to handle form submission
    const get1 = () => {
        // event.preventDefault();
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(`https://teammember.techpanda.art/api/user/taskmaster/`, {
            method: 'GET',

            headers: headers,
        })
            .then((Response) => Response.json())
            .then((Response) => {
                //  const loggedIn = AsyncStorage.setItem('loggedIn', JSON.stringify(true))
                // setData(Response)
                // setpagined(_(Response).slice(0).take(pageSize).value());

                console.log('RESPONS get api---tarunghsdgcjhsdjh----------->>>>', Response)
                var states = Object.keys(Response).length;
                console.log('length api data states----->>>>>', states)
                let CityArray = [];
                for (var i = 0; i < states; i++) {
                    // console.log('for loop',states)
                    CityArray.push({
                        // id: Response[i].id,
                        task: Response[i].task,
                        description: Response[i].description,
                        pyname: Response[i].pyname,
                        inactive: Response[i].inactive,
                        notes: Response[i].notes,
                    })
                }
                console.log('custom aray data', CityArray)
                setCustomData1(CityArray)
            })
            .catch((error) => {
                console.error("ERROR FOUND" + error);
            })
    }


    const [searchTerm, setSearchTerm] = useState('');
    const [searchapi, setsearchapi] = useState([])
    useEffect(() => {
        const searchfetchData = async () => {
            const response = await fetch(`https://teammember.techpanda.art/api/user/taskmaster/`);
            const apiData = await response.json();
            setCustomData1(apiData);
            setsearchapi(apiData);
        };
        searchfetchData();
    }, []);
    const inputsearch = (e) => {
        if (e.target.value == '') {
            setCustomData1(searchapi)
        }
        else {
            const filterres = searchapi.filter(item => item.task.toLowerCase().includes(e.target.value.toLowerCase()))
            setCustomData1(filterres)
        }
        setSearchTerm(e.target.value)

    }


    // ///////////descprision///
    const [searchTerm1, setSearchTerm1] = useState('');
    const [searchapi1, setsearchapi1] = useState([])
    useEffect(() => {
        const searchfetchData1 = async () => {
            const response = await fetch(`https://teammember.techpanda.art/api/user/taskmaster/`);
            const apiData = await response.json();
            setCustomData1(apiData);
            setsearchapi1(apiData);
        };
        searchfetchData1();
    }, []);
    const inputsearch1 = (e) => {
        if (e.target.value == '') {
            setCustomData1(searchapi1)
        }
        else {
            const filterresdd = searchapi1.filter(items => items.description.toLowerCase().includes(e.target.value.toLowerCase()))
            setCustomData1(filterresdd)
        }
        setSearchTerm1(e.target.value)

    }

    // ///////pyname///
    const [searchTerm2, setSearchTerm2] = useState('');
    const [searchapi2, setsearchapi2] = useState([])
    useEffect(() => {
        const searchfetchData2 = async () => {
            const response = await fetch(`https://teammember.techpanda.art/api/user/taskmaster/`);
            const apiData = await response.json();
            setCustomData1(apiData);
            setsearchapi2(apiData);
        };
        searchfetchData2();
    }, []);
    const inputsearch2 = (e) => {
        if (e.target.value == '') {
            setCustomData1(searchapi2)
        }
        else {
            const filterres = searchapi2.filter(item => item.pyname.toLowerCase().includes(e.target.value.toLowerCase()))
            setCustomData1(filterres)
        }
        setSearchTerm2(e.target.value)

    }
    ///note>///
    const [searchTerm3, setSearchTerm3] = useState('');
    const [searchapi3, setsearchapi3] = useState([])
    useEffect(() => {
        const searchfetchData3 = async () => {
            const response = await fetch(`https://teammember.techpanda.art/api/user/taskmaster/`);
            const apiData = await response.json();
            setCustomData1(apiData);
            setsearchapi3(apiData);
        };
        searchfetchData3();
    }, []);
    const inputsearch3 = (e) => {
        if (e.target.value == '') {
            setCustomData1(searchapi3)
        }
        else {
            const filterres = searchapi3.filter(item => item.notes.toLowerCase().includes(e.target.value.toLowerCase()))
            setCustomData1(filterres)
        }
        setSearchTerm3(e.target.value)

    }



    // pagination field table///

    // const [currentpage, setCurrentPage] = useState(1)
    // const recordpage = 10;
    // const Lastindex = currentpage * recordpage;
    // const Firstindex = Lastindex - recordpage;
    // const records = CustomData.slice(Firstindex, Lastindex);
    // const npage = Math.ceil(CustomData.length / recordpage)
    // const numbers = [...Array(npage + 1).keys()].slice(1)


    // const chnacPage = (pageNo) => {
    //     setCurrentPage(pageNo);
    //     const startIndex = (pageNo - 1) * recordpage;
    //     const pagined = (CustomData).slice(startIndex).take(recordpage).value();
    //     setCurrentPage(pagined)
    // }




    // const pageSize = 10;
    // const [pagined, setpagined] = useState()
    // const [currentpage, setcurrentpage] = useState()

    // const pageCount = CustomData ? Math.ceil(CustomData.length / pageSize) : 0;
    // // if (pageCount === 1) return null;
    // const pages = _.range(1, pageCount + 1)

    // const pagination = (pageNo) => {
    //     setcurrentpage(pageNo);
    //     const startIndex = (pageNo - 1) * pageSize;
    //     const pagined = _(CustomData).slice(startIndex).take(pageSize).value();
    //     setpagined(pagined);
    // }




    ////////tasktable///
    const [currentpage1, setCurrentPage1] = useState(1)
    const recordpage1 = 10;
    const Lastindex1 = currentpage1 * recordpage1;
    const Firstindex1 = Lastindex1 - recordpage1;
    const records1 = CustomData1.slice(Firstindex1, Lastindex1);
    const npage1 = Math.ceil(CustomData1.length / recordpage1)
    const numbers1 = [...Array(npage1 + 1).keys()].slice(1)
    const chnacPage1 = (pageNo) => {
        setCurrentPage1(pageNo);
        const startIndex = (pageNo - 1) * recordpage1;
        const pagined = (CustomData1).slice(startIndex).take(recordpage1).value();
        setCurrentPage1(pagined)
    }
    /////////apiurl/////


    const urlapi = () => {
        let urldata = {
            url_name: "taskfieldmaster"
        }
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(`http://teammember.techpanda.art/api/user/url/`, {
            method: 'POST',
            body: JSON.stringify(urldata),
            headers: headers,
        })
            .then((Response) => Response.json())
            .then((Response) => {
                //  const loggedIn = AsyncStorage.setItem('loggedIn', JSON.stringify(true))
                console.log('apiiiiurl_name344634846874-11111111------------->>>>', Response)
                // setData(data)
            })
            .catch((error) => {
                console.error("ERROR FOUND" + error);
            })
    }

    // access field task table//
    const [taskfieldaccess, setTaskFieldaccess] = useState([])

    const getacesstaskfield = () => {
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${access_token}`,
        };
        fetch(`https://teammember.techpanda.art/api/user/useracc/`, {
            method: 'GET',
            headers: headers,
        })
            .then((response) => response.json())

            .then((response) => {
                // console.log(response.results);

                const test = []
                // console.log("data.......%%%%", response.results)
                test.push(response.results)
                // console.log("texrrr", test);
                // test.map(item =>{

                //     console.log("trun6666666666666",item);
                // })
                const Features = [];
                for (var i = 0; i < test[0].length; i++) {

                    Features.push(response.results[i]);
                    // console.log("all erroe msg", Features[i]);

                    for (let index = 0; index < Features.length; index++) {
                        if (Features[index].task == "TASK-FIELD-MASTER") {
                            //   console.log("9034444444444taskfield447",Features[index]);
                            setTaskFieldaccess(Features[index])

                        }
                    }

                }
            })


            .catch((error) => {
                console.error("ERROR FOUND" + error);
            })
    }

    // console.log("taskfieldmaster access", taskfieldaccess);




    // console.log("fdfgsdsuydyd11111112312313", fieldtabledatashow.state.Item.id)


    return <>
        <TableHeader />
        <section>
            <div className="container-fluid">

                <div className="row">
                    <div className="col-lg-4">
                        <form>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-5">
                                        <h6>Company:</h6>
                                    </div>
                                    <div className="col-sm-7">
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
                                    <div className="col-sm-5">
                                        <label htmlFor="exampleInputEmail1">User Code:</label>
                                    </div>
                                    <div className="col-sm-7">
                                        <h6 className="newAddUser">{userData.user_code}</h6>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4">
                        <h3 className='mb-4 text-right'>Task Piece Master Maintenance</h3>
                    </div>
                </div>
                <nav>
                    <ul className='d-flex justify-content-center'>

                        {
                            numbers1.map((nn, ii) => (
                                <li className={`page-link ${currentpage1 === nn ? 'active' : ""}`} key={ii}>
                                    <a onClick={() => chnacPage1(nn)}>{nn}</a>
                                </li>
                            ))
                        }


                    </ul>
                </nav>

                <div>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Task Field Master By Field</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Task Field Master By Task</a>
                        </li>

                    </ul>
                    <div className="rightpopup">
                        <Link to={`/fieldtaskcopy/${fieldtabledatashow.state.Item.id}`}>
                            <i class="fa fa-clipboard" aria-hidden="true"></i>
                        </Link>
                        {taskfieldaccess.add == true ?
                            <a href="fieldtaskadd" className="newAdd"><i class="fa fa-plus" aria-hidden="true"></i>
                                Add New Task Field Master record</a>
                            : ""}

                    </div>

                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="table-search mt-3">
                                <div className="row">
                                    <div className="col-lg-2">
                                        <form>
                                            <div className="col-lg-2">
                                                <div className="mt-2"><h6>{fieldtabledatashow.state.Item.field} </h6></div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-lg-1 text-center">
                                        <div className="plus-icon">

                                            <a href="fieldadd"><i className="fa fa-plus" aria-hidden="true" /></a>
                                        </div>
                                    </div>


                                    <div className="col-lg-1 text-center">
                                        <div className="plus-icon">
                                            <Link to={`/fieldmaster/${fieldtabledatashow.state.Item.id}`}>

                                                <i class="fa fa-eye" aria-hidden="true" />
                                            </Link>

                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="mt-2"><h6>{fieldtabledatashow.state.Item.placeholder_message}</h6></div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="mt-2"> <h6>{fieldtabledatashow.state.Item.error_message}</h6></div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="mt-2"> <h6>{fieldtabledatashow.state.Item.detail_message}</h6></div>
                                    </div>

                                    <div className="col-lg-2">
                                        <div className="mt-2"><h6>{fieldtabledatashow.state.Item.note}</h6></div>
                                    </div>
                                </div>
                            </div>

                            <div className="table-search mt-3">
                                <div className="row">
                                    <div className="col-lg-2">
                                        <form>
                                            <div className="form-group">
                                                <input type="email" className="form-control" placeholder="task"
                                                    value={searchTerm}
                                                    onInput={(e) => inputsearch(e)}
                                                />
                                            </div>
                                        </form>
                                    </div>

                                    <div className="col-lg-2">
                                        <form>
                                            <div className="form-group">
                                                <input type="email" className="form-control" placeholder="Description"
                                                    value={searchTerm1}
                                                    onInput={(e) => inputsearch1(e)}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-lg-2">
                                        <form>
                                            <div className="form-group">
                                                <input type="email" className="form-control" placeholder="pyname"
                                                    value={searchTerm2}
                                                    onInput={(e) => inputsearch2(e)}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-lg-1"></div>
                                    <div className="col-lg-1"></div>
                                    <div className="col-lg-2">
                                        <form>
                                            <div className="form-group">
                                                <input type="email" className="form-control" placeholder="Note"
                                                    value={searchTerm3}
                                                    onInput={(e) => inputsearch3(e)}
                                                />
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>

                            <div className="field-table">
                                <div class="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Task Name</th>
                                                <th scope="col">Decripsion</th>
                                                <th scope="col">Pyname</th>
                                                <th scope="col">Inactive</th>
                                                <th scope="col">Note</th>
                                                <th scope="col">Restricted</th>

                                            </tr>
                                        </thead>
                                        {/* tbody */}
                                        <tbody>
                                            {records1.map((item, index) => (
                                                <tr key={index} >

                                                    <td>
                                                        <Link to={`/fieldtaskview/${item.id}/${fieldtabledatashow.state.Item.id}`}>
                                                        
                                                            {item.task}
                                                        </Link>
                                                    </td>
                                                    <td><Link to={`/fieldtaskview/${item.id}`}>{item.description}</Link></td>
                                                    <td ><Link to={`/fieldtaskview/${item.id}`}>{item.pyname}</Link></td>
                                                    <td className='text-center'><input className="form-check-input" type="checkbox" checked={item.inactive} id="defaultCheck1" defaultValue="true" />
                                                        {item.inactive}</td>
                                                    <td>
                                                        <Link to={`/taskfieldview/${item.id}`}>
                                                            {item.notes}
                                                        </Link></td>
                                                    <td className='text-center'><input className="form-check-input" type="checkbox" checked={item.inactive} id="defaultCheck1" defaultValue="true" />
                                                        {item.inactive}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>


                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="table-search mt-3">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <div className="mt-2"><h6>{fieldtabledatashow.state.Item.task}</h6></div>
                                    </div>
                                    <div className="col-lg-1 text-center">
                                        <div className="plus-icon">
                                            <a href="taskadd"><i className="fa fa-plus" aria-hidden="true" /></a>

                                        </div>
                                    </div>
                                    <div className="col-lg-1">
                                        <div className="plus-icon">
                                            <a href="taskview"><i className="fa fa-eye" aria-hidden="true" /></a>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="mt-2"><h6>{fieldtabledatashow.state.Item.description}</h6></div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="mt-2"> <h6>{fieldtabledatashow.state.Item.pyname}</h6></div>
                                    </div>

                                    <div className="col-lg-2">
                                        <div className="mt-2"><h6>{fieldtabledatashow.state.Item.notes}</h6></div>
                                    </div>
                                </div>
                            </div>



                            <div className="table-search mt-3">
                                <div className="row">
                                    <div className="col-lg-2">
                                        <form>
                                            <div className="form-group">
                                                <input type="email" className="form-control" placeholder="Field Name"
                                                    value={searchTerm4}
                                                    onInput={(e) => inputsearch4(e)}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="mt-2"><h6>Field Master Information</h6></div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="mt-2"><h6>Task Field Master Information</h6></div>
                                    </div>
                                </div>
                            </div>


                            {!CustomData ? ("no data") : (
                                <div className="field-table">
                                    <div class="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Field Name</th>
                                                    <th scope="col">Placeholder Message</th>
                                                    <th scope="col">Error_message</th>
                                                    <th scope="col"> Detail Message</th>
                                                    <th scope="col">Inactive</th>
                                                    <th scope="col">Note</th>
                                                    <th scope="col">Restricted</th>

                                                </tr>
                                            </thead>

                                            <tbody>
                                                {CustomData.map((item, index) => (
                                                    <tr key={index} >

                                                        <td>
                                                            <Link to={`/fieldtaskview/${item.id}`}>{item.field}</Link>
                                                        </td>
                                                        <td><Link to={`/fieldtaskview/${item.id}`}>{item.placeholder_message}</Link></td>
                                                        <td><Link to={`/fieldtaskview/${item.id}`}>{item.error_message}</Link></td>
                                                        <td><Link to={`/fieldtaskview/${item.id}`}>{item.detail_message}</Link></td>
                                                        <td><input className="form-check-input" type="checkbox" checked={item.inactive} id="defaultCheck1" />
                                                            {item.inactive}
                                                        </td>
                                                        <td><Link to={`/fieldtaskview/${item.id}`}>{item.note}</Link></td>
                                                        <td><input className="form-check-input" type="checkbox" checked={item.inactive} id="defaultCheck1" />
                                                            {item.inactive}
                                                        </td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='text-right'>
                    <Link to='/fieldmaster'>
                        <button className='main-btn'>
                            <span>Back</span>
                        </button>
                    </Link>
                </div>


                {/* <nav className='d-flex float-right'>
                    <ul className='pagination'>
                        {
                            pages.map((page) => (
                                <li className={
                                    page === currentpage ? "page-item active" : "page-item"
                                }>
                                    <p className='page-link'
                                        onClick={() => pagination(page)}
                                    >{page}</p>
                                </li>
                            ))
                        }
                    </ul>
                </nav> */}
                {/* <nav className='d-flex float-right' >
                    <ul className='pagination'>

                        {
                            numbers.map((nn, ii) => (
                                <li className={`page-link ${currentpage === nn ? 'active' : "page-item"}`} key={ii}>
                                    <a onClick={() => chnacPage(nn)}>{nn}</a>
                                </li>
                            ))
                        }


                    </ul>
                </nav> */}
                <nav>
                    <ul className='d-flex justify-content-center'>

                        {
                            numbers1.map((nn, ii) => (
                                <li className={`page-link ${currentpage1 === nn ? 'active' : ""}`} key={ii}>
                                    <a onClick={() => chnacPage1(nn)}>{nn}</a>
                                </li>
                            ))
                        }


                    </ul>
                </nav>
            </div>
        </section>



    </>;


};

export default Taskfieldmaster;
