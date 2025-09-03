

// const App = () => {
//   return (
//     <div className="h-screen w-full bg-black">
//       <h1 className="text-white">Hello</h1>
//     </div>
//   )
// }

// export default App



import React, {  useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import compImg1 from "../../assets/compImg1.png";
import compImg2 from "../../assets/compImg2.png";
import compImg3 from "../../assets/compImg3.png";

// Types
interface Tip {
  text: string;
  image: string;
}

interface LoadingCarouselProps {
  tips?: Tip[];
  className?: string;
  autoplayInterval?: number;
  showNavigation?: boolean;
  showIndicators?: boolean;
  showProgress?: boolean;
  aspectRatio?: "video" | "square" | "wide";
  textPosition?: "top" | "bottom";
  onTipChange?: (index: number) => void;
  backgroundTips?: boolean;
  backgroundGradient?: boolean;
  shuffleTips?: boolean;
  animateText?: boolean;
}

// Utility function for class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Default tips data
const defaultTips: Tip[] = [
  {
    text: "Master AI prompting with LLMORPH — craft smarter queries for better results.",
    image: compImg1,
  },
  {
    text: "Train and fine-tune LLMs effortlessly. LLMORPH helps you adapt AI to your domain.",
    image: compImg2,
  },
  {
    text: "Build AI-powered apps fast. LLMORPH integrates prompting, training, and deployment.",
    image: compImg3,
  },
];

// Text scramble animation component
const TextScramble = ({
  children,
  duration = 0.8,
  className = "text-[#f7fae9] font-caviar font-bold",
  as: Component = "p",
  ...props
}: {
  children: string;
  duration?: number;
  className?: string;
  as?: React.ElementType;
}) => {
  const MotionComponent = motion(Component);
  const [displayText, setDisplayText] = useState(children);

  useEffect(() => {
    let mounted = true;
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    let frame = 0;
    let frameRequest: number;

    const scramble = () => {
      if (!mounted) return;

      let output = "";
      const progress = Math.min(1, frame / (duration * 60));

      for (let i = 0; i < children.length; i++) {
        if (progress * children.length > i) {
          output += children[i];
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayText(output);

      if (progress < 1) {
        frame++;
        frameRequest = requestAnimationFrame(scramble);
      } else {
        setDisplayText(children);
      }
    };

    scramble();

    return () => {
      mounted = false;
      cancelAnimationFrame(frameRequest);
    };
  }, [children, duration]);

  return (
    <MotionComponent className={className} {...props}>
      {displayText}
    </MotionComponent>
  );
};

// Aspect ratio classes
const aspectRatioClasses = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[2/1]",
};

export function LoadingCarousel({
  tips = defaultTips,
  className,
  showProgress = true,
  aspectRatio = "video",
  showNavigation = false,
  showIndicators = true,
  backgroundTips = false,
  textPosition = "bottom",
  autoplayInterval = 4500,
  backgroundGradient = false,
  shuffleTips = false,
  animateText = true,
  onTipChange,
}: LoadingCarouselProps) {
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const controls = useAnimation();
  const [displayTips] = useState(() =>
    shuffleTips ? [...tips].sort(() => Math.random() - 0.5) : tips
  );

  // Handle progress animation
  useEffect(() => {
    if (!showProgress) return;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = 100 / ((autoplayInterval || 4500) / 50);
        return Math.min(oldProgress + diff, 100);
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [showProgress, autoplayInterval]);

  // Handle progress bar animation
  useEffect(() => {
    if (progress === 100) {
      controls.start({ scaleX: 0 }).then(() => {
        setProgress(0);
        controls.set({ scaleX: 1 });
      });
    } else {
      controls.start({ scaleX: progress / 100 });
    }
  }, [progress, controls]);

  // Carousel settings
  const settings = {
    dots: showIndicators,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoplayInterval,
    arrows: showNavigation,
    afterChange: (index: number) => {
      setCurrent(index);
      onTipChange?.(index);
    },
    appendDots: (dots: React.ReactNode) => (
      <div className="flex justify-center space-x-2 mt-4">
        {React.Children.map(dots, (dot, index) => {
          const onClick = (dot as any)?.props?.onClick;
          return (
            <button
              key={index}
              className={`h-1 w-8 rounded-full transition-colors ${
                index === current ? "bg-gray-800" : "bg-gray-300"
              }`}
              onClick={onClick}
            />
          );
        })}
      </div>
    ),

    customPaging: () => <div className="h-full w-full" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "w-full max-w-6xl mx-auto rounded-lg bg-[#27272A] shadow-md border-2 border-[#4f4f50] overflow-hidden",
        className
      )}
    >
      <div className="w-full overflow-hidden rounded-lg">
        <Slider {...settings}>
          {displayTips.map((tip, index) => (
            <div key={index} className="outline-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`relative ${aspectRatioClasses[aspectRatio]} w-full overflow-hidden`}
              >
                <img
                  src={tip.image}
                  alt={`Visual for: ${tip.text}`}
                  className="object-cover w-full h-full"
                />

                {backgroundGradient && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                )}

                {backgroundTips && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className={`absolute ${
                      textPosition === "top" ? "top-0" : "bottom-0"
                    } left-0 right-0 p-4 sm:p-6 md:p-8`}
                  >
                    {/* {tip.url ? (
                      <a
                        href={tip.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="text-white text-center md:text-left text-base sm:text-lg md:text-xl font-medium">
                          {tip.text}
                        </p>
                      </a>
                    ) : (
                    )} */}
                      <p className="text-white text-center md:text-left text-base sm:text-lg md:text-xl font-medium">
                        {tip.text}
                      </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          ))}
        </Slider>

        <div
          className={cn(
            "bg-[#27272A] h-22 flex items-center justify-center",
            showIndicators && !backgroundTips ? "lg:px-8" : ""
          )}
        >
          <div
            className={cn(
              "flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0",
              showIndicators && !backgroundTips
                ? "sm:flex-col space-y-2 items-start gap-3"
                : ""
            )}
          >
            {!backgroundTips && (
              <div className="flex justify-center items-center w-full px-4 py-6 text-white">
                <div className="flex flex-col w-full">
                  {displayTips[current]?.url ? (
                    <a
                      href={displayTips[current]?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base lg:text-xl font-medium text-white"
                    >
                      {animateText ? (
                        <TextScramble key={displayTips[current]?.text}>
                          {displayTips[current]?.text}
                        </TextScramble>
                      ) : (
                        displayTips[current]?.text
                      )}
                    </a>
                  ) : (
                    <span className="text-base lg:text-xl font-medium">
                      {animateText ? (
                        <TextScramble key={displayTips[current]?.text} >
                          {displayTips[current]?.text}
                        </TextScramble>
                      ) : (
                        displayTips[current]?.text
                      )}
                    </span>
                  )}
                </div>
              </div>
            )}

            {backgroundTips && (
              <div className="flex items-start text-gray">
                <span className="text-sm font-medium">
                  Tip {current + 1}/{displayTips.length}
                </span>
                <ChevronRight className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* {showProgress && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={controls}
              transition={{ duration: 0.5, ease: "linear" }}
              className="h-1 bg-gray-300 origin-left mt-2"
            />
          )} */}
        </div>
      </div>
    </motion.div>
  );
}

export default LoadingCarousel; make it responsive 