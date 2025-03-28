document.addEventListener("mousemove", (e) => {
    let trail = document.createElement("div");
    trail.classList.add("trail");
    document.body.appendChild(trail);

    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;

    setTimeout(() => {
        trail.remove();
    }, 500);
});


const textElement = document.querySelector(".typing-text");
const textArray = ["Explore hidden gems...", "Find travel tips...", "Enjoy breathtaking views..."];
let textIndex = 0;

function changeText() {
    textElement.innerHTML = textArray[textIndex];
    textIndex = (textIndex + 1) % textArray.length;
}

// Add this to your script.js
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    }
    
    if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

setInterval(changeText, 2000);
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
})

document.addEventListener('click', () => {
    cursor.classList.add("expand");

    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500)
})

document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loading-screen");

    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent instant navigation
            loader.style.visibility = "visible";
            loader.style.opacity = "1";

            const url = this.href; // Store the clicked URL
            setTimeout(() => {
                window.location.href = url; // Navigate after delay
            }, 1000); // Adjust time as needed
        });
    });
});