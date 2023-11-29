import { toInternalLinks } from "@/lib/utils";
import Link from "next/link";
import { env } from "process";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  children: React.ReactNode;
};

export function MarkdownWrapper({ children }: Props) {
  if (typeof children !== "string") return null;

  return (
    <div className="flex flex-col gap-2 prose dark:prose-invert">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => {
            // id link is not in the same domain
            let baseUrl = env.BASE_URL || "http://localhost:3000";
            if (props.href) props.href = toInternalLinks(props.href);
            else return null;

            if (
              props?.href?.startsWith("http") &&
              !props?.href?.startsWith(baseUrl)
            ) {
              return (
                <Link
                  href={props.href}
                  prefetch={false}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  {props.children}
                </Link>
              );
            }

            return (
              <Link href={props.href} prefetch={false}>
                {props.children}
              </Link>
            );
          },
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
