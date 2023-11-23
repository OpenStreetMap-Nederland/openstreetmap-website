import React from "react";
import { TitledPage } from "@/components/layouts/titled-page";
import Image from "next/image";
import { SeparatorTypes } from "@/enums/separator-types";
import Link from "next/link";
import { projectLists } from "./data";
import { Title } from "@/components/layouts/title";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import { ExternalButton } from "@/components/external-button";

export const metadata: Metadata = {
  title: "OpenStreetMap Projects",
  description: "Zie hier de projecten van OpenStreetMap Nederland.",
};

export default function ProjectsPage() {
  return (
    <TitledPage
      title="Projects"
      subTitle="A collection of projects and tools that are used by OpenStreetMap Netherlands."
      separator={SeparatorTypes.none}
      actions={
        <ExternalButton href="https://github.com/openstreetmap-netherlands/openstreetmap-website/blob/main/src/app/projects/data.ts">
          Add a project
        </ExternalButton>
      }
    >
      {projectLists.map((projectsList) => {
        return (
          <div className="flex flex-col gap-4" key={projectsList.name}>
            <Title size="h2" title={projectsList.name} />

            {projectsList.projects.map((project) => {
              return (
                <Link
                  key={project.name}
                  href={`/projects/${project.name
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  <Card
                    key={project.name}
                    className="flex gap-2 p-4 justify-between"
                  >
                    <div className="flex flex-col gap-2">
                      <Title size="h3" title={project.name} />
                      <p>{project.description}</p>
                    </div>

                    {project.image && (
                      <div
                        className="hidden md:flex justify-center items-center relative"
                        style={{ height: "300px", width: "580px" }}
                      >
                        <Image
                          className="overflow-hidden rounded-md"
                          objectFit="cover"
                          alt={project.name}
                          src={project.image}
                          fill
                        />
                      </div>
                    )}
                  </Card>
                </Link>
              );
            })}
          </div>
        );
      })}
    </TitledPage>
  );
}
