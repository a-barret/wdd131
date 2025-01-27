// This is a new paragraph.
const newParagraph = document.createElement("p");
newParagraph.innerText = "Added with Javascript!";
document.body.appendChild(newParagraph);

// This is a new image.
const newImage = document.createElement("img");
newImage.setAttribute("src","https://picsum.photos/200");
newImage.setAttribute("Alt","Random image from picsum.");
document.body.appendChild(newImage);

// New doc string
const newDiv = document.createElement("div");
newDiv.innerHTML = "<ul><li>One</li><li>Two</li><li>Three</li></ul>";
document.body.appendChild(newDiv);

// New Section
const newSection = document.createElement("section");
newSection.innerHTML = "<h2>DOM Basics</h2><p>This was added through Javascript</p>";
document.body.appendChild(newSection);