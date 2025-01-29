
import { Outlet } from 'react-router-dom';
import SideBar from './Sidebar';

import Navbar from '@/pages/Navbar';


const DashBoard = () => {
    return (
        <div className='max-w-screen-xl mx-auto'>
         <div >
         <Navbar/>
         </div>
            <div className="min-h-screen bg-gray-50">
            <div className="flex mt-5">
                <SideBar />
                <main className="flex-1 p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
        </div>
    );
};

export default DashBoard;