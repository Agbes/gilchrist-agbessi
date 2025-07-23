"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { contactInfoSchema } from "@/lib/validation/articleSchema";

const contactPresets = [
    { type: "Email", label: "Email professionnel", icon: "FaEnvelope", color: "#3B82F6", placeholder: "Ex : contact@agbessi.com" },
    { type: "Téléphone", label: "Téléphone mobile", icon: "FaPhone", color: "#10B981", placeholder: "Ex : +33 6 12 34 56 78" },
    { type: "Localisation", label: "Adresse de bureau", icon: "FaMapMarkerAlt", color: "#EF4444", placeholder: "Bénin, Cotonou, 01 BP 1234" },
    { type: "Site Web", label: "Site personnel", icon: "FaGlobe", color: "#8B5CF6", placeholder: "Ex : https://agbessi.com" },
];

type ContactInfoFormData = z.infer<typeof contactInfoSchema>;

export default function EditInformationForm() {
    const { id } = useParams();
    const router = useRouter();
    const [placeholder, setPlaceholder] = useState("");
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ContactInfoFormData>({
        resolver: zodResolver(contactInfoSchema),
        defaultValues: {
            type: "",
            label: "",
            icon: "",
            color: "",
            value: "",
        },
    });


    useEffect(() => {
        async function fetchInfo() {
            const res = await fetch(`/api/contact-info/${id}`);
            if (!res.ok) return alert("Erreur de chargement");
            const data = await res.json();
            const preset = contactPresets.find((p) => p.type === data.type);
            setValue("type", data.type);
            setValue("label", data.label);
            setValue("icon", data.icon);
            setValue("color", data.color);
            setValue("value", data.value);
            setPlaceholder(preset?.placeholder || "");
            setLoading(false);
        }
        fetchInfo();
    }, [id, setValue]);

    const handleTypeChange = (type: string) => {
        const preset = contactPresets.find((p) => p.type === type);
        if (preset) {
            setValue("label", preset.label);
            setValue("icon", preset.icon);
            setValue("color", preset.color);
            setPlaceholder(preset.placeholder);
        }
    };

    const onSubmit = async (data: ContactInfoFormData) => {
        const res = await fetch(`/api/contact-info/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            router.push("/admin/info");
        } else {
            const { error } = await res.json();
            alert(error || "Erreur de mise à jour");
        }
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
                Modifier une information de contact
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                        {...register("type", {
                            onChange: (e) => handleTypeChange(e.target.value),
                        })}
                        className="mt-1 w-full border px-4 py-2 rounded-lg"
                    >
                        <option value="">-- Sélectionner --</option>
                        {contactPresets.map((preset) => (
                            <option key={preset.type} value={preset.type}>
                                {preset.type}
                            </option>
                        ))}
                    </select>
                    {errors.type && <p className="text-red-600 text-sm">{errors.type.message}</p>}
                </div>

                <input type="hidden" {...register("label")} />
                <input type="hidden" {...register("icon")} />
                <input type="hidden" {...register("color")} />

                <div>
                    <label className="block text-sm font-medium text-gray-700">Valeur</label>
                    <input
                        type="text"
                        {...register("value")}
                        placeholder={placeholder}
                        className="mt-1 w-full border px-4 py-2 rounded-lg"
                    />
                    {errors.value && <p className="text-red-600 text-sm">{errors.value.message}</p>}
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                    >
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
}
