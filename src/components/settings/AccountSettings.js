import React, { useState } from 'react';
import CustomTabPanel from '../../common/CustomTabPanel';
import ChangePassword from './accountSettings/ChangePassword';
import ChangeAccountDetails from './accountSettings/ChangeAccountDetails';
import Modal from '../../common/Modal';
import Trash from '../../assets/illustrations/trash-bin.svg';
import Disable from '../../assets/illustrations/disable.svg';

const AccountSettings = ({ value }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalBOpen, setIsModalBOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalB = () => {
    setIsModalBOpen(true);
  };

  const closeModalB = () => {
    setIsModalBOpen(false);
  };

  return (
    <>
      <CustomTabPanel value={value} index={2}>
        <ChangeAccountDetails />

        <div className="w-full h-[0.5px] bg-[#e4e7ec9c] my-8" />

        <ChangePassword />

        <div className="w-full h-[0.5px] bg-[#e4e7ec9c] my-8" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-12 my-16">
          <button
            className="bg-white text-[#2D133A] hover:text-white hover:bg-[#2D133A] border border-[#2D133A] px-10 py-[10px] rounded-lg font-medium flex items-center justify-center transition-all duration-300"
            onClick={openModalB}
          >
            Deactivate Account
          </button>

          <button
            className="bg-red-500 hover:bg-red-700 text-white px-10 py-[10px] rounded-lg font-medium flex items-center justify-center transition-all duration-300"
            onClick={openModal}
          >
            Delete Account
          </button>
        </div>
      </CustomTabPanel>

      <Modal isOpen={isModalBOpen} onClose={closeModalB}>
        <div className="bg-white flex items-center justify-center flex-col p-6 w-[294px] rounded-xl shadow-2xl gap-8">
          <div className="flex flex-col gap-8 items-center justify-center">
            <img src={Disable} alt="" />
            <p className="font-medium text-center">
              Are you sure you want to deactivate your account?
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button className="bg-red-500 hover:bg-red-700 text-white px-10 py-[10px] rounded-lg font-medium flex items-center justify-center transition-all duration-300">
              Yes, Deactivate
            </button>
            <button
              onClick={closeModalB}
              className="text-red-500 hover:text-red-700 px-10 py-[10px] font-medium flex items-center justify-center transition-all duration-300"
            >
              Keep Account
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="bg-white flex items-center justify-center flex-col p-6 w-[294px] rounded-xl shadow-2xl gap-8">
          <div className="flex flex-col gap-8 items-center justify-center">
            <img src={Trash} alt="" />
            <p className="font-medium text-center">
              Are you sure you want to delete your account?
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button className="bg-red-500 hover:bg-red-700 text-white px-10 py-[10px] rounded-lg font-medium flex items-center justify-center transition-all duration-300">
              Yes, Delete
            </button>
            <button
              onClick={closeModal}
              className="text-red-500 hover:text-red-700 px-10 py-[10px] font-medium flex items-center justify-center transition-all duration-300"
            >
              Keep Account
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AccountSettings;
