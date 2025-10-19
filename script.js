document.addEventListener('DOMContentLoaded', () => {
    // --- Lấy tất cả các phần tử ---
    const animationBackground = document.getElementById('animation-background');
    const animationScene = document.getElementById('animation-scene');
    const catRunner = document.getElementById('cat-runner');
    const welcomeScreen = document.getElementById('welcome-screen');
    const startButton = document.getElementById('start-button');
    const mainCard = document.getElementById('main-card');
    const cardCover = document.querySelector('.card-cover');
    const cardContent = document.querySelector('.card-content');
    const openCardButton = document.getElementById('open-card-button');
    const effectsWrapper = document.querySelector('.falling-effects-wrapper');
    const backgroundMusic = document.getElementById('background-music');
    const typedMessageElement = document.getElementById('typed-message');
    const flowersContainer = document.querySelector('.falling-effects-wrapper .flowers-container');
    const heartsContainer = document.querySelector('.falling-effects-wrapper .hearts-container');

    // --- SCENE 1: BẮT ĐẦU HOẠT CẢNH VỚI NỀN RIÊNG ---
    setTimeout(() => {
        // Hiện nền tạm thời (background2.png)
        animationBackground.classList.remove('hidden');
        // Cho mèo chạy
        catRunner.classList.add('running');
    }, 500); // Trễ một chút để trang tải

    // Lắng nghe khi mèo chạy xong để chuyển sang SCENE 2
    catRunner.addEventListener('animationend', () => {
        // Ẩn sân khấu hoạt cảnh
        animationScene.classList.add('hidden');
        // Ẩn nền tạm thời để quay về nền chính
        animationBackground.classList.add('hidden');
        
        // Hiện màn hình chào mừng trên nền chính
        welcomeScreen.classList.remove('hidden');
    });

    // --- SCENE 2: NGƯỜI DÙNG TƯƠNG TÁC VỚI WELCOME SCREEN ---
    startButton.addEventListener('click', () => {
        // Bắt đầu phát nhạc (đây là lần tương tác đầu tiên)
        backgroundMusic.volume = 0.5;
        backgroundMusic.currentTime = 45; // bắt đầu phát từ giây thứ 12
        backgroundMusic.play();


        // Ẩn màn hình chào mừng
        welcomeScreen.classList.add('hidden');
        
        // Hiện tấm thiệp chính (SCENE 3)
        mainCard.classList.remove('hidden');
        mainCard.classList.add('visible');
    }, { once: true });

    // --- SCENE 3: NGƯỜI DÙNG MỞ THIỆP ---
    openCardButton.addEventListener('click', () => {
        // Ẩn lớp bìa và hiện lớp nội dung
        cardCover.classList.add('hidden');
        cardContent.classList.remove('hidden');

        // Bắt đầu các hiệu ứng cuối cùng
        effectsWrapper.classList.remove('hidden');
        typeMessage();
        createFallingEffect(flowersContainer, 'assets/flower-Photoroom.png', 'flower', 300);
        createFallingEffect(heartsContainer, 'assets/heart-Photoroom.png', 'heart', 600);
    }, { once: true });


    // --- CÁC HÀM TIỆN ÍCH (giữ nguyên) ---
    const messages = [
        "Nhân ngày Phụ nữ Việt Nam 20/10, xin gửi những lời chúc tốt đẹp nhất đến cô em PK67. Chúc em luôn xinh đẹp, hạnh phúc và thành công trong cuộc sống!",
        "Chúc mừng 20/10! Mong em luôn được yêu thương, trân trọng và nhận được thật nhiều quà.",
        "Hãy luôn rạng rỡ như những đóa hoa tươi thắm nhất. Happy Women's Day!"
    ];
    let currentMessageIndex = 0, charIndex = 0;
    const typingSpeed = 70, delayBetweenMessages = 3000;
    
    function typeMessage() {
        if (charIndex < messages[currentMessageIndex].length) {
            typedMessageElement.textContent += messages[currentMessageIndex].charAt(charIndex++);
            setTimeout(typeMessage, typingSpeed);
        } else {
            setTimeout(() => {
                typedMessageElement.textContent = '';
                charIndex = 0;
                currentMessageIndex = (currentMessageIndex + 1) % messages.length;
                typeMessage();
            }, delayBetweenMessages);
        }
    }
    
    function createFallingEffect(container, imageUrl, className, intervalTime) {
        setInterval(() => {
            const item = document.createElement('div');
            item.classList.add(className);
            const img = document.createElement('img');
            img.src = imageUrl;
            item.appendChild(img);
            item.style.left = Math.random() * 100 + 'vw';
            item.style.animationDuration = (5 + Math.random() * 5) + 's';
            item.style.transform = `scale(${0.5 + Math.random() * 0.5})`;
            item.style.opacity = Math.random() * 0.8 + 0.2;
            container.appendChild(item);
            item.addEventListener('animationend', () => item.remove());
        }, intervalTime);
    }

    mainCard.addEventListener('mousemove', (e) => {
        const rect = mainCard.getBoundingClientRect();
        const xAxis = (rect.width / 2 - (e.clientX - rect.left)) / 20;
        const yAxis = (rect.height / 2 - (e.clientY - rect.top)) / 20;
        // Áp dụng hiệu ứng nghiêng
        mainCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    mainCard.addEventListener('mouseleave', () => {
        // Trả về trạng thái bình thường khi chuột rời khỏi
        mainCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
});