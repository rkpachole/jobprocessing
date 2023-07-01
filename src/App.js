import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginReg from "./pages/auth/LoginReg";
import Registration from './pages/auth/Registration';
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import Dashboard from "./pages/Dashboard";
import Dashboardcd from "./pages/Fieldmaster";
import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
import Fieldmaster from "./pages/Fieldmaster";
import Taskmaster from "./pages/Taskmaster";
import Taskfieldmaster from "./pages/Taskfieldmaster";
import Taskfieldmastertwo from "./pages/Taskfieldmastertwo";
import ChangePassword from "./pages/auth/ChangePassword";
import Usermaster from "./pages/usermaster";
import Usertaskaccess from "./pages/usertaskaccess";
import Menugroupmaster from "./pages/MenuGroupMaster";
import Menumaster from "./pages/MenuMaster";
import TaskcompanyMaster from "./pages/TaskcompanyMaster";
import Fieldadd from "./FieldTablePages/fieldadd";
import Fieldedit from "./FieldTablePages/fieldedit";
import Fieldcopy from "./FieldTablePages/fieldcopy";
import Fieldview from "./FieldTablePages/fieldview";
import Fieldinactive from "./FieldTablePages/fieldinactive";
import Fieldactive from "./FieldTablePages/fieldactive";
import Fielddelete from "./FieldTablePages/fielddelete";
import Taskadd from "./TaskTablePages/taskadd";
import Taskedit from "./TaskTablePages/taskedit";
import Taskcopy from "./TaskTablePages/taskcopy";
import Taskview from "./TaskTablePages/taskview";
import Taskinactive from "./TaskTablePages/taskinactive";
import Taskactive from "./TaskTablePages/taskactive";
import Taskdelete from "./TaskTablePages/taskdelete";
import Fieldtaskcopy from "./FieldTaskTablePages/fieldtaskcopy";
import Fieldtaskadd from "./FieldTaskTablePages/fieldtaskadd";
import Fieldtaskview from "./FieldTaskTablePages/fieldtaskview";
import Fieldtaskedit from "./FieldTaskTablePages/fieldtaskedit";
import Fieldtaskinactive from "./FieldTaskTablePages/fieldtaskinactive";
import Fieldtaskactive from "./FieldTaskTablePages/fieldtaskactive";
import Fieldtaskdelete from "./FieldTaskTablePages/fieldtaskdelete";
import Loginpagetext from "./Loginpagetext";
import Demo11 from "./pages/demo11";
// import Admintab from "./admin/Admintab";
function App() {
  const { access_token } = useSelector(state => state.auth)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LoginReg />} />
            {/* <Route path="login" element={!access_token ? <LoginReg /> : <Navigate to="/dashboard" />} /> */}
            <Route path="login" element={!access_token ? <LoginReg /> : <Navigate to="/fieldmaster" />} />
            <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />
            <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />
          </Route>
          <Route path="/dashboard" element={access_token ? <Fieldmaster /> : <Navigate to="/login" />} />
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
          <Route path="register" element={<Registration />} />
          <Route path="fieldmaster" element={<Fieldmaster />} />
          <Route path="taskmaster" element={<Taskmaster />} />
          <Route path="taskcompanyMaster" element={<TaskcompanyMaster />} />
          <Route path="taskfieldmaster" element={<Taskfieldmaster />} />
          <Route path="taskfieldmastertwo" element={<Taskfieldmastertwo />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="usermaster" element={<Usermaster />} />
          <Route path="usertaskaccess" element={<Usertaskaccess />} />
          {/* <Route path="dashboardcd" element={<Dashboardcd/>} /> */}
          <Route path="menugroupmaster" element={<Menugroupmaster />} />
          <Route path="menumaster" element={<Menumaster />} />
          {/* <Route path="admin" element={<Admintab />} /> */}
          {/* ======== Field Table Pages ========= */}
          <Route path="fieldadd" element={<Fieldadd />} />
          {/* <Route path="fieldedit" element={<Fieldedit />} /> */}
          {/* <Route path="fieldcopy" element={<Fieldcopy />} /> */}
          {/* <Route path="fieldview" element={<Fieldview />} /> */}
          <Route path="/fieldinactive/:id" element={<Fieldinactive />} />
          <Route path="/fieldactive/:id" element={<Fieldactive />} />
          <Route path="/fielddelete/delete/:id" element={<Fielddelete />} />
          {/* ======== Task Table Pages ========= */}
          <Route path="taskadd" element={<Taskadd />} />
          {/* <Route path="taskedit" element={<Taskedit />} /> */}
          {/* <Route path="taskcopy" element={<Taskcopy />} /> */}
          <Route path="taskview" element={<Taskview />} />
          <Route path="/taskinactive/:id" element={<Taskinactive />} />
          <Route path="/taskactive/:id" element={<Taskactive />} />
          <Route path="/taskdelete/delete/:id" element={<Taskdelete />} />
          {/* ======== Field Task Table Pages ========= */}
          <Route path="/fieldtaskcopy/:id" element={<Fieldtaskcopy />} />
          <Route path="fieldtaskadd" element={<Fieldtaskadd />} />
          <Route path="/fieldtaskview/:id" element={<Fieldtaskview />} />
          <Route path="/fieldtaskview/:id/:id" element={<Fieldtaskview />} />
          <Route path="/fieldtaskedit/:id" element={<Fieldtaskedit />} />
          <Route path="fieldtaskinactive" element={<Fieldtaskinactive />} />
          <Route path="fieldtaskactive" element={<Fieldtaskactive />} />
          {/* <Route path="fieldtaskdelete" element={<Fieldtaskdelete />} /> */}
          <Route path="/fieldmaster/edit/:id" element={<Fieldedit />} />
          <Route path="/fieldmaster/copy/:id" element={<Fieldcopy />} />
          <Route path="/fieldmaster/:id" element={<Fieldview />} />
          <Route path="/taskmaster/edit/:id" element={<Taskedit />} />
          <Route path="/taskmaster/copy/:id" element={<Taskcopy />} />
          <Route path="/taskmaster/:id" element={<Taskview />} />
          <Route path="/fieldtaskdelete/:id" element={<Fieldtaskdelete />} />
          <Route path="/taskfieldmaster/ftcopy/:id" element={<Fieldtaskcopy />} />
          <Route path="demo" element={<Demo11 />} />
          <Route path="logindemo" element={<Loginpagetext />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;