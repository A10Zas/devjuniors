/* eslint-disable react/no-unknown-property */
import { useLoaderData } from "react-router-dom";

const Blog = () => {
  const data = useLoaderData();

  // Render HTML content using dangerouslySetInnerHTML
  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <div>
      <p className="w-full p-8 text-center text-6xl underline capitalize decoration-orange-500">
        {data.title}
      </p>
      <div
        className="blog-body text-start p-8 text-xl"
        dangerouslySetInnerHTML={renderHTML(data.blog_body)}
      />
      <style jsx>{`
        .blog-body img {
          max-width: 100%; /* Ensure images don't exceed container width */
          height: auto; /* Maintain aspect ratio */
          display: block; /* Remove any extra space below images */
          max-height: 200px; /* Set maximum height for images */
        }
        .blog-body pre {
          background: #000000;
          padding: 10px;
          overflow-x: auto;
        }
        .blog-body code {
          font-family: "Courier New", Courier, monospace;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default Blog;

//  <div>
//    <p className="w-full p-8 text-center text-6xl underline capitalize">
//      <span className="text-orange-500">Blog</span>: {data.title}
//    </p>
//    <div className="px-6">
//      <div className="w-full h-[543px] rounded bg-white text-black">
//        <QuillEditor
//          className="mt-4 h-[500px] "
//          theme="snow"
//          value={data.blog_body}
//          readOnly={true}
//          modules={{
//            toolbar: false, // Disable the toolbar completely
//          }}
//        />
//      </div>
//    </div>
//  </div>;
