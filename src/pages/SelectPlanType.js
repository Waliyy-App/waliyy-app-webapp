import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarComponent from "../components/sidebar/Sidebar";
import Navigation from "../components/sidebar/Navigation";
import MobileNav from "../components/sidebar/MobileBottomNav";
import { usePersistedState } from "../utils.js";
import { FaCalendarAlt, FaCalendarCheck } from "react-icons/fa";

const SelectPlanType = () => {
    const [isOpen, setIsOpen] = usePersistedState("isOpen", false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (interval) => {
        navigate(`/pricing?interval=${interval}`);
    };

    return (
        <div className="flex flex-col sm:flex-row min-h-screen bg-[#f8f7ff]">
            <SidebarComponent isOpen={isOpen} toggleMenu={toggleMenu} />
            <main
                className={`${isOpen ? "ml-0 sm:ml-[100px]" : "ml-0 sm:ml-[280px]"
                    } flex-1 transition-all duration-300`}
            >
                <Navigation />
                <div className="py-16 px-4 sm:px-8 max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#2D133A] mb-4">
                            Choose Your Journey
                        </h1>
                        <p className="text-lg text-[#665e6b] max-w-2xl mx-auto">
                            Select the subscription rhythm that fits your path to finding a
                            pious spouse.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                        {/* Monthly Card */}
                        <div
                            onClick={() => handleSelect("monthly")}
                            className="group relative bg-white rounded-3xl p-8 shadow-xl cursor-pointer transform transition-all hover:scale-[1.03] hover:shadow-2xl border-2 border-transparent hover:border-[#BA9FFE]"
                        >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#BA9FFE] p-4 rounded-2xl shadow-lg text-white">
                                <FaCalendarAlt size={32} />
                            </div>
                            <div className="mt-8 text-center">
                                <h2 className="text-3xl font-bold text-[#2D133A] mb-4">
                                    Monthly
                                </h2>
                                <p className="text-[#665e6b] mb-8">
                                    Perfect for those who want to explore with flexibility.
                                </p>
                                <div className="py-3 px-6 bg-[#BA9FFE] bg-opacity-10 text-[#BA9FFE] font-bold rounded-xl group-hover:bg-[#BA9FFE] group-hover:text-white transition-colors">
                                    View Monthly Plans
                                </div>
                            </div>
                        </div>

                        {/* Annual Card */}
                        <div
                            onClick={() => handleSelect("annual")}
                            className="group relative bg-white rounded-3xl p-8 shadow-xl cursor-pointer transform transition-all hover:scale-[1.03] hover:shadow-2xl border-2 border-transparent hover:border-[#BA9FFE]"
                        >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#2D133A] p-4 rounded-2xl shadow-lg text-white">
                                <FaCalendarCheck size={32} />
                            </div>
                            {/* Badge for Annual */}
                            <div className="absolute top-4 right-4 bg-yellow-400 text-[#2D133A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Best Value
                            </div>
                            <div className="mt-8 text-center">
                                <h2 className="text-3xl font-bold text-[#2D133A] mb-4">
                                    Annual
                                </h2>
                                <p className="text-[#665e6b] mb-8">
                                    The most committed approach to finding your half deen.
                                </p>
                                <div className="py-3 px-6 bg-[#2D133A] bg-opacity-10 text-[#2D133A] font-bold rounded-xl group-hover:bg-[#2D133A] group-hover:text-white transition-colors">
                                    View Annual Plans
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center text-[#665e6b]">
                        <p>All plans include full access to Waliyy features.</p>
                    </div>
                </div>
            </main>
            <MobileNav />
        </div>
    );
};

export default SelectPlanType;
