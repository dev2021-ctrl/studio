import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const resources = [
  {
    title: "World Health Organization (WHO)",
    description: "Global public health information and guidelines.",
    link: "https://www.who.int",
  },
  {
    title: "Centers for Disease Control and Prevention (CDC)",
    description: "U.S. public health information, including data and statistics.",
    link: "https://www.cdc.gov",
  },
  {
    title: "WebMD",
    description: "Provides valuable health information, tools for managing your health, and support.",
    link: "https://www.webmd.com",
  },
  {
    title: "Mayo Clinic",
    description: "Patient care, research and education from a leading nonprofit organization.",
    link: "https://www.mayoclinic.org",
  },
  {
    title: "National Institutes of Health (NIH)",
    description: "The steward of medical and behavioral research for the Nation.",
    link: "https://www.nih.gov",
  },
  {
    title: "MedlinePlus",
    description: "Health information from the world's largest medical library, the National Library of Medicine.",
    link: "https://medlineplus.gov",
  },
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Resource Library</h1>
        <p className="text-muted-foreground">A curated list of trusted health information sources.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <Card key={resource.title} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {resource.title}
              </CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Link
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm font-medium text-primary hover:underline"
              >
                Visit Site <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
