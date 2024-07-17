import React, { useEffect, useState } from "react";
import BlogCard from "../components/Blog-Card";
import useStore from "../store/useStore";
import useFetchBlogs from "../hooks/useFetchBlogs";

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, category } = useStore();
  const { blogs, setCategory } = useFetchBlogs(currentPage);

  return (
    <section className="w-full flex flex-col items-center py-4 ">
      <div className="text-5xl underline pb-4">Blogs</div>
      <div className="text-3xl flex gap-x-4 pb-4">
        <button
          className={`btn btn-outline ${
            category === "All Blogs" ? "btn-orange" : "btn-primary"
          }`}
          onClick={() => setCategory("All Blogs")}
        >
          All Blogs
        </button>
        <button
          className={`btn btn-outline ${
            category === "Developer" ? "btn-orange" : "btn-primary"
          }`}
          onClick={() => setCategory("Developer")}
        >
          Dev Blogs
        </button>
        <button
          className={`btn btn-outline ${
            category === "Coding" ? "btn-orange" : "btn-primary"
          }`}
          onClick={() => setCategory("Coding")}
        >
          Code Blogs
        </button>
      </div>
      {loading ? (
        <div className="text-center text-6xl items-center text-white px-12 py-2">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4 md:w-[80%] px-12">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} data={blog} />
          ))}
        </div>
      )}
      <div className="join py-8">
        <button
          className="join-item btn"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
        <button className="join-item btn">
          Page <span className="text-orange-500">{currentPage}</span>
        </button>
        <button
          className="join-item btn"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          »
        </button>
      </div>
    </section>
  );
};

export default Blogs;
