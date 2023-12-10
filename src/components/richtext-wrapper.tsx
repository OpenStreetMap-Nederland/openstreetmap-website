import { toInternalLinks } from "@/lib/utils";
import { env } from "process";
import { CopyCodeBlock } from "./copy-code-block";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";
import { sanitize } from "isomorphic-dompurify";

type Props = {
  children: React.ReactNode;
};

const getCodeBlock = (domNode: any) => {
  let text = "";

  const getText = (node: any) => {
    if (node.name === "span") {
      text += node.children[0].data;
    } else if (node.children) {
      node.children.forEach(getText);
    } else if (node.data) {
      text += node.data;
    }
  };

  domNode.children.forEach(getText);
  return <CopyCodeBlock text={text}></CopyCodeBlock>;
};

export function RichtextWrapper({ children }: Props) {
  if (typeof children !== "string") return null;

  const options = {
    replace: (domNode: any) => {
      if (domNode.name === "img") {
        return (
          <Image
            src={domNode.attribs.src}
            width={800}
            height={600}
            alt={domNode.attribs.alt}
            className="rounded-lg w-full mt-4 mb-2"
            priority
            unoptimized
          ></Image>
        );
      }

      if (domNode.name === "pre") {
        if (domNode.children[0].name === "code") {
          return <pre>{getCodeBlock(domNode)}</pre>;
        }
      }

      if (domNode.name === "code") {
        return (
          <span className="bg-gray-100 dark:bg-gray-800 rounded-md px-1.5 py-0.5 hover:underline">
            {domNode.children[0].data}
          </span>
        );
      }

      if (domNode.name === "a") {
        let baseUrl = env.BASE_URL || "http://localhost:3000";
        let href = domNode.attribs.href;

        if (href && !href.startsWith("http")) {
          domNode.attribs.rel = null;
          return <Link {...domNode.attribs}>{domNode.children[0].data}</Link>;
        } else {
          domNode.attribs.target = "_blank";
        }
      }
    },
  };

  return (
    <article className="flex flex-col gap-4 prose dark:prose-invert prose-pre:mx-auto prose-pre:min-w-full">
      {parse(toInternalLinks(sanitize(children)), options)}
    </article>
  );
}
