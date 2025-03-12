// 相册页面的懒加载功能
const masonryContainer = document.querySelector('.masonry');
const loadingElement = document.querySelector('.loading');
let isLoading = false;

// 检查元素是否在视口中
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 懒加载图片
function lazyLoadImages() {
    const placeholders = document.querySelectorAll('.image-placeholder');
    placeholders.forEach(placeholder => {
        if (isInViewport(placeholder) && !placeholder.dataset.loaded) {
            // 这里可以添加实际的图片加载逻辑
            // 目前使用占位符，所以只标记为已加载
            placeholder.dataset.loaded = 'true';
        }
    });
}

// 模拟加载更多图片
function loadMoreImages() {
    if (isLoading) return;
    isLoading = true;
    loadingElement.style.display = 'flex';

    // 模拟网络请求延迟
    setTimeout(() => {
        // 创建新的图片项
        for (let i = 0; i < 6; i++) {
            const height = Math.floor(Math.random() * (200 - 150 + 1) + 150);
            const item = document.createElement('div');
            item.className = 'masonry-item';
            item.innerHTML = `
                <div class="image-placeholder" style="height: ${height}px;"></div>
                <div class="image-caption">可爱的猫咪照片 ${Math.floor(Math.random() * 100)}</div>
            `;
            masonryContainer.appendChild(item);

            // 添加渐入动画
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 10);
        }

        isLoading = false;
        loadingElement.style.display = 'none';
        lazyLoadImages();
    }, 1000);
}

// 检查滚动位置并加载更多图片
function checkScroll() {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000) {
        loadMoreImages();
    }
    lazyLoadImages();
}

// 初始化事件监听
window.addEventListener('scroll', checkScroll);
window.addEventListener('resize', lazyLoadImages);
window.addEventListener('load', lazyLoadImages);

// 为所有masonry-item添加过渡效果
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.masonry-item');
    items.forEach(item => {
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
});