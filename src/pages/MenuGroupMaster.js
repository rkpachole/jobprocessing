import { useEffect, useState } from 'react';
import axios from 'axios';
import TableHeader from '../directives/tableHeader';

const Menugroupmaster = () => {
 


    // ..//////////tarun/////

    const [id, setID] = useState()
    const [grpname, setgrpname] = useState()
    const [sequence, setsequence] = useState()
    const [inactive, setinactive] = useState()
    const [note, setnote] = useState()
    const [completed, setcompleted] = useState()
    
    const [CustomData, setCustomData] = useState([])
    const [datasave, setData] = useState([]); // state to hold the API data
    const [newData, setNewData] = useState({
        id: id,
        grpname: grpname,
        sequence: sequence,
        inactive: inactive,
        note: note,
        completed: completed,
    }); // state to hold the data to be posted to the API
    useEffect(() => {
        get()
    }, [])
    // // function to handle form submission
    const LoginFunctionmenugroup = (event) => {
        event.preventDefault();
        setData([...datasave, newData]);
        let Data = {
            id: id,
            grpname: grpname,
            sequence: sequence,
            inactive: inactive,
            note: note,
            completed: completed,
        }
        setgrpname("")
        setsequence("")
        setinactive("")
        setnote("")
        setcompleted("")
        // console.log("costemdata", Data)
        // let url = `https://jps.pythonanywhere.com/account/api//taskmasterview/`   //API to render signup
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'authorization': `Bearer ${access_token}`,
        };
        // console.log("token")
        fetch(`https://jps.pythonanywhere.com/account/api/menuview/`, {
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
        fetch(`https://jps.pythonanywhere.com/account/api/menuview/`, {
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
                        grpname: Response[i].grpname,
                        sequence: Response[i].sequence,
                        inactive: Response[i].inactive,
                        note: Response[i].note,
                        completed: Response[i].completed,
                       
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
        fetch(`https://jps.pythonanywhere.com/account/api/menuview/${id}`, {
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
        axios.get(`https://jps.pythonanywhere.com/account/api/menuview/${id}`)

            .then((result) => {
                const dt = result.data;
                setgrpname(result.data.grpname);
                setsequence(result.data.sequence);
                setinactive(result.data.inactive);
                setnote(result.data.note);
                setcompleted(result.data.completed);
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
                                <h3>Menu Group Master</h3>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className="admin-icon">
                                <a href="" data-toggle="modal" data-target="#menugroup"><i className="fa fa-plus" aria-hidden="true" />Add Group Master</a>
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
                                    <th scope="col">Sequence</th>
                                    <th scope="col">Inactive</th>
                                    <th scope="col">Note</th>
                                    <th scope="col">Comlete</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CustomData.map((item, index) => (
                                    <tr key={index} >
                                        <td>
                                            {item.grpname}
                                        </td>
                                        <td>{item.sequence}</td>
                                        <td><input className="form-check-input" type="checkbox" id="defaultCheck1" defaultValue="true" />{item.inactive}</td>
                                        <td>{item.note}</td>
                                        <td><input className="form-check-input" type="checkbox" id="defaultCheck1" defaultValue="true" />{item.completed}</td>
                                        <td>
                                            <button className='btn btn-info btn-sm' onClick={() => edituser(item.id)} ><i data-toggle="modal" data-target="#fieldedit" class="fa fa-pencil" aria-hidden="true"></i></button>
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
        <form onSubmit={LoginFunctionmenugroup}>
            <div className="modal fade" id="menugroup" tabIndex={-1} role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Menu Master  - Menu Group Master</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Menu group name</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Enter Menu group name" value={grpname} onChange={(event) => setgrpname(event.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Sequence</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Enter sequence" value={sequence} onChange={(event) => setsequence(event.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Inactive</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Inter inactive" value={inactive} onChange={(event) => setinactive(event.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Note</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="note" value={note} onChange={(event) => setnote(event.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Copleted</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="comleted" value={completed} onChange={(event) => setcompleted(event.target.value)} />
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
        <form onSubmit={LoginFunctionmenugroup}>
            <div className="modal fade" id="fieldedit" tabIndex={-1} role="dialog"
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
                                            <div className="form-label">Menu group name</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Enter Menu group name" value={grpname} onChange={(event) => setgrpname(event.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Sequence</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Enter sequence" value={sequence} onChange={(event) => setsequence(event.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Inactive</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="Inter inactive" value={inactive} onChange={(event) => setinactive(event.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Note</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="note" value={note} onChange={(event) => setnote(event.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-label">Copleted</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="text" placeholder="comleted" value={completed} onChange={(event) => setcompleted(event.target.value)} />
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

export default Menugroupmaster;