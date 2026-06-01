'use client';

import Link from "next/link";
import posthog from "posthog-js";
import { ReactNode } from "react";

interface BlogPostLinkProps {
  href: string;
  slug: string;
  title: string | null;
  className?: string;
  children: ReactNode;
}

export default function BlogPostLink({ href, slug, title, className, children }: BlogPostLinkProps) {
  const handleClick = () => {
    posthog.capture("blog_post_clicked", {
      slug,
      title,
    });
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
