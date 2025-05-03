// Fechar modal
document.querySelector('.modal .close').addEventListener('click', () => {
    document.getElementById('preview-modal').style.display = 'none';
});

const books = [
    {
        id: 'manutencao-java',
        title: "Manutenção Preditiva com Java: Um Guia Prático para Cientistas de Dados",
        subtitle: "Sistemas Preditivos",
        author: "Adjalma Machado Aguiar Junior",
        year: 2024,
        publisher: "Amazon",
        description: "Guia prático de manutenção preditiva com Java",
        coverImage: "https://m.media-amazon.com/images/I/41jz5zL0qDL._SY445_SX342_.jpg",
        downloadUrl: "https://www.amazon.com.br/gp/product/B0DVCZRW8M",
        summary: "O livro aborda a crescente importância da manutenção preditiva, uma abordagem que visa antecipar falhas em equipamentos e sistemas..."
    },
    {
        id: 'manutencoes-python',
        title: "Como Prever manutenções Mecânicas com Python?",
        subtitle: "Manutenções Preditivas com Python (Sistemas Preditivos Livro 1)",
        author: "Adjalma Machado Aguiar Junior",
        year: 2024,
        publisher: "Amazon",
        description: "Manutenções Preditivas com Python",
        coverImage: "https://m.media-amazon.com/images/I/41KiZbwC3tL._SY445_SX342_.jpg",
        downloadUrl: "https://www.amazon.com.br/gp/product/B0DV519HDX",
        summary: "O livro aborda a crescente importância da manutenção preditiva no contexto industrial atual..."
    },
    {
        id: 'python-predictive-insights',
        title: "Python for Predictive Insights: Code Your Way to Data Mastery",
        subtitle: "Sistemas Preditivos",
        author: "Adjalma Machado Aguiar Junior",
        year: 2024,
        publisher: "Amazon",
        description: "Master predictive analytics with Python",
        coverImage: "https://m.media-amazon.com/images/I/41h0RGUT7BL._SY445_SX342_.jpg",
        downloadUrl: "https://www.amazon.com.br/gp/product/B0DV2HBF1P",
        summary: "A vital resource for anyone looking to harness the power of data through Python programming..."
    },
    {
        id: 'mastering-predictive-maintenance',
        title: "Mastering Predictive Maintenance: your Blueprint for Software",
        subtitle: "Sistemas Preditivos",
        author: "Adjalma Machado Aguiar Junior",
        year: 2024,
        publisher: "Amazon",
        description: "Blueprint for predictive maintenance software",
        coverImage: "https://m.media-amazon.com/images/I/41h0RGUT7BL._SY445_SX342_.jpg",
        downloadUrl: "https://www.amazon.com.br/gp/product/B0DV2R31W6",
        summary: "Delves into the critical role of predictive maintenance in modern industry..."
    },
    {
        id: 'predictive-maintenance-playbook',
        title: "The Predictive Maintenance Playbook: Strategies for Data Scientists Using Java and Python",
        subtitle: "Sistemas Preditivos",
        author: "Adjalma Machado Aguiar Junior",
        year: 2024,
        publisher: "Amazon",
        description: "Strategies for predictive maintenance",
        coverImage: "https://m.media-amazon.com/images/I/41h0RGUT7BL._SY445_SX342_.jpg",
        downloadUrl: "https://www.amazon.com.br/gp/product/B0DVLKDD6K",
        summary: "A crucial resource for professionals aiming to implement predictive maintenance in industrial environments..."
    }
];

function renderBooks() {
    const booksContainer = document.getElementById('books-container');
    
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        
        bookCard.innerHTML = `
            <img src="${book.coverImage}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p><strong>Autor:</strong> ${book.author}</p>
            <p><strong>Ano:</strong> ${book.year}</p>
            <p>${book.summary}</p>
            <a href="${book.downloadUrl}" target="_blank">Ver na Amazon</a>
        `;
        
        booksContainer.appendChild(bookCard);
    });
}

// Render books when page loads
document.addEventListener('DOMContentLoaded', renderBooks); 