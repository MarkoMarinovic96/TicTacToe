import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGames, postGames } from '../api/games';
import { Link } from 'react-router-dom';
import { GamesApiResponse, Game } from '../types/common';
import { storage } from '../lib/storage';
import { Spinner } from './Spinner';
import Select from 'react-select';

const options = [
  { value: '', label: 'All' },
  { value: 'progress', label: 'In Progress' },
  { value: 'finished', label: 'Finished' },
  { value: 'open', label: 'Open' }
];

export const GamesPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [limit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(options[0]);
  const user = storage.getUserId();
  const trophy = require('../assets/Trofej.webp');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        const response: GamesApiResponse = await getGames(
          offset,
          limit,
          selectedStatus.value
        );
        setGames(response.results);
        setTotalPages(Math.ceil(response.count / limit));
        setCurrentPage(getPageNumber(offset, limit));
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const getPageNumber = (offset: number, limit: number): number => {
      return Math.floor(offset / limit) + 1;
    };

    fetchGames();
  }, [offset, limit, selectedStatus.value]);

  const handleNextPage = () => {
    setOffset(offset + limit);
  };

  const handlePrevPage = () => {
    setOffset(Math.max(0, offset - limit));
  };
  const handleNewRoom = async () => {
    try {
      setIsLoading(true);
      const response = await postGames();

      navigate(`/games/${response.id}`);
    } catch (error) {
      console.error('Error creating a new game:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (selectedOption: any) => {
    setSelectedStatus(selectedOption);
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-7 h-100 flex flex-col content-between">
      {' '}
      <h1 className="self-center text-[40px] font-bold mb-4">All Games</h1>
      <div className="self-center flex justify-center gap-4 items-center mb-7">
        <button
          className=" bg-blue-500 text-white border-solid border-5 border-black p-4  rounded cursor-pointer "
          onClick={handleNewRoom}
        >
          Make your room
        </button>

        <Select
          value={selectedStatus}
          onChange={handleChange}
          options={options}
          placeholder="Select Status"
        />
      </div>
      <div className="flex flex-wrap gap-4 h-[70vh] mb-14">
        {games.map((game) => (
          <Link
            key={game.id}
            to={`/games/${game.id}`}
            className="bg-[#232f49] border-solid border-5 border-black rounded-2xl p-4 w-[48%] flex-row gap-4"
          >
            <div className="flex flex-col h-full justify-center items-center gap-2">
              <div className="flex justify-center items-center gap-6">
                <div className="flex items-center gap-3">
                  <p className="text-white font-bold text-3xl">
                    {game.first_player.username.toUpperCase()}
                  </p>
                  {game?.first_player?.username === game?.winner?.username && (
                    <img className="w-5 h-5" src={trophy} alt="Trophy" />
                  )}
                </div>

                <span className="text-white font-bold">{'-'}</span>
                {game.second_player ? (
                  <div className="flex items-center gap-3">
                    <p className="text-white font-bold text-3xl">
                      {game.second_player.username.toUpperCase()}
                    </p>
                    {game?.second_player?.username ===
                      game?.winner?.username && (
                      <img className="w-5 h-5" src={trophy} alt="Trophy" />
                    )}
                  </div>
                ) : (
                  <div>
                    {game.first_player.username !== user ? (
                      <button className="bg-blue-500 text-white py-2 px-4 rounded">
                        Join Game
                      </button>
                    ) : (
                      <p className="text-white font-bold text-lg animate-titrate">
                        Waiting for opponent...
                      </p>
                    )}
                  </div>
                )}
              </div>

              <p className="font-bold self-center text-[30px] text-[#d57b28]">
                {' '}
                {game.status}
              </p>
            </div>
          </Link>
        ))}
      </div>
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
  );
};
