import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const VerificationSuccess = () => {
    const navigate = useNavigate();
    const [gender, setGender] = useState("");
    const [waliName, setWaliName] = useState("");
    const [waliEmail, setWaliEmail] = useState("");

    useEffect(() => {
        const savedGender = localStorage.getItem("temp_gender");
        setGender(savedGender);
    }, []);

    const isFemale = gender === "FEMALE";
    const canProceed =
        !isFemale || (waliName.trim() !== "" && waliEmail.trim() !== "");

    const handleProceed = () => {
        if (!canProceed) return;

        // Retrieve existing setup data if any
        const setupData = JSON.parse(
            localStorage.getItem("profileSetupForm") || "{}"
        );

        // Prepare Wali details if female
        const waliDetails = isFemale
            ? {
                waliName: waliName,
                waliEmail: waliEmail,
                waliPhoneNumber: localStorage.getItem("temp_phone") || "",
            }
            : {};

        // Save consolidated data for ProfileSetupForm
        localStorage.setItem(
            "profileSetupForm",
            JSON.stringify({
                ...setupData,
                gender: gender || setupData.gender,
                ...waliDetails,
            })
        );

        navigate("/get-started");
    };

    return (
        <div className="min-h-screen bg-[#FFF4F6] flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-2xl text-center transform transition-all duration-500">
                <div className="flex justify-center mb-6">
                    <div className="bg-[#BA9FFE] bg-opacity-20 p-4 rounded-full">
                        <CheckCircleOutlineIcon
                            style={{ fontSize: 80, color: "#BA9FFE" }}
                        />
                    </div>
                </div>

                <h1 className="text-4xl font-extrabold text-[#2D133A] mb-4">
                    Email Verified!
                </h1>

                <p className="text-lg text-[#665e6b] mb-8 leading-relaxed">
                    Congratulations! Your email has been successfully verified.
                </p>

                {isFemale && (
                    <div className="text-left mb-8 space-y-4 p-6 bg-[#fdfafc] rounded-2xl border border-[#BA9FFE] border-opacity-20">
                        <p className="text-[#2D133A] font-bold mb-2">
                            Wali/Mahram Information
                        </p>
                        <p className="text-sm text-[#665e6b] mb-4">
                            As a sister, please provide your Wali/Mahram's name and email
                            address to continue.
                        </p>

                        <div>
                            <label className="text-xs font-semibold text-[#BA9FFE] uppercase">
                                Wali Name
                            </label>
                            <input
                                type="text"
                                value={waliName}
                                onChange={(e) => setWaliName(e.target.value)}
                                placeholder="Enter Wali's full name"
                                className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:border-[#BA9FFE] outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-[#BA9FFE] uppercase">
                                Wali Email
                            </label>
                            <input
                                type="email"
                                value={waliEmail}
                                onChange={(e) => setWaliEmail(e.target.value)}
                                placeholder="Enter Wali's email"
                                className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:border-[#BA9FFE] outline-none transition-all"
                            />
                        </div>
                    </div>
                )}

                <button
                    onClick={handleProceed}
                    disabled={!canProceed}
                    className={`w-full py-4 text-white text-xl font-bold rounded-2xl shadow-lg transition-all duration-300 transform active:scale-95 ${canProceed
                            ? "bg-[#BA9FFE] hover:bg-[#a37eff]"
                            : "bg-gray-300 cursor-not-allowed shadow-none"
                        }`}
                >
                    {isFemale && !canProceed
                        ? "Provide Wali Details"
                        : "Proceed to Profile Setup"}
                </button>

                <div className="mt-8">
                    <p className="text-sm text-[#BA9FFE] font-medium animate-pulse">
                        Bridging hearts, one click at a time.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerificationSuccess;
