import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  href?: string;
}

export default function Logo({
  className,
  width = 150,
  height = 50,
  href = "/",
}: LogoProps) {
  const logoElement = (
    <Image
      src="/logo.png"
      alt="Waves VIP Logo"
      width={width}
      height={height}
      className={cn("object-contain", className)}
      priority
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logoElement}
      </Link>
    );
  }

  return logoElement;
}



