import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import StudentDetails from './components/StudentsDetails';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/login';
import Marks from './components/Marks';
import AddFile from './components/AddFile';
import { AuthProvider } from './components/AuthContext';
import Register from './components/register';
import { Logout } from './components/logout';
import AddStudents from './components/AddStudents';
const App = () => {
  return (
    <>
    <div className="App">
        <Router>
          <AuthProvider>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
            {/* <Route path="/" element={
            <>
            <Login/>
            </>
            }/> */}
            <Route path='/home' element={
            <>
            <Navbar />
            <Home />
            </>
            }/>
            <Route path='/student' element={
            <>
            <Navbar />
            <StudentDetails />
            </>
            }/>
            <Route path='/marks' element={
            <>
            <Navbar />
            <Marks />
            </>
            }/>

            <Route path='/add' element={
            <>
            <Navbar />
            <AddFile />
            </>
            }/>

            <Route path='/addStudents' element={
            <>
            <Navbar />
            <AddStudents />
            </>
            }/>

            {/* <Route path='/Profile' element={
            <>
            <Navbar />
            <Profile/>
            </>
            }/> */}
          </Routes>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
};
  
export default App;