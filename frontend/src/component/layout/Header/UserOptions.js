import React, { Fragment, useState } from 'react'
import {SpeedDial, SpeedDialAction} from '@mui/lab';
import { Navigate, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import {MdOutlineDashboard} from 'react-icons/md'
import {FaUserCircle} from 'react-icons/fa';
import {GrLogout} from 'react-icons/gr'
import {logout} from '../../../actions/userAction'

function UserOptions({user}) {

    const toastOptions = {
        position: "bottom-center",
        autoClose: 3001,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const options = [
        { icon: <FaUserCircle />, name: "Profile", func: account },
        { icon: <GrLogout />, name: "Logout", func: logoutUser },
    ];

    if (user.role === "admin") {
        options.unshift({
            icon: <MdOutlineDashboard />,
            name: "Dashboard",
            func: dashboard,
        });
    }

    function dashboard() {
        navigate("/admin/dashboard");
    }

    
    function account() {
        navigate("/account");
    }
    
    
    function logoutUser() {
        dispatch(logout());
        toast.success("Logout Successfully", toastOptions);
        <ToastContainer />
        navigate("/");
    }

    return (
    <Fragment>
        <SpeedDial ariaLabel="SpeedDial tooltip example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            style={{ zIndex: "11" }}
            open={open}
            direction="down"
            className="speedDial"
            icon={ 
                <img className="speedDialIcon" src={user.avatar.url ? user.avatar.url : "/Profile.png"} alt="Profile"  />
            } >
            {options.map((item) => (
                <SpeedDialAction
                    key={item.name}
                    icon={item.icon}
                    tooltipTitle={item.name}
                    onClick={item.func}
                    tooltipOpen={window.innerWidth <= 600 ? true : false}
                />
            ))}
        </SpeedDial>
        <ToastContainer />
    </Fragment>
    )
}

export default UserOptions