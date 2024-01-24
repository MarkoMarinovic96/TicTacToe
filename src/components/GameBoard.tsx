import React from 'react';
import { Spinner } from './Spinner';

interface GameBoardProps {
  board: number[][];
  onCellClick: (row: number, col: number) => void;
  firstPlayer: number | string;
  secondPlayer: number | string;
  isLoading: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  firstPlayer,
  secondPlayer,
  onCellClick,
  isLoading
}) => {
  return (
    <div className="flex-col flex py-9 relative">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center items-center">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`${
                colIndex === 0
                  ? 'border-r'
                  : colIndex === row.length - 1
                    ? 'border-l'
                    : ''
              } ${
                rowIndex === 0
                  ? 'border-b'
                  : rowIndex === board.length - 1
                    ? 'border-t'
                    : ''
              } border-[#d57b28] w-[80px] h-[80px] flex justify-center items-center cursor-pointer`}
              onClick={() => onCellClick(rowIndex, colIndex)}
            >
              {cell === firstPlayer ? (
                <span className="font-bold text-3xl text-white">X</span>
              ) : cell === secondPlayer ? (
                <span className="font-bold text-3xl text-white">O</span>
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
      ))}
      {isLoading && <Spinner />}
    </div>
  );
};
