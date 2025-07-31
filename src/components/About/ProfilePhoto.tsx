import Image from "next/image";

export function ProfilePhoto({
  imagePath,
  experience,
}: {
  imagePath: string;
  experience: number;
}) {
  return (
    <div className="mb-10 lg:mb-0 flex justify-center">
      <div className="relative">
        <div className="w-48 sm:w-64 md:w-72 lg:w-80 xl:w-96 h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 rounded-full overflow-hidden border-4 border-blue-400 shadow-lg">
          <Image
            src={imagePath}
            alt="Photo de profil"
            className="w-full h-full object-cover"
            width={384} // largeur max desktop xl:w-96 = 24rem = 384px
            height={384}
            priority
          />
        </div>
        <div className="absolute -bottom-3 -right-3 bg-blue-500 text-white px-3 sm:px-4 py-1.5 rounded-full font-medium text-xs sm:text-sm">
          {experience}+ ans d&apos;expérience
        </div>
      </div>
    </div>
  );
}
