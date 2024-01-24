import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Spinner } from './Spinner';
import { getUser } from '../api/user';

interface User {
  id: number;
  username: string;
  game_count: number;
  win_rate: number;
}

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [limit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(false);
  const userPlaceholder = require('../assets/stock-vector-user-profile-group.jpg');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response: any = await getUser(offset, limit);
        setUsers(response.results);
        setTotalPages(Math.ceil(response.count / limit));
        setCurrentPage(getPageNumber(offset, limit));
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const getPageNumber = (offset: number, limit: number): number => {
      return Math.floor(offset / limit) + 1;
    };

    fetchUsers();
  }, [offset, limit]);

  const handleNextPage = () => {
    setOffset(offset + limit);
  };

  const handlePrevPage = () => {
    setOffset(Math.max(0, offset - limit));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-7 h-100 flex flex-col content-between">
      <h1 className="self-center text-[40px] font-bold mb-4">Users Page</h1>
      <div className="flex flex-wrap justify-center gap-4 h-[70vh] mb-14">
        {users.map((user) => (
          <Link
            className="bg-[#232f49] border-solid border-5 border-black rounded-2xl p-4 w-[48%] "
            to={`/user/${user.id}`}
            key={user.id}
          >
            <div className=" mt-4 flex justify-center items-center">
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
          </Link>
        ))}{' '}
        <div className="self-center flex justify-between items-center mt-4">
          <div className="flex items-center gap-4">
            <div className="p-1 flex justify-center rounded-full items-center bg-blue-500">
              <button
                onClick={handlePrevPage}
                disabled={offset === 0}
                className=" px-4 py-2 rounded cursor-pointer"
              >
                {'<'}
              </button>
            </div>

            <p className="text-m text-white font-bold">
              Page {currentPage} of {totalPages}
            </p>
            <div className="p-1 flex justify-center rounded-full items-center bg-blue-500">
              <button
                onClick={handleNextPage}
                disabled={offset + limit >= totalPages * limit}
                className=" px-4 py-2 rounded cursor-pointer"
              >
                {'>'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
