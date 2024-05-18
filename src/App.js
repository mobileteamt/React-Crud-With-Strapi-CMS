import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams} from 'react-router-dom';
import Login from './components/admin/Login';
import Register from './components/Register';
import Dashboard from './components/admin/Dashboard';
import Header from './components/layouts/Header';
import BlogList from './components/admin/BlogList';
import { Container, Row } from 'react-bootstrap';
import Page404 from './components/Page404';
import EditBlog from './components/admin/EditBlog';
import Home from './components/Home';
import AdminHeader from './components/admin/layouts/AdminHeader';
import AddBlog from './components/admin/AddBlog';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';

function App() {

  /* check user logged in or not */
  var loggedIn = false;
  if(localStorage.getItem('isAdminLoggedIn') == 'true'){
    var loggedIn = true;
  }

  const pathname = window.location.pathname;
  const pathname_arr = pathname.split("/");
  const urlSegments = pathname_arr.filter(function (el) {
    return (el != null && el != '' && el != undefined);
  });
  
  return (
    <>      
      {urlSegments[0] == 'admin' ? <AdminHeader/> : <Header/>}
      <Container className="mt-3 mb-5">
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={!loggedIn ? <Register/> : <Navigate replace to="/admin/dashboard"/>}/>
            <Route path="/blog" element={<Blog/>}/>
            <Route path="/blog/post/:id" element={<BlogPost/>}/>

            <Route path="/admin" element={!loggedIn ? <Login/> : <Navigate replace to="/admin/dashboard"/>}/>
            <Route path="/admin/login" element={!loggedIn ? <Login/> : <Navigate replace to="/admin/dashboard"/>}/>
            <Route path="/admin/dashboard" element={<Dashboard/>}/>
            <Route path="/admin/blog-list" element={<BlogList/>}/>
            <Route path="/admin/edit-blog/:id" element={<EditBlog/>}/>
            <Route path="/admin/add-blog" element={<AddBlog/>}/>
            
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </Router>
      </Container>
    </>
  );
}

export default App;
