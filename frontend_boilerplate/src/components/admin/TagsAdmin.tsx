import React from "react";
import { TagType } from "@/types";

type TagsAdminProps = {
  tags: TagType[];
}

function TagsAdmin({tags}: TagsAdminProps) {
  return (
    tags &&
    tags.map((item: TagType) => {
      return (
        <div key={item.id}>
          <p>{item.name}</p>
        </div>
      );
    })
  );
}

export default TagsAdmin;
