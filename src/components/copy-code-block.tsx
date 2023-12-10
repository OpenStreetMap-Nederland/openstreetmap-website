"use client";
import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";
var detectLang = require("lang-detector");

type Props = {
  children?: React.ReactNode | null;
  text: string;
};

export function CopyCodeBlock({ children, text }: Props) {
  let language = detectLang(text);

  return (
    <CopyBlock
      text={text}
      language={language === "Unknown" ? "bash" : language}
      showLineNumbers={true}
      theme={dracula}
      codeBlock={true}
    ></CopyBlock>
  );
}
