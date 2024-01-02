import React from "react";
import { useDeleteCustom } from "../../graphgql/deleteData";

type ButtonDeleteProps = {
  id: number;
};

function ButtonDelete({ id }: ButtonDeleteProps) {
  const handleClick = () => {
    const result = useDeleteCustom(id).then((res) => {
      console.log(`res : `, res);
    });
  };
  return (
    <button
      className={`button button-danger button-delete`}
      onClick={handleClick}
    >
      X
    </button>
  );
}

export default ButtonDelete;
