import React from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import UserLoginPage from "./Pages/userLogin";
import UserRegisterPage from "./Pages/userRegister";
import UserHomePage from "./Pages/userHome";
import StudentPage from "./Pages/StudentPage";
import StudentBatchPage from "./Pages/StudentBatchPage";
import StudentActs from "./Pages/StudentActs";
import StudentSats from "./Pages/StudentSats";
import StudentSatsScore from "./Pages/StudentSatsScore";
import ActBatchPage from "./Pages/ActBatchPage";
import SatBatchPage from "./Pages/SatBatchPage";
import ParentPage from "./Pages/ParentPage";
import AdminPage from "./Pages/AdminPage";
import InstructorPage from "./Pages/InstructorPage";
import AddStudentPage from "./Pages/AddStudentPage";
import AddParentPage from "./Pages/AddParentPage";
import AddInstructorPage from "./Pages/AddInstructorPage";
import AddAdminPage from "./Pages/AddAdminPage";
import ActTestPage from "./Pages/ActTestPage";
import Calculator from "./Pages/Calculator";
import Annotation from "./Pages/Annotation";
import NActTestPage from "./Pages/NActTestPage";
import StudentActTestPage from "./Pages/StudentActTestPage";
import AdminLoginPage from "./Pages/adminLogin";
import AdminRegisterPage from "./Pages/adminRegister";
import AdminPanelPage from "./Pages/AdminPanel";
import ErrorPage from "./Pages/errorPage";
import "react-toastify/dist/ReactToastify.css";
import AddUserPage from "./Pages/addUser";
import EditUserPage from "./Pages/editUser";
import EditStudentPage from "./Pages/EditStudentPage";
import ViewStudentPage from "./Pages/ViewStudentPage";
import EditParentPage from "./Pages/EditParentPage";
import EditInstructorPage from "./Pages/EditInstructorPage";
import EditAdminPage from "./Pages/EditAdminPage";
import TeamLeader from "./Pages/TeamLeader";
import AddTestPage from "./Pages/AddTestPage";
import AssignTest from "./Pages/AssignTest";
import AssignBatch from "./Pages/AssignBatch";
import AssignSatTest from "./Pages/AssignSatTest";
import AssignSatTestStudent from "./Pages/AssignSatTestStudent";
import AssignActTestStudent from "./Pages/AssignActTestStudent";
import AssignActTest from "./Pages/AssignActTest";
import EditTestPage from "./Pages/EditTestPage";
import TestPage from "./Pages/TestPage";
import Test from "./Pages/Test";
import ExcelImport from "./Pages/ExcelImport";
import ActImport from "./Pages/ActImport"; 
import StudentsImport from "./Pages/StudentsImport";
import ActSImport from "./Pages/ActSImport";
import ActScale from "./Pages/ActScale";
import ExcelImport2 from "./Pages/ExcelImport2";
import SatQuestion from "./Pages/SatQuestion";
import PreSatQuestion from "./Components/PreSatQuestion";
import SatTestPage from "./Pages/SatTestPage";
import AddSatTestPage from "./Pages/AddSatTestPage";
import EditSatTestPage from "./Pages/EditSatTestPage";
import TopicPage from "./Pages/TopicPage";
import ActTopicPage from "./Pages/ActTopicPage";
import AddTopicPage from "./Pages/AddTopicPage";
import EditTopicPage from "./Pages/EditTopicPage";
import AddActTopicPage from "./Pages/AddActTopicPage";
import EditActTopicPage from "./Pages/EditActTopicPage";
import SubTopicPage from "./Pages/SubTopicPage";
import ActSubTopicPage from "./Pages/ActSubTopicPage";
import AddSubTopicPage from "./Pages/AddSubTopicPage";
import EditSubTopicPage from "./Pages/EditSubTopicPage";
import AddActSubTopicPage from "./Pages/AddActSubTopicPage";
import EditActSubTopicPage from "./Pages/EditActSubTopicPage";
import AddBatchPage from "./Pages/AddBatchPage";
import EditBatchPage from "./Pages/EditBatchPage";
import BatchPage from "./Pages/BatchPage";
import SatTests from "./Pages/SatTests";
import SatTestResults from "./Pages/SatTestResults";
import ActTestResults from "./Pages/ActTestResults";
import Account from "./Pages/Account";
import Settings from "./Pages/Settings";
import PerformanceReport from "./Pages/performanceReport";
import Resources from "./Pages/Resources";
import studentDashboard from "./Pages/studentDashboard";
import Courses from "./Pages/Courses";
import PracticeTests from "./Pages/PracticeTests";
import ActPracticeTests from "./Pages/ActPracticeTests";
import ProgressReports from "./Pages/ProgressReports";
import { ToastContainer, toast } from "react-toastify";
import SendEmailPage from "./Pages/SendEmailPage";
import SendSatReport from "./Pages/SendSatReport";
import SendActReport from "./Pages/SendActReport";
import ScoreAnalysis from "./Pages/ScoreAnalysis";
import ForBidden from "./Pages/ForBidden";
let userRole = "";
if (typeof localStorage !== 'undefined') 
{
  userRole = localStorage.getItem('role'); 
}
const ProtectedRoute = ({ element }) => { 
  if (userRole && userRole === 'admin') {
    return <>{element}</>;
  } else {
    if (userRole && userRole != '') {
      return <Navigate to="/forbidden" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }
};
const UProtectedRoute = ({ element }) => {   
  if (userRole && userRole != '') {
    return <>{element}</>;
  } else {
    return <Navigate to="/" replace />;
  }
};
const CProtectedRoute = ({ element }) => {  
  if (userRole && userRole != '') {
    if (userRole && userRole === 'admin') {
      return <Navigate to="/dashboard" replace />;
    } 
    else
    {
      return <Navigate to="/resources" replace />;
    }
  } else {
    return <>{element}</>;
  }
};
function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<UserLoginPage />} />
          <Route exact path="/home" element={<UserLoginPage />} />
          <Route exact path="/forbidden" element={<ForBidden />} />
          <Route exact path="/dashboard" element={<ProtectedRoute element={<UserHomePage  />} />} />
          <Route exact path="/students" element={<ProtectedRoute element={<StudentPage  />} />} />
          <Route exact path="/students_batches" element={<ProtectedRoute element={<StudentBatchPage  />} />} />
          <Route exact path="/students_acts" element={<ProtectedRoute element={<StudentActs  />} />}/>
          <Route exact path="/students_sats" element={<ProtectedRoute element={<StudentSats  />}/>}/>
          <Route exact path="/students_sats_score" element={<ProtectedRoute element={<StudentSatsScore  />}/>}/>
          <Route exact path="/acttests_batches" element={<ProtectedRoute element={<ActBatchPage  />}/>}/>
          <Route exact path="/sattests_batches" element={<ProtectedRoute element={<SatBatchPage  />}/>}/>
          <Route exact path="/parents" element={<ProtectedRoute element={<ParentPage  />}/>}/>
          <Route exact path="/admins" element={<ProtectedRoute element={<AdminPage  />}/>}/>
          <Route exact path="/instructors" element={<ProtectedRoute element={<InstructorPage  />}/>}/>
          <Route exact path="/add_student/:parent_id" element={<ProtectedRoute element={<AddStudentPage  />}/>}/>
          <Route exact path="/add_instructor" element={<ProtectedRoute element={<AddInstructorPage  />}/>}/>
          <Route exact path="/add_parent" element={<ProtectedRoute element={<AddParentPage  />}/>}/>
          <Route exact path="/add_admin"  element={<ProtectedRoute element={<AddAdminPage  />}/>}/>
          <Route exact path="/edit_student/:id" element={<ProtectedRoute element={<EditStudentPage  />}/>}/>
          <Route exact path="/edit_instructor/:id" element={<ProtectedRoute element={<EditInstructorPage  />}/>}/>
          <Route exact path="/view_student/:id" element={<ProtectedRoute element={<ViewStudentPage  />}/>}/>
          <Route exact path="/edit_parent/:id" element={<ProtectedRoute element={<EditParentPage  />}/>}/>
          <Route exact path="/edit_admin/:id" element={<ProtectedRoute element={<EditAdminPage  />}/>}/>
          <Route exact path="/acttestpage/:id"  element={<ActTestPage  />}/>
          <Route exact path="/nacttestpage/:id"  element={<ProtectedRoute element={<NActTestPage  />}/>}/>
          <Route exact path="/assigntests/:id"  element={<ProtectedRoute element={<AssignTest  />}/>}/>
          <Route exact path="/assignbatches/:id" element={<ProtectedRoute element={<AssignBatch  />}/>}/>
          <Route exact path="/assignacttests/:id" element={<ProtectedRoute element={<AssignActTest  />}/>}/>
          <Route exact path="/assignsattests/:id" element={<ProtectedRoute element={<AssignSatTest  />}/>}/>
          <Route exact path="/assignsattestsstudents/:id" element={<ProtectedRoute element={<AssignSatTestStudent  />}/>}/>
          <Route exact path="/assignacttestsstudents/:id" element={<ProtectedRoute element={<AssignActTestStudent  />}/>}/>          

          <Route exact path="/tests" element={<ProtectedRoute element={<TestPage  />}/>}/>
          <Route exact path="/test" element={<ProtectedRoute element={<Test  />}/>}/>
          <Route exact path="/add_test" element={<ProtectedRoute element={<AddTestPage  />}/>}/>
          <Route exact path="/edit_test/:id" element={<ProtectedRoute element={<EditTestPage  />}/>}/>
          <Route exact path="/excelimport/:id" element={<ProtectedRoute element={<ExcelImport  />}/>}/>
          <Route exact path="/acttestimport/:id" element={<ProtectedRoute element={<ActImport  />}/>}/>
          <Route exact path="/studentsimport" element={<ProtectedRoute element={<StudentsImport  />}/>}/>
          <Route exact path="/actstestimport/:id" element={<ProtectedRoute element={<ActSImport  />}/>}/>
          <Route exact path="/acttestscale/:id" element={<ProtectedRoute element={<ActScale  />}/>}/>
          <Route exact path="/excelimport2" element={<ProtectedRoute element={<ExcelImport2  />}/>}/>
          <Route exact path="/add_sattest" element={<ProtectedRoute element={<AddSatTestPage  />}/>}/>
          <Route exact path="/edit_sattest/:id" element={<ProtectedRoute element={<EditSatTestPage  />}/>}/>
          <Route exact path="/sattests" element={<ProtectedRoute element={<SatTestPage  />}/>}/>
          <Route exact path="/add_topic" element={<ProtectedRoute element={<AddTopicPage  />}/>}/>
          <Route exact path="/edit_topic/:id" element={<ProtectedRoute element={<EditTopicPage  />}/>}/>
          <Route exact path="/topics" element={<ProtectedRoute element={<TopicPage  />}/>}/>
          <Route exact path="/acttopics" element={<ProtectedRoute element={<ActTopicPage  />}/>}/>
          <Route exact path="/add_acttopic" element={<ProtectedRoute element={<AddActTopicPage  />}/>}/>
          <Route exact path="/edit_acttopic/:id" element={<ProtectedRoute element={<EditActTopicPage  />}/>}/>
          <Route exact path="/add_subtopic" element={<ProtectedRoute element={<AddSubTopicPage  />}/>}/>
          <Route exact path="/edit_subtopic/:id" element={<ProtectedRoute element={<EditSubTopicPage  />}/>}/>
          <Route exact path="/subtopics" element={<ProtectedRoute element={<SubTopicPage  />}/>}/>
          <Route exact path="/actsubtopics" element={<ProtectedRoute element={<ActSubTopicPage  />}/>}/>
          <Route exact path="/add_actsubtopic" element={<ProtectedRoute element={<AddActSubTopicPage  />}/>}/>
          <Route exact path="/edit_actsubtopic/:id" element={<ProtectedRoute element={<EditActSubTopicPage  />}/>}/>
          <Route exact path="/add_batch" element={<ProtectedRoute element={<AddBatchPage  />}/>}/>
          <Route exact path="/edit_batch/:id" element={<ProtectedRoute element={<EditBatchPage  />}/>}/>
          <Route exact path="/batches" element={<ProtectedRoute element={<BatchPage  />}/>}/>



          <Route  exact path="/sat/test/:id" element={<UProtectedRoute element={<SatTests  />}/>}/>
          <Route exact path="/satquestion/:id" element={<UProtectedRoute element={<SatQuestion  />}/>}/>
          <Route  exact path="/start/satquestion/:id" element={<UProtectedRoute element={<PreSatQuestion  />}/>}/>
          <Route  exact path="/sat/testresults/:id" element={<UProtectedRoute element={<SatTestResults  />}/>}/>
          <Route  exact path="/act/testresults/:id" element={<UProtectedRoute element={<ActTestResults  />}/>}/>
          <Route  exact path="/sat/performance/:id" element={<UProtectedRoute element={<PerformanceReport  />}/>}/>
          <Route exact path="/account" element={<UProtectedRoute element={<Account  />}/>}/>
          <Route exact path="/settings" element={<UProtectedRoute element={<Settings  />}/>}/>
          <Route exact path="/send-email"element={<UProtectedRoute element={<SendEmailPage  />}/>}/>
          <Route exact path="/send-sarreport/:id" element={<UProtectedRoute element={<SendSatReport  />}/>}/>
          <Route exact path="/send-actreport/:id" element={<UProtectedRoute element={<SendActReport  />}/>}/>
          <Route
            exact
            path="/acttests/:id" 
            element={<UProtectedRoute element={<StudentActTestPage  />}/>}/>
          <Route
            exact
            path="/acttests/:id/section/:sid" 
            element={<UProtectedRoute element={<ActTestPage  />}/>}/>
          <Route exact path="/calculator" element={<UProtectedRoute element={<Calculator  />}/>}/>
          <Route exact path="/annotation" element={<UProtectedRoute element={<Annotation  />}/>}/>
          <Route exact path="/practice_tests" element={<UProtectedRoute element={<PracticeTests  />}/>}/>
          <Route exact path="/act_practice_tests" element={<UProtectedRoute element={<ActPracticeTests  />}/>}/>
          <Route exact path="/resources" element={<UProtectedRoute element={<Resources  />}/>}/> 
          <Route exact path="/progress_reports" element={<UProtectedRoute element={<ProgressReports  />}/>}/>
          <Route exact path="/score_analysis" element={<UProtectedRoute element={<ScoreAnalysis  />}/>}/>
          <Route exact path="/student_dashboard" element={<UProtectedRoute element={<studentDashboard  />}/>}/>
          <Route exact path="/courses" element={<UProtectedRoute element={<Courses  />}/>}/>
          <Route exact path="/register" element={<UProtectedRoute element={<UserRegisterPage  />}/>}/>
          <Route exact path="/team-leader" element={<UProtectedRoute element={<TeamLeader  />}/>}/>
          <Route exact path="/recuiter-leader" element={<UProtectedRoute element={<TeamLeader  />}/>}/>
          <Route exact path="/admin" element={<UProtectedRoute element={<AdminLoginPage  />}/>}/>
          <Route exact path="/admin_register" element={<UProtectedRoute element={<AdminRegisterPage  />}/>}/>
          <Route exact path="/admin_panel" element={<UProtectedRoute element={<AdminPanelPage  />}/>}/>
          <Route exact path="/delete/:id" element={<UProtectedRoute element={<AdminPanelPage  />}/>}/>
          <Route exact path="/edit/:id" element={<UProtectedRoute element={<EditUserPage  />}/>}/>
          <Route exact path="/block/:id" element={<UProtectedRoute element={<AdminPanelPage  />}/>}/>
          <Route exact path="/unblock/:id" element={<UProtectedRoute element={<AdminPanelPage  />}/>}/>
          <Route exact path="/add" element={<UProtectedRoute element={<AddUserPage  />}/>}/>
          <Route exact path="*" element={<UProtectedRoute element={<ErrorPage  />}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
