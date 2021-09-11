
import messages_fr_FR from './messages_fr_FR.json';
import messages_en_US from './messages_en_US.json';

import IntlMessageFormat from 'intl-messageformat';



export const getLanguage = () => {

    return window.navigator.userLanguage || window.navigator.language
}



export const getMessages = (mLang) => {

    if(!mLang) return  messages_fr_FR

    const language = mLang.split(/[-_]/)[0];  // language without region code

    switch (language) {
        case "fr": return messages_fr_FR
  
        default: return messages_en_US
    }

}

export const i18nWithLanguage = (key, values, language) => {

    const msgFromKey = getMessages(language)[key]
    const msg = new IntlMessageFormat(msgFromKey, language);
    const output = msg.format(values)
    return output
}


export const getJJMMAAAAWithLanguage = (date, language) => {
    if (!!date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
        return new Intl.DateTimeFormat(language, options).format(date)
    } else {
        return '...'
    }
}

export const getHHMMWithLanguage = (date, language) => {
    if (!!date) {
        const options = { hour: 'numeric', minute: 'numeric'}
        return new Intl.DateTimeFormat(getLanguage(), options).format(date)
    } else {
        return '...'
    }
}

export const getJJMMAAAA_HHMMWithLanguage = (date, language) => {
    if (!!date) {
        const options = {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: 'numeric', minute: 'numeric'
        }
        return new Intl.DateTimeFormat(getLanguage(), options).format(date)
    } else {
        return '...'
    }
}
