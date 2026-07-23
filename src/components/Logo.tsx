import defaultLogo from "@/assets/top nav bar logo.png";
import loginLogo from "@/assets/login page logo.png";

export function Logo({
  variant = "default",
}: {
  size?: number;
  withText?: boolean;
  /** "default" uses the dark navy brand-text gradient; "white" renders plain white for use on dark/gradient backgrounds */
  variant?: "default" | "white";
}) {
  const isWhite = variant === "white";

  return (
    <div className="flex items-center">
      {isWhite ? (
        <img src={loginLogo} alt="Skyrovix" className="h-14 w-auto object-contain" />
      ) : (
        <>
          <img src={defaultLogo} alt="Skyrovix" className="h-14 w-auto object-contain dark:hidden" />
          <img src={loginLogo} alt="Skyrovix" className="h-14 w-auto object-contain hidden dark:block" />
        </>
      )}
    </div>
  );
}
