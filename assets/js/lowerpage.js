document.addEventListener('mousemove', (e) => {
    const eye = document.querySelector('.eye');
    const iris = document.querySelector('.iris');
    
    if (eye && iris) {
        // Tính toán tọa độ chuột so với con mắt
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const distance = 10; // Độ xa tối đa con ngươi có thể di chuyển
        
        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;
        
        iris.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

const btn = document.querySelector('#myBtn');
const txt = document.querySelector('#text');

btn.addEventListener('click',() => {
    if(txt.style.display === 'none'){
        text.style.display ='block';
    } else{
        text.style.display ='none';
    }
})