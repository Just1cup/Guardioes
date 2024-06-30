interface ThemeSettings {
    bodyColor: string;
    textColor: string;
    borderColor: string;
    buttonBackgroundColor: string;
    sunImagePath: string;
    moonImagePath: string;
    buttonText: string;
}

function applyThemeStyles(settings: ThemeSettings, selectors: string[]): void {
    selectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        Array.from(elements).forEach((element) => {
            const htmlElement = element as HTMLElement;
            htmlElement.style.color = settings.textColor;
            if (selector === '.guardioesImg') {
                htmlElement.style.border = `2px solid ${settings.borderColor}`;
            }
        });
    });
}

async function applyLightMode(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async operation
    document.body.classList.remove('dark-mode');
    (document.querySelector('.mainSection') as HTMLElement).classList.remove('dark-mode');
    document.body.style.backgroundColor = '#F5F5F5';

    const themeSettings: ThemeSettings = {
        bodyColor: '#3370DE',  
        textColor: '#3370DE',
        borderColor: '#3370DE',
        buttonBackgroundColor: '#3370DE',
        sunImagePath: './Assets/Sun.png',
        moonImagePath: '',
        buttonText: 'DAYMODE',
    };

    applyThemeStyles(themeSettings, ['.headerText', '.subTitle', '.guardioesImg', '#themeToggleBtn']);
    updateThemeButton(themeSettings);
}


async function applyNightMode(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async operation
    document.body.classList.add('dark-mode');
    (document.querySelector('.mainSection') as HTMLElement).classList.add('dark-mode');

    const themeSettings: ThemeSettings = {
        bodyColor: '#28D07E',
        textColor: '#28D07E',
        borderColor: '#28D07E',
        buttonBackgroundColor: '#28D07E',
        sunImagePath: '',
        moonImagePath: './Assets/Moon.png',
        buttonText: 'NIGHTMODE'
    };

    applyThemeStyles(themeSettings, ['.headerText', '.subTitle', '.guardioesImg', '#themeToggleBtn']);

    updateThemeButton(themeSettings);
}

function updateThemeButton(themeSettings: ThemeSettings): void {
    (document.getElementById('themeToggleImg') as HTMLImageElement).src = themeSettings.sunImagePath || themeSettings.moonImagePath;
    const themeToggleBtn = document.getElementById('themeToggleBtn') as HTMLElement;
    themeToggleBtn.classList.remove('light-mode');
    themeToggleBtn.classList.add('dark-mode');
    themeToggleBtn.querySelector('.mode-text')!.textContent = themeSettings.buttonText;
    themeToggleBtn.style.backgroundColor = themeSettings.buttonBackgroundColor;
}

let lastAppliedTheme = '';

async function toggleThemeMode(): Promise<void> {
    if (document.body.classList.contains('dark-mode')) {
        await applyLightMode();
    } else {
        await applyNightMode();
    }
}

async function applyUndo(theme: string): Promise<void> {
    switch (theme) {
        case 'light':
            await applyNightMode();
            break;
        case 'night':
            await applyLightMode();
            break;
        default:
            console.error('Invalid theme to undo.');
            return;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Initial theme toggle
    await toggleThemeMode();

    // Attach event listener to the theme toggle button
    document.getElementById('themeToggleBtn')?.addEventListener('click', async () => {
        await toggleThemeMode();
    });
});
