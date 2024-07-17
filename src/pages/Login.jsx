import { FaGithub as Github } from "react-icons/fa";
import useStore from "../store/useStore";
import { toast } from "sonner";

const Login = () => {
  const { login } = useStore();

  const userGithubLogin = () => {
    toast.success("Logged in Successfully");
    login();
  };
  return (
    <div className="w-full p-8 text-center">
      <div>
        <p className="text-4xl underline">
          {/* Welcome back, let&#39;s inspire and educate together. */}
          Log in to continue <span className="text-[#f97316]">
            debugging
          </span>{" "}
          your last post or to start a fresh{" "}
          <span className="text-[#f97316]">thread</span> .
        </p>
      </div>
      <div className="py-20">
        <div className="px-8">
          <button
            type="submit"
            className="btn btn-orange  mt-4 text-lg"
            onClick={userGithubLogin}
          >
            Login With Github <Github size={30} />
          </button>
        </div>
      </div>
      <div>
        <p className="text-xl">
          More ways to Authenticate the user will be added soon.....
        </p>
      </div>
    </div>
  );
};

export default Login;
