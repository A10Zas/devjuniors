import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ data }) => {
  return (
    <div className="card md:card-side bg-base-100 drop-shadow-2xl">
      <figure>
        <img src={data.title_img} alt="Movie" className="w-80 h-52" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{data.title}</h2>
        <p>{data.title}</p>
        <div className="card-actions justify-end">
          <Link to={`/blog/${data.slug}`}>
            <button className="btn btn-orange">Read More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
