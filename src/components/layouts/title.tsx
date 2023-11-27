import { cn } from "@/lib/utils";

type Props = {
  size: "h1" | "h2" | "h3" | "h4";
  title: string;
  titlePostfix?: string | null;
  subTitle?: string | null | React.ReactNode;
  actions?: React.ReactNode | null;
};

export function Title({
  size = "h1",
  title,
  titlePostfix,
  subTitle,
  actions,
}: Props) {
  const sizes = {
    h1: "text-3xl",
    h2: "text-2xl",
    h3: "text-xl",
    h4: "text-lg",
  };

  return (
    <div className="flex items-start md:items:center justify-between space-y-2 flex-col md:flex-row">
      <div>
        <div className="flex items-end gap-1">
          {size === "h1" && (
            <h1 className={cn("font-bold tracking-tight", sizes[size])}>
              {title}
            </h1>
          )}

          {size === "h2" && (
            <h2 className={cn("font-bold tracking-tight", sizes[size])}>
              {title}
            </h2>
          )}

          {size === "h3" && (
            <h3 className={cn("font-bold tracking-tight", sizes[size])}>
              {title}
            </h3>
          )}

          {size === "h4" && (
            <h4 className={cn("font-bold tracking-tight", sizes[size])}>
              {title}
            </h4>
          )}

          {titlePostfix && (
            <span className="text-[12px] font-medium text-muted-foreground dark:text-muted-foreground">
              {titlePostfix}
            </span>
          )}
        </div>
        {subTitle && (
          <p className="text-sm mt-2 text-muted-foreground dark:text-muted-foreground">
            {subTitle}
          </p>
        )}
      </div>
      <div>{actions && actions}</div>
    </div>
  );
}
