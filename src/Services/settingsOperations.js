import localStorage from 'local-storage';
const settingsKey = 'settings';
const additionalSettingsKey = 'additionalSettings';

export function setLocalSettings(settings){
    localStorage.set(settingsKey, settings);
}

export function getLocalSettings(){
    return localStorage.get(settingsKey);

}

export function clearLocalSettings(){
    localStorage.remove(settingsKey);
}




export function setAdditionalLocalSettings(additionalSettings){
    localStorage.set(additionalSettingsKey, additionalSettings);
}

export function getAdditionalLocalSettings(){
    return localStorage.get(additionalSettingsKey);

}

export function clearAdditionalLocalSettings(){
    localStorage.remove(additionalSettingsKey);
}

