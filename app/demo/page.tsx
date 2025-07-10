// app/demo/page.tsx or pages/demo.tsx
"use client";

import React from "react";

const DemoPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-4xl aspect-video">
        <iframe
          className="w-full h-full rounded-2xl shadow-xl"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&rel=0&showinfo=0&controls=1"
          title="Demo Video"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default DemoPage;
