let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})
// File JSON dùng để gọi thuộc tính
let products = [
    {
        id: 1,
        name: 'Khô Gà Lá Chanh MIXI',
        image: 'anh1.PNG',
        price: 174000
    },
    {
        id: 2,
        name: 'Bò Khổ Viên MIXI',
        image: 'anh2.PNG',
        price: 138000
    },
    {
        id: 3,
        name: 'Ghẹ Rim Sữa MIXI',
        image: 'anh3.PNG',
        price: 149000
    },
    {
        id: 4,
        name: 'Mực Rim Cay MIXI',
        image: 'anh4.PNG',
        price: 228000
    },
    {
        id: 5,
        name: 'Bò Khô Mật Ong MIXI',
        image: 'anh5.PNG',
        price: 144000
    },
    {
        id: 6,
        name: 'Bò Khô Viên MIXI',
        image: 'anh6.PNG',
        price: 138000
    }
];
let listCards = [];
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Thêm vào Giỏ Hàng</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key) {
    if (listCards[key] == null) {
        // sao chép danh sách sản phẩm vào giỏ hàng
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}