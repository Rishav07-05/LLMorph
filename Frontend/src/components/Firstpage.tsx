import Spline from "@splinetool/react-spline";
import { Globe } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

const FirstPage = () => {
  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* 3D bot */}
      <Spline
        scene="https://prod.spline.design/UsdDajW7lXkId8Ys/scene.splinecode?version=3"
        className="absolute top-0 left-0 w-full h-full"
      />

      {/* Text overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center gap-6 text-white px-6 pointer-events-none">
        {/* Heading */}
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-2xl md:text-5xl font-extrabold max-w-6xl leading-snug font-caviar text-[#f7fae9] drop-shadow-lg">
            Generate, refine, and deliver <br className="hidden md:block" />
            high-impact prompts to your favorite LLMs.
          </h1>
          <p className="text-sm md:text-xl font-light leading-tight tracking-tight max-w-4xl font-goodtimes text-[#f7fae9] drop-shadow-lg">
            Join the Community Today
          </p>
        </div>

        {/* Clerk Sign In Button */}
        <SignInButton mode="modal">
          <button
            className="pointer-events-auto flex items-center justify-center gap-2 
                       h-11 px-6 rounded-full border border-[#3B3A3A] 
                       bg-gradient-to-b from-[#3B3A3A] to-[#3B3A3A] text-white 
                       cursor-pointer hover:opacity-90 transition
                       text-sm md:text-base lg:text-lg w-fit min-w-[8rem]"
          >
            <Globe className="animate-spin w-5 h-5 md:w-6 md:h-6" />
            <span className="font-medium tracking-tight">Get started</span>
          </button>
        </SignInButton>
      </div>
    </div>
  );
};

export default FirstPage;
