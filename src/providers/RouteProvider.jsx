import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import GlobalLayout from "../GlobalLayout";
import {
  CreatePost,
  Home,
  LoginPage,
  Blogs,
  SignUp,
  UnauthorizedPage,
  BlogPage,
} from "../pages";
import AuthProvider from "./AuthProvider";
import supabase from "./db/supabaseClient";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<GlobalLayout />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signUp" element={<SignUp />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route
        loader={async ({ params }) => {
          const slug = params.blogId;
          const { data } = await supabase
            .from("blogs")
            .select()
            .eq("slug", slug);
          return data[0];
        }}
        path="/blog/:blogId"
        element={<BlogPage />}
      />
      <Route element={<AuthProvider />}>
        <Route path="create-post" element={<CreatePost />} />
      </Route>
      <Route path="unauthorized" element={<UnauthorizedPage />} />
    </Route>
  )
);

const RouteProvider = () => {
  return <RouterProvider router={router} />;
};

export default RouteProvider;
