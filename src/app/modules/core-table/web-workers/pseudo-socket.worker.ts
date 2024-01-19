/// <reference lib="webworker" />
function generateData(size: number): any[] {
  const data = [];
  for (let i = 0; i < size; i++) {
    const id = i;
    const int = Math.floor(Math.random() * 100000);
    const float = Math.random() * (10000 - 1) + 1;
    const color = getRandomColor();
    const child = { id: i, color: getRandomColor() };
    const element = { id, int, float, color, child };
    data.push(element);
  }
  return data;
}

function getRandomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

addEventListener('message', (event) => {
  const data = generateData(event.data);
  postMessage(data);
});
