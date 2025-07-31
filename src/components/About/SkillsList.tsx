type Skill = {
  id: number;
  title: string;
  description: string;
  color: string;
  svgPath: string;
};

export function SkillsList({ skills }: { skills: Skill[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {skills.map(({ id, color, title, description, svgPath }) => (
        <div
          key={id}
          className="flex items-start w-[48%] p-4 bg-slate-700 rounded-lg shadow-sm"
        >
          <div
            className={`${color} flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0 mr-4`}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={svgPath}
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-white mb-1 break-words">{title}</h4>
            <p className="text-slate-300 text-sm break-words">{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
