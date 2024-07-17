import { useEffect, useCallback } from "react";
import useStore from "../store/useStore";
import supabase from "../providers/db/supabaseClient";

const useFetchBlogs = (currentPage) => {
  const { blogs, category, setBlogs, setCategory, setLoading, setError } =
    useStore();
  const blogsPerPage = 10;

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const offset = (currentPage - 1) * blogsPerPage;
      let query = supabase
        .from("blogs")
        .select()
        .range(offset, offset + blogsPerPage - 1);

      if (category && category !== "All Blogs") {
        query = query.eq("category", category);
      }

      const { data: blogData, error } = await query;

      if (error) {
        throw error;
      }

      setBlogs(blogData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, category, setBlogs, setLoading, setError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { blogs, setCategory };
};

export default useFetchBlogs;
