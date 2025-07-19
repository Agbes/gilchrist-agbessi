import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCode,
  faServer,
  faPaintBrush,
  faMobileAlt,
  faCloud,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  'fa-code': faCode,
  'fa-server': faServer,
  'fa-paint-brush': faPaintBrush,
  'fa-mobile-alt': faMobileAlt,
  'fa-cloud': faCloud,
  'fa-chart-line': faChartLine,
};

interface SkillCardProps {
  color: string;
  icon: keyof typeof iconMap;
  title: string;
  description: string;
  tags: string[];
  tagColor: string;
}

export default function SkillCard({
  color,
  icon,
  title,
  description,
  tags,
  tagColor,
}: SkillCardProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 hover:shadow-xl transition duration-300">
      <div className={`w-14 h-14 ${color} rounded-full flex items-center justify-center mb-4`}>
        <FontAwesomeIcon icon={iconMap[icon]} className="text-white text-2xl" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-400 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-sm ${tagColor}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
