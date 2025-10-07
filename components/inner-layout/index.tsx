import type { ReactNode } from "react"
import SmallBanner from "../small-banner"

interface InnerLayoutProps{
    children: ReactNode
    imgDesktop?: string
    imgMobile?: string
    bannerTitle?: string
}
const InnerLayout = ({children,  imgDesktop, imgMobile, bannerTitle}: InnerLayoutProps) => {
    return (
        <div className="flex flex-col">
        <div>
            { imgDesktop || imgMobile ? (
                 <SmallBanner  images={{
                desktop: {
                    src: 'https://html.designingmedia.com/icedelight/assets/images/mission-rightbackgroundimage.png',
                    alt: ''
                }
            }}   />
            ) : ( '') }
           {bannerTitle &&  <div className="sub-banner"> <h1>{bannerTitle}</h1></div> }
        </div>
        <div className="container m-auto px-4">{children}</div>
    </div>
    )
}
export default InnerLayout