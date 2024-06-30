"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function applyThemeStyles(settings, selectors) {
    selectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        Array.from(elements).forEach((element) => {
            const htmlElement = element;
            htmlElement.style.color = settings.textColor;
            if (selector === '.guardioesImg') {
                htmlElement.style.border = `2px solid ${settings.borderColor}`;
            }
        });
    });
}
function applyLightMode() {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise(resolve => setTimeout(resolve, 100)); // Simulate async operation
        document.body.classList.remove('dark-mode');
        document.querySelector('.mainSection').classList.remove('dark-mode');
        document.body.style.backgroundColor = '#F5F5F5';
        const themeSettings = {
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
    });
}
function applyNightMode() {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise(resolve => setTimeout(resolve, 100)); // Simulate async operation
        document.body.classList.add('dark-mode');
        document.querySelector('.mainSection').classList.add('dark-mode');
        const themeSettings = {
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
    });
}
function updateThemeButton(themeSettings) {
    document.getElementById('themeToggleImg').src = themeSettings.sunImagePath || themeSettings.moonImagePath;
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    themeToggleBtn.classList.remove('light-mode');
    themeToggleBtn.classList.add('dark-mode');
    themeToggleBtn.querySelector('.mode-text').textContent = themeSettings.buttonText;
    themeToggleBtn.style.backgroundColor = themeSettings.buttonBackgroundColor;
}
let lastAppliedTheme = '';
function toggleThemeMode() {
    return __awaiter(this, void 0, void 0, function* () {
        if (document.body.classList.contains('dark-mode')) {
            yield applyLightMode();
        }
        else {
            yield applyNightMode();
        }
    });
}
function applyUndo(theme) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (theme) {
            case 'light':
                yield applyNightMode();
                break;
            case 'night':
                yield applyLightMode();
                break;
            default:
                console.error('Invalid theme to undo.');
                return;
        }
    });
}
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Initial theme toggle
    yield toggleThemeMode();
    // Attach event listener to the theme toggle button
    (_a = document.getElementById('themeToggleBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        yield toggleThemeMode();
    }));
}));
