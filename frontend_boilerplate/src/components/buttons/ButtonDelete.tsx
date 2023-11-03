import { useDeleteCustom } from "@/graphgql/deleteData";
import React from "react";

type ButtonDeleteProps = {
  id: number;
};

function ButtonDelete({ id }: ButtonDeleteProps) {
  return (
    <button
      className={`button button-danger button-delete`}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        useDeleteCustom(id)
      }
    >
      X
    </button>
  );
}

export default ButtonDelete;
