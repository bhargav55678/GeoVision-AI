import { useEffect, useState } from "react";

import { apiFetch } from "../api";

const ProtectedImage = ({ path, alt, className }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    let active = true;
    let objectUrl = "";

    apiFetch(path)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Unable to load protected image");
        }
        const blob = await response.blob();
        objectUrl = URL.createObjectURL(blob);
        if (active) {
          setUrl(objectUrl);
        }
      })
      .catch((error) => {
        console.error("Protected image error:", error);
      });

    return () => {
      active = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [path]);

  if (!url) {
    return (
      <div
        aria-label={alt}
        className={`${className} animate-pulse bg-slate-800/60`}
      />
    );
  }

  return <img src={url} alt={alt} className={className} />;
};

export default ProtectedImage;
