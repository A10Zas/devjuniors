import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import useStore from "./store/useStore";
import supabase from "./providers/db/supabaseClient";
import { useEffect, useState } from "react";

const GlobalLayout = () => {
  const { setUser } = useStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session ? session : null);
      setLoading(false);
    };

    getUserSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? session : null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  if (loading) {
    return (
      <div className="w-full text-center justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>;
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default GlobalLayout;
