import React from "react";

type ButtonDeleteProps = {
  id: number;
};

// TODO
function ButtonDelete({ id }: ButtonDeleteProps) {
  const handleClick = () => {
    console.info(`ButtonDelete`);
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
