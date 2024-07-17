import { useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import { toast } from "sonner";
import TextEditor from "../components/TextEditor";
import supabase from "../providers/db/supabaseClient";
import useStore from "../store/useStore";

const BlogPostForm = () => {
  const { user } = useStore();

  const { control, handleSubmit, register, watch, setValue } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      category: "",
    },
  });

  // Function to generate slug from title
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  //create a title from blog title image function

  const getTitle = (slug) => {
    const secondHyphen = slug.indexOf("-", slug.indexOf("-") + 1);
    const title = slug.slice(0, secondHyphen);
    return title;
  };

  //upload image function

  const uploadImage = async (img, imgTitle) => {
    const { data, error } = await supabase.storage
      .from("blog_images")
      .upload(`title_images/${imgTitle}`, img);

    const res = await supabase.storage
      .from("blog_images")
      .createSignedUrl(`title_images/${imgTitle}`, 157680000);

    if (error) {
      toast.warning(
        "There is some error occurred while uploading the title Image"
      );
      console.log("error from upload function", error);

      return;
    }

    return res.data.signedUrl;
  };

  //submit function

  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (!data.image[0]) {
      toast.warning("Please Select the blog title Image");
      return;
    }

    const title = getTitle(data.slug);

    const imgTitle = title + "-" + Date.now();
    const tileImageUrl = await uploadImage(data.image[0], imgTitle);

    const { error } = await supabase.from("blogs").insert({
      user_id: user.user.id,
      title_img: tileImageUrl,
      title: data.title,
      slug: data.slug,
      blog_body: data.content,
      category: data.category,
    });

    if (error) {
      toast.warning("There is some error occurred while blog uploading");
      console.log("error from upload function", error);
      return;
    } else {
      toast.success("Blog uploaded successfully");
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-4 px-8 flex flex-col items-center justify-center text-center min-h-screen"
    >
      <div className="w-full py-4 px-8 flex flex-col">
        <div className="flex justify-between items-center text-center">
          <div className="flex flex-col gap-y-12 text-start w-1/2">
            <div>
              <input
                {...register("title", { required: true })}
                type="text"
                placeholder="Blog Title"
                className="input input-bordered w-full max-w-lg"
              />
            </div>
            <div className="w-full">
              <input
                {...register("slug", { required: true })}
                type="text"
                placeholder="Blog Slug"
                className="input input-bordered w-full max-w-lg"
                onInput={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value), {
                    shouldValidate: true,
                  });
                }}
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div>
              <select
                {...register("category", { required: true })}
                defaultValue=""
                className="select select-bordered w-full max-w-xs"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Developer">Developer</option>
                <option value="Coding">Coding</option>
              </select>
            </div>

            <div>
              <p className="text-xl underline pb-2">Blog Title Image</p>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image")}
              />
            </div>
          </div>
        </div>
        <div className="w-full px-12 my-4">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextEditor value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-orange mt-4">
            Submit <IoSend />
          </button>
        </div>
      </div>
    </form>
  );
};

export default BlogPostForm;
