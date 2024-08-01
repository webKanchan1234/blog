import React, { Fragment, useEffect } from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar"
import DashboardHeader from "./DashboardHeader";
import MetaData from "../MetaData";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../action/userAction";
import { allPost } from "../../action/postAction";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const dispatch = useDispatch();
  const {posts } = useSelector((state) => state.posts);
  const { isDeleted } = useSelector((state) => state.profile)
  const { error,loading, users } = useSelector((state) => state.allUsers)


  const data = {
    // labels: ['green', 'rgb(211, 54, 54)', 'rgb(171, 22, 171)'],
    datasets: [{
      // label: 'My First Dataset',
      data: [posts.length, users.length, 15],
      backgroundColor: [
        'green',
        'rgb(211, 54, 54)',
        'rgb(171, 22, 171)'
      ],
      hoverOffset: 4
    }]
  };
  
  const config = {
    type: 'doughnut',
    data: data
  };



  useEffect(() => {
    
    dispatch(allUsers());
    dispatch(allPost());
    
  }, [dispatch]);


  return (
    <Fragment>
      <MetaData title="Admin Dashboard" />
      <div className="dashboard">
      {/* <DashboardHeader/> */}
      <div className="dasboard_home">
        <div className="dasboard_home_sidebar">
        <Sidebar/>
        </div>
        <div className="dashboard_post">
          <div className="total">
            <div className="box total_post">
              <h4>Posts</h4>
              <p>{posts.length}</p>
            </div>
            <div className="box total_users">
              <h4>Users</h4>
              <p>{users.length}</p>
            </div>
            <div className="box total_message">
              <h4>Messages</h4>
              <p>10</p>
            </div>
            <div className=" total_graph">
              {/* <h4>Graph</h4> */}
              <Doughnut data={data} options={config} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
};

export default Dashboard;
