class Artist {
  id: number = 0;
  name: string = '';
  description?: string | null = null;
  category?: string | null = null;
  createdAt: Date = new Date();
  updatedAt?: Date | null = null;
}