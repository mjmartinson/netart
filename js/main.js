function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function gen_random_divs(num) {
    for (let i = 0; i < num; i++) {
        let div = document.createElement("div");
        div.className = 'pic';
        div.style.position = "absolute";
        let left_border_width = document.querySelector("#left").clientWidth;
        let top_border_width = document.querySelector("#top").clientHeight;
        div.style.top = `${randomNumber(top_border_width, window.innerHeight - top_border_width - 105)}px`;
        div.style.left = `${randomNumber(left_border_width, window.innerWidth - left_border_width - 105)}px`;
        div.style.zIndex = `${randomNumber(0, 1000)}`;
        div.style.rotate = `${randomNumber(0, 360)}deg`;
        div.style.width = `${window.innerHeight * 0.11}px`;
        div.style.height = `${window.innerHeight * 0.11}px`;
        div.style.backgroundColor = `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(0, 255)})`;
        document.body.appendChild(div);
    }
}

function shuffle_pics(num) {
    let divs = document.querySelectorAll(".pic");
    console.log(divs);
    divs.forEach( function(div) {
        let left_border_width = document.querySelector("#left").clientWidth;
        let top_border_width = document.querySelector("#top").clientHeight;
        div.style.top = `${randomNumber(top_border_width, window.innerHeight - top_border_width - 105)}px`;
        div.style.left = `${randomNumber(left_border_width, window.innerWidth - left_border_width - 105)}px`;
        div.style.zIndex = `${randomNumber(0, 1000)}`;
        div.style.rotate = `${randomNumber(0, 360)}deg`;
        div.style.backgroundColor = `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(0, 255)})`;
    })
}

document.querySelector('.button').addEventListener("click", function(e) {
    console.log(e);
    shuffle_pics(100);
});

document.body.addEventListener('load', gen_random_divs(100));