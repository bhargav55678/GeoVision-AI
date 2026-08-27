import { useRef, useState } from "react";

import {
  Search,
  Bell,
  HelpCircle,
  UploadCloud,
  ArrowLeftRight,
  Satellite,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";

import { compareImages } from "../api";

import ComparisonResult from "../components/ComparisonResult";
import AnalysisResultStats from "../components/AnalysisResultStats";
import ActionButtons from "../components/ActionButtons";
import ReportGenerator from "../components/ReportGenerator";


const API_URL = "http://127.0.0.1:8000";


const Analysis = () => {

  const [beforeImage, setBeforeImage] = useState(null);

  const [afterImage, setAfterImage] = useState(null);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [draggingBefore, setDraggingBefore] = useState(false);

  const [draggingAfter, setDraggingAfter] = useState(false);


  const beforeInputRef = useRef(null);

  const afterInputRef = useRef(null);


  // =========================================
  // IMAGE HANDLERS
  // =========================================

  const handleBeforeImageChange = (file) => {

    if (!file) return;

    setBeforeImage(file);

    // Old comparison is no longer valid
    setResult(null);

  };


  const handleAfterImageChange = (file) => {

    if (!file) return;

    setAfterImage(file);

    // Old comparison is no longer valid
    setResult(null);

  };


  // =========================================
  // FILE INPUT
  // =========================================

  const handleBeforeFile = (event) => {

    const file = event.target.files?.[0];

    handleBeforeImageChange(file);

  };


  const handleAfterFile = (event) => {

    const file = event.target.files?.[0];

    handleAfterImageChange(file);

  };


  // =========================================
  // DRAG & DROP
  // =========================================

  const handleBeforeDrop = (event) => {

    event.preventDefault();

    setDraggingBefore(false);

    const file = event.dataTransfer.files?.[0];

    handleBeforeImageChange(file);

  };


  const handleAfterDrop = (event) => {

    event.preventDefault();

    setDraggingAfter(false);

    const file = event.dataTransfer.files?.[0];

    handleAfterImageChange(file);

  };


  // =========================================
  // COMPARE
  // =========================================

  const handleCompare = async () => {

    if (!beforeImage || !afterImage) {

      alert("Please select both images.");

      return;

    }


    try {

      setLoading(true);

      setResult(null);


      console.log("Starting image comparison...");


      const response = await compareImages(
        beforeImage,
        afterImage
      );


      console.log(
        "COMPARISON RESULT:",
        response
      );


      setResult(response);


    } catch (error) {

      console.error(
        "Comparison error:",
        error
      );


      alert(
        "Comparison failed. Please try again."
      );


    } finally {

      setLoading(false);

    }

  };


  // =========================================
  // RESET
  // =========================================

  const handleReset = () => {

    setBeforeImage(null);

    setAfterImage(null);

    setResult(null);

  };


  // =========================================
  // IMAGE PREVIEW
  // =========================================

  const getPreviewUrl = (image) => {

    if (!image) return null;

    return URL.createObjectURL(image);

  };


  // =========================================
  // UPLOAD CARD
  // =========================================

  const renderUploader = ({
    title,
    timeLabel,
    image,
    inputRef,
    onFileChange,
    onDrop,
    dragging,
    setDragging,
  }) => {

    const previewUrl = getPreviewUrl(image);


    return (

      <div
        className="
          relative
          rounded-xl
          border
          border-white/10
          bg-[#111827]/80
          p-6
          backdrop-blur-md
          transition-all
          duration-300
          hover:border-cyan-400/30
        "
      >

        {/* HEADER */}

        <div className="mb-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <UploadCloud
              size={24}
              className="text-cyan-400"
            />

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

          </div>


          <span
            className="
              rounded
              border
              border-slate-600/50
              bg-slate-800/80
              px-3
              py-1
              font-mono
              text-xs
              text-slate-400
            "
          >
            {timeLabel}
          </span>

        </div>


        {/* FILE INPUT */}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="hidden"
        />


        {/* DROP AREA */}

        <div
          onDragOver={(event) => {

            event.preventDefault();

            setDragging(true);

          }}

          onDragLeave={() => {
            setDragging(false);
          }}

          onDrop={onDrop}

          className={`
            relative
            flex
            min-h-[430px]
            items-center
            justify-center
            overflow-hidden
            rounded-lg
            border
            border-dashed
            transition-all
            duration-300

            ${
              dragging
                ? "border-cyan-400 bg-cyan-400/10"
                : "border-cyan-400/30 bg-[#080d18]"
            }
          `}
        >

          {/* HUD CORNERS */}

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
              bottom-3
              right-3
              absolute
              h-6
              w-6
              border-b
              border-r
              border-cyan-400
            "
          />


          {previewUrl ? (

            <>

              <img
                src={previewUrl}
                alt={title}
                className="
                  h-full
                  max-h-[430px]
                  w-full
                  object-contain
                "
              />


              {/* REPLACE BUTTON */}

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="
                  absolute
                  bottom-5
                  left-1/2
                  -translate-x-1/2
                  rounded
                  border
                  border-cyan-400
                  bg-slate-950/90
                  px-5
                  py-2
                  font-mono
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-cyan-400
                  backdrop-blur-md
                  transition
                  hover:bg-cyan-400
                  hover:text-slate-950
                "
              >
                Replace Image
              </button>

            </>

          ) : (

            <div className="text-center">

              <UploadCloud
                size={52}
                strokeWidth={1.5}
                className="
                  mx-auto
                  mb-5
                  text-slate-400
                "
              />


              <p
                className="
                  mb-2
                  text-lg
                  font-medium
                  text-slate-300
                "
              >
                Drag & drop high-res satellite imagery
              </p>


              <p
                className="
                  mb-5
                  font-mono
                  text-xs
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                JPG / PNG / WEBP
              </p>


              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="
                  rounded
                  border
                  border-cyan-400
                  px-6
                  py-3
                  font-mono
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-cyan-400
                  transition-all
                  duration-200
                  hover:bg-cyan-400
                  hover:text-slate-950
                "
              >
                Browse Files
              </button>

            </div>

          )}

        </div>

      </div>

    );

  };


  return (

    <div className="min-h-screen bg-[#0a0e14] text-[#dfe2eb]">


      {/* ========================================= */}
      {/* SIDEBAR */}
      {/* ========================================= */}

      <Sidebar />


      {/* ========================================= */}
      {/* TOP HEADER */}
      {/* ========================================= */}

      <header
        className="
          fixed
          right-0
          top-0
          z-30
          flex
          h-16
          w-[calc(100%-320px)]
          items-center
          justify-between
          border-b
          border-slate-700/20
          bg-[#10141a]/80
          px-6
          backdrop-blur-xl
        "
      >

        <div
          className="
            text-xl
            font-bold
            text-cyan-400
          "
        >
          GeoVision AI
        </div>


        <div className="flex items-center gap-4">


          {/* SEARCH */}

          <div className="relative">

            <Search
              size={18}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Search coordinates..."
              className="
                w-64
                rounded-full
                border
                border-slate-600/30
                bg-slate-700/60
                py-2
                pl-10
                pr-4
                text-sm
                text-white
                outline-none
                placeholder:text-slate-400
                focus:border-cyan-400
                focus:ring-1
                focus:ring-cyan-400
              "
            />

          </div>


          <button
            className="
              rounded-full
              p-2
              text-slate-400
              transition
              hover:bg-slate-800
              hover:text-cyan-400
            "
          >
            <Bell size={20} />
          </button>


          <button
            className="
              rounded-full
              p-2
              text-slate-400
              transition
              hover:bg-slate-800
              hover:text-cyan-400
            "
          >
            <HelpCircle size={20} />
          </button>

        </div>

      </header>


      {/* ========================================= */}
      {/* MAIN */}
      {/* ========================================= */}

      <main
        className="
          relative
          ml-80
          min-h-screen
          overflow-hidden
          px-6
          pb-16
          pt-24
        "
      >


        {/* ========================================= */}
        {/* EARTH BACKGROUND */}
        {/* ========================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-cover
            bg-center
            bg-no-repeat
            opacity-[0.12]
          "
          style={{
            backgroundImage:
              "url('http://127.0.0.1:8000/uploads/earth.jpg')",
          }}
        />


        {/* DARK OVERLAY */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-slate-950/70
          "
        />


        {/* ========================================= */}
        {/* CONTENT */}
        {/* ========================================= */}

        <div className="relative z-10 mx-auto max-w-[1600px]">


          {/* ========================================= */}
          {/* PAGE HEADER */}
          {/* ========================================= */}

          <div className="mb-10 text-center">

            <p
              className="
                mb-2
                font-mono
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-slate-400
              "
            >
              GeoVision AI / Analysis Module
            </p>


            <h1
              className="
                text-4xl
                font-bold
                tracking-tight
                text-cyan-400
                md:text-5xl
              "
            >
              AI Image Comparison
            </h1>


            <p
              className="
                mt-3
                text-lg
                text-slate-400
              "
            >
              Analyze satellite imagery and detect meaningful changes
            </p>

          </div>


          {/* ========================================= */}
          {/* IMAGE COMPARISON AREA */}
          {/* ========================================= */}

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2">


            {/* BEFORE */}

            {renderUploader({
              title: "Before Image",
              timeLabel: "T-1",
              image: beforeImage,
              inputRef: beforeInputRef,
              onFileChange: handleBeforeFile,
              onDrop: handleBeforeDrop,
              dragging: draggingBefore,
              setDragging: setDraggingBefore,
            })}


            {/* AFTER */}

            {renderUploader({
              title: "After Image",
              timeLabel: "T-0",
              image: afterImage,
              inputRef: afterInputRef,
              onFileChange: handleAfterFile,
              onDrop: handleAfterDrop,
              dragging: draggingAfter,
              setDragging: setDraggingAfter,
            })}


            {/* ========================================= */}
            {/* CENTER COMPARE BUTTON */}
            {/* ========================================= */}

            {!result && (

              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  z-20
                  hidden
                  -translate-x-1/2
                  -translate-y-1/2
                  lg:block
                "
              >

                <button
                  type="button"
                  onClick={handleCompare}
                  disabled={
                    loading ||
                    !beforeImage ||
                    !afterImage
                  }
                  className="
                    pointer-events-auto
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-cyan-300
                    bg-cyan-400
                    text-slate-950
                    shadow-[0_0_35px_rgba(0,219,231,0.35)]
                    transition-all
                    duration-200
                    hover:scale-105
                    hover:bg-cyan-300
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >

                  <ArrowLeftRight size={28} />

                </button>


                <div
                  className="
                    mt-2
                    rounded
                    border
                    border-cyan-400/30
                    bg-slate-950/90
                    px-3
                    py-1
                    text-center
                    font-mono
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-widest
                    text-cyan-400
                    backdrop-blur-md
                  "
                >
                  Compare
                </div>

              </div>

            )}

          </div>


          {/* MOBILE COMPARE BUTTON */}

          {!result && (

            <div className="mt-8 flex justify-center lg:hidden">

              <button
                type="button"
                onClick={handleCompare}
                disabled={
                  loading ||
                  !beforeImage ||
                  !afterImage
                }
                className="
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  bg-cyan-400
                  px-10
                  py-4
                  font-bold
                  text-slate-950
                  shadow-[0_0_25px_rgba(0,219,231,0.25)]
                  transition
                  hover:bg-cyan-300
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >

                <ArrowLeftRight size={20} />

                Compare Images

              </button>

            </div>

          )}


          {/* ========================================= */}
          {/* LOADING / SATELLITE SCAN */}
          {/* ========================================= */}

          {loading && (

            <div
              className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-slate-950/75
                backdrop-blur-sm
              "
            >

              <div
                className="
                  relative
                  w-[420px]
                  overflow-hidden
                  rounded-xl
                  border
                  border-cyan-400/40
                  bg-[#111827]/95
                  p-8
                  shadow-[0_0_50px_rgba(0,219,231,0.15)]
                "
              >

                {/* SCAN IMAGE */}

                <div
                  className="
                    relative
                    mb-7
                    h-40
                    overflow-hidden
                    rounded-lg
                    border
                    border-cyan-400/20
                    bg-cover
                    bg-center
                  "
                  style={{
                    backgroundImage:
                      "url('http://127.0.0.1:8000/uploads/earth.jpg')",
                  }}
                >

                  <div className="absolute inset-0 bg-slate-950/55" />


                  {/* RADAR */}

                  <div
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      h-24
                      w-24
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      border
                      border-cyan-400/40
                      animate-ping
                    "
                  />


                  <div
                    className="
                      absolute
                      left-0
                      right-0
                      top-1/2
                      h-px
                      bg-cyan-400
                      shadow-[0_0_12px_rgba(0,219,231,1)]
                      animate-[scan_2s_linear_infinite]
                    "
                  />


                  <div className="absolute inset-0 flex items-center justify-center">

                    <Satellite
                      size={48}
                      className="
                        text-cyan-400
                        drop-shadow-[0_0_12px_rgba(0,219,231,0.8)]
                      "
                    />

                  </div>

                </div>


                <div className="text-center">

                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-cyan-400
                    "
                  >
                    Analyzing satellite imagery...
                  </h2>


                  <p
                    className="
                      mt-2
                      font-mono
                      text-sm
                      text-slate-400
                    "
                  >
                    Running detection models
                  </p>


                  <div
                    className="
                      mt-6
                      h-1
                      overflow-hidden
                      rounded-full
                      bg-slate-700
                    "
                  >

                    <div
                      className="
                        h-full
                        w-1/3
                        rounded-full
                        bg-cyan-400
                        shadow-[0_0_10px_rgba(0,219,231,0.8)]
                        animate-[loading_1.5s_ease-in-out_infinite]
                      "
                    />

                  </div>

                </div>

              </div>

            </div>

          )}


          {/* ========================================= */}
          {/* RESULT */}
          {/* ========================================= */}

          {result && (

            <section className="mt-16">


              {/* RESULT HEADER */}

              <div className="mb-10 text-center">

                <p
                  className="
                    mb-2
                    font-mono
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-slate-400
                  "
                >
                  Detection Complete
                </p>


                <h2
                  className="
                    text-4xl
                    font-bold
                    text-cyan-400
                  "
                >
                  Analysis Result
                </h2>


                <p
                  className="
                    mt-2
                    text-slate-400
                  "
                >
                  AI-powered satellite image comparison
                </p>

              </div>


              {/* RESULT GRID */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-8
                  xl:grid-cols-2
                "
              >

                {/* COMPARISON */}

                <ComparisonResult
                  result={result}
                />


                {/* STATISTICS */}

                <div className="space-y-5">

                  <AnalysisResultStats
                    result={result}
                  />


                  <ActionButtons
                    downloadResult={() => {

                      if (!result) return;

                      const imagePath =
                        result.comparison_image.replace(
                          /\\/g,
                          "/"
                        );

                      window.open(
                        `${API_URL}/${imagePath}`,
                        "_blank"
                      );

                    }}

                    handleReset={handleReset}
                  />


                  <ReportGenerator
                    result={result}
                  />

                </div>

              </div>

            </section>

          )}

        </div>

      </main>

    </div>

  );

};


export default Analysis;