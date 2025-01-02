import clsx from "clsx";
import React from "react";

interface CubeProps {
  rowIndex: number;
  colIndex: number;
  primary?: boolean;
  active: boolean;
  onClick: () => void;
}

export const Cube = ({
  onClick,

  primary = false,
  active,
}: CubeProps) => {
  return (
    <button
      onDoubleClick={onClick}
      disabled={active || primary}
      className={clsx(
        "w-20 h-20 bg-gray-700 shrink-0 rounded-lg flex items-center justify-center text-xl font-semibold",
        { "bg-white text-gray-800": primary },
        { "bg-green-400 text-white": active }
      )}
    />
  );
};
