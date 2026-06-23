import logo from "@/assets/logo.png";

export function Logo({ size = 36, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <img src={logo} alt="Skyrovix" style={{ height: size, width: size }} className="rounded-md object-cover" />
      {withText && (
        <span className="font-display text-lg font-bold tracking-tight brand-text">SKYROVIX</span>
      )}
    </div>
  );
}
