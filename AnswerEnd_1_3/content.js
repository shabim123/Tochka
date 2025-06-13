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

// Обработчик события фокуса окна
window.addEventListener('focus', () => {
  console.log("Окно стало активным");
  selectImage(); // Вызываем selectImage, когда окно становится активным
});

// Обработчик события потери фокуса окна
window.addEventListener('blur', () => {
  console.log("Окно стало неактивным");
});
