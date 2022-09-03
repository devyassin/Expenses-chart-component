"use strict";

const bars = document.querySelectorAll(".main-chart-bar");

let data;
async function getQuestions() {
  try {
    const res = await fetch("./data.json");
    data = await res.json();
    eventData(data);
  } catch (err) {
    console.log(err);
  }
}

getQuestions();

function eventData(data) {
  bars.forEach((bar) => {
    const barDay = bar.querySelector(".bar-day").innerHTML;
    const objSelected = data.filter((obj) => {
      if (Object.values(obj)[0] === barDay) {
        return obj;
      }
    });
    const [simpleObjSelected] = [...objSelected];
    let height = ((simpleObjSelected.amount * 12) / 58.6).toFixed(2);

    bar.querySelector(".bar").style.height = `${height}rem`;

    bar.querySelector(".bar").addEventListener("mouseover", () => {
      bar.querySelector(".bar").classList.add("bar--active");
      let html = `
      <div class="bar-amount-box">
                <div class="bar-amount">$${simpleObjSelected.amount}</div>
      </div>`;
      bar.insertAdjacentHTML("afterbegin", html);
    });

    bar.querySelector(".bar").addEventListener("mouseout", () => {
      bar.querySelector(".bar").classList.remove("bar--active");
      bar.querySelector(".bar-amount-box").remove();
    });
  });
}
