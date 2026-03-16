document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra nếu class tồn tại trên trang mới khởi tạo để tránh lỗi null
    if (document.querySelector('.mvSwiper')) {
        new Swiper('.mvSwiper', {
            loop: true,
            effect: 'fade', // Hiệu ứng mờ dần sang trọng cho banner chính
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
    if (document.querySelector('.new-slide-swiper')) {
        new Swiper('.new-slide-swiper', {

            loop: true,
            slidesPerView: 'auto',       // Để kích thước tự nhiên, không ép chia ô cứng
            spaceBetween: 20,            // Khoảng cách đều giữa các logo
            grabCursor: false,
            allowTouchMove: false,

            // 1. Chạy liên tục không dừng
            // autoplay: false
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },

            // 2. Tốc độ trôi (càng lớn càng chậm và mượt)
            speed: 8000, 

            // 3. QUAN TRỌNG: Tắt chế độ "hút" slide vào ô (Snap)
            freeMode: {
                enabled: true,
                momentum: false,         // Tắt đà quán tính
            },
            
            // 4. Dự phòng số lượng slide ảo lớn để không bị hẫng khi nối đuôi
            loopedSlides: 15, 
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (typeof Fancybox !== "undefined") {
        Fancybox.bind("[data-fancybox]", {
            // cấu hình của bạn
        });
    } else {
        console.error("Fancybox chưa được tải. Vui lòng kiểm tra lại đường dẫn CDN.");
    }
});

