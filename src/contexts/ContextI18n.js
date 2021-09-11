import React, { createContext, useContext, useEffect, useState } from 'react'
import { getLanguage,i18nWithLanguage,getJJMMAAAAWithLanguage,getHHMMWithLanguage,getJJMMAAAA_HHMMWithLanguage  } from '../i18n/utils'
// import makeRequest from '../api/makeRequest'
// import notify from 'devextreme/ui/notify'
import frMessages from "devextreme/localization/messages/fr.json";
import { locale, loadMessages } from "devextreme/localization";

const ContextI18n = createContext({})
const useContextI18n = () => useContext(ContextI18n)

function UseContextI18nProvider(props) {

  // traduction DEVEXTREME
  loadMessages(frMessages);
  locale('fr')

  const [language, setLanguage] = useState()

  useEffect(() => {
    // initialisation par défaut de la langue avec celle du navigateur
    if(!language){
      const lang = getLanguage()
     // console.log(`setLanguage ${lang}`)
      setLanguage(lang)
    }
  }, [language])

  const i18n = (key, values) => {
    try{
      return i18nWithLanguage(key, values, language)
    }catch(e){
      console.warn(`i18n ${key}`)
      return `${key}[${language}]`
    }
  }

  const getJJMMAAAA = (date) => {
    return getJJMMAAAAWithLanguage(date,language)
  }

  const getHHMM = (date) => {
    return getHHMMWithLanguage(date,language)
  }

  const getJJMMAAAA_HHMM = (date) => {
    return getJJMMAAAA_HHMMWithLanguage(date,language)
  }

  return <ContextI18n.Provider value={{ language, setLanguage, i18n, 
      getJJMMAAAA, getHHMM, getJJMMAAAA_HHMM }} {...props} />
}

export { UseContextI18nProvider, useContextI18n }
