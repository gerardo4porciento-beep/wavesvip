import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  href?: string;
  showText?: boolean;
}

export default function Logo({
  className,
  width = 100,
  height = 32,
  href = "/",
  showText = true,
}: LogoProps) {
  const logoContent = (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src="/logo.png"
        alt="Waves VIP"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
      {showText && (
        <span className="text-luxury-gold font-bold text-2xl tracking-tight" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
          WAVES VIP
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}



