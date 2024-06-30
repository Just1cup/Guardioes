document.addEventListener("DOMContentLoaded", () => {
    class ImageData {
        name: string;
        root: string;
        description: string;

        constructor(name: string, root: string, description: string) {
            this.name = name;
            this.root = root;
            this.description = description;
        }
    }

    const images: ImageData[] = [
        new ImageData(
            "Guardioes",
            "./Assets/Guardioes.JPG",
            "Esses são os guardiões do Piques e Niques. Portadores de grandes poderes e responsabilidades."
        ),
        new ImageData(
            "Guigas",
            "./Assets/Guigas.JPG",
            "Guigas, founding father of Guardiões"
        ),
        new ImageData(
            "Tintas",
            "./Assets/Tintas.JPG",
            "Eu mesmo, o narrador e criador desse site."
        ),
        new ImageData(
            "Bruno",
            "./Assets/Bruno.JPG",
            "Bruno comedor de casa"
        )
    ];

    let currentIndex: number = 0;
    const imageElement: HTMLImageElement | null = document.querySelector(".guardioesInstancia");

    if (!imageElement) {
        console.error("Image element not found!");
        return;
    }

    const changeImage = (): void => {
        currentIndex = (currentIndex + 1) % images.length;
        imageElement!.src = images[currentIndex].root; // Use non-null assertion operator since TypeScript doesn't know the result of the querySelector
        updateLayerContent(); // Call function to update layer content
    };

    setInterval(changeImage, 5000); // Change image every 5 seconds

    const guardioesInstancia: HTMLImageElement | null = document.querySelector(".guardioesInstancia");
    const imageName: HTMLHeadingElement | null = document.querySelector(".image-name");
    const imageDescription: HTMLParagraphElement | null = document.querySelector(".image-description");

    if (!guardioesInstancia ||!imageName ||!imageDescription) {
        console.error("Element not found!");
        return;
    }

    guardioesInstancia!.addEventListener("mouseover", () => { 
        const hoveredSrc: string = guardioesInstancia!.src;
        const hoveredImageData: ImageData | undefined = images.find(image => image.root === hoveredSrc);

        if (hoveredImageData) {
            imageName!.textContent = hoveredImageData.name; // Use non-null assertion operator
            imageDescription!.textContent = hoveredImageData.description; 
        }
    });

    function updateLayerContent(): void {
        const currentImageData: ImageData | undefined = images[currentIndex];
        if (currentImageData) {
            imageName!.textContent = currentImageData.name; 
            imageDescription!.textContent = currentImageData.description; 
        }
    }

    updateLayerContent();
});

document.addEventListener('wheel', (event: WheelEvent) => {
    if (event.ctrlKey) {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.ctrlKey && (event.key === '+' || event.key === '-' || event.key === '0')) {
        event.preventDefault();
    }
});

// Function to dynamically set the viewport meta tag
function setViewportMeta() {
    let viewportContent: string;

    // Detect the browser
    const userAgent = navigator.userAgent.toLowerCase();
    const isEdge = userAgent.includes('edg'); // Detects Microsoft Edge
    const isChrome = userAgent.includes('chrome') && !isEdge; // Detects Google Chrome but excludes Edge

    if (isEdge) {
        // Set for Edge
        viewportContent = 'width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0';
    } else if (isChrome) {
        // Set for Chrome
        viewportContent = 'width=device-width, initial-scale=1.1, user-scalable=no, maximum-scale=1.1, minimum-scale=1.1';
    } else {
        // Default setting for other browsers
        viewportContent = 'width=device-width, initial-scale=1.0, user-scalable=no';
    }

    // Create or update the viewport meta tag
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
        viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        document.head.appendChild(viewportMeta);
    }
    viewportMeta.setAttribute('content', viewportContent);
}

// Set the viewport meta tag on page load
document.addEventListener('DOMContentLoaded', setViewportMeta);
