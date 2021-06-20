import React from "react";
import dashboard from "../images/dashboard.png";
import appointment from "../images/appointment.png";
import  patiant from "../images/patiant.png";
import lab from "../images/lab.png";
import insurancecom from "../images/insurancecom.png";
import calender from "../images/calender.png";
import emailnot from "../images/emailnot.png";
import {BrowserRouter, Link, Router} from "react-router-dom";
const SideMenu = () => {
    return (
    <div className="side-nav-container">
        <ul className="nav-list">
            
            <li>
                <img src={dashboard} alt="Avatar" style={{width: 50}}/><Link to="/"> Dashboard </Link>
            </li>
            <li>
                <img src={appointment} alt="Avatar" style={{width: 50}}/><Link to="/appointment"> Appointment </Link>
            </li>
            <li>
                <img src={patiant} alt="Avatar" style={{width: 50}}/><Link to="/patient">Patiants </Link>
            </li>
            <li>
                <img src={lab} alt="Avatar" style={{width: 50}}/> <Link  to="/labs">Labs </Link>
            </li>
            <li>
                <img src={insurancecom} alt="Avatar" style={{width: 50}}/><Link to="/insurancecompanys">Insurance Companies</Link>
            </li>
            <li>
                <img src={calender} alt="Avatar" style={{width: 50}}/><Link to="/calculator">Calculater</Link>
            </li>
            <li>
                <img src={emailnot} alt="Avatar" style={{width: 50}}/><Link to="/notification">Email-Notification</Link>
            </li>
            
        </ul>
    </div>
    )
}

export default SideMenu;