import { TitledPage } from "@/components/layouts/titled-page";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Project, projects } from "../data";
import Image from "next/image";
import Link from "next/link";
import { ExternalButton } from "@/components/external-button";
import Markdown from "react-markdown";
import { SeparatorTypes } from "@/enums/separator-types";

export const metadata: Metadata = {
  title: "OpenStreetMap Project",
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

      <Markdown>{project.longdescription}</Markdown>
    </TitledPage>
  );
}
