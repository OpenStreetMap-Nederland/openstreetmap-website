"use client";
import React from "react";
import { DynamicLayout } from "@/components/dynamic-layout/dynamic-layout";
import { SplitContainer } from "@/components/dynamic-layout/split-container";
import { DynamicPage } from "@/components/dynamic-layout/dynamic-page";
import { Map } from "@/components/map/map";

export default function Dev() {
  return (
    <>f</>
    // <DynamicLayout>
    //   <SplitContainer
    //     A={
    //       <DynamicPage>
    //         <div className="flex flex-col items-center justify-center h-full">
    //           <h1 className="text-4xl font-bold text-center">
    //             This is the dev page
    //           </h1>
    //           <p className="text-xl text-center">
    //             This page is for development purposes only.
    //           </p>
    //         </div>
    //       </DynamicPage>
    //     }
    //     B={
    //       <DynamicPage>
    //         <Map />
    //       </DynamicPage>
    //     }
    //   ></SplitContainer>
    // </DynamicLayout>
  );
}
