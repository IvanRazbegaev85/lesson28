const carOptions = document.getElementById('cars')
const spans = document.querySelectorAll('span')
const url = './cars.json';

const getCars = async (url) => {
  const sendForData = await fetch(url);
  return (await sendForData).json();
}

const createOption = (optionSource) => {
  for (let i = 0; i < optionSource.length; i++){
    let option = new Option(optionSource[i].brand, `${optionSource[i].brand}`);
    carOptions.append(option);
  }
}

const carDescription = async () => {
  const carList = await getCars(url);
  createOption(carList.cars);
  carOptions.addEventListener('change', (ev) => {
    if (ev.target[ev.target.selectedIndex].value === 'Выберите машину!'){
      spans[0].textContent = ev.target[ev.target.selectedIndex].value;
      spans[1].textContent = '';
    }
    carList.cars.forEach(car => {
      if(car.brand === ev.target[ev.target.selectedIndex].value){
        spans[0].textContent = `Машина: ${ev.target[ev.target.selectedIndex].value} ${car.model}`;
        spans[1].textContent = `Цена: ${car.price} руб.`;
      }
    })
  })

}

carDescription();



