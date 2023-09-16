import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';

const savingLocalStorage = throttle(() => {
  // funkcja throttle jest używana do kontrolowania częstotliwości zapisu danych do localStorage
  const formData = {
    // zawiera aktualne wartości pól 'email' i 'message'
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}, 500);

const onLoad = () => {
  const storedFormData = localStorage.getItem(LOCALSTORAGE_KEY);
  if (storedFormData) {
    const parsedFormData = JSON.parse(storedFormData);
    form.elements.email.value = parsedFormData.email;
    form.elements.message.value = parsedFormData.message;
  }
};

onLoad();

form.elements.email.addEventListener('input', () => {
  savingLocalStorage();
});
form.elements.message.addEventListener('input', () => {
  savingLocalStorage();
});

form.addEventListener('submit', event => {
  event.preventDefault(); // zapobiega domyślnej akcji przycisku "Submit", która powoduje przeładowanie strony
  console.log(LOCALSTORAGE_KEY, {
    email: form.elements.email.value,
    message: form.elements.message.value,
  });
  localStorage.removeItem(LOCALSTORAGE_KEY);
  form.reset();
});

// NOTATKI:
// throttle - Kontrola częstotliwości:
// throttle to funkcja biblioteki lodash, która zapewnia kontrolę nad częstotliwością wykonywania innej funkcji. Działa tak, że wykonuje tę funkcję co najwyżej raz w określonym przedziale czasowym (w tym przypadku co 500 milisekund). Jeśli funkcja zostanie wywołana częściej, niż określony limit czasowy, throttle opóźnia jej wykonanie, aby nie przekraczała limitu.

// Pusty nawias () - Anonimowa funkcja:
// W kodzie używamy pustego nawiasu () w funkcji throttle, ponieważ potrzebujemy przekazać funkcję, którą chcemy kontrolować. Funkcja ta nie przyjmuje żadnych argumentów, ponieważ dostęp do pól formularza jest realizowany bezpośrednio wewnątrz funkcji savingLocalStorage
