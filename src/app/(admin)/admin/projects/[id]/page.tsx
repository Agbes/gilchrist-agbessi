"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Project {
    name: string;
    nature: string;
    description: string;
    imageUrl: string;
    technologyNames: string[];
}

export default function ViewProject() {
    const { id } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProject = async () => {
            const res = await fetch(`/api/projects/${id}`);
            const data = await res.json();
            if (res.ok) {
                setProject(data);
            } else {
                setError(data.error || "Erreur");
            }
        };

        if (id) fetchProject();
    }, [id]);

    if (error) return <p className="text-red-600">{error}</p>;
    if (!project) return <p>Chargement...</p>;

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
            <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
            <Image
                src={project.imageUrl} 
                alt={project.name} 
                className="w-full h-64 object-cover rounded mb-4"
                width={640}
                height={256}
                />
            <p className="text-gray-700 mb-2"><strong>Nature :</strong> {project.nature}</p>
            <p className="text-gray-700 mb-4"><strong>Description :</strong> {project.description}</p>
            <div>
                <strong>Technologies :</strong>
                <ul className="list-disc list-inside text-sm mt-2">
                    {project.technologyNames.map((tech) => (
                        <li key={tech}>{tech}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
