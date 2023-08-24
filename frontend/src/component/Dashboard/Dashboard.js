import React, { Fragment } from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar"
import DashboardHeader from "./DashboardHeader";
import MetaData from "../MetaData";

const Dashboard = () => {
  return (
    <Fragment>
      <MetaData title="Admin Dashboard" />
      <div className="dashboard">
      {/* <DashboardHeader/> */}
      <div className="dasboard_home">
        <div className="dasboard_home_sidebar">
        <Sidebar/>
        </div>
        <div className="dashboard_post">right</div>
      </div>
    </div>
    </Fragment>
  );
};

export default Dashboard;
