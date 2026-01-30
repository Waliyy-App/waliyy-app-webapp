import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { TextInput, SelectInput } from '../../common/form';
import { genotypeOption, maritalStatusOption } from '../../data/formValues';
import Modal from '../../common/Modal';
import HeightConverter from './HeightConverter';
import WeightConverter from './WeightConverter';

export default function PersonalDetailsForm() {
  const { values } = useFormikContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalBOpen, setIsModalBOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const openBModal = () => {
    setIsModalBOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeBModal = () => {
    setIsModalBOpen(false);
  };

  return (
    <React.Fragment>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row justify-between gap-12">
          <TextInput label="First Name*" name="firstName" type="text" />
          <TextInput label="Last Name*" name="lastName" type="text" />
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-12">
          <TextInput label="Date of Birth*" name="dateOfBirth" type="date" />
          <SelectInput label="Gender*" name="gender">
            <option value="">Select option</option>
            <option value="FEMALE">Female</option>
            <option value="MALE">Male</option>
          </SelectInput>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-12">
          <SelectInput label="Genotype*" name="genotype">
            <option value="">Select option</option>
            {genotypeOption.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectInput>

          <div className="flex flex-col w-full">
            <TextInput
              label="Height (m)*"
              name="height"
              type="number"
              placeholder="Height must be in metres"
            />
            <button
              onClick={openModal}
              className="text-sm font-medium cursor-pointer"
            >
              Click here to convert to metres
            </button>
          </div>

          <div className="flex flex-col w-full">
            <TextInput
              label="Weight (kg)*"
              name="weight"
              type="number"
              placeholder="Weight must be in kilogram"
            />
            <button
              onClick={openBModal}
              className="text-sm font-medium cursor-pointer"
            >
              Click here to convert to kilogram
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-12">
          <SelectInput label="Marital Status*" name="maritalStatus">
            <option value="">Select option</option>
            {maritalStatusOption.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectInput>

          <SelectInput label="Do you have children?*" name="haveChildren">
            <option value="">Select option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </SelectInput>

          <SelectInput label="Are you open to polygamy?*" name="isPolygamous">
            <option value="">Select option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </SelectInput>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-[#665e6b] text-lg font-semibold">Do you...</p>
          <div className="flex flex-col sm:flex-row justify-between gap-12">
            <SelectInput label="Smoke?*" name="smoke">
              <option value="">Select option</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </SelectInput>
            <SelectInput label="Drink?*" name="drink">
              <option value="">Select option</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </SelectInput>
            <SelectInput label="Have any addiction?*" name="addiction">
              <option value="">Select option</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </SelectInput>
          </div>
        </div>

        {values.gender === 'FEMALE' && (
          <div className="flex flex-col gap-6 p-6 bg-purple-50 rounded-2xl border border-purple-100">
            <p className="text-[#2D133A] text-lg font-bold">Wali/Mahram Information</p>
            <div className="flex flex-col sm:flex-row justify-between gap-12">
              <TextInput label="Wali Name*" name="waliName" type="text" />
              <TextInput label="Wali Email*" name="waliEmail" type="email" />
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-12">
              <TextInput label="Wali Phone Number*" name="waliPhoneNumber" type="text" />
              <div className="w-full"></div> {/* Spacer */}
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen}>
        <div className="bg-white  p-6 w-[294px] rounded-xl shadow-2xl gap-8">
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="bg-red-600 text-white rounded-lg p-2 "
            >
              Close
            </button>
          </div>
          <HeightConverter />
        </div>
      </Modal>

      <Modal isOpen={isModalBOpen}>
        <div className="bg-white  p-6 w-[294px] rounded-xl shadow-2xl gap-8">
          <div className="flex justify-end">
            <button
              onClick={closeBModal}
              className="bg-red-600 text-white rounded-lg p-2 "
            >
              Close
            </button>
          </div>
          <WeightConverter />
        </div>
      </Modal>
    </React.Fragment>
  );
}
