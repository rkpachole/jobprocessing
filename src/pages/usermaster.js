import React from 'react'
import TableHeader from '../directives/tableHeader'

const Usermaster = () => {
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
                                <th scope="col">user name</th>
                                <th scope="col">password</th>
                                <th scope="col">Email Address</th>
                                <th scope="col">usercategory</th>
                                <th scope="col">inactive</th>
                                <th scope="col">Note</th>
                                <th scope="col">Admin access</th>
                                {/* <th scope="col">Inactive access</th> */}
                            </tr>
                        </thead>
                        <tbody>
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Usermaster

