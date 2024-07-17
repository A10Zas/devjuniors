import { create } from "zustand";
import supabase from "../providers/db/supabaseClient";

const useStore = create((set) => ({
  user: null,
  blogs: [],
  category: "All Blogs",
  loading: false,
  error: null,
  setUser: (user) => set({ user }),
  setCategory: (category) => set({ category }),
  setBlogs: (blogs) => set({ blogs }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  login: async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  },
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));

export default useStore;
