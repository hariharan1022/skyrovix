import logo from "@/assets/logo.png";

export function Logo({
  size = 36,
  withText = true,
  variant = "default",
}: {
  size?: number;
  withText?: boolean;
  /** "default" uses the dark navy brand-text gradient; "white" renders plain white for use on dark/gradient backgrounds */
  variant?: "default" | "white";
}) {
  return (
    <div className="flex items-center gap-2">
      <img src={logo} alt="Skyrovix" style={{ height: size, width: size }} className="rounded-md object-cover" />
      {withText && (
        <span
          className={
            variant === "white"
              ? "font-display text-lg font-bold tracking-tight text-white"
              : "font-display text-lg font-bold tracking-tight brand-text"
          }
        >
          SKYROVIX
        </span>
      )}
    </div>
  );
}
