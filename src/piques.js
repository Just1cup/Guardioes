"use strict";
document.addEventListener("DOMContentLoaded", () => {
    class ImageData {
        constructor(name, root, description) {
            this.name = name;
            this.root = root;
            this.description = description;
        }
    }
    const images = [
        new ImageData("Guardioes", "./Assets/Guardioes.JPG", "Esses são os guardiões do Piques e Niques. Portadores de grandes poderes e responsabilidades."),
        new ImageData("Guigas", "./Assets/Guigas.JPG", "Guigas, founding father of Guardiões"),
        new ImageData("Tintas", "./Assets/Tintas.JPG", "Eu mesmo, o narrador e criador desse site."),
        new ImageData("Bruno", "./Assets/Bruno.JPG", "Bruno comedor de casa")
    ];
    let currentIndex = 0;
    const imageElement = document.querySelector(".guardioesInstancia");
    if (!imageElement) {
        console.error("Image element not found!");
        return;
    }
    const changeImage = () => {
        currentIndex = (currentIndex + 1) % images.length;
        imageElement.src = images[currentIndex].root;
        updateLayerContent(); 
    };
    setInterval(changeImage, 5000); 
    const guardioesInstancia = document.querySelector(".guardioesInstancia");
    const imageName = document.querySelector(".image-name");
    const imageDescription = document.querySelector(".image-description");
    if (!guardioesInstancia || !imageName || !imageDescription) {
        console.error("Element not found!");
        return;
    }
    guardioesInstancia.addEventListener("mouseover", () => {
        const hoveredSrc = guardioesInstancia.src; 
        const hoveredImageData = images.find(image => image.root === hoveredSrc);
        if (hoveredImageData) {
            imageName.textContent = hoveredImageData.name; 
            imageDescription.textContent = hoveredImageData.description; 
        }
    });
    function updateLayerContent() {
        const currentImageData = images[currentIndex];
        if (currentImageData) {
            imageName.textContent = currentImageData.name;
            imageDescription.textContent = currentImageData.description; 
        }
    }
    updateLayerContent();
});


document.addEventListener('wheel', (event) => {
    if (event.ctrlKey) {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && (event.key === '+' || event.key === '-' || event.key === '0')) {
        event.preventDefault();
    }
});

function setZoomLevel() {

    const userAgent = navigator.userAgent.toLowerCase();
    const isChrome = userAgent.includes('chrome');

    if (isChrome) {
    
        document.body.style.zoom = '110%'; 
    } else {
        // Default zoom level for other browsers
        document.body.style.zoom = '100%'; 
    }
}

document.addEventListener('DOMContentLoaded', setZoomLevel);