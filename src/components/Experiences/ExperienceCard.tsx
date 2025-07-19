interface ExperienceCardProps {
  name: string;
  periode: string;
  description: string;
  lieu: string;
  services: string[];
  iconType?: "fullstack" | "ingénieur" | "manager";
  align?: "left" | "right";
}

export default function ExperienceCard({
  name,
  periode,
  description,
  lieu,
  services,
  iconType = "fullstack",
  align = "left",
}: ExperienceCardProps) {
  const iconMap = {
    fullstack: <i className="fas fa-code text-white"></i>,
    ingénieur: <i className="fas fa-cogs text-white"></i>,
    manager: <i className="fas fa-user-tie text-white"></i>,
  };

  return (
    <div className="relative bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
      {/* Bulle avec icône */}
      <div
        className={`absolute top-6 ${
          align === "right" ? "-right-10" : "-left-10"
        } w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center`}
      >
        {iconMap[iconType]}
      </div>

      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">{name}</h3>
        <span className="text-sm text-blue-400">{periode}</span>
      </div>
      <h4 className="text-blue-300 mb-3">{lieu}</h4>
      <p className="text-slate-400 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {services.map((s, i) => (
          <span key={i} className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-300">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
