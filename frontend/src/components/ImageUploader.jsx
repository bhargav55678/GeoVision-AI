import { PhotoIcon } from "@heroicons/react/24/solid";

const ImageUploader = ({
  title,
  image,
  setImage
}) => {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800 hover:border-cyan-500 transition">

      <div className="flex items-center gap-3 mb-5">

        <PhotoIcon className="w-8 h-8 text-cyan-400" />

        <h2 className="text-2xl font-bold">
          {title}
        </h2>

      </div>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full mb-5 text-gray-300"
      />

      {image ? (

        <img
          src={URL.createObjectURL(image)}
          alt={title}
          className="w-full h-80 object-cover rounded-xl border-2 border-cyan-500"
        />

      ) : (

        <div className="w-full h-80 rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-center text-gray-500">

          No Image Selected

        </div>

      )}

    </div>
  );
};

export default ImageUploader;