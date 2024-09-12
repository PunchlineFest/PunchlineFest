class Commentaire {
  id: number = 0;
  author: string = '';
  content: string = '';
  event: Evenement = new Evenement();
  createdAt: Date = new Date();
  updatedAt?: Date | null = null;
}