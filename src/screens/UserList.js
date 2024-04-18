import React from 'react';
import { useNavigate } from 'react-router-dom';
import Account from '../assets/illustrations/account.png';
import { useAuthContext } from '../context/AuthContext';

const UserList = () => {
  const { data, handleChildId } = useAuthContext();
  const navigate = useNavigate();
  const handleChildLogin = (id) => {
    handleChildId(id);
    navigate('/dashboard');
  };
  return (
    <div className="bg-white text-[#2D133A] w-full sm:w-[360px] flex flex-col items-center justify-center mx-auto h-screen gap-9">
      <p className="text-[#665e6b] text-xl text-center font-semibold">
        Choose an account
      </p>

      <div className="userlist bg-white w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.children?.map((child) => (
          <button
            key={child.id}
            onClick={() => handleChildLogin(child.id)}
            className="p-5 flex flex-col items-center justify-center rounded-2xl transition-all duration-500 hover:bg-[#fff4f5] cursor-pointer gap-2"
          >
            <div className="w-[50px] h-[50px] flex items-center justify-center">
              <img
                src={Account}
                alt="user icon"
                className="w-full h-full object-cover z-40"
              />
            </div>
            <p className="text-medium">{child.firstName}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
