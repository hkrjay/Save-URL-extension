let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const tabBtn = document.getElementById("tab-btn");
const LocalLeadsStorage = JSON.parse(localStorage.getItem("myLeads"));
const deleteBtn = document.getElementById("delete-btn");

if (LocalLeadsStorage) {
  myLeads = LocalLeadsStorage;
  renderLeads(myLeads);
}

function renderLeads(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                  <span>${i + 1}:</span>&nbsp;  ${leads[i]}
                </a>
                <button id="remove-btn" data-index="${i}">X</button>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

ulEl.addEventListener("click", function (event) {
  if (event.target.id == "remove-btn") {
    const indexToRemove = parseInt(event.target.getAttribute("data-index"));
    myLeads.splice(indexToRemove, 1);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads)
  }
});

inputBtn.addEventListener("click", function () {
  if (inputEl.value === ' ' || !inputEl.value){
    return ;
  }
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  renderLeads(myLeads);
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  renderLeads(myLeads);
});
