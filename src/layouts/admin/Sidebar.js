import React from 'react';
import {Link} from 'react-router-dom'

const Sidebar = () => {

  
  return <>
  
  <div className="sidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
               <div id="sidebar-menu" className="sidebar-menu">
                  <ul>
                     <li className="menu-title">
                        <span>Main Menu</span>
                     </li>
                     <li className="submenu active">
                        <Link to="#"><i className="fas fa-user-graduate"></i> <span> Dashboard</span> <span className="menu-arrow"></span></Link>
                        <ul>
                           <li><Link to="index.html" className="active">Admin Dashboard</Link></li>
                           <li><Link to="teacher-dashboard.html">Teacher Dashboard</Link></li>
                           <li><Link to="student-dashboard.html">Student Dashboard</Link></li>
                        </ul>
                     </li>
                     <li className="submenu">
                        <Link to="#"><i className="fas fa-user-graduate"></i> <span> Students</span> <span className="menu-arrow"></span></Link>
                        <ul>
                           <li><Link to="students.html">Student List</Link></li>
                           <li><Link to="student-details.html">Student View</Link></li>
                           <li><Link to="add-student.html">Student Add</Link></li>
                           <li><Link to="edit-student.html">Student Edit</Link></li>
                        </ul>
                     </li>
                     <li className="submenu">
                        <Link to="#"><i className="fas fa-chalkboard-teacher"></i> <span> Teachers</span> <span className="menu-arrow"></span></Link>
                        <ul>
                           <li><Link to="teachers.html">Teacher List</Link></li>
                           <li><Link to="teacher-details.html">Teacher View</Link></li>
                           <li><Link to="add-teacher.html">Teacher Add</Link></li>
                           <li><Link to="edit-teacher.html">Teacher Edit</Link></li>
                        </ul>
                     </li>
                     <li className="submenu">
                        <Link to="#"><i className="fas fa-building"></i> <span> Departments</span> <span className="menu-arrow"></span></Link>
                        <ul>
                           <li><Link to="departments.html">Department List</Link></li>
                           <li><Link to="add-department.html">Department Add</Link></li>
                           <li><Link to="edit-department.html">Department Edit</Link></li>
                        </ul>
                     </li>
                     <li className="submenu">
                        <Link to="#"><i className="fas fa-book-reader"></i> <span> Subjects</span> <span className="menu-arrow"></span></Link>
                        <ul>
                           <li><Link to="subjects.html">Subject List</Link></li>
                           <li><Link to="add-subject.html">Subject Add</Link></li>
                           <li><Link to="edit-subject.html">Subject Edit</Link></li>
                        </ul>
                     </li>
                     <li className="menu-title">
                        <span>Management</span>
                     </li>
                     <li className="submenu">
                        <Link to="#"><i className="fas fa-file-invoice-dollar"></i> <span> Accounts</span> <span className="menu-arrow"></span></Link>
                        <ul>
                           <li><Link to="fees-collections.html">Fees Collection</Link></li>
                           <li><Link to="expenses.html">Expenses</Link></li>
                           <li><Link to="salary.html">Salary</Link></li>
                           <li><Link to="add-fees-collection.html">Add Fees</Link></li>
                           <li><Link to="add-expenses.html">Add Expenses</Link></li>
                           <li><Link to="add-salary.html">Add Salary</Link></li>
                        </ul>
                     </li>
                     <li>
                        <Link to="holiday.html"><i className="fas fa-holly-berry"></i> <span>Holiday</span></Link>
                     </li>
                     <li>
                        <Link to="fees.html"><i className="fas fa-comment-dollar"></i> <span>Fees</span></Link>
                     </li>
                     <li>
                        <Link to="exam.html"><i className="fas fa-clipboard-list"></i> <span>Exam list</span></Link>
                     </li>
                     <li>
                        <Link to="event.html"><i className="fas fa-calendar-day"></i> <span>Events</span></Link>
                     </li>
                     <li>
                        <Link to="time-table.html"><i className="fas fa-table"></i> <span>Time Table</span></Link>
                     </li>
                     <li>
                        <Link to="library.html"><i className="fas fa-book"></i> <span>Library</span></Link>
                     </li>
                     <li className="menu-title">
                        <span>Pages</span>
                     </li>
                     <li className="submenu">
                        <Link to="#"><i className="fas fa-shield-alt"></i> <span> Authentication </span> <span className="menu-arrow"></span></Link>
                        <ul>
                           <li><Link to="login.html">Login</Link></li>
                           <li><Link to="register.html">Register</Link></li>
                           <li><Link to="forgot-password.html">Forgot Password</Link></li>
                           <li><Link to="error-404.html">Error Page</Link></li>
                        </ul>
                     </li>
                     <li>
                        <Link to="blank-page.html"><i className="fas fa-file"></i> <span>Blank Page</span></Link>
                     </li>
                     <li className="menu-title">
                        <span>Others</span>
                     </li>
                     <li>
                        <Link to="sports.html"><i className="fas fa-baseball-ball"></i> <span>Sports</span></Link>
                     </li>
                     <li>
                        <Link to="hostel.html"><i className="fas fa-hotel"></i> <span>Hostel</span></Link>
                     </li>
                     <li>
                        <Link to="transport.html"><i className="fas fa-bus"></i> <span>Transport</span></Link>
                     </li>
                     <li className="menu-title">
                        <span>UI Interface</span>
                     </li>
                     <li>
                        <Link to="components.html"><i className="fas fa-vector-square"></i> <span>Components</span></Link>
                     </li>
                     <li className="submenu">
                        <Link to="#"><i className="fas fa-columns"></i> <span> Forms </span> <span className="menu-arrow"></span></Link>
                        <ul>
                           <li><Link to="form-basic-inputs.html">Basic Inputs </Link></li>
                           <li><Link to="form-input-groups.html">Input Groups </Link></li>
                           <li><Link to="form-horizontal.html">Horizontal Form </Link></li>
                           <li><Link to="form-vertical.html"> Vertical Form </Link></li>
                           <li><Link to="form-mask.html"> Form Mask </Link></li>
                           <li><Link to="form-validation.html"> Form Validation </Link></li>
                        </ul>
                     </li>
                     <li className="submenu">
                        <Link to="#"><i className="fas fa-table"></i> <span> Tables </span> <span className="menu-arrow"></span></Link>
                        <ul>
                           <li><Link to="tables-basic.html">Basic Tables </Link></li>
                           <li><Link to="data-tables.html">Data Table </Link></li>
                        </ul>
                     </li>
                     <li className="submenu">
                        <Link to="javascript:void(0);"><i className="fas fa-code"></i> <span>Multi Level</span> <span className="menu-arrow"></span></Link>
                        <ul>
                           <li className="submenu">
                              <Link to="javascript:void(0);"> <span>Level 1</span> <span className="menu-arrow"></span></Link>
                              <ul>
                                 <li><Link to="javascript:void(0);"><span>Level 2</span></Link></li>
                                 <li className="submenu">
                                    <Link to="javascript:void(0);"> <span> Level 2</span> <span className="menu-arrow"></span></Link>
                                    <ul>
                                       <li><Link to="javascript:void(0);">Level 3</Link></li>
                                       <li><Link to="javascript:void(0);">Level 3</Link></li>
                                    </ul>
                                 </li>
                                 <li><Link to="javascript:void(0);"> <span>Level 2</span></Link></li>
                              </ul>
                           </li>
                           <li>
                              <Link to="javascript:void(0);"> <span>Level 1</span></Link>
                           </li>
                        </ul>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         
    
  </>;
};

export default Sidebar;
