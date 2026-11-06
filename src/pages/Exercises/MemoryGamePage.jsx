import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

const SYMBOLS = ['🫁', '🌿', '🔥', '💧', '🧘', '🏃', '💪', '⭐'];

const createShuffledDeck = () => {
  const deck = [...SYMBOLS, ...SYMBOLS].map((symbol, idx) => ({
    id: idx,
    symbol,
  }));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
};

export function MemoryGamePage() {
  const { t, isLight, themeTokens } = useTheme();
  const { setPage, handleResistTrigger } = useLunglowData();

  const [cards, setCards] = useState(createShuffledDeck);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedSymbols, setMatchedSymbols] = useState([]);
  const [moves, setMoves] = useState(0);

  const handleResetGame = () => {
    setCards(createShuffledDeck());
    setFlippedIndices([]);
    setMatchedSymbols([]);
    setMoves(0);
  };

  useEffect(() => {
    if (flippedIndices.length !== 2) return;
    const [firstIdx, secondIdx] = flippedIndices;
    const firstCard = cards[firstIdx];
    const secondCard = cards[secondIdx];

    if (firstCard.symbol === secondCard.symbol) {
      setMatchedSymbols((prev) => {
        const next = [...prev, firstCard.symbol];
        if (next.length === SYMBOLS.length) {
          handleResistTrigger();
        }
        return next;
      });
      setFlippedIndices([]);
    } else {
      const timer = setTimeout(() => {
        setFlippedIndices([]);
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [flippedIndices, cards, handleResistTrigger]);

  const handleCardClick = (idx) => {
    if (flippedIndices.length >= 2) return;
    if (flippedIndices.includes(idx)) return;
    if (matchedSymbols.includes(cards[idx].symbol)) return;
    setFlippedIndices((prev) => [...prev, idx]);
    if (flippedIndices.length === 1) {
      setMoves((m) => m + 1);
    }
  };

  const allCleared = matchedSymbols.length === SYMBOLS.length;

  return (
    <div className={`rounded-3xl sm:rounded-[40px] border ${themeTokens.cardSurface} p-5 sm:p-10 lg:p-12 flex flex-col justify-between gap-6`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setPage('exercises')}
          className="text-xl sm:text-2xl lg:text-3xl font-semibold hover:text-[#5FB032] transition text-left"
        >
          ← {t.games.memoryHeader}
        </button>

        <div className="flex items-center gap-3">
          <div className={`rounded-full border ${themeTokens.subCardSurface} px-4 py-2 text-xs sm:text-sm font-semibold`}>
            {t.games.moves}: <span className="text-[#CABA3A] font-bold">{moves}</span>
          </div>
          <div className={`rounded-full border ${themeTokens.subCardSurface} px-4 py-2 text-xs sm:text-sm font-semibold`}>
            {t.games.matched}:{' '}
            <span className="text-[#5FB032] font-bold">
              {matchedSymbols.length}/{SYMBOLS.length}
            </span>
          </div>
        </div>
      </div>

      {/* 4x4 Memory Grid */}
      <div className="my-2 sm:my-4 flex items-center justify-center">
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-[340px] sm:max-w-[400px] aspect-square">
          {cards.map((card, idx) => {
            const isFlipped = flippedIndices.includes(idx);
            const isMatched = matchedSymbols.includes(card.symbol);
            const showFace = isFlipped || isMatched;

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => handleCardClick(idx)}
                className={`rounded-2xl sm:rounded-3xl border text-2xl sm:text-4xl font-bold flex items-center justify-center transition-all duration-200 select-none shadow-md ${
                  isMatched
                    ? 'bg-[#5FB032] border-[#5FB032] text-black scale-95'
                    : isFlipped
                    ? 'bg-[#CABA3A] border-[#CABA3A] text-black scale-105'
                    : isLight
                    ? 'border-[#2E5A1C]/25 bg-[#F3F8F0] hover:bg-[#E2EFE0] text-[#5FB032]'
                    : 'border-white/25 bg-[#151515] hover:border-[#CABA3A] text-[#5FB032]'
                }`}
              >
                {showFace ? card.symbol : '●'}
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
            onClick={handleResetGame}
            className="bg-[#CABA3A] hover:brightness-110 active:scale-95 transition text-black font-semibold text-base sm:text-lg rounded-full px-10 py-3 shadow-lg"
          >
            {t.games.newGame}
          </button>
        </div>

        <div className="text-center lg:text-right text-2xl sm:text-4xl font-bold tracking-tight order-1 lg:order-2 text-[#5FB032]">
          {allCleared ? t.games.allMatched : t.games.findPairs}
        </div>
      </div>
    </div>
  );
}
