import { Book } from '../types/books';

export const books: Book[] = [
  {
    id: 'manutencoes-python',
    title: "Como Prever manutenções Mecânicas com Python?",
    subtitle: "Manutenções Preditivas com Python (Sistemas Preditivos Livro 1)",
    author: "Carlos Silva",
    year: 2023,
    publisher: "Novatec",
    description: "Manutenções Preditivas com Python",
    coverImage: "/images/books/manutencoes-python.jpg",
    downloadUrl: "https://www.amazon.com.br/gp/product/B0DV519HDX",
    category: "Sistemas Preditivos",
    summary: `O livro "Como Prever Manutenções Mecânicas com Python?" aborda a crescente importância da manutenção preditiva...`,
    pages: 280,
    language: "Português",
    isbn: "978-8555194567"
  },
  // ... outros livros
];
