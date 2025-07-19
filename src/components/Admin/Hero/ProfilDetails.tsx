import Image from "next/image";

interface Skill {
  title: string;
  description: string;
  color: string;
  svgPath: string;
}

interface Profil {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  profile: {
    imagePath: string;
    experience: number;
    description: string;
  };
  skills: Skill[];
}

export default function ProfilView({ profil }: { profil: Profil }) {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-3xl space-y-10 mt-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-700">{profil.name}</h1>
        <h2 className="text-xl text-gray-700">{profil.title} — {profil.subtitle}</h2>
        <p className="mt-4 text-gray-600">{profil.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={profil.profile.imagePath}
            alt="Image de profil"
            width={400}
            height={400}
            className="rounded-xl object-cover w-full"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">Profil professionnel</h3>
          <p><strong>Expérience :</strong> {profil.profile.experience} ans</p>
          <p>{profil.profile.description}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Compétences</h3>
        <table className="w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm text-gray-600">
              <th className="py-2 px-4">Titre</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Couleur</th>
              <th className="py-2 px-4">SVG</th>
            </tr>
          </thead>
          <tbody>
            {profil.skills.map((skill, i) => (
              <tr key={i} className="border-t">
                <td className="py-2 px-4">{skill.title}</td>
                <td className="py-2 px-4">{skill.description}</td>
                <td className="py-2 px-4">
                  <span
                    className="inline-block w-5 h-5 rounded-full"
                    style={{ backgroundColor: skill.color }}
                    title={skill.color}
                  />
                </td>
                <td className="py-2 px-4">
                  <code className="text-xs text-gray-500">{skill.svgPath}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
