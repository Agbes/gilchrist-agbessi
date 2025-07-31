"use client";

import Image from "next/image";
import React from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormSchema } from "./EditProfilForm";

interface ProfileSectionProps {
    register: UseFormRegister<FormSchema>;
    setNewImage: (file: File | null) => void;
    currentImagePath: string | null;
    errors: FieldErrors<FormSchema>;
}

export default function ProfileSection({
    register,
    setNewImage,
    currentImagePath,
    errors,
}: ProfileSectionProps) {
    return (
        <section className="mt-6 border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Profil</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewImage(e.target.files?.[0] || null)}
                        className="input file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                    {currentImagePath && (
                        <Image
                            src={currentImagePath}
                            width={300}
                            height={300}
                            alt="Image actuelle"
                            className="mt-2 w-32 h-32 object-cover rounded"
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Années d&apos;expérience</label>
                    <input
                        type="number"
                        min={0}
                        placeholder="Années d'expérience"
                        {...register("experience")}
                        className="input mt-1 block w-full rounded border border-gray-300 p-2"
                    />
                    {errors.experience && <p className="text-red-600 text-sm mt-1">{errors.experience.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description du profil</label>
                    <input
                        placeholder="Description du profil"
                        {...register("profileDescription")}
                        className="input mt-1 block w-full rounded border border-gray-300 p-2"
                    />
                    {errors.profileDescription && <p className="text-red-600 text-sm mt-1">{errors.profileDescription.message}</p>}
                </div>
            </div>
        </section>
    );
}
