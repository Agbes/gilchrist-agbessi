type Skill = {
  id: number;
  title: string;
  description: string;
  color: string;
  svgPath: string;
};

export function SkillsList({ skills }: { skills: Skill[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {skills.map(({ id, color, title, description, svgPath }) => (
        <div key={id} className="flex items-start">
          <div className={`${color} p-2 rounded-full mr-4`}>
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={svgPath}></path>
            </svg>
          </div>
          <div>
            <h4 className="font-semibold mb-1">{title}</h4>
            <p className="text-slate-400 text-sm">{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
