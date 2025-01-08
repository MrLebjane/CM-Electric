import React, { useState, useEffect } from 'react';
import { Routes, Route} from "react-router-dom";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import TechnicianList from './Technicians';
import QueryList from './Messages';
import CUSTOMERList from './Customer';
import Overview from './Overview';
import Inventory from './Inventory';
import Borehole from './inventory/Borehole'
import Generator from './inventory/Generator';
import Electricfence from './inventory/Electricfence';
import Aircon from './inventory/Aircon';
import Wires from './inventory/Wires';
import Solar from './inventory/Solar';
import Information from './customer/Information';
import Task from './technician/Task';
import Viewquery from './query/Viewquery';
import Quotation from './customer/Quotation';
import Services from './Services';
import Feedback from './Feedback';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isScreenMinimized, setIsScreenMinimized] = useState(false);

  const toggleSidebar = () => {
    if (isScreenMinimized && !isSidebarOpen) {
      setIsScreenMinimized(false);
    }
    setIsSidebarOpen(!isSidebarOpen);
    handleResize();
  };
  const handleCloseSidebar=()=>{
    setIsSidebarOpen(false);
  };
  const handleResize = () => {
    setIsScreenMinimized(window.innerWidth <= 668);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Call handleResize initially

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>

      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Routes>
      {/* <TechnicianList isSidebarOpen={isSidebarOpen}/> */}
      {/* <Route path="/" exact component={ExercisesList} />  */}
      <Route path="/" element={<Overview isSidebarOpen={isSidebarOpen} />}/> 
      <Route path="/customers" element={<CUSTOMERList isSidebarOpen={isSidebarOpen} />} />
      <Route path="customer/information" element={<Information isSidebarOpen={isSidebarOpen} />} />
      <Route path="customer/information/quotation" element={<Quotation isSidebarOpen={isSidebarOpen} />} />
      <Route path="/messages" element={<QueryList isSidebarOpen={isSidebarOpen} />} />
      <Route path="/technicians" element={<TechnicianList isSidebarOpen={isSidebarOpen} />} />
      <Route path="technician/task" element={<Task isSidebarOpen={isSidebarOpen} />} />
      <Route path="/query/Viewquery" element={<Viewquery isSidebarOpen={isSidebarOpen} />}/>
      <Route path="/inventory" element={<Inventory isSidebarOpen={isSidebarOpen} />}/>
      <Route path="inventory/borehole" element={<Borehole isSidebarOpen={isSidebarOpen}/>}/>
      <Route path="inventory/aircon" element={<Aircon isSidebarOpen={isSidebarOpen}/>}/>
      <Route path="inventory/electricfence" element={<Electricfence isSidebarOpen={isSidebarOpen}/>}/>
      <Route path="inventory/solar" element={<Solar isSidebarOpen={isSidebarOpen}/>}/>
      <Route path="inventory/generator" element={<Generator isSidebarOpen={isSidebarOpen}/>}/>
      <Route path="inventory/wires" element={<Wires isSidebarOpen={isSidebarOpen}/>}/>
      <Route path="Services" element={<Services isSidebarOpen={isSidebarOpen}/>}/>
      <Route path="Feedback" element={<Feedback isSidebarOpen={isSidebarOpen}/>}/>

      </Routes>
      {!isScreenMinimized && (
        <div className={`content ${isSidebarOpen ? 'c' : ''}`}>
          {isSidebarOpen}
          {/* Rest of the admin dashboard content */}
        </div>
      )}
      {
        isSidebarOpen && <Sidebar isScreenMinimized={isScreenMinimized} onCloseSidebar={handleCloseSidebar}/>
      }
    </div>
  );
};

export default AdminDashboard;
