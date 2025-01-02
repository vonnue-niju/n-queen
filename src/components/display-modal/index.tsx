import React, { useEffect, useState } from "react";
import { Cube } from "../cube";
import { AiOutlineLoading } from "react-icons/ai";
import { TbReload } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import clsx from "clsx";

interface DisplayModalProps {
  numberOfRows: number;
  handleModal: () => void;
}

type IndexArrayTypes = {
  rowIndex: number;
  colIndex: number;
};

const generateCubes = (numberOfRows: number) => {
  const arr = [];
  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < numberOfRows; j++) {
      arr.push({ rowIndex: i, colIndex: j });
    }
  }

  return arr;
};

export const DisplayModal = ({
  numberOfRows,
  handleModal,
}: DisplayModalProps) => {
  const [indexArray, setIndexArray] = useState<IndexArrayTypes[]>(
    [] as IndexArrayTypes[]
  );
  const [isArrayGenerating, setIsArrayGenerating] = useState(true);

  const [primaryCellIndex, setPrimaryCellIndex] = useState<number[]>(
    [] as number[]
  );
  const [activeCellsIndex, setActiveCellsIndex] = useState<number[]>(
    [] as number[]
  );

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const data = generateCubes(numberOfRows);
    setIndexArray(data);
    setIsArrayGenerating(false);
  }, [numberOfRows]);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    for (let i = 0; i < numberOfRows; i++) {
      const index = indexArray.findIndex(
        (item) => item.colIndex === i && item.rowIndex === rowIndex
      );

      setActiveCellsIndex((prev) => [...prev, index]);
    }

    for (let i = 0; i < numberOfRows; i++) {
      const index = indexArray.findIndex(
        (item) => item.colIndex === colIndex && item.rowIndex === i
      );

      setActiveCellsIndex((prev) => [...prev, index]);
    }

    for (let i = 0; i < numberOfRows; i++) {
      const index = indexArray.findIndex(
        (item) =>
          item.colIndex === colIndex - i && item.rowIndex === rowIndex - i
      );

      setActiveCellsIndex((prev) => [...prev, index]);
    }

    for (let i = 0; i < numberOfRows; i++) {
      const index = indexArray.findIndex(
        (item) =>
          item.colIndex === colIndex + i && item.rowIndex === rowIndex + i
      );

      setActiveCellsIndex((prev) => [...prev, index]);
    }

    for (let i = 0; i < numberOfRows; i++) {
      const index = indexArray.findIndex(
        (item) =>
          item.colIndex === colIndex - i && item.rowIndex === rowIndex + i
      );

      setActiveCellsIndex((prev) => [...prev, index]);
    }

    for (let i = 0; i < numberOfRows; i++) {
      const index = indexArray.findIndex(
        (item) =>
          item.colIndex === colIndex + i && item.rowIndex === rowIndex - i
      );

      setActiveCellsIndex((prev) => [...prev, index]);
    }
  };

  const handlePrimaryButtonClick = (rowIndex: number, colIndex: number) => {
    const index = indexArray.findIndex(
      (item) => item.colIndex === colIndex && item.rowIndex === rowIndex
    );

    setPrimaryCellIndex((prev) => [...prev, index]);

    handleCellClick(rowIndex, colIndex);
    setIsPlaying(true);
  };

  if (isArrayGenerating) {
    return (
      <span className="absolute inset-0 flex items-center justify-center bg-black">
        <AiOutlineLoading size={30} className="text-white animate-spin" />
      </span>
    );
  }

  return (
    <div className="absolute left-0 right-0 top-0 min-h-screen bg-gray-950">
      <div className="h-full z-10 min-h-screen  flex items-center justify-center w-full p-10">
        <span className="fixed flex gap-3 right-10 top-10 z-50">
          <button
            className="flex items-center justify-center border-2 border-white rounded-lg bg-gray-700 w-14 h-14 text-2xl"
            onClick={handleModal}
          >
            <IoMdClose />
          </button>
          <button
            className="flex items-center justify-center border-2 border-white rounded-lg bg-gray-700 w-14 h-14 text-2xl"
            onClick={() => {
              setPrimaryCellIndex([]);
              setActiveCellsIndex([]);
              setIsPlaying(false);
            }}
          >
            <TbReload />
          </button>
        </span>
        <div
          style={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: `repeat(${numberOfRows}, 1fr)`,
          }}
        >
          {!isArrayGenerating && indexArray
            ? indexArray.map((cell, index) => {
                return (
                  <Cube
                    key={index}
                    rowIndex={cell.rowIndex}
                    colIndex={cell.colIndex}
                    active={activeCellsIndex.includes(index)}
                    onClick={() => {
                      handlePrimaryButtonClick(cell.rowIndex, cell.colIndex);
                    }}
                    primary={primaryCellIndex.includes(index)}
                  />
                );
              })
            : null}
        </div>
      </div>
      <span
        className={clsx(
          "w-full fixed z-20 top-0 left-0 transition duration-300 ease-in-out right-0 -translate-y-32 flex items-center justify-center text-white/50 font-bold text-4xl py-10",
          { "translate-y-0 ": !isPlaying }
        )}
      >
        <span>Double Click to Play</span>
      </span>
    </div>
  );
};
