"use client";
import type { ReactNode } from "react";
import SmallBanner from "../small-banner";
import Link from "next/link";
import useGetPathname from "@/libs/url";

import { MENU } from "@/types/nav.type";

interface InnerLayoutProps {
  children: ReactNode;
  imgDesktop?: string;
  imgMobile?: string;
  bannerTitle?: string;
}
const InnerLayout = ({
  children,
  imgDesktop,
  imgMobile,
  bannerTitle,
}: InnerLayoutProps) => {
  const { splitString } = useGetPathname();

  return (
    <div className="flex flex-col">
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
            <h1>{bannerTitle}</h1>
            <div className="sub-banner_breadcrumb">
              <div className="flex gap-4">
                <Link href={MENU.HOME}>Home</Link> / <p> {splitString}</p>
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
