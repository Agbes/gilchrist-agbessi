import Image from "next/image";

export function ProfilePhoto({ imagePath, experience }: { imagePath: string; experience: number }) {
  return (
    <div className="mb-10 lg:mb-0 flex justify-center">
      <div className="relative">
        <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-blue-400 shadow-lg">
          <Image
            src={imagePath}
            alt="Photo de profil"
            className="w-full h-full object-cover"
            width={300}
            height={300}
          />
        </div>
        <div className="absolute -bottom-3 -right-3 bg-blue-500 text-white px-4 py-2 rounded-full font-medium">
          <span className="text-sm">{experience}+ ans d&apos;expérience</span>
        </div>
      </div>
    </div>
  );
}
