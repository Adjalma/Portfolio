// Fechar modal
document.querySelector('.modal .close').addEventListener('click', () => {
    document.getElementById('preview-modal').style.display = 'none';
});

const books = [
    {
        id: 'manutencao-java',
        title: "Manutenção Preditiva com Java",
        author: "Adjalma Machado Aguiar Junior",
        year: 2024,
        coverImage: "https://m.media-amazon.com/images/I/41jz5zL0qDL._SY445_SX342_.jpg",
        downloadUrl: "https://www.amazon.com.br/gp/product/B0DVCZRW8M"
    },
    {
        id: 'manutencoes-python',
        title: "Como Prever manutenções Mecânicas com Python?",
        author: "Adjalma Machado Aguiar Junior",
        year: 2024,
        coverImage: "https://m.media-amazon.com/images/I/41KiZbwC3tL._SY445_SX342_.jpg",
        downloadUrl: "https://www.amazon.com.br/gp/product/B0DV519HDX"
    },
    {
        id: 'python-predictive-insights',
        title: "Python for Predictive Insights",
        author: "Adjalma Machado Aguiar Junior",
        year: 2024,
        coverImage: "https://m.media-amazon.com/images/I/41h0RGUT7BL._SY445_SX342_.jpg",
        downloadUrl: "https://www.amazon.com.br/gp/product/B0DV2HBF1P"
    },
    {
        id: 'mastering-predictive-maintenance',
        title: "Mastering Predictive Maintenance",
        author: "Adjalma Machado Aguiar Junior",
        year: 2024,
        coverImage: "https://m.media-amazon.com/images/I/41h0RGUT7BL._SY445_SX342_.jpg",
        downloadUrl: "https://www.amazon.com.br/gp/product/B0DV2R31W6"
    },
    {
        id: 'predictive-maintenance-playbook',
        title: "The Predictive Maintenance Playbook",
        author: "Adjalma Machado Aguiar Junior",
        year: 2024,
        coverImage: "https://m.media-amazon.com/images/I/41h0RGUT7BL._SY445_SX342_.jpg",
        downloadUrl: "https://www.amazon.com.br/gp/product/B0DVLKDD6K"
    }
];

function renderBooks() {
    const container = document.getElementById('books-container');
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <img src="${book.coverImage}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p><strong>Autor:</strong> ${book.author}</p>
            <p><strong>Ano:</strong> ${book.year}</p>
            <a href="${book.downloadUrl}" target="_blank">Ver na Amazon</a>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderBooks); 