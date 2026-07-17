"use client";

import { ROUTES } from "@/src/constants";
import { Button } from "@/src/elements/ui/button";
import { useAppSelector } from "@/src/redux/hooks";
import { useRouter } from "next/navigation";
import Images from "../../shared/Image";
import { HomeProps } from "../../types/landingPage";

const Home: React.FC<HomeProps> = ({ data }) => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return (
    <section id="home" className="home-section relative min-h-screen flex flex-col items-center pt-40 [@media(max-width:1333px)]:pt-31.25 pb-0 overflow-hidden [@media(max-width:660px)]:rounded-0">
      <div className="relative z-30 justify-center flex flex-col items-center text-center sm:px-6 px-0 mb-[calc(15px+(50-15)*((100vw-320px)/(1920-320)))] scale-95 lg:scale-100 transition-transform duration-500 [@media(max-width:1333px)]:mb-3.75">
        {data.badge && (
          <div className="inline-flex items-center justify-center max-w-[calc(220px+(500-220)*((100vw-320px)/(1920-320)))] px-4 py-1.5 mb-8 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-[12px] md:text-[13px] line-clamp-2 font-semibold text-primary tracking-wider uppercase break-all">{data.badge}</span>
          </div>
        )}

        <h1 className="break-word text-center max-w-[calc(268px+(769-268)*((100vw-320px)/(1920-320)))] text-[calc(18px+(50-18)*((100vw-320px)/(1920-320)))] font-bold text-white leading-[1.1] mb-8 [@media(max-width:767px)]:mb-5 tracking-tight whitespace-pre-wrap">{data.title}</h1>

        <p className="text-white text-[16px] max-w-[calc(318px+(480-318)*((100vw-320px)/(1920-320)))] mx-auto mb-10 [@media(max-width:767px)]:mb-5 leading-relaxed font-normal whitespace-pre-wrap">{data.description}</p>

        {data.primary_button?.text && (
          <Button
            className="bg-primary hover:bg-primary/90 text-white px-10 py-4 h-12 rounded-xl font-semibold text-[16px] transition-all hover:scale-[1.05] active:scale-[0.95] shadow-[0_0_20px_rgba(5,150,105,0.3)]"
            onClick={() => {
              if (isAuthenticated) {
                router.push(ROUTES.Dashboard);
              } else {
                router.push(ROUTES.Login);
              }
            }}
          >
            {data.primary_button.text}
          </Button>
        )}
      </div>

      <div className="relative w-screen flex justify-center mt-auto [@media(max-width:545px)]:mt-0">
        <div className="w-[90%] max-w-275 p-2 pt-0.5 bg-white bg-opacity-5 rounded-t-[40px] shadow-[0_-30px_60px_rgba(0,0,0,0.5)] backdrop-blur-sm slider-box -bottom-13.75 max-h-138 [@media(max-width:767px)]:-bottom-7.75 relative ">
          <Images src={data?.hero_image} fallbackSrc="/assets/images/slider-1.png" alt="App Dashboard" width={100} height={100} className="rounded-t-[32px] w-full h-auto shadow-inner max-w-full max-h-138" unoptimized />
        </div>
      </div>

      {/* Floating images removed as requested */}
    </section>
  );
};

export default Home;
