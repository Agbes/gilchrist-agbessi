import React from "react";

interface SidebarKeywordsProps {
    keywords: string[];
}

export default function SidebarKeywords({ keywords }: SidebarKeywordsProps) {
    if (!keywords || keywords.length === 0) {
        return <div className="bg-white rounded-xl shadow p-4 text-black">
            <h3 className="font-bold mb-3">Aucun mot clé</h3>

        </div>;

    }

    return (
        <section className="bg-sky-950 p-6 rounded-md">
            <h3 className="text-white text-xl font-semibold mb-4">Mots-clés</h3>
            <ul className="flex flex-wrap gap-3">
                {keywords.map((keyword) => (
                    <li
                        key={keyword}
                        className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-700 transition"
                    >
                        #{keyword}
                    </li>
                ))}
            </ul>
        </section>
    );
}
