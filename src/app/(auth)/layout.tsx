import Link from 'next/link';
import { MedicalCrossIcon } from '@/components/icons';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
       <div className="absolute top-4 left-4">
        <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
          <MedicalCrossIcon className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">MediAssist AI</span>
        </Link>
      </div>
      {children}
    </div>
  );
}
