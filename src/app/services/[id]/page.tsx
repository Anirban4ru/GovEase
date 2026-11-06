import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllServices, getServiceById } from "../../../lib/catalogue";
import { getExplainerGuideForService } from "../../../lib/service-explainer-data";
import { ServiceDetailView } from "../../../components/ServiceDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    return {
      title: "Service Not Found | Unified Life Services Platform",
    };
  }

  return {
    title: `${service.title.en} | Unified Life Services Platform`,
    description: service.summary.en,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    notFound();
  }

  const explainerGuide = getExplainerGuideForService(id);

  return <ServiceDetailView service={service} explainerGuide={explainerGuide} />;
}
