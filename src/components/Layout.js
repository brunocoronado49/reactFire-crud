import React, {Fragment} from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Nav from './Nav';

const Layout = () => {
    return (
        <Fragment>
            <Nav/>
            <div className="container p-5">
                <div className="row">
                    <Outlet/>
                </div>
                <ToastContainer/>
            </div>
        </Fragment>
    )
}

export default Layout
