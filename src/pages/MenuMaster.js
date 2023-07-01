import { useEffect, useState } from 'react';
import axios from 'axios';
import TableHeader from '../directives/tableHeader';

const Menumaster = () => {
    const [id, setID] = useState()
    const [groupname, setgroupname] = useState()
    const [menuname, setmenuname] = useState()
    const [taskname, settaskname] = useState()
    
    const [CustomData, setCustomData] = useState([])
    const [datasave, setData] = useState([]); // state to hold the API data
    const [newData, setNewData] = useState({
        id: id,
        groupname: groupname,
        menuname: menuname,
        taskname: taskname,
    }); // state to hold the data to be posted to the API
    useEffect(() => {
        get()
    }, [])
    // // function to handle form submission
    const Menumaster = (event) => {
        event.preventDefault();
        setData([...datasave, newData]);
        let Data = {
            id: id,
            groupname: groupname,
            menuname: menuname,
            taskname: taskname,
        }
        setgroupname("")
        setmenuname("")
        settaskname("")
        // console.log("costemdata", Data)
        // let url = `https://jps.pythonanywhere.com/account/api//taskmasterview/`   //API to render signup
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'authorization': `Bearer ${access_token}`,
        };
        // console.log("token")
        fetch(`https://jps.pythonanywhere.com/account/api/menumasterview/`, {
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
        fetch(`https://jps.pythonanywhere.com/account/api/menumasterview/`, {
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
                        groupname: Response[i].groupname,
                        menuname: Response[i].menuname,
                        taskname: Response[i].taskname,
                       
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
        fetch(`https://jps.pythonanywhere.com/account/api/menumasterview/${id}`, {
            method: "DELETE",
            headers: headers,
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp)
                get()
            })
        })
    }
    const edituser = (id) => {
        // e.preventDefault();
        // alert(id)

        setID(id);
        axios.get(`https://jps.pythonanywhere.com/account/api/menumasterview/${id}`)

            .then((result) => {
                const dt = result.data;
                setgroupname(result.data.groupname);
                setmenuname(result.data.menuname);
                settaskname(result.data.taskname);
                setID(id);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return <>
        <TableHeader />
        <section>
            <div className="container">
                <div class="admin-menu">
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className='admin-text'>
                                <h3>Menu Master</h3>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className="admin-icon">
                                <a href="" data-toggle="modal" data-target="#menumaster"><i className="fa fa-plus" aria-hidden="true" />Add Menu Master</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="field-table">
                    <div class="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Group Name</th>
                                    <th scope="col">Menu Name</th>
                                    <th scope="col">Task </th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <td>maaster field</td>
                                    <td>task Master anytdings</td>
                                    <td>task Master</td>
                                </tr> */}
                               {CustomData.map((item, index) => (
                                    <tr key={index} >
                                        <td>
                                            {item.groupname}
                                        </td>
                                        <td>{item.menuname}</td>
                                        <td>{item.taskname}</td>
                                        <td>
                                            <button className='btn btn-info btn-sm' onClick={() => edituser(item.id)} ><i data-toggle="modal" data-target="#menumasteredit" class="fa fa-pencil" aria-hidden="true"></i></button>
                                            <button className='btn btn-danger btn-sm ml-2' onClick={() => deleteuser(item.id)}><i class="fa fa-trash" aria-hidden="true"></i></button>
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
        <form onSubmit={Menumaster}>
            <div className="modal fade" id="menumaster" tabIndex={-1} role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Menu Master  - Menu Master</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Group Name</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Enter Group Name" value={groupname} onChange={(event) => setgroupname(event.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Menu Name</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Enter Menu Name" value={menuname} onChange={(event) => setmenuname(event.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Task</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Inter Task" value={taskname} onChange={(event) => settaskname(event.target.value)} />
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
        <form onSubmit={Menumaster}>
            <div className="modal fade" id="menumasteredit" tabIndex={-1} role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Field Master  - Edit Field</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Group name</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Enter Menu group name" value={groupname} onChange={(event) => setgroupname(event.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Menu Name</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Enter sequence" value={menuname} onChange={(event) => setmenuname(event.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Task Name</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="note" value={taskname} onChange={(event) => settaskname(event.target.value)} />
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
      
    </>;
};

export default Menumaster;