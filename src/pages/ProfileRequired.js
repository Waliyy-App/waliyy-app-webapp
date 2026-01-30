import React from "react";
import { Link } from "react-router-dom";
import WarningIcon from "@mui/icons-material/Warning"; // Or any suitable icon

const ProfileRequired = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                <div className="mb-6 flex justify-center text-yellow-500">
                    <WarningIcon style={{ fontSize: 60 }} />
                </div>
                <h2 className="text-2xl font-bold text-[#2D133A] mb-4">
                    Profile Completion Required
                </h2>
                <p className="text-gray-600 mb-8">
                    You need to complete your profile to have access to the site. Please
                    click the button below to finish setting up your profile.
                </p>
                <Link
                    to="/get-started"
                    className="inline-block w-full py-3 px-6 bg-[#BA9FFE] hover:bg-[#a37eff] text-white font-medium rounded-lg transition-colors duration-300 shadow-md"
                >
                    Complete Profile
                </Link>
            </div>
        </div>
    );
};

export default ProfileRequired;
