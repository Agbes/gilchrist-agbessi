"use client";

import * as FaIcons from "react-icons/fa";
import SkillCard from "@/components/Skill/SkillCard";
import { ElementType } from "react";

type Competence = {
  id: number;
  title: string;
  description: string;
  iconKey: string;
  color: string;
  tagColor: string;
  tags: string[];
};

function iconKeyToComponentName(iconKey: string): string {
  return iconKey
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export default function SkillsSection({ skills }: { skills: Competence[] }) {
  return (
    <section id="skills" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Mes{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            compétences
          </span>
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {skills.map((skill) => {
            const componentName = iconKeyToComponentName(skill.iconKey);
            const Icon = (FaIcons as Record<string, ElementType>)[componentName];

            if (!Icon) return null;

            return (
              <div key={skill.id} className="w-full sm:w-[45%] lg:w-[30%]">
                <SkillCard
                  color={skill.color}
                  icon={Icon}
                  title={skill.title}
                  description={skill.description}
                  tags={skill.tags}
                  tagColor={skill.tagColor}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
