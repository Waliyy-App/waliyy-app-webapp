import React, { useEffect, useState } from 'react';
import ProfileCard from '../ProfileCard';
import { getLikes } from '../../services';
import { useAuthContext } from '../../context/AuthContext';
import Loader from '../Loader';

const Liked = () => {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuthContext();
  const childId = localStorage.getItem('childId');

 useEffect(() => {
  const fetchLikes = async () => {
    try {
      setLoading(true);
      const res = await getLikes(childId, token);
      setLikes(res?.data);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  fetchLikes();
}, [childId, token]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <div className="flex flex-col items-center justify-center gap-3 text-center px-0 sm:px-8 pt-8 pb-[64px]">
            <p className="text-[#2D133A] font-bold text-4xl">Liked</p>
            <p className="text-[#667085] text-xl">
              These are the people you liked.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {likes?.map((items) => (
              <ProfileCard
                key={items.id}
                id={items.receiver._id}
                firstName={items.receiver.firstName}
                state={items.receiver.state}
                residence={items.receiver.countryofResidence}
                about={items.receiver.about}
                height={items.receiver.height}
                maritalStatus={items.receiver.maritalStatus}
                profession={items.receiver.profession}
                gender={items.receiver.gender}
              />
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Liked;
