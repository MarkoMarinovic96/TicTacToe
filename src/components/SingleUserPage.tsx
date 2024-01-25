import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleUser } from '../api/user';
import { Spinner } from './Spinner';

interface User {
  id: number;
  username: string;
  game_count: number;
  win_rate: number;
}

export const SingleUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const userPlaceholder = require('../assets/stock-vector-user-profile-group.webp');

  useEffect(() => {
    const fetchSingleUser = async () => {
      try {
        if (id !== undefined) {
          const response = await getSingleUser(id);
          setUser(response);
        }
      } catch (error) {
        console.error('Error fetching single user:', error);
      }
    };

    fetchSingleUser();
  }, [id]);

  if (!user) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 h-[70vh] mb-14 relative">
      <button
        className="absolute top-10 right-7 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => window.history.go(-1)}
      >
        {'< Back'}
      </button>
      <div className="flex justify-center items-center">
        <div className="flex justify-between gap-6">
          <img
            className="border-l-2 border-r-2 rounded-full w-[100px] h-[100px]"
            src={userPlaceholder}
            alt=""
          />

          <div>
            <p className="text-lg text-white text-bold">
              Username: {user.username}
            </p>

            <p className="text-lg text-white text-bold">
              Game Count: {user.game_count}
            </p>
            <p className="text-lg text-white text-bold">
              Win Rate: {user.win_rate.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
