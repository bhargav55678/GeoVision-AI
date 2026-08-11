import { useState } from "react";

import { compareImages } from "../api";

import ImageUploader from "../components/ImageUploader";
import ComparisonResult from "../components/ComparisonResult";
import AnalysisResultStats from "../components/AnalysisResultStats";
import ActionButtons from "../components/ActionButtons";
import LoadingSpinner from "../components/LoadingSpinner";
import ReportGenerator from "../components/ReportGenerator";


const API_URL = "http://127.0.0.1:8000";


const Analysis = () => {

  const [beforeImage, setBeforeImage] = useState(null);

  const [afterImage, setAfterImage] = useState(null);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);


  // -----------------------------------------
  // Compare images
  // -----------------------------------------

  const handleCompare = async () => {

    if (!beforeImage || !afterImage) {

      alert(
        "Please select both images."
      );

      return;
    }


    try {

      setLoading(true);


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


  // -----------------------------------------
  // Reset analysis
  // -----------------------------------------

  const handleReset = () => {

    setBeforeImage(null);

    setAfterImage(null);

    setResult(null);

  };


  // -----------------------------------------
  // Open comparison result
  // -----------------------------------------

  const downloadResult = () => {

    if (!result) {
      return;
    }


    const imagePath =
      result.comparison_image.replace(
        /\\/g,
        "/"
      );


    const imageUrl =
      `${API_URL}/${imagePath}`;


    window.open(
      imageUrl,
      "_blank"
    );

  };


  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <main className="max-w-[1600px] mx-auto px-6 md:px-10 py-10">


        {/* ================================= */}
        {/* PAGE HEADER */}
        {/* ================================= */}

        <div className="text-center mb-12">

          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">

            AI Image Comparison

          </h1>


          <p className="text-slate-400 mt-3 text-lg">

            Analyze satellite imagery and detect meaningful changes

          </p>

        </div>



        {/* ================================= */}
        {/* IMAGE UPLOAD SECTION */}
        {/* ================================= */}

        <section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Before */}

            <ImageUploader
              title="Before Image"
              image={beforeImage}
              setImage={setBeforeImage}
            />


            {/* After */}

            <ImageUploader
              title="After Image"
              image={afterImage}
              setImage={setAfterImage}
            />

          </div>

        </section>



        {/* ================================= */}
        {/* COMPARE BUTTON */}
        {/* ================================= */}

        <div className="flex justify-center mt-10">

          <button
            onClick={handleCompare}
            disabled={loading}
            className="
              min-w-[220px]
              bg-cyan-500
              hover:bg-cyan-400
              disabled:bg-slate-700
              disabled:text-slate-400
              text-black
              font-bold
              px-10
              py-4
              rounded-xl
              transition
              duration-200
              shadow-lg
              hover:shadow-cyan-500/20
              disabled:cursor-not-allowed
              flex
              items-center
              justify-center
            "
          >

            {loading ? (

              <LoadingSpinner />

            ) : (

              "Compare Images"

            )}

          </button>

        </div>



        {/* ================================= */}
        {/* ANALYSIS RESULT */}
        {/* ================================= */}

        {result && (

          <section className="mt-16">


            {/* Result Header */}

            <div className="text-center mb-10">

              <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">

                Analysis Result

              </h2>


              <p className="text-slate-400 mt-2">

                AI-powered satellite image comparison

              </p>

            </div>



            {/* Result Grid */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">


              {/* ================================= */}
              {/* COMPARISON IMAGE */}
              {/* ================================= */}

              <div>

                <ComparisonResult
                  result={result}
                />

              </div>



              {/* ================================= */}
              {/* ANALYSIS INFORMATION */}
              {/* ================================= */}

              <div className="space-y-5">


                {/* Statistics */}

               <AnalysisResultStats
                  result={result}
                />


                {/* Action buttons */}

                <ActionButtons
                  downloadResult={downloadResult}
                  handleReset={handleReset}
                />


                {/* PDF report */}

                <div className="pt-1">

                  <ReportGenerator
                    result={result}
                  />

                </div>

              </div>

            </div>

          </section>

        )}

      </main>

    </div>

  );

};


export default Analysis;