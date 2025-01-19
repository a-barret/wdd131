const bodyElement = document.getElementById("main-body");

const BYUILogo = document.getElementById("byui-logo");

const themeSelector = document.querySelector("select");// replace with code to select dropdown element out of the HTML (Hint: document.querySelector)
function changeTheme() {
    let themeSelectorText = themeSelector.value; // check to see what the current value of our select is.
    // The current value is conveniently found in themeSelector.value!

    if (themeSelectorText == "dark") { // if the value is dark then:
        bodyElement.classList.add("dark");// add the dark class to the body
        BYUILogo.setAttribute("src", "byui-logo_white.png");// change the source of the logo img to point to the white logo.
    } else {// otherwise
        bodyElement.classList.remove("dark"); // remove the dark class
        BYUILogo.setAttribute("src", "byui-logo_blue.webp");// make sure the logo src is the blue logo.
    }
}

// add an event listener to the themeSelector element here.
// Use the changeTheme function as the event handler function.
themeSelector.addEventListener('change', changeTheme);