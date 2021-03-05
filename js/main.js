function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

async function get_imgs(file) {
    response = await (await fetch(`imgdata/${file}`)).text();
    srcs = response.split(',');
    return srcs;
}

let left_border_width = document.querySelector("#left").clientWidth;
let top_border_width = document.querySelector("#top").clientHeight;
let thezindex = 0;
let allpics = [];

get_imgs('nature.txt').then(srcs => {
    console.log(srcs, srcs.length);
    for (let i = 0; i < 100; i++) {
        let ri = Math.floor(Math.random() * i);
        console.log(ri);
        let np = new Picture(srcs[ri], "");
        allpics.push(np);
    }
})

// Add button click events
document.querySelector('#shufflebutton').addEventListener("click", function(e) {
    shuffle_pics();
});

document.querySelector('#uploadbutton').addEventListener("click", function(e) {
    let src = prompt("Enter the url to a photo you want to add:");
    console.log(`Adding and caching new photo: ${src}`);
    if (src) {
        let newpic = new Picture(src, "");
        allpics.push(newpic);
    }
});

class Picture {
    constructor(src, comment) {
        this.src = src;
        this.comment = comment;
        this.pic = document.createElement("img");
        this.pic.className = 'pic';
        this.pic.src = this.src;
        this.pic.alt = this.comment;
        this.pic.style.visibility = 'hidden';
        this.pic.addEventListener("load", function () {this.style.visibility = 'visible'})
        this.createpicture();
    }

    createpicture() {
        dragElement(this.pic);
        this.pic.style.position = "absolute";
        this.pic.style.minHeight = `${window.innerHeight * .15}px`;
        this.pic.style.minWidth = `${window.innerWidth * .11}px`;
        this.pic.style.maxHeight = `${window.innerHeight * .40}px`;
        this.pic.style.maxWidth = `${window.innerWidth * .40}px`;
        this.picwidth = Math.floor(this.pic.naturalWidth * .40);
        this.picheight = Math.floor(this.pic.naturalHeight * .40);
        this.pic.style.width = `${this.picwidth}px`;
        this.pic.style.height = `${this.picheight}px`;
        this.pic.style.top = `${randomNumber(top_border_width, window.innerHeight - top_border_width - this.picheight)}px`;
        this.pic.style.left = `${randomNumber(left_border_width, window.innerWidth - this.picwidth - left_border_width)}px`;
        console.log(window.innerWidth, this.pic.style.left, this.picwidth);
        this.pic.style.zIndex = thezindex;
        thezindex += 1;
        this.pic.style.rotate = `${randomNumber(-50, 50)}deg`;
        this.pic.style.border = `2px solid rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(0, 255)})`;
        document.body.appendChild(this.pic);
    }

    shuffle() {
        this.pic.style.top = `${randomNumber(top_border_width, window.innerHeight - top_border_width - this.picheight)}px`;
        this.pic.style.left = `${randomNumber(left_border_width, window.innerWidth - left_border_width - this.picwidth)}px`;
        this.pic.style.zIndex = `${randomNumber(0, thezindex)}`;
        this.pic.style.rotate = `${randomNumber(-50, 50)}deg`;
        this.pic.style.border = `2px solid rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(0, 255)})`;
    }
}

// function gen_random_divs(num) {
//     for (let i = 0; i < num; i++) {
//         let div = document.createElement("div");
//         let divwidth = window.innerHeight * 0.15;
//         let divheight = window.innerHeight * 0.15;
//         div.className = 'pic';
//         div.style.position = "absolute";
//         let left_border_width = document.querySelector("#left").clientWidth;
//         let top_border_width = document.querySelector("#top").clientHeight;
//         div.style.top = `${randomNumber(top_border_width, window.innerHeight - top_border_width - divheight)}px`;
//         div.style.left = `${randomNumber(left_border_width, window.innerWidth - left_border_width - divwidth)}px`;
//         div.style.zIndex = `${randomNumber(0, 1000)}`;
//         div.style.rotate = `${randomNumber(0, 360)}deg`;
//         div.style.width = `${divwidth}px`;
//         div.style.height = `${divheight}px`;
//         console.log(window.innerHeight, window.innerWidth);
//         div.style.backgroundColor = `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(0, 255)})`;
//         dragElement(div);
//         document.body.appendChild(div);
//     }
// }

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.zIndex = thezindex;
    thezindex += 1;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function shuffle_pics() {
    allpics.forEach(function (p) {
        p.shuffle();
    })
}
