const translation = [
    'Countdown to Elephant Day',
    'Today',
    'Elephant Day',
    'Left',
    'Full screen',
    'Don\'t turn off screen',
    'Settings',
    'General',
    'Advanced',
    'Appearance',
    'About',
    'Changelog',
    'Visit counter',
    'Update frequency (milliseconds)',
    'Reset all settings',
    'Do you want to reset all settings?',
    'No',
    'Yes',
    'Date language',
    'Website language',
    'Browser language',
    'Custom',
    'Language should be specified in BCP 47 format.',
    'list of available languages',
    'Custom CSS code',
    'Custom Javascript code',
    'To make sure the code is applied correctly add <code>!important</code> at the end of each line.',
    'The code will start working after refreshing the website.',
    'Dark theme',
    'Automatic (browser theme)',
    'Light',
    'Dark',
    'Scale',
    'Center the website vertically',
    'Website background',
    'Default color (#9acd32)',
    'Custom color',
    'Image',
    'Video',
    'YouTube video',
    'Website',
    'Color',
    'Theme',
    'Default',
    'White & black',
    'Black & white',
    'Custom',
    'Website title color',
    'Countdown font color',
    'Countdown background color',
    'Countdown border color',
    '"Left" header color',
    'Time units color',
    'Dates labels color',
    'Dates color',
    'Countdown border width',
    'Countdown border style',
    'None',
    'Solid',
    'Double',
    'Dashed',
    'Dotted',
    'Inset',
    'Outset',
    'Groove',
    'Ridge',
    'Display today date',
    'Display Elephant Day date',
    'Countdown shadow',
    'Icon outline',
    'Elephant cursor',
    'Menu buttons style',
    'Custom',
    'Value / State',
    'Normal',
    'Hover',
    'Active',
    'Text',
    'Background',
    'Border',
    'Countdown to Elephant Day website',
    'GitHub repository',
    'Version',
    'during creation',
    'Author',
    'current version',
    'Open source software used in developing the website',
    'Font',
    'You are offline',
    'Old menu',
    'Libraries',
    'Reinstall service worker and clear cache',
    'Widget',
    'Default',
    'Automatic (browser language)',
    'Polish',
    'English',
    'Language',
    'Hide menu',
    'HTML code',
    'Height',
    'Width'
];
const titleTranslations = {
    'Ustawienia': 'Settings',
    'Pełny ekran': 'Fullscreen',
    'Nie wygaszaj ekranu': 'Don\'t turn off screen',
    'Kanał YouTube': 'YouTube channel',
    'Profil GitHub': 'GitHub profile'
};
const altTranslations = {
    'Ikona': 'Icon',
    'Słoń': 'Elephant'
}

function getLanguage() {
    var url = new URL(window.location.href);
    var searchParams = url.searchParams;
    if (searchParams.get('lang') != 'auto' && searchParams.get('lang') != null) {
        return searchParams.get('lang');
    } else if (searchParams.get('lang') == 'auto') {
        if (navigator.language.split('-')[0] == 'pl') {
            return 'pl';
        } else {
            return 'en';
        }
    } else {
        if (localStorage.getItem('language') != undefined) {
            return localStorage.getItem('language');
        }

        return 'pl';
    }
}


function translate() {
    document.querySelector('html').lang = 'en';
    document.querySelector('title').innerHTML = 'Countdown to Elephant Day';
    document.querySelectorAll('[text-id]').forEach((e) => {
        e.innerHTML = translation[e.getAttribute('text-id')];
    });
    document.querySelectorAll('[title]').forEach((e) => {
        e.title = titleTranslations[e.title];
    });
    document.querySelectorAll('[alt]').forEach((e) => {
        e.alt = altTranslations[e.alt];
    });
}

function translateIfRequired() {
    if (getLanguage() == 'en') {
        translate();
    }
}

function showLanguageInfo() {
    if (localStorage.getItem('language') == undefined && navigator.language.split('-')[0] != 'pl' && localStorage.getItem('language-popover-closed') == undefined) {
        var element;
        if (localStorage.getItem('old-menu') == 'true') {
            if (window.getComputedStyle(document.querySelector('#top-menu'), null).display == 'block') {
                element = document.querySelector('#options-button');
            } else {
                element = document.querySelector('#top-menu-open');
            }
        } else {
            element = document.querySelector('#options-button2');
        }
        var popover = new bootstrap.Popover(element, {
            placement: 'bottom',
            html: true,
            sanitize: false,
            customClass: 'language-popover'
        });
        popover.setContent({
            '.popover-body': '<p class="language-popover">You can change language in the settings.</p><button class="btn btn-secondary language-popover">OK</button>'
        })
        if ((new URL(window.location.href)).searchParams.get('hide-menu') != 'true') {
            popover.show();
        }
        document.querySelector('button.language-popover').addEventListener('click', () => {
            popover.dispose();
            localStorage.setItem('language-popover-closed', 'true');
        });
    }
}

addEventListener('load', translateIfRequired);
addEventListener('load', showLanguageInfo);
