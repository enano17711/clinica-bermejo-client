import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n.use(initReactI18next).init({
   lng: "es",
   fallbackLng: "es",
   resources: {
      es: {
         translation: {
            labelInputName: "Nombre",
            labelInputShortName: "Código",
            labelInputValue: "Valor",
            labelInputUnitBaseId: "Unidad Base",
            labelInputDescription: "Descripción",
            labelInputOperation: "Operación",
            descriptionInputName: "Ingresa el nombre",
            descriptionInputShortName: "Ingresa el código",
            descriptionInputValue: "Ingresa el valor",
            descriptionInputUnitBaseId: "Selecciona la unidad base",
            descriptionInputDescription: "Ingresa la descripción",
            descriptionInputOperation: "Selecciona la operación",
            errorInputName: "El nombre es obligatorio",
            errorInputShortName: "El código es obligatorio",
            errorInputValue: "El valor es obligatorio",
            errorInputUnitBaseId: "La unidad base es obligatorio",
            errorInputDescription: "La descripción es obligatoria",
            errorInputOperation: "La operación es obligatoria",
            placeholderInputNameUnit: "Ej: Docena",
            placeholderInputShortNameUnit: "Ej: D",
            placeholderInputValueUnit: "Ej: mayor de 1",
            placeholderInputUnitBaseIdUnit: "Elige uno de los siguientes",
            placeHolderInputDescriptionUnit: "Ej: Unida para docena",
            placeHolderInputOperationUnit: "Ej: +",
            placeholderInputNameBrand: "Ej: Solutech",
            placeHolderInputDescriptionBrand: "Ej: Solutech",
            placeholderInputNameUnitBase: "Ej: Pieza",
            placeholderInputShortNameUnitBase: "Ej: P",
            placeHolderInputDescriptionUnitBase: "Ej: Unidad basica",
         },
      },
   },
})

export default i18n
