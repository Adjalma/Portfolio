document.addEventListener('DOMContentLoaded', () => {
    // Zoom em imagens
    const demoImages = document.querySelectorAll('.demo-content img');
    demoImages.forEach(img => {
        img.addEventListener('click', () => {
            img.classList.toggle('zoomed');
        });
    });

    // Tabs para diferentes visualizações
    const tabs = document.querySelectorAll('.demo-tabs button');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.target;
            document.querySelectorAll('.demo-view').forEach(view => {
                view.style.display = view.id === target ? 'block' : 'none';
            });
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
}); 