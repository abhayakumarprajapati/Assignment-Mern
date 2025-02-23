import "./App.css";
import { useEffect } from 'react';
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader"
import React from "react";
import Footer from "./component/layout/Footer/Footer.jsx"
import Home from "./component/Home/Home";
import Search from "./component/Product/Search";
import { Button } from 'react-bootstrap';
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction"
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";

import Dashboard from "./component/admin/Dashboard";
import axios from "axios";
import Stripe from "stripe";
import ProtectedRoute from "./component/Route/ProtectedRoute";

import UsersList from "./component/admin/UsersList";
import UpdateUser from "./component/admin/UpdateUser";
import NotFound from "./component/layout/NotFound";
import Contact from "./component/Contact/Contact";
import About from "./component/AboutUs/About";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'




function App() {


    const { isAuthenticated, user } = useSelector((state) => state.user)
    console.log('testisAuthenticated', isAuthenticated);
    


    useEffect(() => {
        WebFont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Chilanka"],
            },
        });

        store.dispatch(loadUser())

     

    }, [])




    return (
        <Router>
            <Header />

            {/* {isAuthenticated && <UserOptions user={user} />} */}
            <ToastContainer />

            <Routes>

                <Route exact path="/" element={<Home />} />
               
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/about" element={<About />} />

                <Route exact path="/search" element={<Search />} />

              

                {/* <Route exact path="/account" element={< Profile/>}  /> */}
                <Route exact path="/account" element={< Profile />} />

                <Route exact path="/me/update" element={<UpdateProfile />} />
                

                <Route exact path="/login" element={<LoginSignUp />} />
               
                <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                   
                    <Route exact path="/admin/users" element={<UsersList />} />

                    <Route exact path="/admin/user/:id" element={< UpdateUser />} />

                   


                </Route>



                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<NotFound />} />



            </Routes>

            <Footer />

        </Router>


    );

}


export default App;











