import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { firstLetterToLower } from "../../../utils/index.js"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { NumberInput } from "@mantine/core"
import { useAtom } from "jotai"
import { detailOrderItemDataAtom } from "../../../store/jotai/atoms/OrderAtoms.js"

const NumberInputForOrderCreation = ({
   disabled = false,
   name,
   control,
   errors = null,
   decimals = 0,
}) => {
   const { t } = useTranslation()
   const fieldName = firstLetterToLower(name)
   const isRequired = errors !== null
   const inputValue = useWatch({ name: fieldName, control })

   const [detailOrderItemData, setDetailOrderItemData] = useAtom(
      detailOrderItemDataAtom
   )

   const { setValue } = useFormContext()

   useEffect(() => {
      setDetailOrderItemData((prev) => {
         return {
            ...prev,
            [fieldName]: inputValue,
         }
      })
   }, [inputValue])

   useEffect(() => {
      if (
         fieldName.substring(36) === "DetailOrderItemCost" ||
         fieldName.substring(36) === "DetailOrderItemDiscount" ||
         fieldName.substring(36) === "DetailOrderItemTax" ||
         fieldName.substring(36) === "DetailOrderItemQuantity"
      ) {
         setDetailOrderItemData((prev) => {
            const quantity =
               prev[`${fieldName.substring(0, 36)}DetailOrderItemQuantity`]

            const tax = prev[`${fieldName.substring(0, 36)}DetailOrderItemTax`]
            const discount =
               prev[`${fieldName.substring(0, 36)}DetailOrderItemDiscount`]
            const cost =
               prev[`${fieldName.substring(0, 36)}DetailOrderItemCost`]

            const calculatedCostSimple = cost - (tax / 100) * cost - discount
            const calculatedCostForTotal = calculatedCostSimple * quantity
            const calculatedDiscountSimple = discount
            const calculatedDiscountForTotal = discount * quantity
            const calculatedTaxFromCostSimple = (tax / 100) * cost
            const calculatedTaxFromCostForTotal = (tax / 100) * cost * quantity
            const calculatedSubTotal = quantity * cost

            setValue(
               `${fieldName.substring(0, 36)}DetailOrderItemSubTotal`,
               calculatedSubTotal
            )
            return {
               ...prev,
               [`${fieldName.substring(0, 36)}DetailOrderItemTaxSimple`]:
                  Number.parseFloat(calculatedTaxFromCostSimple).toFixed(2),
               [`${fieldName.substring(0, 36)}DetailOrderItemTaxForTotal`]:
                  Number.parseFloat(calculatedTaxFromCostForTotal).toFixed(2),
               [`${fieldName.substring(0, 36)}DetailOrderItemDiscountForTotal`]:
                  Number.parseFloat(calculatedDiscountForTotal).toFixed(2),
               [`${fieldName.substring(0, 36)}DetailOrderItemDiscountSimple`]:
                  Number.parseFloat(calculatedDiscountSimple).toFixed(2),
               [`${fieldName.substring(0, 36)}DetailOrderItemCostForTotal`]:
                  Number.parseFloat(calculatedCostForTotal).toFixed(2),
               [`${fieldName.substring(0, 36)}DetailOrderItemCostSimple`]:
                  Number.parseFloat(calculatedCostSimple).toFixed(2),
               [`${fieldName.substring(0, 36)}DetailOrderItemSubTotal`]:
                  Number.parseFloat(calculatedSubTotal).toFixed(2),
            }
         })
      }
   }, [inputValue, Object.keys(detailOrderItemData).length])

   useEffect(() => {
      const keys = {
         DetailOrderItemQuantity: "TotalQuantity",
         DetailOrderItemCostForTotal: "TotalCost",
         DetailOrderItemDiscountForTotal: "TotalDiscount",
         DetailOrderItemTaxForTotal: "TotalTax",
         DetailOrderItemSubTotal: "TotalSubTotal",
      }
      const totals = {}
      const calculatedTotals = (keys, detailOrderItemData) => {
         Object.keys(keys).forEach((key) => {
            const filteredKeys = Object.keys(detailOrderItemData).filter(
               (itemKey) => itemKey.substring(36) === key
            )
            const total = isNaN(
               filteredKeys.reduce(
                  (acc, cur) => acc + Number(detailOrderItemData[cur]),
                  0
               )
            )
               ? 0
               : Number(
                    filteredKeys.reduce((acc, cur) => {
                       return acc + Number(detailOrderItemData[cur])
                    }, 0)
                 ).toFixed(2)
            totals[keys[key]] = total
            setValue(keys[key], total)
         })
      }
      setDetailOrderItemData((prev) => {
         calculatedTotals(keys, prev)
         return { ...prev, ...totals }
      })
   }, [inputValue, Object.keys(detailOrderItemData).length])

   const getDetailOrderItemData = (fieldName, type) => {
      return detailOrderItemData[`${fieldName.substring(0, 36)}${type}`]
   }
   const getError = (fieldName, name) => {
      return (
         isRequired &&
         errors[fieldName]?.type === "required" &&
         t(`errorInput${name}`)
      )
   }
   const getController = (fieldName, description, formatter) => (
      <Controller
         name={fieldName}
         control={control}
         rules={isRequired ? { required: true } : undefined}
         render={({ field }) => (
            <NumberInput
               readOnly={disabled}
               maw={120}
               miw={120}
               {...field}
               description={description}
               min={0}
               max={4294967295}
               withAsterisk={isRequired}
               error={getError(fieldName, name)}
               precision={decimals}
               hideControls
               parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
               formatter={formatter}
            />
         )}
      />
   )
   const type = fieldName.substring(36)
   const formatter = (value) =>
      !Number.isNaN(parseFloat(value))
         ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
         : ""
   return (
      <>
         {type === "DetailOrderItemQuantity" &&
            getController(fieldName, undefined, formatter)}
         {type === "DetailOrderItemCost" &&
            getController(
               fieldName,
               getDetailOrderItemData(fieldName, "DetailOrderItemCostSimple"),
               formatter
            )}
         {type === "DetailOrderItemDiscount" &&
            getController(
               fieldName,
               getDetailOrderItemData(
                  fieldName,
                  "DetailOrderItemDiscountSimple"
               ),
               formatter
            )}
         {type === "DetailOrderItemTax" &&
            getController(
               fieldName,
               getDetailOrderItemData(fieldName, "DetailOrderItemTaxSimple"),
               formatter
            )}
         {type === "DetailOrderItemSubTotal" &&
            getController(
               fieldName,
               getDetailOrderItemData(fieldName, "DetailOrderItemSubTotal"),
               formatter
            )}
      </>
   )
}

export default NumberInputForOrderCreation
