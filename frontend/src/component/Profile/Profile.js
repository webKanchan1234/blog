import { Fragment, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LockIcon from "@mui/icons-material/Lock";

import { clearErrors, updatePassword } from '../../action/userAction';

// import Loader from "../Loader/Loader"
import "./profile.css"
import MetaData from '../MetaData';
import ProCommon from './ProCommon';

const Profile = () => {
 
  return (
    <>

      <MetaData title="Profile" />
      <div className="profile_container">
        <ProCommon/>
      </div>
    <h3>Profile</h3>
    </>
  )
}

export default Profile