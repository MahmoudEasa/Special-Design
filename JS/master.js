// Global Variables
// Select Sections
let sections = document.querySelectorAll("section");
// Select Navbar Li Links Active
let liLinks = document.querySelectorAll(".landing-page ul li");
// Select Links Menu
let linksMenu = document.querySelector(".header-area .links");
// Select Toggle Menu
let toggleMenu = document.querySelector(".header-area .toggle-menu");
// Select Toggle Menu After
let afterMenue = document.querySelector(".header-area .toggle-menu");
// Select Bullets Active
let bulletsActive = document.querySelectorAll(".bullets ul li");
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

// Remove Hash From URL
history.pushState("", document.title, window.location.pathname + window.location.search);


// Global Functions
// Handel Active links
function handelActive(e) {
    // Remove Class Active From All Li
    e.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    // Add Class Active To Li
    e.target.classList.add("active");
}

// Add Active To Nav bar Links And Bullets
window.addEventListener("scroll", addActiveLinks);
    function addActiveLinks() {
        function addActive(ele) {
            for(let sec of sections) {
            for(let e of ele) {
                let rect = sec.getBoundingClientRect();
                if(rect.top > -100 && rect.top < 250){
                    if(sec.getAttribute("id") === e.getAttribute("data-active")){
                        for(let i of ele) {
                            i.firstChild.classList.remove("active");
                        }
                        e.firstChild.classList.add("active");
                    }
                }
            }
        }
    }
    addActive(liLinks);
    addActive(bulletsActive);
}
addActiveLinks();


// Toggle Menus
function toggelM(ele) {
// Stop Propagation
    ele.addEventListener("click", (e)=> {
        e.stopPropagation();
    });
    document.addEventListener("click", (e)=> {
        if(e.target != ele) {
            ele.classList.remove("open");
            afterMenue.classList.remove("menu-active");
        }
    });
}
    
    

// Start Landing Page
// Toggle Menu Bar
toggleMenu.addEventListener("click", ()=>{
    linksMenu.classList.toggle("open");
    afterMenue.classList.toggle("menu-active");
});
// Click Anywhere Outside Menu And Toggle Button
toggelM(toggleMenu);
toggelM(linksMenu);


// Start Settings Box
    // Toggel Spin Class On Icon
    toggleSet.addEventListener("click", ()=>{
        faGear.classList.toggle("fa-spin");
        setBox.classList.toggle("open");
    });
    toggelM(toggleSet);
    toggelM(setBox);
    // Close The Box When I Press Escape
    document.addEventListener("keyup", (e) =>{
        if (e.key === "Escape")
        {
            setBox.classList.remove("open");
            faGear.classList.remove("fa-spin");
        }
    })
    // Close The Box When I click Anywhere Outside
    document.addEventListener("click", (e) =>{
    if (e.target != setBox && e.target != faGear)
    {
        setBox.classList.remove("open");
        faGear.classList.remove("fa-spin");
    }
    })

    // Switch Colors
    for (let item of colorList) {
        item.addEventListener("click", (e)=>{

            // Handel Active links
            handelActive(e);

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
            if (item.innerHTML == "Yes") {
                backgroundToggle = true;
                toggelBg();
            } else {
                backgroundToggle = false;
                clearInterval(backgroundInterval);
            }

            // Handel Active
            handelActive(e);

            // Add Active To Local Storage
            localStorage.setItem("randomActive", e.target.innerHTML);
            localStorage.setItem("backgroundToggle", backgroundToggle);
            
        });
    }

    // Show Bullets
    for(let item of showBullets) {
        item.addEventListener("click", (e)=>{
            
            // Handel Active
            handelActive(e);

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
        
        // If I Do not keep An Important Thing In Local Storage
        // localStorage.clear();
        
        // Else I Choose The Things I Want To Delete
        localStorage.removeItem("BackgroundIMG");
        localStorage.removeItem("randomActive");
        localStorage.removeItem("backgroundToggle");
        localStorage.removeItem("Show-Bullets");
        localStorage.removeItem("colors");
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
progSpan();
// End My Skills

// Start My Gallery
// Creat Popup With The Image
for(let item of myGallery) {
    item.addEventListener("click", (e)=>{
        // Create Overlay Element
        let overlay = document.createElement("div");
        overlay.addEventListener("click", ()=> {
            overlay.remove();
        });
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
        popupBox.addEventListener("click", (e)=> {
            e.stopPropagation();
        });
    });
}
// End My Gallery

