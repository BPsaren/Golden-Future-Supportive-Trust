
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaUser, FaHome } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { RiServiceLine } from "react-icons/ri";

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-20 p-2 bg-gray-800 text-white rounded-md"
      >
        {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 h-full w-64 flex flex-col fixed top-12  left-0 bottom-8 z-10 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="px-5 py-4">

        <div className="px-5 py-4 mt-auto">
          <h2 className="text-white text-lg font-bold">Admin Dashboard</h2>
        </div>

          <nav className="mt-5">
            <ul className="flex flex-col space-y-2">
              {[
                { to: "users", icon: <FaUser className="text-xl" />, label: "Users" },
                { to: "createaccount", icon: <FaHome className="text-xl" />, label: "Create Account" },
                { to: "depositamount", icon: <FaHome className="text-xl" />, label: "Deposit" },
                { to: "withdrawamount", icon: <MdContactMail className="text-xl" />, label: "Withdraw" },
                { to: "findaccount", icon: <RiServiceLine className="text-xl" />, label: "Find Account" },
                { to: "allconsumers", icon: <RiServiceLine className="text-xl" />, label: "All Consumers" },
                { to: "monthlyaudit", icon: <RiServiceLine className="text-xl" />, label: "Monthly Audit" },
              ].map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center p-2 text-white rounded-md hover:bg-gray-700 transition-all duration-200 ${
                        isActive ? "bg-gray-700 scale-105 shadow-lg" : "hover:scale-105 hover:shadow-md"
                      }`
                    }
                  >
                    {item.icon}
                    <span className="mx-4">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
              </nav>
              <div className="px-5 py-4 mt-auto">
          <h2 className="text-white text-lg font-bold">Loan Account</h2>
        </div>

          <nav className="mt-5">
            <ul className="flex flex-col space-y-2">
              {[
              
               
                { to: "createloanaccount", icon: <FaHome className="text-xl" />, label: "Create Loan Account" },
                { to: "loancredit", icon: <FaHome className="text-xl" />, label: "Loan Credit" },
                { to: "loandeposit", icon: <FaHome className="text-xl" />, label: "Loan Deposit" },
                { to: "allloanaccount", icon: <MdContactMail className="text-xl" />, label: "All Loan Accounts" },
                { to: "findloanaccount", icon: <RiServiceLine className="text-xl" />, label: "Find Loan Account" },
                { to: "monthlyloanaudit", icon: <RiServiceLine className="text-xl" />, label: "Monthly Loan Audit" },
                { to: "closeloanaccount", icon: <RiServiceLine className="text-xl" />, label: "Close Loan Account" },
              ].map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center p-2 text-white rounded-md hover:bg-gray-700 transition-all duration-200 ${
                        isActive ? "bg-gray-700 scale-105 shadow-lg" : "hover:scale-105 hover:shadow-md"
                      }`
                    }
                  >
                    {item.icon}
                    <span className="mx-4">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
              </nav>

              <div className="px-5 py-4 mt-auto">
          <h2 className="text-white text-lg font-bold">Loan Account</h2>
        </div>

          <nav className="mt-5">
            <ul className="flex flex-col space-y-2">
              {[
              
                
                { to: "createinvestmentaccount", icon: <FaHome className="text-xl" />, label: "Create Investment Account" },
                { to: "profitofinvestment", icon: <FaHome className="text-xl" />, label: "Profit Of Investment" },
                { to: "allinvestmentaccount", icon: <FaHome className="text-xl" />, label: "All Investment Account" },
                { to: "investmentmonthlyaudit", icon: <FaHome className="text-xl" />, label: "Monthly Audit" },
                
              ].map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center p-2 text-white rounded-md hover:bg-gray-700 transition-all duration-200 ${
                        isActive ? "bg-gray-700 scale-105 shadow-lg" : "hover:scale-105 hover:shadow-md"
                      }`
                    }
                  >
                    {item.icon}
                    <span className="mx-4">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
              </nav>

        </div>
        
      </aside>

      {/* Main Content */}
      <div className="flex-grow pl-64">
        <Outlet />
      </div>
    </div>
  );
};

