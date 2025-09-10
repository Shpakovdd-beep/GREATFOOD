document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    const close = document.getElementById('close');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartSumEl = document.getElementById('cart-sum');
    const toggleCartBtn = document.getElementById('toggle-cart');
    const cartEl = document.getElementById('cart'); 

    const cart = [];
    let sum = 0;

    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', event => {
            const card = event.target.closest('.card');
            if (!card) return;

            const title = card.querySelector('h3').innerText;
            const price = parseFloat(card.dataset.price || 0);

            const item = { name: title, price: price };
            cart.push(item);
            sum += price;

            const li = document.createElement('li');
            li.textContent = `${title} — ${price.toFixed(0)} ₽`;

            const removeBtn = document.createElement('span');
            removeBtn.textContent = ' ✖';
            removeBtn.style.cursor = 'pointer';
            removeBtn.style.marginLeft = '10px';

            removeBtn.addEventListener('click', () => {
                cartItems.removeChild(li);
                const index = cart.indexOf(item);
                if (index > -1) cart.splice(index, 1);
                sum -= price;
                cartCount.textContent = `Всего заказов: ${cart.length}`;
                cartSumEl.textContent = `Сумма: ${sum.toFixed(0)} ₽`;
            });

            li.appendChild(removeBtn);
            cartItems.appendChild(li);

            cartCount.textContent = `Всего заказов: ${cart.length}`;
            cartSumEl.textContent = `Сумма: ${sum.toFixed(0)} ₽`;

            modalText.textContent = `Заказ на «${title}» принят!`;
            modal.style.display = 'flex';
        });
    });

    close.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
    });

    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    cards.forEach(card => observer.observe(card));

    
    toggleCartBtn.addEventListener('click', () => {
        if (cartEl.style.display === 'block') {
            cartEl.style.display = 'none';
        } else {
            cartEl.style.display = 'block';
        }
    });
});

const chatInput = document.querySelector('.chat-input');
const chatSend = document.querySelector('.chat-send');
const chatMessages = document.querySelector('.chat-messages');

chatSend.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (!text) return;

    const userMessage = document.createElement('div');
    userMessage.classList.add('message');
    userMessage.textContent = text;
    chatMessages.appendChild(userMessage);

    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot');
        botMessage.textContent = 'Спасибо за сообщение! Мы скоро ответим.';
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
});
