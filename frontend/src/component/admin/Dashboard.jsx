import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import "./dashboard.css"
import { Doughnut, Line } from "react-chartjs-2"
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../actions/userAction'

Chart.register(CategoryScale);

const Dashboard = () => {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.allUsers)


  let outOfStock = 0;


  useEffect(() => {


    dispatch(getAllUsers())
  }, [dispatch])

  let totalAmount = 0;
  



  return (

    <div className="container-fluid">
    
      <div className="row">

        <Sidebar />


        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>


          <div className='dashboardContainer'>

            <h2 className='text-center'>Dashboard</h2>
            <div className="dashboardSummary">

              <div className="dashboardSummaryBox2">


                <Link to="/admin/users">
                  <p>Users</p>
                  <p>{users?.length}</p>
                </Link>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default Dashboard
