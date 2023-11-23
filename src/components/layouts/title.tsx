import { cn } from "@/lib/utils";

type Props = {
  size: "h1" | "h2" | "h3" | "h4";
  title: string;
  titlePostfix?: string | null;
  subTitle?: string | null;
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
    <div className="flex items-center justify-between space-y-2">
      <div>
        <div className="flex items-end gap-1">
          <h2 className={cn("font-bold tracking-tight", sizes[size])}>
            {title}
          </h2>
          {titlePostfix && (
            <h3 className="text-[12px] font-medium text-muted-foreground dark:text-muted-foreground">
              {titlePostfix}
            </h3>
          )}
        </div>
        {subTitle && (
          <p className="text-sm mt-2 text-muted-foreground dark:text-muted-foreground">
            {subTitle}
          </p>
        )}
      </div>
      <div className="hidden md:block">{actions && actions}</div>
    </div>
  );
}
