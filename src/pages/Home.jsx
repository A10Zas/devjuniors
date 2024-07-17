import React from "react";

const Home = () => {
  return (
    <section className="w-full text-center items-center">
      <div className="text-2xl md:text-3xl pt-12 underline">
        Welcome To <span className="text-orange-500">Dev Juniors Blogs</span>{" "}
        With React js
      </div>
      <p className="text-xl md:text-2xl pt-8 px-6 max-w-4xl mx-auto text-center">
        Dive into the world of web development with{" "}
        <strong className="text-orange-500 underline">Dev Juniors Blogs</strong>
        , a dedicated platform designed to empower aspiring developers. Whether
        you're just starting out or looking to enhance your skills, our blog
        offers a wealth of tutorials and insights. Explore practical guides on{" "}
        <strong className="text-orange-500">React.js</strong>, learn about
        essential features like{" "}
        <strong className="text-orange-500">authentication</strong>,{" "}
        <strong className="text-orange-500">routing</strong>, and more. Enhance
        your user experience with sleek notifications using{" "}
        <strong className="text-orange-500">toaster</strong> and style your UI
        effortlessly with <strong className="text-orange-500">DaisyUI</strong>.
        Join us on this journey to transform your coding skills and bring your
        innovative ideas to life!
      </p>
      <div className="text-xl md:text-2xl pt-8 pb-12 px-8 mx-auto max-w-4xl">
        <p className="text-center">
          Remember, mastering{" "}
          <span className="text-orange-500 underline">web development</span> is
          a journey. It can be challenging at times, but with persistence and
          practice, you can achieve great things. Take your time to learn and
          grow at your own pace. You've got this!
        </p>
      </div>
    </section>
  );
};

export default Home;
