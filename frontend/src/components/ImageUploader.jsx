import { useRef } from "react";
import {
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline";


const ImageUploader = ({
  title,
  image,
  setImage,
}) => {

  const inputRef = useRef(null);


  const handleFileChange = (e) => {

    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
    }

  };


  const handleDrop = (e) => {

    e.preventDefault();

    const file = e.dataTransfer.files?.[0];

    if (
      file &&
      file.type.startsWith("image/")
    ) {
      setImage(file);
    }

  };


  const openFilePicker = () => {

    inputRef.current?.click();

  };


  return (

    <div
      className="
        rounded-xl
        border
        border-white/10
        bg-[#111827]/80
        p-6
        backdrop-blur-md
        transition-all
        duration-200
        hover:border-cyan-400/30
      "
    >

      {/* ============================================= */}
      {/* HEADER */}
      {/* ============================================= */}

      <div
        className="
          mb-5
          flex
          items-center
          justify-between
        "
      >

        <span
          className="
            font-mono
            text-sm
            font-bold
            uppercase
            tracking-[0.15em]
            text-slate-200
          "
        >
          {title}
        </span>


        <span
          className="
            rounded
            border
            border-white/10
            bg-slate-800
            px-3
            py-1
            font-mono
            text-xs
            text-slate-400
          "
        >
          {title === "Before Image" ? "T-1" : "T-0"}
        </span>

      </div>


      {/* ============================================= */}
      {/* HIDDEN FILE INPUT */}
      {/* ============================================= */}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />


      {/* ============================================= */}
      {/* UPLOAD AREA */}
      {/* ============================================= */}

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="
          relative
          flex
          min-h-[420px]
          flex-col
          items-center
          justify-center
          overflow-hidden
          rounded-lg
          border
          border-dashed
          border-slate-700
          bg-[#0a0e14]/80
          transition-all
          duration-200
          hover:border-cyan-400/50
        "
      >

        {image ? (

          <>
            {/* ======================================= */}
            {/* IMAGE */}
            {/* ======================================= */}

            <img
              src={URL.createObjectURL(image)}
              alt={title}
              className="
                max-h-[420px]
                max-w-full
                object-contain
              "
            />


            {/* ======================================= */}
            {/* FILE NAME */}
            {/* ======================================= */}

            <div
              className="
                absolute
                left-3
                top-3
                max-w-[80%]
                overflow-hidden
                rounded
                bg-black/70
                px-3
                py-2
                font-mono
                text-xs
                text-cyan-400
              "
            >
              {image.name}
            </div>

          </>

        ) : (

          <>
            {/* ======================================= */}
            {/* UPLOAD ICON */}
            {/* ======================================= */}

            <CloudArrowUpIcon
              className="
                mb-5
                h-12
                w-12
                text-slate-400
              "
            />


            {/* ======================================= */}
            {/* DESCRIPTION */}
            {/* ======================================= */}

            <p
              className="
                mb-5
                text-base
                text-slate-300
              "
            >
              Drag & drop high-res satellite imagery
            </p>


            {/* ======================================= */}
            {/* BROWSE FILES */}
            {/* ======================================= */}

            <button
              type="button"
              onClick={openFilePicker}
              className="
                rounded-md
                border
                border-cyan-400
                bg-transparent
                px-6
                py-3
                font-mono
                text-xs
                font-bold
                uppercase
                tracking-[0.12em]
                text-cyan-400
                transition-all
                duration-200
                hover:bg-cyan-400
                hover:text-slate-950
              "
            >
              Browse Files
            </button>

          </>

        )}


        {/* ============================================= */}
        {/* HUD CORNERS */}
        {/* ============================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-3
            top-3
            h-6
            w-6
            border-l
            border-t
            border-cyan-400
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-3
            right-3
            h-6
            w-6
            border-b
            border-r
            border-cyan-400
          "
        />

      </div>

    </div>

  );

};


export default ImageUploader;