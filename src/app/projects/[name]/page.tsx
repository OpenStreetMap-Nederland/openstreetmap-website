import { TitledPage } from "@/components/layouts/titled-page";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Project, projects } from "../data";
import Image from "next/image";
import Link from "next/link";
import { ExternalButton } from "@/components/external-button";

export const metadata: Metadata = {
  title: "OpenStreetMap Projects",
  description: "",
};

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

  metadata.title = project.name;
  metadata.description = project.description;

  return (
    <TitledPage
      title={project.name}
      titlePostfix="project"
      subTitle={project.description}
      backLink={"/projects"}
      actions={
        <ExternalButton href={project.link}>{project.name}</ExternalButton>
      }
    >
      {project.image && (
        <Image
          className="overflow-hidden rounded-md"
          alt={project.name}
          width="400"
          height="400"
          src={project.image}
        ></Image>
      )}
    </TitledPage>
  );
}
