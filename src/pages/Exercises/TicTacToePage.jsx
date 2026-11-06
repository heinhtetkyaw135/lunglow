import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = (board) => {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  if (board.every((cell) => cell !== null)) {
    return { winner: 'draw', line: [] };
  }
  return null;
};

const pickSmartAiMove = (board) => {
  const empty = board.map((v, i) => (v === null ? i : null)).filter((v) => v !== null);
  if (empty.length === 0) return null;

  // 1. Win if possible
  for (const idx of empty) {
    const copy = [...board];
    copy[idx] = 'O';
    if (checkWinner(copy)?.winner === 'O') return idx;
  }
  // 2. Block X from winning
  for (const idx of empty) {
    const copy = [...board];
    copy[idx] = 'X';
    if (checkWinner(copy)?.winner === 'X') return idx;
  }
  // 3. Take center if free
  if (board[4] === null) return 4;
  // 4. Pick a random available spot
  return empty[Math.floor(Math.random() * empty.length)];
};

export function TicTacToePage() {
  const { t, isLight, themeTokens } = useTheme();
  const { setPage, handleResistTrigger } = useLunglowData();

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [vsAi, setVsAi] = useState(true);
  const [scores, setScores] = useState({ x: 0, o: 0, draw: 0 });

  const result = checkWinner(board);

  const handleCellClick = (idx) => {
    if (board[idx] || result) return;

    const nextBoard = [...board];
    nextBoard[idx] = xIsNext ? 'X' : 'O';
    const immediateRes = checkWinner(nextBoard);

    if (immediateRes) {
      setBoard(nextBoard);
      if (immediateRes.winner === 'X') {
        setScores((s) => ({ ...s, x: s.x + 1 }));
        handleResistTrigger();
      } else if (immediateRes.winner === 'O') {
        setScores((s) => ({ ...s, o: s.o + 1 }));
      } else {
        setScores((s) => ({ ...s, draw: s.draw + 1 }));
      }
      return;
    }

    if (vsAi) {
      const aiIdx = pickSmartAiMove(nextBoard);
      if (aiIdx !== null) {
        nextBoard[aiIdx] = 'O';
        const aiRes = checkWinner(nextBoard);
        if (aiRes) {
          if (aiRes.winner === 'O') {
            setScores((s) => ({ ...s, o: s.o + 1 }));
          } else if (aiRes.winner === 'draw') {
            setScores((s) => ({ ...s, draw: s.draw + 1 }));
          }
        }
      }
      setBoard(nextBoard);
      setXIsNext(true);
    } else {
      setBoard(nextBoard);
      setXIsNext(!xIsNext);
    }
  };

  const handlePlayAgain = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const handleResetScores = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setScores({ x: 0, o: 0, draw: 0 });
  };

  const statusText = result
    ? result.winner === 'X'
      ? t.games.youWin
      : result.winner === 'O'
      ? t.games.oWins
      : t.games.drawMsg
    : xIsNext
    ? t.games.yourTurn
    : t.games.oTurn;

  return (
    <div className={`rounded-3xl sm:rounded-[40px] border ${themeTokens.cardSurface} p-5 sm:p-10 lg:p-12 flex flex-col justify-between gap-6`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setPage('exercises')}
          className="text-xl sm:text-2xl lg:text-3xl font-semibold hover:text-[#5FB032] transition text-left"
        >
          ← {t.games.tttHeader}
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="rounded-full bg-[#CABA3A] p-1 flex items-center text-xs sm:text-sm font-semibold text-black">
            <button
              type="button"
              onClick={() => {
                setVsAi(true);
                handlePlayAgain();
              }}
              className={`px-3.5 py-1 rounded-full transition ${
                vsAi ? 'bg-white text-black shadow' : 'opacity-75'
              }`}
            >
              {t.games.vsAi}
            </button>
            <button
              type="button"
              onClick={() => {
                setVsAi(false);
                handlePlayAgain();
              }}
              className={`px-3.5 py-1 rounded-full transition ${
                !vsAi ? 'bg-white text-black shadow' : 'opacity-75'
              }`}
            >
              {t.games.twoPlayers}
            </button>
          </div>

          <div className={`rounded-full border ${themeTokens.subCardSurface} px-4 py-1.5 text-xs sm:text-sm font-semibold`}>
            {t.games.youLabel}: <span className="text-[#5FB032] font-bold">{scores.x}</span> |{' '}
            {t.games.drawsLabel}: <span>{scores.draw}</span> |{' '}
            {vsAi ? t.games.aiLabel : t.games.p2Label}:{' '}
            <span className="text-[#CABA3A] font-bold">{scores.o}</span>
          </div>
        </div>
      </div>

      {/* 3x3 Board */}
      <div className="my-2 sm:my-4 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-[300px] sm:max-w-[350px] aspect-square">
          {board.map((val, idx) => {
            const isWinCell = result?.line?.includes(idx);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleCellClick(idx)}
                className={`rounded-2xl sm:rounded-3xl border text-4xl sm:text-5xl font-extrabold flex items-center justify-center transition-all select-none shadow-md ${
                  isWinCell
                    ? 'bg-[#5FB032]/25 border-[#5FB032] scale-105'
                    : isLight
                    ? 'border-[#2E5A1C]/25 bg-[#F3F8F0] hover:bg-[#E2EFE0]'
                    : 'border-white/25 bg-[#151515] hover:border-[#CABA3A]'
                } ${val === 'X' ? 'text-[#5FB032]' : 'text-[#CABA3A]'}`}
              >
                {val}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-4 pt-2">
        <div className="hidden lg:block" />

        <div className="flex items-center justify-center gap-4 order-2 lg:order-1">
          <button
            type="button"
            onClick={handleResetScores}
            className={`font-semibold text-sm sm:text-base rounded-full px-7 py-3 shadow transition active:scale-95 ${themeTokens.secondaryBtn}`}
          >
            {t.games.resetScore}
          </button>
          <button
            type="button"
            onClick={handlePlayAgain}
            className="bg-[#CABA3A] hover:brightness-110 active:scale-95 transition text-black font-semibold text-sm sm:text-base rounded-full px-8 py-3 shadow-lg"
          >
            {t.games.playAgain}
          </button>
        </div>

        <div className="text-center lg:text-right text-2xl sm:text-4xl font-bold tracking-tight order-1 lg:order-2">
          {statusText}
        </div>
      </div>
    </div>
  );
}
