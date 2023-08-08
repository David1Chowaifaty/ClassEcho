"use client";
import React, { useEffect } from "react";

export default function LoadingBar() {
  useEffect(() => {
    function updateProgressBar() {
      const progressBar = document.getElementById("loading-bar");
      if (!progressBar) return;

      const { domComplete, loadEventEnd } = window.performance.timing;
      const loadingProgress = Math.floor((100 * loadEventEnd) / domComplete);
      progressBar.style.width = `${loadingProgress}%`;
    }

    // Attach the event listener for window.onload and track the progress
    window.addEventListener("load", updateProgressBar);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("load", updateProgressBar);
    };
  }, []);

  return (
    <div
      id="loading-bar"
      className="h-0.5 bg-blue-600 fixed top-0 left-0 z-50"
    />
  );
}
