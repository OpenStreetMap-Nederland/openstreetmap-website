import { TitledPage } from "@/components/layouts/titled-page";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Project, projects } from "../data";
import Image from "next/image";
import { ExternalButton } from "@/components/external-button";
import Markdown from "react-markdown";
import { SeparatorTypes } from "@/enums/separator-types";
import { eclipse } from "@/lib/utils";
import { MarkdownWrapper } from "@/components/markdown-wrapper";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const project: Project | undefined = projects.find(
    (project) => project.name.toLowerCase() === params.name.replaceAll("-", " ")
  );

  if (!project) {
    return notFound();
  }

  const metadata: Metadata = {
    title: eclipse(project.name, 50) + " OpenStreetMap project",
    description: eclipse(project.description, 200),
    keywords: ["OpenStreetMap", "Prject", project.name],
  };

  if (project.image) {
    metadata.openGraph = {
      images: [
        {
          url: project.image,
          width: 800,
          height: 600,
          alt: project.name,
        },
      ],
    };
  }

  return metadata;
}

export function generateStaticParams() {
  const params = projects.map((project) => {
    return {
      name: project.name.toLowerCase().replaceAll(" ", "-"),
    };
  });

  return params;
}

export default function ProjectDetailPage({
  params,
}: {
  params: { name: string };
}) {
  const project: Project | undefined = projects.find(
    (project) => project.name.toLowerCase() === params.name.replaceAll("-", " ")
  );

  if (!project) {
    return notFound();
  }

  return (
    <TitledPage
      title={project.name}
      titlePostfix={project.altName ? `(${project.altName})` : "project"}
      subTitle={project.description}
      backLink={"/projects"}
      separator={SeparatorTypes.none}
    >
      <div className="flex gap-4">
        {project.links.map((link) => {
          return (
            <ExternalButton key={link.url} href={link.url}>
              {link.name}
            </ExternalButton>
          );
        })}
      </div>

      {project.image && (
        <Image
          className="overflow-hidden rounded-md"
          alt={project.name}
          width="800"
          height="600"
          src={project.image}
        ></Image>
      )}

      <MarkdownWrapper>{project.longdescription}</MarkdownWrapper>
    </TitledPage>
  );
}
