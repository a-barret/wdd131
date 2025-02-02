const menuButton = document.querySelector("#menu-button");
const gallerySection = document.querySelector(".gallery");

function toggleMenu() {
    const navMenu = document.querySelector(".menu");
    navMenu.classList.toggle("hide");
}

function handleResize() {
    const navMenu = document.querySelector(".menu");
    if (window.innerWidth > 1000) {
        navMenu.classList.remove("hide");
    } else {
        navMenu.classList.add("hide");
    }
}

function viewerTemplate(imagePath, altText) {
    return `
    <div class="viewer">
        <button class="close-viewer">X</button>
        <img src="${imagePath}" alt="${altText}">
    </div>`
}

function viewHandler(event) {
    // create a variable to hold the element that was clicked on from event.target
    let parentImg = event.target;
    console.log(`selected element: ${parentImg}`);
	// get the src attribute from that element and 'split' it on the "-"
    let imgSrc = parentImg.src;
    console.log(imgSrc);
    let imgNameParts = imgSrc.split("-s");
    console.log(imgNameParts);
	// construct the new image file name by adding "-full.jpeg" to the first part of the array from the previous step
    let newImgSrc = imgNameParts[0] + "-full.jpeg";
    console.log(newImgSrc);
	// insert the viewerTemplate into the top of the body element
	// (element.insertAdjacentHTML("afterbegin", htmltoinsert))
    document.body.insertAdjacentHTML("afterbegin", viewerTemplate(newImgSrc, "picture"));
	// add a listener to the close button (X) that calls a function called closeViewer when clicked
    document.querySelector(".close-viewer").addEventListener("click", closeViewer)
}

function closeViewer() {
    document.querySelector(".viewer").remove();
}

gallerySection.addEventListener("click", viewHandler)
menuButton.addEventListener("click", toggleMenu);
window.addEventListener("load", handleResize);
