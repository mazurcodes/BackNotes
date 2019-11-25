const mdContainer = document.querySelector('.markdown-body');
const mdArea = document.querySelector("#markdown-area");

const fetchMD = async () => {
  const mdData = await fetch('/markdown');
  const mdResult = await mdData.text();
  mdContainer.innerHTML = mdResult;
}

const fetchRawMD = async () => {
  const mdRawData = await fetch('/markdown/raw');
  const mdRawResult = await mdRawData.text();
  mdArea.textContent = mdRawResult;
}

fetchMD();
fetchRawMD();