import React, { useEffect, useState } from 'react';
import ProfileCard from '../ProfileCard';
import { getLikes } from '../../services';
import { useAuthContext } from '../../context/AuthContext';
import Loader from '../Loader';

const LikedYou = () => {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuthContext();
  const childId = localStorage.getItem('childId');

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        setLoading(true);
        const res = await getLikes(childId, 'received', token);
        setLikes(res.data);
        console.log(res.data, 'likes');

      } catch (err) {
        console.log(err);
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
            <p className="text-[#2D133A] font-bold text-4xl">Liked You</p>
            <p className="text-[#667085] text-xl">
              These are the people that liked your profile.
            </p>
          </div>
          {likes.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {likes.map((item) => (
                <ProfileCard
                  state="likedYou"
                  key={item.id}
                  matchID={item._id}
                  id={item.initiator._id}
                  firstName={item.initiator.firstName}
                  lga={item.initiator.lga}
                  age={item.initiator.age}
                  residence={item.initiator.countryofResidence}
                  about={item.initiator.about}
                  displayID={item?.initiator.displayId}
                  profession={item.initiator.profession}
                  gender={item.initiator.gender}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <p className="text-white rounded bg-[#2D133A] p-10 text-xl">
                No liked profiles found.
              </p>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default LikedYou;
