import React from 'react'
import TableHeader from '../directives/tableHeader'
import Fieldmaster from '../pages/Fieldmaster'
import Taskfieldmaster from '../pages/Taskfieldmaster'
import Menugroupmaster from '../pages/MenuGroupMaster'
import Menumaster from '../pages/MenuMaster'
import Taskmaster from '../pages/Taskmaster'
import Usertaskaccess from '../pages/usertaskaccess'

const Admintab = () => {

    return (
        <>
            <TableHeader />
            <section>
                <div className='container'>
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="pills-menugroup-tab" data-toggle="pill" href="#pills-menugroup" role="tab" aria-controls="pills-menugroup" aria-selected="false">Menu Group Master</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-menumaster-tab" data-toggle="pill" href="#pills-menumaster" role="tab" aria-controls="pills-menumaster" aria-selected="false">Menu Group</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Field Master</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Task Master</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Field Task Master</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-usertaskaccess-tab" data-toggle="pill" href="#pills-usertaskaccess" role="tab" aria-controls="pills-usertaskaccess" aria-selected="false">User Task Access</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-menugroup" role="tabpanel" aria-labelledby="pills-menugroup-tab">
                            <Menugroupmaster />
                        </div>
                        <div className="tab-pane fade" id="pills-menumaster" role="tabpanel" aria-labelledby="pills-menumaster-tab">
                            <Menumaster />
                        </div>
                        <div className="tab-pane fade" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            <Fieldmaster />
                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <Taskmaster />
                        </div>
                        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                            <Taskfieldmaster />
                        </div>
                        <div className="tab-pane fade" id="pills-usertaskaccess" role="tabpanel" aria-labelledby="pills-usertaskaccess-tab">
                            <Usertaskaccess />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Admintab