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
// Select Show Bullets Element
let showBullets = document.querySelectorAll(".show-bullets button");
// Select Reset Options Element
let resetOPt = document.querySelector(".rest button");





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
    // Set backgroundInterval Variable To clearInterval
    let backgroundInterval;
    
    for(let item of randomBg) {
        item.addEventListener("click", (e)=> {
            for(let item of randomBg) {
                item.classList.remove("active");
            }
            if (item.innerHTML === "Yes") {
                toggelBg();
            } else {
                // landPag.style.backgroundImage = `url(imgs/01.jpg)`;
                clearInterval(backgroundInterval);
            }
            e.target.classList.add("active");
        });
    }
// End Settings Box

// Background Landing Page
function toggelBg(){
        backgroundInterval = setInterval(()=>{
            // Get Random Num
            let num = Math.floor(Math.random() * imgArray.length);
            
            // Change Background Image Url
            // landPag.style.backgroundImage = 'url("imgs/'+ imgArray[num] +'")';
            landPag.style.backgroundImage = `url(imgs/0${num + 1}.jpg)`;
        }, 2000);
}
toggelBg();
// End Landing Page


