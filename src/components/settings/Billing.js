import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import CustomTabPanel from '../../common/CustomTabPanel';
import BillingHistory from './billings/BillingHistory';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from 'react-router-dom';
import { getSubHistory, getCurrentPlan } from '../../services';
import { useAuthContext } from '../../context/AuthContext';
import { toCurrency } from '../../utils.js';

const Billing = ({ value }) => {
  const [hasSubscription, setHasSubscription] = useState(false);
  const [activePlan, setActivePlan] = useState(null);
  const { token } = useAuthContext();

  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await getSubHistory(token);
        setHasSubscription(res?.data);
		console.log(hasSubscription, 'sub')
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    getHistory();
  }, [token]);

  useEffect(() => {
    const getActivePlan = async () => {
      try {
        const res = await getCurrentPlan(token);
        setActivePlan(res?.data);
      } catch (err) {
        console.error(err);
      }
    };

    getActivePlan();
  }, [token, hasSubscription]);

  return (
    <CustomTabPanel value={value} index={1} className="w-full">
      <div className="mb-16 px-0 sm:px-8 pt-6 w-100">
        <p className="font-medium text-lg text-[#2D133A]">Account Plan</p>

        <div className="flex flex-col-reverse sm:flex-row p-6 text-[#2D133A] justify-between w-full sm:w-3/5 shadow rounded-xl my-4 mb-10 gap-6">
          <div className="flex flex-col gap-2 ">
            <p className="font-semibold">
              {!activePlan ? 'Free Plan' : activePlan?.plan?.planName}
            </p>
            <p className="text-sm">
              {!activePlan ? 'Our most popular plan.' : ''}
            </p>
            {!activePlan && (
              <Link to="/pricing" className="mt-8 font-semibold text-[#BA9FFE]">
                Upgrade Plan <ArrowOutwardIcon />
              </Link>
            )}
          </div>

          <div className="font-semibold text-4xl">
            {!activePlan ? '₦0' : toCurrency(activePlan?.plan?.amount)}{' '}
            <span className="text-sm">per annum</span>
          </div>
        </div>

        <p className="font-medium text-lg text-[#2D133A]">Billing History</p>

        <div className="my-8 w-full">
          {hasSubscription?.length ? (
            <div className="flex flex-col gap-y-5">
              {hasSubscription?.map((item, i) => (
                <BillingHistory key={i + 1} data={item} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center shadow rounded-xl p-6 w-full">
              <p>You have no payment history</p>
            </div>
          )}
        </div>
      </div>
    </CustomTabPanel>
  );
};

export default Billing;
