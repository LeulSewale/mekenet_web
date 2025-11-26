import { ReactNode } from 'react';

// This is a minimal root layout for Next.js
// The actual layout with translations is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

