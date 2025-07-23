import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(3, "Le titre est requis"),
  description: z.string().min(10, "La description est trop courte"),
  topicId: z.string().min(1, "Le thème est requis"),
  date: z.string().optional(),
  tags: z.string().optional(),
  images: z.any().optional(), // gestion via FormData
});



export const articleBodySchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  topicId: z.string().min(1),
  date: z.string().optional(),
  readTime: z.string().optional(),
  tags: z.string().optional(),
});


export const idSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID invalide (doit être un entier)"),
});

export const experienceSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  periode: z.string().min(1, "La période est requise"),
  description: z.string().min(1, "La description est requise"),
  lieu: z.string().min(1, "Le lieu est requis"),
  services: z.string().optional(), // chaîne CSV, optionnelle
});

export const competenceSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  icon: z.string().min(1, "L'icône est requise"),
  color: z.string().min(1, "La couleur est requise"),
  tagColor: z.string().min(1, "La couleur de l'étiquette est requise"),
  tags: z.array(z.string()).optional(),
});


export const projectSchema = z.object({
  name: z.string().min(1, "Le nom du projet est requis"),
  nature: z.string().min(1, "La nature est requise"),
  description: z.string().min(1, "La description est requise"),
  technologies: z.string().optional(),
  image: z
    .any()
    .optional()
    .refine((file) => file === undefined || file instanceof File, "Le fichier doit être une image"),
});



export const addProjectSchema = z.object({
  name: z.string().min(1, "Le nom du projet est requis"),
  nature: z.string().min(1, "La nature est requise"),
  description: z.string().min(1, "La description est requise"),
  technologies: z.string().optional(),
  image: z
    .any()
    .refine((file) => file instanceof FileList && file.length > 0, "L'image est obligatoire"),
});

export const updateProjectSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  nature: z.string().min(1, "La nature est requise"),
  description: z.string().min(1, "La description est requise"),
  imageUrl: z.string().optional(),
  technologies: z.array(z.string()).optional(),
});


export const contactInfoSchema = z.object({
  type: z.string().min(1, "Le type est requis"),
  label: z.string(),
  icon: z.string(),
  color: z.string(),
  value: z.string().min(1, "La valeur est requise"),
});


export const formSchema = z.object({
  name: z.string().min(1),
  icon: z.string(),
  color: z.string(),
  url: z.string().url({ message: "URL invalide" }),
});



export const skillInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  color: z.string(),
  svgPath: z.string(),
});

export const profileInputSchema = z.object({
  imagePath: z.string(),
  experience: z.string(),
  description: z.string(),
});

export const heroInputSchema = z.object({
  name: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  profile: profileInputSchema,
  skills: z.array(skillInputSchema),
});

export type HeroInput = z.infer<typeof heroInputSchema>;
