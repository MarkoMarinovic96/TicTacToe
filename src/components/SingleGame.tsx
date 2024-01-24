import React, { useEffect, useState } from 'react';
import { SingleGameApiResponse } from '../types/common';
import { Link, useParams } from 'react-router-dom';
import { getSingleGame, postMakeMove, postJoinGame } from '../api/games';
import { GameBoard } from './GameBoard';
import { Spinner } from './Spinner';
import { storage } from '../lib/storage';

export const SingleGame: React.FC = () => {
  const { id: gameId } = useParams<{ id: string }>();
  const [game, setGame] = useState<SingleGameApiResponse | null>();
  const [isLoading, setIsLoading] = useState(false);
  const user = storage.getUserId();
  const trophy = require('../assets/Trofej.png');

  useEffect(() => {
    const fetchSingleGame = async () => {
      try {
        if (gameId) {
          const response = await getSingleGame(gameId);
          setGame(response);
        }
      } catch (error) {
        console.error('Error fetching single game:', error);
      }
    };

    fetchSingleGame();
    if (game?.status !== 'finished') {
      const intervalId = setInterval(() => {
        fetchSingleGame();
      }, 10000);
      return () => clearInterval(intervalId);
    }
  }, [gameId, game?.status]);

  const handleCellClick = async (row: number, col: number) => {
    try {
      if (
        gameId &&
        game?.status === 'progress' &&
        !game.winner &&
        !game.board[row][col]
      ) {
        setIsLoading(true);
        await postMakeMove(gameId, row, col);
        const updatedGame = await getSingleGame(gameId);
        setGame(updatedGame.data);
      }
    } catch (error) {
      console.error('Error making move:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinGame = async () => {
    try {
      if (gameId && game?.status === 'open' && !game.second_player) {
        setIsLoading(true);
        await postJoinGame(gameId);
        const updatedGame = await getSingleGame(gameId);
        setGame(updatedGame.data);
      }
    } catch (error) {
      console.error('Error joining game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!game) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-7 w-[100%] pt-14 px-4 relative">
      <div className="bg-[#232f49] p-4 w-[100%] rounded shadow-md mb-4 flex flex-col justify-center items-center">
        <p className="font-bold text-[40px] text-[#d57b28]"> {game.status}</p>
        <h2 className="text-m text-white font-semibold mb-4">
          Game #{game.id}
        </h2>
      </div>

      <div className="bg-[#232f49] p-4 w-[100%] rounded shadow-md mb-4 flex flex-col justify-center items-center gap-4">
        <div className="flex justify-center items-center gap-6">
          <Link
            className="flex items-center gap-3"
            to={`/user/${game.first_player.id}`}
          >
            <p className="text-white font-bold text-3xl">
              {game.first_player.username.toUpperCase()}
            </p>
            {game?.first_player?.username === game?.winner?.username && (
              <img className="w-5 h-5" src={trophy} alt="Trophy" />
            )}
          </Link>

          <span className="text-white font-bold">{'-'}</span>
          {game.second_player ? (
            <Link
              className="flex items-center gap-3"
              to={`/user/${game.second_player.id}`}
            >
              <p className="text-white font-bold text-3xl">
                {game.second_player.username.toUpperCase()}
              </p>
              {game?.second_player?.username === game?.winner?.username && (
                <img className="w-5 h-5" src={trophy} alt="Trophy" />
              )}
            </Link>
          ) : (
            <div>
              {game.first_player.username !== user ? (
                <button
                  onClick={handleJoinGame}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
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
        <p className="text-m text-white font-bold">
          {new Date(game.created).toLocaleString()}
        </p>
      </div>

      <div className="bg-[#232f49] p-4 w-[100%] rounded shadow-md mb-4">
        <GameBoard
          board={game.board}
          firstPlayer={game.first_player.id}
          secondPlayer={game.second_player?.id}
          isLoading={isLoading}
          onCellClick={handleCellClick}
        />
      </div>
    </div>
  );
};
