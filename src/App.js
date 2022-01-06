import { Route, Switch, Redirect } from "react-router-dom";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import AuthUser from "./store/auth-context";
// import loginSvg from "./login.svg";
import HomeLogin from "./components/home/HomeLogin";
import { useState } from "react";
import Announcement from "./components/admin/Announcement";
import Organisation from "./components/organisation/Organisation";
import HodDashboard from "./components/dashboard/HodDashboard";
import Branch from "./components/branch/Branch";
import "./App.css";
import AssignmentsDashboard from "./components/hod/assignments/AssignmentsDashboard";
import TeacherDashboard from "./components/teacher/DashboardBody";
import Dashboard from "./components/teacher/experiment/Dashboard";
import ViewStudents from "./components/teacher/students/ViewStudents";
import HodDashboardAssignment from "./components/hod/assignments/Dashboard";
import DashboardStudent from "./components/student/Dashboard";
import Course from "./components/student/Course";
import DashboardSubject from "./components/student/coursetabs/subject/DashboardSubject";
import DashboardAssignment from "./components/student/coursetabs/subject/assigment/DashboardAssignment";
function App() {
  const [wait, setWait] = useState();
  const [studentFiles, setStudentFiles] = useState({
    id: false,
    url: false,
    name: false,
    rollnumber: false,
    fileName: false,
    marks: false,
  });
  const [facultyFile, setFacultyFile] = useState({
    url: false,
    name: false,
  });
  const [studentCount, setStudentCount] = useState(0);
  const [facultyCount, setFacultyCount] = useState(0);
  const [userData, setUserData] = useState();
  const [refresh, setRefresh] = useState(true);
  const [branches, setBranches] = useState();
  const [dataSubjects, setDataSubjects] = useState();
  const [dataSubject, setDataSubject] = useState();
  const [dataBranch, setDataBranch] = useState();
  const [dataAssignments, setDataAssignments] = useState();
  const [dataAssignment, setDataAssignment] = useState();
  const [multiLoad, setMultiLoad] = useState(false);
  const [dataStudents, setDataStudents] = useState();
  const [dataOrganisation, setDataOrganisation] = useState();
  // {
  //   id: "",
  //   name: "",
  //   type: "",
  //   hod: {},
  //   branches: {},
  // }
  const [allAnnouncements, setAllAnnouncements] = useState({
    hodAnnouncements: [],
    teacherAnnouncements: [],
  });

  var UserData;
  return (
    <AuthUser.Provider
      value={{
        userData: userData,
        setUserData: setUserData,
        UserData: UserData,
        refresh: refresh,
        setRefresh: setRefresh,
        dataBranch: dataBranch,
        setDataBranch: setDataBranch,
        dataOrganisation: dataOrganisation,
        setDataOrganisation: setDataOrganisation,
        branches: branches,
        setBranches: setBranches,
        dataSubjects: dataSubjects,
        setDataSubjects: setDataSubjects,
        dataAssignment: dataAssignment,
        setDataAssignment: setDataAssignment,
        dataStudents: dataStudents,
        setDataStudents: setDataStudents,
        dataSubject: dataSubject,
        setDataSubject: setDataSubject,
        dataAssignments: dataAssignments,
        setDataAssignments: setDataAssignments,
        multiLoad: multiLoad,
        setMultiLoad: setMultiLoad,
        studentCount: studentCount,
        setStudentCount: setStudentCount,
        facultyCount: facultyCount,
        setFacultyCount: setFacultyCount,
        allAnnouncements: allAnnouncements,
        setAllAnnouncements: setAllAnnouncements,
        facultyFile: facultyFile,
        setFacultyFile: setFacultyFile,
        studentFiles: studentFiles,
        setStudentFiles: setStudentFiles,
        wait: wait,
        setWait: setWait,
      }}
    >
      <div className="container-fluid">
        <Switch>
          <Route path="/" exact>
            <HomeLogin />
          </Route>
          <Route path="/admin/dashboard" exact>
            <AdminDashboard />
          </Route>
          <Route path="/admin/:organisation" exact>
            <Organisation />
          </Route>
          <Route path="/admin/announcement" exact>
            <Announcement />
          </Route>
          <Route path="/:organisation/hod/dashboard" exact>
            <HodDashboard />
          </Route>
          <Route path="/:organisation/hod/branch/:branch" exact>
            <Branch />
          </Route>
          <Route path="/:organisation/hod/branch/:branch/:subjectname" exact>
            <AssignmentsDashboard />
          </Route>
          <Route
            path="/:organisation/hod/branch/:branch/:subjectname/:assignmentid"
            exact
          >
            <HodDashboardAssignment />
          </Route>
          <Route path="/:organisation/teacher/dashboard" exact>
            <TeacherDashboard />
          </Route>
          <Route path="/:organisation/teacher/students" exact>
            <ViewStudents />
          </Route>
          <Route path="/:organisation/teacher/assignments/:assignmentid" exact>
            <Dashboard />
          </Route>
          <Route path="/:organisation/student/events&announcements" exact>
            <DashboardStudent />
          </Route>
          <Route path="/:organisation/student/course" exact>
            <Course />
          </Route>
          <Route path="/:organisation/student/course/:subjectname" exact>
            <DashboardSubject />
          </Route>
          <Route
            path="/:organisation/student/course/:subjectname/:assignmentid"
            exact
          >
            <DashboardAssignment />
          </Route>
        </Switch>
      </div>
    </AuthUser.Provider>
  );
}

export default App;
