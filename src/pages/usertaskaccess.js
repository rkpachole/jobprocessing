

import { useState, useEffect } from "react";
import axios from "axios";
import { TableHead } from "@mui/material";
import TableHeader from "../directives/tableHeader";

const Usertaskaccess = () => {

    const [id, setID] = useState()
    const [useracc, setuseracc] = useState()
    const [taskacc, settaskacc] = useState()
    const [inactivetaskacc, setinactivetaskacc] = useState()

    const [notetaskacc, setnotetaskacc] = useState()
    const [viewaccess, setviewaccess] = useState()
    const [addaccess, setaddaccess] = useState()
    const [editaccess, seteditaccess] = useState()
    const [deleteaccess, setdeleteaccess] = useState()
    const [inactiveaccess, setinactiveaccess] = useState()
    const [CustomData, setCustomData] = useState([])
    const [datasave, setData] = useState([]); // state to hold the API data
    const [newData, setNewData] = useState({
        id: id,
        useracc: useracc,
        taskacc: taskacc,
        inactivetaskacc: inactivetaskacc,
        notetaskacc: notetaskacc,
        viewaccess: viewaccess,
        addaccess: addaccess,
        editaccess: editaccess,
        deleteaccess: deleteaccess,
        inactiveaccess: inactiveaccess,

    }); // state to hold the data to be posted to the API
    useEffect(() => {
        get()
    }, [])
    // // function to handle form submission
    const LoginFunctionfield = (event) => {
        event.preventDefault();
        setData([...datasave, newData]);
        let Data = {
            id: id,
            useracc: useracc,
            taskacc: taskacc,
            inactivetaskacc: inactivetaskacc,
            notetaskacc: notetaskacc,
            viewaccess: viewaccess,
            addaccess: addaccess,
            editaccess: editaccess,
            deleteaccess: deleteaccess,
            inactiveaccess: inactiveaccess,

        }
        setuseracc("")
        settaskacc("")
        setinactivetaskacc("")
        setnotetaskacc("")
        setviewaccess("")
        setaddaccess("")
        seteditaccess("")
        setdeleteaccess("")
        setinactiveaccess("")
        // console.log("costemdata", Data)
        // let url = `https://jps.pythonanywhere.com/account/api/taskmasterview/`   //API to render signup
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'authorization': `Bearer ${access_token}`
        };
        // console.log("token")
        fetch(`https://jps.pythonanywhere.com/account/api/usertaskaccessview/`, {
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
            // 'authorization': `Bearer ${access_token}`
        };
        fetch(`https://jps.pythonanywhere.com/account/api/usertaskaccessview/`, {
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
                        useracc: Response[i].useracc,
                        taskacc: Response[i].taskacc,
                        inactivetaskacc: Response[i].inactivetaskacc,

                        notetaskacc: Response[i].notetaskacc,
                        viewaccess: Response[i].viewaccess,
                        addaccess: Response[i].addaccess,
                        editaccess: Response[i].editaccess,
                        deleteaccess: Response[i].deleteaccess,
                        inactiveaccess: Response[i].inactiveaccess,

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
            // 'authorization': `Bearer ${access_token}`
        };
        fetch(`https://jps.pythonanywhere.com/account/api/usertaskaccessview/${id}`, {
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
        console.log("hhhhhhh", id)
        // let ht = CustomData[id];

        //       setID(id);
        //       axios.get(`https://jps.pythonanywhere.com/account/api/usertaskaccessview/${id}`)   
        //           .then((result) => {
        //           const dt = result.data;
        //           setuseracc(result.data.useracc)
        //           settaskacc(result.data.taskacc);
        //           setinactivetaskacc(result.data.inactivetaskacc);

        //           setnotetaskacc(result.data.notetaskacc);
        //           setviewaccess(result.data.viewaccess);
        //           setaddaccess(result.data.addaccess);
        //           seteditaccess(result.data.editaccess);
        //           setdeleteaccess(result.data.deleteaccess);
        //           setinactiveaccess(result.data.inactiveaccess);

        //           setID(id);
        //       })
        //   .catch((error) => {
        //       console.log(error);
        //   })
    }


    return (
        <>
            <TableHeader/>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <form>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <label htmlFor="exampleInputEmail1">Company:</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <h6 className="newAddUser"></h6>
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
                                            <label htmlFor="exampleInputEmail1">User:</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <h6 className="newAddUser"></h6>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="table-search mt-3">
                        <div className="row">
                            <div className="col-lg-2">
                                <form>
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="Search Field Name" />
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-1 text-center">
                                <div className="plus-icon">
                                    <a href="" data-toggle="modal" data-target="#exampleModalOne"><i className="fa fa-plus" aria-hidden="true" /></a>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <form>
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="Search Message 1" />
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-2">
                                <form>
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="Search Message 2" />
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-1"></div>
                            <div className="col-lg-2">
                                <form>
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="Search Note" />
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
                                        <th scope="col">Company</th>
                                        <th scope="col">User</th>
                                        <th scope="col">task</th>
                                        <th scope="col">Inactive</th>
                                        <th scope="col">note</th>
                                        <th scope="col">view access</th>
                                        <th scope="col">add access</th>
                                        <th scope="col">edit access</th>
                                        <th scope="col">delete access</th>
                                        <th scope="col">Inactive access</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>










            {/* // ......../////tarun/////...... */}
            <form onSubmit={LoginFunctionfield}>
                <div className="modal fade" id="exampleModalOne" tabIndex={-1} role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">piece Master  - Add New piece</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group mb-3">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <div className="form-label">piece name</div>
                                            </div>
                                            <div className="col-sm-9">
                                                <input className="form-control" type="text" placeholder="task" value={useracc} onChange={(event) => setuseracc(event.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <div className="form-label">message 1 *</div>
                                            </div>
                                            <div className="col-sm-9">
                                                <input className="form-control" type="text" placeholder=" task acc" value={taskacc} onChange={(event) => settaskacc(event.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <div className="form-label">message 2 *</div>
                                            </div>
                                            <div className="col-sm-9">
                                                <input className="form-control" type="text" placeholder="pyname" value={inactivetaskacc} onChange={(event) => setinactivetaskacc(event.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <div className="form-label">inactivetaskacc</div>
                                            </div>
                                            <div className="col-sm-9">
                                                <input className="form-control" type="text" placeholder="inactive" value={inactivetaskacc} onChange={(event) => setinactivetaskacc(event.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <div className="form-label">Note</div>
                                            </div>
                                            <div className="col-sm-9">
                                                <input className="form-control" type="text" placeholder="note" value={notetaskacc} onChange={(event) => setnotetaskacc(event.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <div className="form-label">viewaccess</div>
                                            </div>
                                            <div className="col-sm-9">
                                                <input className="form-control" type="text" placeholder="view" value={viewaccess} onChange={(event) => setviewaccess(event.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <div className="form-label">addaccess</div>
                                            </div>
                                            <div className="col-sm-9">
                                                <input className="form-control" type="text" placeholder="add" value={addaccess} onChange={(event) => setaddaccess(event.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <div className="form-label">editaccess</div>
                                            </div>
                                            <div className="col-sm-9">
                                                <input className="form-control" type="text" placeholder="edit" value={editaccess} onChange={(event) => seteditaccess(event.target.value)} />
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
        </>

    )
}

export default Usertaskaccess