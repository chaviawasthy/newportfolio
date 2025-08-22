"use client"; // if you’re using Next.js 13+ App Router

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";

export default function VantaBackground({ children }) {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE,
          highlightColor: 0xffb6c1, // fog highlight color
          midtoneColor: 0x87cefa,   // fog midtone color
          lowlightColor: 0xd8bfd8,  // fog lowlight color
          baseColor: 0xfff8e7,      // background base
          blurFactor: 0.7,
          speed: 1.5,
          zoom: 0.6,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className="w-full h-screen relative">
      <div className="absolute inset-0 flex items-center justify-center text-white z-10">
        {children}
      </div>
    </div>
  );
}
