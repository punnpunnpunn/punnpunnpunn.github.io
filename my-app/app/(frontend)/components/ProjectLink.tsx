'use client';

import Link from "next/link";
import posthog from "posthog-js";
import { ReactNode } from "react";

interface ProjectLinkProps {
  href: string;
  title: string | null;
  className?: string;
  target?: string;
  children: ReactNode;
}

export default function ProjectLink({ href, title, className, target, children }: ProjectLinkProps) {
  const handleClick = () => {
    posthog.capture("project_link_clicked", {
      title,
      url: href,
    });
  };

  return (
    <Link href={href} className={className} target={target} onClick={handleClick}>
      {children}
    </Link>
  );
}
