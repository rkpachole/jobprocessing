import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, Route, Link } from 'react-router-dom';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import ChangePassword from './auth/ChangePassword';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useEffect, useState } from 'react';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import TableHeader from "../directives/tableHeader";
import axios from 'axios';
import _ from 'lodash';

const Fieldmaster = () => {
    // let { id1 } = useParams();

    const handleLogout = () => {
        dispatch(unsetUserInfo({ username: "", text: "", company: "", user_code: "" }))
        dispatch(unSetUserToken({ access_token: null }))
        removeToken()
        navigate('/login')
    }
    const navigate = useNavigate()
    const showdata = useNavigate()
    const dispatch = useDispatch()
    const { access_token } = getToken()
    const { data, isSuccess } = useGetLoggedUserQuery(access_token);



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
    const [CustomData, setCustomData] = useState([])
    useEffect(() => {
        get()
        getacessfield()
        urlapi()
    }, [])
    // // function to handle form submission

    const get = () => {
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${access_token}`,
        };
        fetch(`https://teammember.techpanda.art/api/user/fieldmaster/`, {
            method: 'GET',
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
                        id: Response[i].id,
                        field: Response[i].field,
                        placeholder_message: Response[i].placeholder_message,
                        error_message: Response[i].error_message,
                        inactive: Response[i].inactive,
                        note: Response[i].note,
                        detail_message: Response[i].detail_message
                    })
                }
                console.log('custom aray data', CityArray)
                setCustomData(CityArray)
            })
            .catch((error) => {
                console.error("ERROR FOUND" + error);
            })
    }


    const fieldshow = useNavigate()

    const fieldshowlistdata = (item) => {
        fieldshow("/taskfieldmaster", {
            state: {
                Item: item,
            }
        });
    }
    // Multi Checkbox
    const [pjl, setPjl] = useState([])

    const getPjl = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        console.log(`${value} is ${checked}`);
        // User checks the box
        if (checked) {
            setPjl([...pjl, value])
        }
        // User unchecks the box
        else {
            setPjl(pjl.filter((e) => e !== value))
        }
    }


    /////searchbar////////

    const [searchTerm, setSearchTerm] = useState('');
    const [searchapi, setsearchapi] = useState([])
    useEffect(() => {
        const searchfetchData = async () => {
            const response = await fetch(`https://teammember.techpanda.art/api/user/fieldmaster/`);
            const apiData = await response.json();

            setCustomData(apiData);
            setsearchapi(apiData);
        };
        searchfetchData();
    }, []);
    const inputsearch = (e) => {
        if (e.target.value == '') {
            setCustomData(searchapi)
        }
        else {
            const filterres = searchapi.filter(item => item.field.toLowerCase().includes(e.target.value.toLowerCase()))
            setCustomData(filterres)
        }
        setSearchTerm(e.target.value)

    }

    ///////////plceholder///
    const [searchTerm1, setSearchTerm1] = useState('');
    const [searchapi1, setsearchapi1] = useState([])
    useEffect(() => {
        const searchfetchData1 = async () => {
            const response = await fetch(`https://teammember.techpanda.art/api/user/fieldmaster/`);
            const apiData = await response.json();
            setCustomData(apiData);
            setsearchapi1(apiData);
        };
        searchfetchData1();
    }, []);
    const inputsearch1 = (e) => {
        if (e.target.value == '') {
            setCustomData(searchapi1)
        }
        else {
            const filterres = searchapi1.filter(item => item.placeholder_message.toLowerCase().includes(e.target.value.toLowerCase()))
            setCustomData(filterres)
        }
        setSearchTerm1(e.target.value)

    }

    ///////errormassege///
    const [searchTerm2, setSearchTerm2] = useState('');
    const [searchapi2, setsearchapi2] = useState([])
    useEffect(() => {
        const searchfetchData2 = async () => {
            const response = await fetch(`https://teammember.techpanda.art/api/user/fieldmaster/`);
            const apiData = await response.json();
            setCustomData(apiData);
            setsearchapi2(apiData);
        };
        searchfetchData2();
    }, []);
    const inputsearch2 = (e) => {
        if (e.target.value == '') {
            setCustomData(searchapi2)
        }
        else {
            const filterres = searchapi2.filter(item => item.error_message.toLowerCase().includes(e.target.value.toLowerCase()))
            setCustomData(filterres)
        }
        setSearchTerm2(e.target.value)

    }
    ////detials//
    const [searchTermd, setSearchTermd] = useState('');
    const [searchapid, setsearchapid] = useState([])
    useEffect(() => {
        const searchfetchDatad = async () => {
            const response = await fetch(`https://teammember.techpanda.art/api/user/fieldmaster/`);
            const apiData = await response.json();
            setCustomData(apiData);
            setsearchapid(apiData);
        };
        searchfetchDatad();
    }, []);
    const inputsearchd = (e) => {
        if (e.target.value == '') {
            setCustomData(searchapid)
        }
        else {
            const filterres = searchapid.filter(item => item.detail_message.toLowerCase().includes(e.target.value.toLowerCase()))
            setCustomData(filterres)
        }
        setSearchTermd(e.target.value)

    }
    //////note/////
    const [searchTerm3, setSearchTerm3] = useState('');
    const [searchapi3, setsearchapi3] = useState([])
    useEffect(() => {
        const searchfetchData3 = async () => {
            const response = await fetch(`https://teammember.techpanda.art/api/user/fieldmaster/`);
            const apiData = await response.json();
            setCustomData(apiData);
            setsearchapi3(apiData);
        };
        searchfetchData3();
    }, []);
    const inputsearch3 = (e) => {
        if (e.target.value == '') {
            setCustomData(searchapi3)
        }
        else {
            const filterres = searchapi3.filter(item => item.note.toLowerCase().includes(e.target.value.toLowerCase()))
            setCustomData(filterres)
        }
        setSearchTerm3(e.target.value)

    }

    /////serchabar////
    useEffect(() => {
        const searchfetch = async () => {
            const response = await fetch(`https://teammember.techpanda.art/api/user/fieldmaster/`);
            const apiData = await response.json();
            setCustomData(apiData);
            // setsearchapi2(apiData);
        };
        searchfetch();
    }, [])

    ////////refres////////



    ///////pagination///
    const [currentpage, setCurrentPage] = useState(1)
    const recordpage = 10;
    const Lastindex = currentpage * recordpage;
    const Firstindex = Lastindex - recordpage;
    const records = CustomData.slice(Firstindex, Lastindex);
    const npage = Math.ceil(CustomData.length / recordpage)
    const numbers = [...Array(npage + 1).keys()].slice(1)


    const chnacPage = (pageNo) => {
        setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * recordpage;
        const pagined = (CustomData).slice(startIndex).take(recordpage).value();
        setCurrentPage(pagined)
    }






    // const pageSize = 10;
    // const [pagined, setpagined] = useState()
    // const [currentpage, setcurrentpage] = useState()


    // const pageCount = CustomData ? Math.ceil(CustomData.length / pageSize) : 0;
    // // if (pageCount === 1) return null;
    // const pages = _.range(1, pageCount + 1)

    // const pagination = (pageNo) => {
    //     setcurrentpage(pageNo);
    //     const startIndex = (pageNo - 1) * pageSize;
    //     const paginedfield = _(CustomData).slice(startIndex).take(pageSize).value();
    //     setpagined(paginedfield);
    // }




    // URL API Code
    const urlapi = () => {
        let urldata = {
            url_name: "fieldmaster"
        }
        var headers = {
            'Accept': 'application/json',
            'authorization': `Bearer ${access_token}`,
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

    const [fieldAccess, setFieldAccess] = useState([]);


    const getacessfield = () => {
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
                            if (Features[index].task == "FIELD-MASTER") {
                            //   console.log("9034444444444447",Features[index]);
                              setFieldAccess(Features[index])
                        
                        }
                    }
                   
                }
            })


            .catch((error) => {
                console.error("ERROR FOUND" + error);
            })
    }

    // console.log("sdhfjksdkcfsdkcksdjhrespone?>??????????????", fieldAccess);

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
                                        <label htmlFor="exampleInputEmail1">Company:</label>
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
                        <h3 className='mb-4 text-right'>Field Master Maintenance</h3>
                    </div>
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
                <nav className='d-flex  justify-content-center' >
                    <ul className='pagination'>

                        {
                            numbers.map((nn, ii) => (
                                <li className={`page-link ${currentpage === nn ? 'active' : "page-item"}`} key={ii}>
                                    <a onClick={() => chnacPage(nn)}>{nn}</a>
                                </li>
                            ))
                        }


                    </ul>
                </nav>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ borderTop: 'none' }}>
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="search field"
                                            value={searchTerm}
                                            onInput={(e) => inputsearch(e)} />
                                    </div>
                                </form>
                            </th>
                            <th scope="col" style={{ borderTop: 'none' }}></th>
                            {fieldAccess.add == true ?
                            <th scope="col" style={{ borderTop: 'none' }}>

                                <div className="plus-icon">
                                    <a href="fieldadd"><i className="fa fa-plus" aria-hidden="true" /></a>
                                </div>
                            </th>
                            : ""} 

                            {/* })} */}

                            <th scope="col" style={{ borderTop: 'none' }}>
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="search placeholder"
                                            value={searchTerm1}
                                            onInput={(e) => inputsearch1(e)} />
                                    </div>
                                </form>
                            </th>
                            <th scope="col" style={{ borderTop: 'none' }}>
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="search error"
                                            value={searchTerm2}
                                            onInput={(e) => inputsearch2(e)} />
                                    </div>
                                </form>
                            </th>
                            <th scope="col" style={{ borderTop: 'none' }}>
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="search detail"
                                            value={searchTermd}
                                            onInput={(e) => inputsearchd(e)} />
                                    </div>
                                </form>
                            </th>
                            <th scope="col" style={{ borderTop: 'none' }}></th>
                            <th scope="col" style={{ borderTop: 'none' }}>
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="search note"
                                            value={searchTerm3}
                                            onInput={(e) => inputsearch3(e)} />
                                    </div>
                                </form>
                            </th>
                            <th scope="col" style={{ borderTop: 'none' }}></th>
                            <th scope="col" style={{ borderTop: 'none' }}></th>
                        </tr>
                    </thead>
                </table>
                {!records ? ("no data") : (
                    <div className="field-table">
                        <div class="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Field Name</th>


                                        <th scope="col"></th>

                                        <th scope="col" className='text-center'>Make Copy</th>
                                        <th scope="col">Placeholder Message</th>
                                        <th scope="col">Error Message</th>
                                        <th scope='col'>Detail Message</th>
                                        {/* {fieldaccess.inactive == "true" ? */}

                                        <th scope="col" className='text-center'>Inactive</th>
                                        {/* : ""} */}
                                        <th scope="col">Note</th>
                                        <th scope="col" className='text-center'> Field view</th>
                                        {fieldAccess.delete == true ?

                                        <th scope="col" className='text-center'>Delete</th>
                                        : ""} 
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.map((item, index) => (
                                        <tr key={index} >
                                            <td>
                                                { fieldAccess.view == true ?

                                                <Link to={`/fieldmaster/${item.id}`}>
                                                    {item.field}
                                                </Link>
                                               : ""}
                                            </td>
                                            <td className='text-center'>
                                                {fieldAccess.edit == true ?

                                                <Link to={`/fieldmaster/edit/${item.id}`} >
                                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                                </Link>
                                             : ""}  
                                            </td>
                                            <td className='text-center'>
                                                <Link to={`/fieldmaster/copy/${item.id}`} >
                                                    <i class="fa fa-clipboard" aria-hidden="true"></i>
                                                </Link>
                                            </td>
                                            <td>
                                           
                                            {fieldAccess.view === true ?

                                                <Link to={`/fieldmaster/${item.id}`}>
                                                    {item.placeholder_message}
                                                </Link>
                                              :""}
                                            </td>
                                            <td>
                                                {fieldAccess.view == true ?

                                                <Link to={`/fieldmaster/${item.id}`}>
                                                    {item.error_message}
                                                </Link>
                                              : ""}  
                                            </td>
                                            <td>
                                                {fieldAccess.view == true ?

                                                <Link to={`/fieldmaster/${item.id}`}>

                                                    {item.detail_message}
                                                </Link>
                                               : ""} 
                                            </td>
                                            {/* {fieldaccess.inactive == "true" ? */}
                                            <td className='text-center'>

                                                {item.inactive}
                                                < input className="form-check-input" type="checkbox" checked={item.inactive} id="defaultCheck1" />
                                            </td>
                                            {/* //  : ""} */}
                                            <td className='text-center'>
                                                {/* {fieldaccess.view == "true" ? */}

                                                <Link to={`/fieldmaster/${item.id}`}>
                                                    {item.note}
                                                </Link>
                                                {/* // : ""}  */}
                                            </td>
                                            <td className='text-center'>
                                                <i onClick={() => fieldshowlistdata(item)} class="fa fa-eye" aria-hidden="true"></i>
                                            </td>
                                            {fieldAccess.delete == true ?

                                            <td className='text-center'>
                                                <Link to={`/fielddelete/delete/${item.id}`} >
                                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                                </Link>
                                            </td>
                                        : ""} 


                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
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
                <nav className='d-flex  justify-content-center' >
                    <ul className='pagination'>

                        {
                            numbers.map((nn, ii) => (
                                <li className={`page-link ${currentpage === nn ? 'active' : "page-item"}`} key={ii}>
                                    <a onClick={() => chnacPage(nn)}>{nn}</a>
                                </li>
                            ))
                        }


                    </ul>
                </nav>
            </div>
        </section>





    </>;
};

export default Fieldmaster;