"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageSource {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface ResponsiveImage {
  mobile?: ImageSource;
  tablet?: ImageSource;
  desktop: ImageSource;
}

interface SmallBannerProps {
  images: ResponsiveImage;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  onClick?: () => void;
  loading?: "lazy" | "eager";
  quality?: number;
}

const SmallBanner = ({
  images,
  priority = false,
  className = "",
  containerClassName = "",
  objectFit = "cover",
  onClick,
  loading = "lazy",
  quality = 85,
}: SmallBannerProps) => {
  const [currentImage, setCurrentImage] = useState<ImageSource>(images.desktop);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768 && images.mobile) {
        setCurrentImage(images.mobile);
      } else if (width >= 768 && width < 1024 && images.tablet) {
        setCurrentImage(images.tablet);
      } else {
        setCurrentImage(images.desktop);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${containerClassName} ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={handleClick}
    >
      <Image
        src={currentImage.src}
        alt={currentImage.alt}
        width={currentImage.width || 1200}
        height={currentImage.height || 400}
        priority={priority}
        loading={priority ? undefined : loading}
        quality={quality}
        className={`w-full h-auto ${className}`}
        style={{ objectFit }}
      />
      ggg
    </div>
  );
};

export default SmallBanner;
