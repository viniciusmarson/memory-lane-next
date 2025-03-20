export type Memory = {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
};

export type MemoryFormData = {
  title: string;
  description: string;
  image?: File | null;
  date: string;
};

export type Sort = "newest" | "oldest";
