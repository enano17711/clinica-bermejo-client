import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n.use(initReactI18next).init({
   lng: "es",
   fallbackLng: "es",
   resources: {
      es: {
         translation: {
            //inputs labels
            labelInputName: "Nombre",
            labelInputShortName: "Código",
            labelInputValue: "Valor",
            labelInputUnitBaseId: "Unidad Base",
            labelInputDescription: "Descripción",
            labelInputOperation: "Operación",
            labelInputSurname: "Apellidos",
            labelInputCi: "CI",
            labelInputEmail: "Email",
            labelInputPhoneNumber: "Teléfono/Celular",
            labelInputDate: "Fecha",
            labelInputAddress: "Dirección",
            labelInputNit: "NIT",
            labelInputCode: "Código",
            labelInputBrandId: "Marca",
            labelInputUnitIds: "Unidades",
            labelInputCategoryItemIds: "Categorías",
            //inputs errors
            errorInputName: "El nombre es obligatorio",
            errorInputShortName: "El código es obligatorio",
            errorInputValue: "El valor es obligatorio",
            errorInputUnitBaseId: "La unidad base es obligatorio",
            errorInputDescription: "La descripción es obligatoria",
            errorInputOperation: "La operación es obligatoria",
            errorInputSurname: "Los apellidos son obligatorios",
            errorInputCi: "El CI es obligatorio",
            errorInputEmail: "El email es obligatorio",
            errorInputPhoneNumber: "El teléfono/celular es obligatorio",
            errorInputDate: "La fecha es obligatoria",
            errorInputAddress: "La dirección es obligatoria",
            errorInputNit: "El NIT es obligatorio",
            errorInputCode: "El código es obligatorio",
            errorInputBrandId: "La marca es obligatoria",
            errorInputUnitIds: "Las unidades son obligatorias",
            errorInputCategoryItemIds: "Las categorías son obligatorias",
            //inputs placeholders
            placeholderInputNameUnit: "Ingresa el nombre de la unidad",
            placeholderInputShortNameUnit: "Ingresa el código de la unidad",
            placeholderInputValueUnit: "Ingresa el valor de la unidad",
            placeholderInputUnitBaseIdUnit: "Elige uno de los siguientes",
            placeHolderInputDescriptionUnit:
               "Ingresa la descripción de la unidad",
            placeHolderInputOperationUnit: "Ingresa la operación de la unidad",
            placeholderInputNameBrand: "Ingresa el nombre de la marca",
            placeHolderInputDescriptionBrand:
               "Ingresa la descripción de la marca",
            placeholderInputNameUnitBase: "Ingresa el nombre de la unidad base",
            placeholderInputShortNameUnitBase:
               "Ingresa el código de la unidad base",
            placeHolderInputDescriptionUnitBase:
               "Ingresa la descripción de la unidad base",
            placeholderInputOperationUnitBase:
               "Ingresa la operación de la unidad base",
            placeholderInputNameCustomer: "Ingresa el nombre del cliente",
            placeholderInputSurnameCustomer: "Ingresa el apellido del cliente",
            placeholderInputCiCustomer: "Ingresa el CI del cliente",
            placeHolderInputEmailCustomer: "Ingresa el email del cliente",
            placeholderInputEmailCustomer: "Ingresa el email del cliente",
            placeholderInputPhoneNumberCustomer:
               "Ingresa el teléfono/celular del cliente",
            placeHolderInputDateCustomer:
               "Ingresa la fecha de nacimiento del cliente",
            placeHolderInputAddressCustomer: "Ingresa la dirección del cliente",
            placeholderInputAddressCustomer: "Ingresa la dirección del cliente",
            placeHolderInputNitCustomer: "Ingresa el NIT del cliente",
            placeholderInputNitCustomer: "Ingresa el NIT del cliente",
            placeholderInputNameSupplier: "Ingresa el nombre del proveedor",
            placeholderInputSurnameSupplier:
               "Ingresa el apellido del proveedor",
            placeholderInputCiSupplier: "Ingresa el CI del proveedor",
            placeHolderInputEmailSupplier: "Ingresa el email del proveedor",
            placeholderInputEmailSupplier: "Ingresa el email del proveedor",
            placeholderInputPhoneNumberSupplier:
               "Ingresa el teléfono/celular del proveedor",
            placeHolderInputDateSupplier:
               "Ingresa la fecha de nacimiento del proveedor",
            placeHolderInputAddressSupplier:
               "Ingresa la dirección del proveedor",
            placeholderInputAddressSupplier:
               "Ingresa la dirección del proveedor",
            placeHolderInputNitSupplier: "Ingresa el NIT del proveedor",
            placeholderInputNitSupplier: "Ingresa el NIT del proveedor",
            placeholderInputNameItem: "Ingresa el nombre del item",
            placeholderInputCodeItem: "Ingresa el código del item",
            placeholderInputUnitIdsItem: "Selecciona las unidades",
            placeHolderInputUnitIdsItem: "Selecciona las unidades",
            placeholderInputCategoryItemIdsItem: "Selecciona las categorías",
            placeHolderInputCategoryItemIdsItem: "Selecciona las categorías",
            placeHolderInputDescriptionItem: "Ingresa la descripción del item",
         },
      },
   },
})

export default i18n
