document.addEventListener("DOMContentLoaded", async () => {
    const soupSection = document.querySelector('#soups .dishes');
    const mainDishSection = document.querySelector('#main_dishes .dishes');
    const drinkSection = document.querySelector('#drinks .dishes');
    const saladSection = document.querySelector('#salad_starter .dishes');
    const desertSection = document.querySelector('#desert .dishes');
    const resetButton = document.getElementById('resetButton');
    const apiUrl = 'http://lab7-api.std-900.ist.mospolytech.ru/api/dishes';


    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const dishes_massive = await response.json();

        const sortedDishes = dishes_massive.sort((a, b) => a.name.localeCompare(b.name));

        sortedDishes.forEach(dish => {

            const dishElement = document.createElement('div');
            dishElement.classList.add('dish');
            dishElement.setAttribute('data-dish', dish.keyword);
            dishElement.setAttribute('data-kind', dish.kind);
            dishElement.innerHTML = `
              <img src="${dish.image}" alt="${dish.name}">
              <p>Цена: ${dish.price}₽</p>
              <p>${dish.name}</p>
              <p>Вес: ${dish.count}</p>
              <button>Добавить</button>
            `;

            if (dish.category === 'soup') {
                soupSection.appendChild(dishElement);
            } else if (dish.category === 'main-course') { // Изменено с 'main_dish' на 'main-course'
                mainDishSection.appendChild(dishElement);
            } else if (dish.category === 'drink') {
                drinkSection.appendChild(dishElement);
            } else if (dish.category === 'salad') { // Изменено с 'salad_starter' на 'salad'
                saladSection.appendChild(dishElement);
            } else if (dish.category === 'dessert') { // Изменено с 'desert' на 'dessert'
                desertSection.appendChild(dishElement);
            }

            dishElement.querySelector('button').addEventListener('click', () => {
                addToOrder(dish);
            });
        });

        resetButton.addEventListener('click', () => {
            order = {
                soup: null,
                "main-course": null, //здесь main_dish
                salad: null, //здесь salad_starter
                drink: null,
                dessert: null //здесь desert
            };
            updateOrderDisplay();
        });

    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const kind = button.getAttribute('data-kind');
            const section = button.closest('section');
            const dishes  = section.querySelectorAll('.dish');

            // Если кнопка уже активна, снимаем класс active и показываем все блюда
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                dishes.forEach(dish => dish.style.display = 'block'); // Показываем все блюда
            } else {
                // Убираем класс active у всех кнопок
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Добавляем класс active к текущей кнопке
                button.classList.add('active');

                // Показать/скрыть блюда в зависимости от фильтра
                dishes.forEach(dish => {
                    if (dish.getAttribute('data-kind') === kind) {
                        dish.style.display = 'block';
                    } else {
                        dish.style.display = 'none';
                    }
                });
            }
        });
    });
});
