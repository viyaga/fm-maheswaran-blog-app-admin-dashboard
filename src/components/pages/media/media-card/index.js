"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { getExtensionOfImage, truncateString } from "@/lib/utils";
import ActionButtons from "./ActionButtons";

const MediaCard = ({ id, url, alternativeText, name, width, height, ext }) => {
  const imgUrl = url?.startsWith("http") ? url : `http://localhost:1337${url}`;

  return (
    <Card className="rounded-sm dark:bg-gray-950">
      <CardHeader className="space-y-0 p-1 relative">
        <img
          src={imgUrl}
          alt={alternativeText}
          className="aspect-video object-contain border border-gray-200 w-full rounded-sm overflow-hidden dark:border-gray-800"
          width="500"
          height="300"
        />
      </CardHeader>
      <CardContent className="space-y-0 p-2 flex justify-between items-center">
        <div>
          <h4 className="text-sm font-bold m-0">{truncateString(name, 20)}</h4>
          <p className="text-xs text-gray-600">{`${getExtensionOfImage(ext).toUpperCase()} - ${width}X${height}`}</p>
        </div>
        <ActionButtons id={id} imgUrl={imgUrl} />
      </CardContent>
    </Card>
  );
};

export default MediaCard;
