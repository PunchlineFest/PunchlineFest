class Evenement {
  id: number = 0;
  name: string = '';
  description?: string = '';
  type?: string | null = null;
  category?: string | null = null;
  artists: Artist[] = [];
  address?: string | null = null;
  coordinates: number[] = [];
  comments: Commentaire[] = []
  date: Date = new Date();
  createdAt: Date = new Date();
  updatedAt?: Date | null = null;
}