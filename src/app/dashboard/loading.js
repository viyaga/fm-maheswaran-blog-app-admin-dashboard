"use client";

import React from "react";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-6rem)]">
      <Loader2 className="w-16 h-16 animate-spin text-primary" />
    </div>
  );
};

export default Loading;
