"use client";
import type { ReactNode } from "react";
import SmallBanner from "../small-banner";
import Link from "next/link";
import useGetPathname from "@/libs/url";
import { cn } from "@/lib/utils";

import { MENU } from "@/types/nav.type";

interface InnerLayoutProps {
  children: ReactNode;
  imgDesktop?: string;
  imgMobile?: string;
  bannerTitle?: string;
  className?: string;
  id?: string;
}
const InnerLayout = ({
  children,
  id,
  imgDesktop,
  imgMobile,
  bannerTitle,
  className,
}: InnerLayoutProps) => {
  const { splitString } = useGetPathname();

  return (
    <div id={id} className={cn("flex flex-col", className)}>
      <div>
        {imgDesktop || imgMobile ? (
          <SmallBanner
            images={{
              desktop: {
                src: "https://html.designingmedia.com/icedelight/assets/images/mission-rightbackgroundimage.png",
                alt: "",
              },
            }}
          />
        ) : (
          ""
        )}
        {bannerTitle && (
          <div className="sub-banner ">
            <div className="container">
              <div className="flex flex-col justify-center items-center gap-4">
                <h1>{bannerTitle}</h1>
                <div className="sub-banner_breadcrumb">
                  <div className="flex gap-4 max-w-[200px]">
                    <Link href={MENU.HOME}>Home</Link> / <p> {splitString}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};
export default InnerLayout;
