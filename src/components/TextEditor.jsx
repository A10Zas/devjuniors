import { useCallback, useMemo, useRef } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import supabase from "../providers/db/supabaseClient";
import { toast } from "sonner";

const TextEditor = ({ value, onChange }) => {
  const quill = useRef();

  //upload image function

  const uploadImage = async (img, imgTitle) => {
    // const { data, error } = await supabase.storage
    //   .from("blog_images")
    //   .upload(`body_images/${imgTitle}`, img);

    // const res = await supabase.storage
    //   .from("blog_images")
    //   .createSignedUrl(`body_images/${imgTitle}`, 157680000);

    // if (error) {
    //   toast.warning(
    //     "There is some error occurred while uploading the body image"
    //   );
    //   console.log("error from upload function", error);

    //   return;
    // }

    // return res.data.signedUrl;
    // Create an off-screen canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Create a new image object
    const image = new Image();
    image.src = URL.createObjectURL(img);

    // Ensure the image is loaded before processing
    await new Promise((resolve) => (image.onload = resolve));

    // Set canvas dimensions proportional to the desired quality
    const quality = 0.6; // 60% of the original quality
    canvas.width = image.width * quality;
    canvas.height = image.height * quality;

    // Draw the image on canvas
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Convert canvas to a Blob (compressed image)
    const compressedImage = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality)
    );

    try {
      // Upload the compressed image
      const { data, error: uploadError } = await supabase.storage
        .from("blog_images")
        .upload(`body_images/${imgTitle}`, compressedImage);

      if (uploadError) {
        console.error("Error from upload function", uploadError);
        return;
      }

      // Create a signed URL
      const { data: signedUrlData, error: signedUrlError } =
        await supabase.storage
          .from("blog_images")
          .createSignedUrl(`body_images/${imgTitle}`, 157680000); // 5 years

      if (signedUrlError) {
        console.error("Error from signed URL creation", signedUrlError);
        return;
      }

      return signedUrlData.signedUrl;
    } catch (error) {
      console.error("Error handling the image upload and compression", error);
    }
  };

  const imageHandler = useCallback(() => {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // When a file is selected
    input.onchange = async () => {
      const file = input.files[0];
      const reader = new FileReader();
      const imgTitle = Date.now();
      const imageUrl = await uploadImage(file, imgTitle);

      // Read the selected file as a data URL
      reader.onload = () => {
        const quillEditor = quill.current.getEditor();

        // Get the current selection range and insert the image at that index
        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
      };

      reader.readAsDataURL(file);
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ font: [] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "blockquote", "code-block"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

  const formats = [
    "header",
    "size",
    "bold",
    "font",
    "align",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "clean",
  ];
  return (
    <div className="w-full h-[543px] pb-8 bg-white text-black">
      <QuillEditor
        ref={(el) => (quill.current = el)}
        className="mt-4 h-[500px] "
        theme="snow"
        formats={formats}
        modules={modules}
        value={value}
        onChange={onChange}
        placeholder="Write something awesome..."
      />
    </div>
  );
};

export default TextEditor;
