"use client";
import { memo, useEffect, useState } from "react";

import Image, { ImageProps } from "next/image";

import { LoadingMask } from "./loading/LoadingMask";
import { clx } from "@/utils/styles";

type NextImageProps = ImageProps;

export const NextImage = memo((props: NextImageProps) => {
  const { alt: altText, src, ...restProps } = props;

  const [isError, toggleError] = useState(false);
  const [isLoaded, toggleLoaded] = useState(false);

  const handleLoad = () => toggleLoaded(true);
  const handleError = () => toggleError(true);

  useEffect(() => {
    toggleError(false);
    toggleLoaded(false);
  }, [src]);

  if (isError)
    return <div className="flex items-center justify-center h-full">Error</div>;

  return (
    <div className="size-full overflow-hidden">
      {!isLoaded && (
        <LoadingMask className={clx("size-full", props.className)} />
      )}
      <Image
        src={src}
        alt={altText}
        quality={100}
        onLoad={handleLoad}
        onError={handleError}
        {...restProps}
        className={clx("size-full", props.className)}
      />
    </div>
  );
});

NextImage.displayName = "NextImage";
