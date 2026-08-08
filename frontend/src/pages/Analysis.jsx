import { useState } from "react";
import { compareImages } from "../api";

import ImageUploader from "../components/ImageUploader";
import ComparisonResult from "../components/ComparisonResult";
import AnalysisStats from "../components/AnalysisStats";
import ActionButtons from "../components/ActionButtons";
import LoadingSpinner from "../components/LoadingSpinner";
import ReportGenerator from "../components/ReportGenerator";

const Analysis = () => {
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    if (!beforeImage || !afterImage) {
      alert("Please select both images.");
      return;
    }

    try {
      setLoading(true);

      const response = await compareImages(
        beforeImage,
        afterImage
      );

      console.log(response);

      setResult(response);
    } catch (error) {
      console.error("Comparison error:", error);
      alert("Comparison failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBeforeImage(null);
    setAfterImage(null);
    setResult(null);
  };

  const downloadResult = () => {
    if (!result) return;

    const imageUrl =
      `http://127.0.0.1:8000/${result.comparison_image.replace(
        /\\/g,
        "/"
      )}`;

    window.open(imageUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-10 py-12">

      {/* Page Header */}

      <div className="text-center mb-12">

        <h1 className="text-5xl font-bold text-cyan-400">
          AI Image Comparison
        </h1>

        <p className="text-gray-400 mt-3">
          Analyze satellite imagery and detect meaningful changes
        </p>

      </div>

      {/* Image Uploaders */}

      <div className="grid lg:grid-cols-2 gap-8">

        <ImageUploader
          title="Before Image"
          image={beforeImage}
          setImage={setBeforeImage}
        />

        <ImageUploader
          title="After Image"
          image={afterImage}
          setImage={setAfterImage}
        />

      </div>

      {/* Compare Button */}

      <div className="flex justify-center mt-10">

        <button
          onClick={handleCompare}
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-600 text-black font-bold px-10 py-4 rounded-xl transition"
        >

          {loading ? (
            <LoadingSpinner />
          ) : (
            "Compare Images"
          )}

        </button>

      </div>

      {/* Analysis Result */}

      {result && (

        <div className="mt-16">

          <h2 className="text-4xl font-bold text-cyan-400 text-center mb-10">
            Analysis Result
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Comparison Image */}

            <ComparisonResult result={result} />

            {/* Analysis Statistics */}

            <div>

              <AnalysisStats result={result} />

              {/* Existing Actions */}

              <ActionButtons
                downloadResult={downloadResult}
                handleReset={handleReset}
              />

              {/* PDF Report */}

              <div className="mt-5">

                <ReportGenerator result={result} />

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Analysis;