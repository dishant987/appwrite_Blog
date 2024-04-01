import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 hover:bg-gray-300 duration-500 hover:shadow-xl  hover:shadow-slate-700  rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl hover:opacity-85 mx-auto"
          />
        </div>
        <h2 className=" text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
