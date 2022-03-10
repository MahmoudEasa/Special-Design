// Global Variables
// Select Landing Page Element
let landPag = document.querySelector(".landing-page");
// Get Array Of Images
let imgArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
// Select Settings Box Element
let setBox = document.querySelector(".settings-box");
// Select Toggle Settings Element
let toggleSet = document.querySelector(".settings-box .toggle-settings");
// Select fa-gear Element
let faGear = document.querySelector(".settings-box .toggle-settings .fa-gear");
// Select Lis Color List Element
let colorList = document.querySelectorAll(".colors-list li");
// Select Random Backgrounds Button Element
let randomBg = document.querySelectorAll(".random-bg button");
    // Set backgroundInterval Variable To clearInterval
    let backgroundToggle = true;
    let backgroundInterval;
// Select Show Bullets Element
let showBullets = document.querySelectorAll(".show-bullets button");
// Select Reset Options Element
let resetOPt = document.querySelector(".rest button");
// Select Bullets
let bulletsUl = document.querySelector(".bullets ul");
// Select Skills
let skills = document.querySelectorAll(".skills");
// Select Skills Span Progress
let progressSpan = document.querySelectorAll(".skills .skill-box .skill-progress span");
// Select My Gallery Images
let myGallery = document.querySelectorAll(".gallery .images-box img");




// Save Data To Local Storage
// Check If There's Local Storage Color Option
if (localStorage.getItem("colors")){
    document.documentElement.style.setProperty('--main-color', localStorage.getItem("colors"));
    
    // Remove Active Class From All Colors List Item
    for(let item of colorList) {
        item.classList.remove("active");
        
        // Add Active Class On Element With Data-Color == Local Storage Item
        if (item.getAttribute("data-color") == localStorage.getItem("colors")) {
            item.classList.add("active");
        }
    }
}
// Add Random Backgrounds Active To Local Storage
if (localStorage.getItem("randomActive")) {
    for(let item of randomBg) {
        item.classList.remove("active");
        if(item.innerHTML === localStorage.getItem("randomActive")){
            item.classList.add("active");
        }
    }
}
if(localStorage.getItem("backgroundToggle")){
    if (localStorage.getItem("backgroundToggle") == "true") {
        backgroundToggle = true;
    } else {
        if(localStorage.getItem("BackgroundIMG")) {
            landPag.style.backgroundImage = localStorage.getItem("BackgroundIMG");
        }
        backgroundToggle = false;
    }
}
// Add Show Bullets Class To Local Storage
let showLocal = localStorage.getItem("Show-Bullets");
if(showLocal) {
    for(let item of showBullets) {
        if(item.innerHTML === showLocal) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
        if(showLocal == "Yes") {
            bulletsUl.style.display = "flex";
        } else {
            bulletsUl.style.display = "none";
        }
    }
}



// Start Landing Page
// Start Settings Box
    // Toggel Spin Class On Icon
    toggleSet.addEventListener("click", ()=>{
        faGear.classList.toggle("fa-spin");
        setBox.classList.toggle("open");
    });
    
    // Close The Box When I Press Escape
    document.addEventListener("keyup", (e) =>{
    // console.log(e);
    if (e.key === "Escape")
    {
        setBox.classList.remove("open");
        faGear.classList.remove("fa-spin");
    }
    })
    
    // Switch Colors
    for (let item of colorList) {
        item.addEventListener("click", ()=>{
            // Remove Class Active From All Li
            for (let item of colorList){
                item.classList.remove("active");
            }
            // Add Class Active To Li
            item.classList.add("active");
            // Get All Data Colors
            let rootColor = item.getAttribute("data-color");
            // Set All Colors To All The Web
            document.documentElement.style.setProperty('--main-color', rootColor);
            // Set Colors In Local Storage
            localStorage.setItem("colors", rootColor);
        });
    }

    // Random Backgrounds
    for(let item of randomBg) {
        item.addEventListener("click", (e)=> {
            for(let item of randomBg) {
                item.classList.remove("active");
            }
            if (item.innerHTML == "Yes") {
                backgroundToggle = true;
                toggelBg();
            } else {
                backgroundToggle = false;
                // landPag.style.backgroundImage = `url(imgs/01.jpg)`;
                clearInterval(backgroundInterval);
            }
            e.target.classList.add("active");
            // Add Active To Local Storage
            localStorage.setItem("randomActive", e.target.innerHTML);
            localStorage.setItem("backgroundToggle", backgroundToggle);
            
        });
    }

    // Show Bullets
    for(let item of showBullets) {
        item.addEventListener("click", ()=>{
            for(let item of showBullets) {
                item.classList.remove("active");
            }
            item.classList.add("active");
            if(item.innerHTML == "Yes"){
                bulletsUl.style.display = "flex";
            } else {
                bulletsUl.style.display = "none";
            }
            localStorage.setItem("Show-Bullets", item.innerHTML);
        });
    }

    // Reset Options
    resetOPt.addEventListener("click", ()=>{
        localStorage.clear();
        // backgroundToggle = true;
        // toggelBg();
        window.location.reload();
    });
// End Settings Box

// Background Landing Page
function toggelBg(){
    if (backgroundToggle === true) {
        backgroundInterval = setInterval(()=>{
            let num = Math.floor(Math.random() * imgArray.length);
            
            // Change Background Image Url
            // landPag.style.backgroundImage = 'url("imgs/'+ imgArray[num] +'")';
            let bgImg = landPag.style.backgroundImage = `url(imgs/0${num + 1}.jpg)`;
            localStorage.setItem("BackgroundIMG", bgImg);
        }, 2000);
    }
}
toggelBg();
// End Landing Page

// Start About Me

// End About Me

// Start My Skills
window.addEventListener("scroll", progSpan);
function progSpan() {
    for(let item of progressSpan) {
        const rect = item.getBoundingClientRect()
        if (rect.top > -100 && rect.top < 800) {
            item.style.width = item.getAttribute("data-progress");
        } else {
            item.style.width = "0";
        }
    }
}
// End My Skills

// Start My Gallery
// Creat Popup With The Image
for(let item of myGallery) {
    item.addEventListener("click", (e)=>{
        // Create Overlay Element
        let overlay = document.createElement("div");
        // Add Class To Overlay
        overlay.className = "popup-overlay";
        // Append Overlay To The Body
        document.body.appendChild(overlay);
        // Create The Popup Box
        let popupBox = document.createElement("div");
        // Add Class To The Popup Box
        popupBox.className = "popup-box";
        // Appen Popup Box To Overlay
        overlay.appendChild(popupBox);
        // Create The Image
        let popupImage = document.createElement("img");
        // Set Image Source
        popupImage.src = item.src;
        // Appen Popup Image To Popup Box
        popupBox.appendChild(popupImage);
        // Add Title To Image
        if(item.alt !== null) {
            // Create h2 Element
            let h2Ele = document.createElement("h2");
            h2Ele.innerHTML = item.getAttribute("alt");
            popupBox.prepend(h2Ele);
            console.log(item.getAttribute("alt"))
        }
        // Add Button To Close The Popup
        let buttonClose = document.createElement("div");
        buttonClose.innerHTML = "X";
        buttonClose.className = "close-popup";
        popupBox.prepend(buttonClose);
        buttonClose.addEventListener("click", ()=>{
            overlay.remove();
        });
        document.addEventListener("keyup", (e)=>{
            if(e.key === "Escape") {
                overlay.remove();
            }
        });

    });
}

// End My Gallery

