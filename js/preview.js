function createModal() {
    return document.querySelector('.image-modal');
}

function initImagePreview() {
    const modal = createModal();
    const modalContent = modal.querySelector('.modal-content');
    const closeButton = modal.querySelector('.close-modal');

    // 获取所有图片占位符
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');

    // 为每个图片占位符添加点击事件
    imagePlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            // 在实际项目中，这里应该使用真实的图片URL
            // 目前使用占位符的背景色来模拟
            modalContent.style.width = '80vw';
            modalContent.style.height = '80vh';
            modalContent.style.backgroundColor = placeholder.style.backgroundColor || 'var(--border-color)';
            modal.style.display = 'block';
        });
    });

    // 点击关闭按钮关闭模态框
    closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.style.display = 'none';
    });

    // 点击模态框背景关闭模态框
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 按ESC键关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// 在DOM加载完成后初始化图片预览功能
document.addEventListener('DOMContentLoaded', initImagePreview);