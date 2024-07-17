import BlogPostForm from "../components/Blog-Post-Form";

const CreatePost = () => {
  return (
    <div className="w-full text-center mt-4">
      <div className="md:text-5xl underline">
        Code Chronicles: Share Your{" "}
        <span className="text-orange-500">Developer</span> Journey
      </div>
      <div className="hidden md:block">
        <BlogPostForm />
      </div>
      <div className="block md:hidden p-8">
        <div>
          <h1>
            Oops! Error 503 -{" "}
            <span className="underline text-orange-500">
              Developer Overload
            </span>
          </h1>
          {/* <p className="pt-4">
            We&#39;re sorry, but it looks like this page&#39;s CSS and
            JavaScript haven&#39;t been optimized for mobile devices yet. Our
            developers are debugging this issue and hope to deploy a responsive
            update soon. Thank you for your patience and understanding!
          </p> */}
          <p className="pt-4">
            Sorry, this page isn&#39;t mobile-friendly yet. It seems our solo
            developer has been juggling more tasks than a CPU during a system
            update! We&#39;re on it, though, and hope to expand our bandwidth
            soon. Thanks for sticking with us through these beta phases!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
