let point = null;

function selectImage() {
  console.log("Функция selectImage вызвана");
  const images = document.querySelectorAll('img[src*="image001.png"]');
  let minNumber = Infinity;
  let selectedImage = null;

  // Пропускаем первое изображение в списке
  for (let i = 1; i < images.length; i++) {
    const img = images[i];
    const src = img.src;
    const match = src.match(/(\d{3})\/image001\.png$/);
    if (match) {
      const number = parseInt(match[1], 10);
      if (number < minNumber) {
        minNumber = number;
        selectedImage = img;
      }
    }
  }

  if (selectedImage) {
    // Создаем точку, если она еще не создана
    if (!point) {
      point = document.createElement('span');
      point.textContent = ' •'; // Точка
      point.style.fontSize = '8px'; // Уменьшаем размер точки
      point.style.display = 'none'; // Скрываем точку изначально
      selectedImage.parentNode.insertBefore(point, selectedImage.nextSibling);
      console.log("Выбрано изображение:", selectedImage.src);
    }
  } else {
    console.log("Изображение не найдено");
  }
}

function togglePoint() {
  if (point) {
    // Переключаем видимость точки
    point.style.display = point.style.display === 'none' ? 'inline' : 'none';
  } else {
    // Если точка не существует, выбираем изображение
    selectImage();
    // После выбора изображения, проверяем, была ли создана точка
    if (point) {
      point.style.display = 'inline'; // Показываем точку, если она была создана
    }
  }
}

// Обработчик события нажатия клавиши
document.addEventListener('keydown', (event) => {
  if (event.key === '`') { // Обратная кавычка
    togglePoint();
  }
});

// Функция для повторного выбора изображения
function reselectImage() {
  console.log("Повторный выбор изображения");
  selectImage();
}

// Создаем MutationObserver для отслеживания изменений в DOM
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' || mutation.type === 'subtree') {
      console.log("Изменения в DOM обнаружены");
      reselectImage(); // Вызываем selectImage при изменении DOM
    }
  });
});

// Настраиваем наблюдатель на изменения в body
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Обработчик события фокуса окна
window.addEventListener('focus', () => {
  console.log("Окно стало активным");
  reselectImage(); // Вызываем selectImage, когда окно становится активным
});

// Обработчик события потери фокуса окна
window.addEventListener('blur', () => {
  console.log("Окно стало неактивным");
});

// Обработчик события ввода текста
document.addEventListener('input', () => {
  console.log("Ввод текста обнаружен");
  reselectImage(); // Вызываем selectImage при вводе текста
});

// Обработчик события изменения фокуса на элементах ввода
document.addEventListener('focusin', (event) => {
  if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
    console.log("Фокус на элементе ввода");
    reselectImage(); // Вызываем selectImage, когда фокус на элементе ввода
  }
});

// Обработчик события нажатия на кнопку "Следующая страница"
document.addEventListener('click', (event) => {
  if (event.target.matches('input[name="next"]')) {
    console.log("Кнопка 'Следующая страница' нажата");
    setTimeout(() => {
      reselectImage(); // Вызываем selectImage после перехода на новую страницу
    }, 1000); // Задержка, чтобы дать время для загрузки новой страницы
  }
});
