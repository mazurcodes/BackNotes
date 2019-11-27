const mdContainer = document.querySelector(".markdown-body");
const mdArea = document.querySelector("#markdown-area");
const btnSave = document.querySelector(".btn-save");

const fetchMD = async () => {
  const mdData = await fetch("/markdown");
  const mdResult = await mdData.text();
  mdContainer.innerHTML = mdResult;
};

const fetchRawMD = async () => {
  const mdRawData = await fetch("/markdown/raw");
  const mdRawResult = await mdRawData.text();
  mdArea.textContent = mdRawResult;
};

const saveMD = async () => {
  console.log("change");
  const postData = await fetch("/markdown", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({mdData: mdArea.value}),
  });
  const res = await postData.text();
  console.log(res);
  location.reload(true);
};

fetchMD();
fetchRawMD();

// btnSave.addEventListener("click", saveMD);
mdArea.addEventListener("change", saveMD);
