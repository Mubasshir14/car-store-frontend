
import { Outlet } from 'react-router-dom';


import Navbar from '@/pages/Navbar';
import UserSidebar from './UserSidebar';


const UserDashBoard = () => {
    return (
        <div className='max-w-screen-2xl mx-auto'>
         <div >
         <Navbar/>
         </div>
            <div className="min-h-screen bg-gray-50">
            <div className="flex mt-5">
                <UserSidebar />
                <main className="flex-1 p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
        </div>
    );
};

export default UserDashBoard;