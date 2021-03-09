function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
async function get_imgs(file) {
    response = await (await fetch(`imgdata/${file}`)).text();
    srcs = response.split(',');
    return srcs;
}

class Picture {
    constructor(src, comment) {
        this.src = src;
        this.comment = comment;
        this.pic = document.createElement("img");
        this.pic.className = 'pic';
        this.pic.src = this.src;
        this.pic.alt = this.comment;
        this.pic.style.visibility = 'hidden';
        this.pic.addEventListener("load", function (e) {e.target.style.visibility = 'visible'})
        this.pic.onmouseover = function(e) {e.target.style.cursor = "grab"};
        this.createpicture();
    }

    createpicture() {
        dragElement(this.pic);
        this.pic.style.position = "absolute";
        this.pic.style.minHeight = `${window.innerHeight * .15}px`;
        this.pic.style.minWidth = `${window.innerWidth * .11}px`;
        this.pic.style.maxHeight = `${window.innerHeight * .30}px`;
        this.pic.style.maxWidth = `${window.innerWidth * .30}px`;
        this.picwidth = Math.floor(this.pic.naturalWidth * .5);
        this.picheight = Math.floor(this.pic.naturalHeight * .5);
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

let left_border_width = document.querySelector("#left").clientWidth;
let top_border_width = document.querySelector("#top").clientHeight;
let thezindex = 0;
let allpics = [];

get_imgs('nature.txt').then(srcs => {
    for (let i = 0; i < srcs.length; i++) {
        let np = new Picture(srcs[i], "");
        allpics.push(np);
    }
})

// Add button click events
document.querySelector('#shufflebutton').addEventListener("click", function(e) {
    shuffle_pics();
});

document.querySelector('#removebutton').addEventListener("click", function(e) {
    e.target.innerHTML = "Normal Mode";
    removeMode();
});

document.querySelector('#uploadbutton').addEventListener("click", function(e) {
    let src = prompt("Enter the url to a photo you want to add:");
    if (src) {
        let newpic = new Picture(src, "");
        allpics.push(newpic);
    }
});

const fu = new FileUploader({
  maxSize: 1000,
  types: ['image/jpeg', 'image/png'],
  click: '#filebutton',
  drop: 'body',
  ready: (file) => {
    console.log(`the data for the ${file.type} file called ${file.name} is ready`)
    console.log(file)
    let newpic = new Picture(file.data, "");
    allpics.push(newpic);
  },
  error: (err) => {
    console.error(err)
  }
})

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.zIndex = thezindex;
    elmnt.style.cursor = "grabbing";
    thezindex += 1;
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
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    elmnt.style.cursor = null;
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function removeMode() {
  document.body.onmousedown = function(e) {
    document.body.removeChild(e.target);
  }
  document.querySelector('#removebutton').addEventListener("click", function (e) {
    e.target.innerHTML = "Remove Mode";
    document.body.onmousedown = null;
    document.querySelector('#removebutton').addEventListener("click", function (e) {
      e.target.innerHTML = "Normal Mode";
      removeMode();
    })
  });
}

function shuffle_pics() {
    allpics.forEach(function (p) {
        p.shuffle();
    })
}
