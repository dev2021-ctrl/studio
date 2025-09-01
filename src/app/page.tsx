import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MedicalCrossIcon } from '@/components/icons';
import { BotMessageSquare, FileText, HeartPulse, ShieldCheck, Stethoscope } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: <Stethoscope className="w-8 h-8 text-primary" />,
      title: 'Symptom Analysis',
      description: 'Our AI analyzes your symptoms to provide potential causes and advises on next steps.',
    },
    {
      icon: <HeartPulse className="w-8 h-8 text-primary" />,
      title: 'Personalized Advice',
      description: 'Receive health advice tailored to your personal profile and medical history.',
    },
    {
      icon: <BotMessageSquare className="w-8 h-8 text-primary" />,
      title: 'AI-Powered Chat',
      description: 'Engage in a conversation with our medical AI for instant, reliable answers.',
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: 'Resource Library',
      description: 'Access a curated library of medical articles, guides, and trusted resources.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: 'Secure & Confidential',
      description: 'Your privacy is our priority. All conversations are encrypted and confidential.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-card shadow-sm">
        <Link href="#" className="flex items-center justify-center gap-2" prefetch={false}>
          <MedicalCrossIcon className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">MediAssist AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Login
          </Link>
          <Button asChild>
            <Link href="/signup" prefetch={false}>
              Sign Up
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Your Personal AI Health Companion
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Get instant, reliable medical information and personalized health advice. MediAssist AI is here to help you understand your health better.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup" prefetch={false}>
                      Get Started Free
                    </Link>
                  </Button>
                </div>
              </div>
              <img
                src="https://picsum.photos/600/600"
                width="600"
                height="600"
                alt="Hero"
                data-ai-hint="medical technology"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A Smarter Way to Manage Your Health</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  MediAssist AI provides a comprehensive suite of tools to help you stay informed and proactive about your health and well-being.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
              {features.map((feature) => (
                <Card key={feature.title} className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {feature.icon}
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Ready to Take Control of Your Health?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up today and get access to your personal AI health assistant.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button asChild size="lg" className="w-full">
                <Link href="/signup" prefetch={false}>
                  Create Your Account
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 MediAssist AI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
