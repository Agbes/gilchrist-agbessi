"use client";

import React from "react";

type SkillCardProps = {
  color: string;
  icon: React.ElementType;
  title: string;
  description: string;
  tags?: string[];
  tagColor: string;
};

export default function SkillCard({
  color,
  icon: Icon,
  title,
  description,
  tags = [],
  tagColor,
}: SkillCardProps) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow hover:shadow-xl transition duration-300 group">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-14 h-14 ${color} rounded-full flex items-center justify-center`}>
          <Icon className="text-white text-2xl" />
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">{title}</h3>
      </div>
      <p className="text-slate-400 text-sm mb-4 flex-1">{description}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-xs font-medium ${tagColor} bg-opacity-20`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
