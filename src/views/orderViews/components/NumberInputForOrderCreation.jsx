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
      const onlyQuantity = Object.keys(detailOrderItemData).filter(
         (key) => key.substring(36) === "DetailOrderItemQuantity"
      )
      const onlyCost = Object.keys(detailOrderItemData).filter(
         (key) => key.substring(36) === "DetailOrderItemCostForTotal"
      )
      const onlyDiscount = Object.keys(detailOrderItemData).filter(
         (key) => key.substring(36) === "DetailOrderItemDiscountForTotal"
      )
      const onlyTax = Object.keys(detailOrderItemData).filter(
         (key) => key.substring(36) === "DetailOrderItemTaxForTotal"
      )
      const onlySubTotal = Object.keys(detailOrderItemData).filter(
         (key) => key.substring(36) === "DetailOrderItemSubTotal"
      )

      setDetailOrderItemData((prev) => {
         setValue(
            "TotalQuantity",
            isNaN(onlyQuantity.reduce((acc, cur) => acc + prev[cur], 0))
               ? 0
               : onlyQuantity.reduce((acc, cur) => acc + prev[cur], 0)
         )
         setValue(
            "TotalCost",
            isNaN(
               Number.parseFloat(
                  onlyCost.reduce((acc, cur) => acc + Number(prev[cur]), 0)
               ).toFixed(2)
            )
               ? 0
               : Number.parseFloat(
                    onlyCost.reduce((acc, cur) => acc + Number(prev[cur]), 0)
                 ).toFixed(2)
         )
         setValue(
            "TotalDiscount",
            isNaN(
               Number.parseFloat(
                  onlyDiscount.reduce((acc, cur) => acc + Number(prev[cur]), 0)
               ).toFixed(2)
            )
               ? 0
               : Number.parseFloat(
                    onlyDiscount.reduce(
                       (acc, cur) => acc + Number(prev[cur]),
                       0
                    )
                 ).toFixed(2)
         )
         setValue(
            "TotalTax",
            isNaN(
               Number.parseFloat(
                  onlyTax.reduce((acc, cur) => acc + Number(prev[cur]), 0)
               ).toFixed(2)
            )
               ? 0
               : Number.parseFloat(
                    onlyTax.reduce((acc, cur) => acc + Number(prev[cur]), 0)
                 ).toFixed(2)
         )
         setValue(
            "TotalSubTotal",
            isNaN(
               Number.parseFloat(
                  onlySubTotal.reduce((acc, cur) => acc + Number(prev[cur]), 0)
               ).toFixed(2)
            )
               ? 0
               : Number.parseFloat(
                    onlySubTotal.reduce(
                       (acc, cur) => acc + Number(prev[cur]),
                       0
                    )
                 ).toFixed(2)
         )

         return {
            ...prev,
            TotalQuantity: isNaN(
               onlyQuantity.reduce((acc, cur) => acc + prev[cur], 0)
            )
               ? 0
               : onlyQuantity.reduce((acc, cur) => acc + prev[cur], 0),
            TotalCost: isNaN(
               Number.parseFloat(
                  onlyCost.reduce((acc, cur) => acc + Number(prev[cur]), 0)
               ).toFixed(2)
            )
               ? 0
               : Number.parseFloat(
                    onlyCost.reduce((acc, cur) => acc + Number(prev[cur]), 0)
                 ).toFixed(2),
            TotalDiscount: isNaN(
               Number.parseFloat(
                  onlyDiscount.reduce((acc, cur) => acc + Number(prev[cur]), 0)
               ).toFixed(2)
            )
               ? 0
               : Number.parseFloat(
                    onlyDiscount.reduce(
                       (acc, cur) => acc + Number(prev[cur]),
                       0
                    )
                 ).toFixed(2),
            TotalTax: isNaN(
               Number.parseFloat(
                  onlyTax.reduce((acc, cur) => acc + Number(prev[cur]), 0)
               ).toFixed(2)
            )
               ? 0
               : Number.parseFloat(
                    onlyTax.reduce((acc, cur) => acc + Number(prev[cur]), 0)
                 ).toFixed(2),
            TotalSubTotal: isNaN(
               Number.parseFloat(
                  onlySubTotal.reduce((acc, cur) => acc + Number(prev[cur]), 0)
               ).toFixed(2)
            )
               ? 0
               : Number.parseFloat(
                    onlySubTotal.reduce(
                       (acc, cur) => acc + Number(prev[cur]),
                       0
                    )
                 ).toFixed(2),
         }
      })
   }, [inputValue, Object.keys(detailOrderItemData).length])

   return (
      <>
         {fieldName.substring(36) === "DetailOrderItemQuantity" && (
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
                     min={0}
                     max={4294967295}
                     withAsterisk={isRequired}
                     error={
                        isRequired &&
                        errors[fieldName]?.type === "required" &&
                        t(`errorInput${name}`)
                     }
                     precision={decimals}
                     hideControls
                     parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                     formatter={(value) =>
                        !Number.isNaN(parseFloat(value))
                           ? `${value}`.replace(
                                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                ","
                             )
                           : ""
                     }
                  />
               )}
            />
         )}
         {fieldName.substring(36) === "DetailOrderItemCost" && (
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
                     description={
                        detailOrderItemData[
                           `${fieldName.substring(
                              0,
                              36
                           )}DetailOrderItemCostSimple`
                        ]
                     }
                     min={0}
                     max={4294967295}
                     withAsterisk={isRequired}
                     error={
                        isRequired &&
                        errors[fieldName]?.type === "required" &&
                        t(`errorInput${name}`)
                     }
                     precision={decimals}
                     hideControls
                     parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                     formatter={(value) =>
                        !Number.isNaN(parseFloat(value))
                           ? `${value}`.replace(
                                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                ","
                             )
                           : ""
                     }
                  />
               )}
            />
         )}
         {fieldName.substring(36) === "DetailOrderItemDiscount" && (
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
                     description={
                        detailOrderItemData[
                           `${fieldName.substring(
                              0,
                              36
                           )}DetailOrderItemDiscountSimple`
                        ]
                     }
                     min={0}
                     max={4294967295}
                     withAsterisk={isRequired}
                     error={
                        isRequired &&
                        errors[fieldName]?.type === "required" &&
                        t(`errorInput${name}`)
                     }
                     precision={decimals}
                     hideControls
                     parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                     formatter={(value) =>
                        !Number.isNaN(parseFloat(value))
                           ? `${value}`.replace(
                                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                ","
                             )
                           : ""
                     }
                  />
               )}
            />
         )}
         {fieldName.substring(36) === "DetailOrderItemTax" && (
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
                     description={
                        detailOrderItemData[
                           `${fieldName.substring(
                              0,
                              36
                           )}DetailOrderItemTaxSimple`
                        ]
                     }
                     {...field}
                     min={0}
                     max={4294967295}
                     withAsterisk={isRequired}
                     error={
                        isRequired &&
                        errors[fieldName]?.type === "required" &&
                        t(`errorInput${name}`)
                     }
                     precision={decimals}
                     hideControls
                     parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                     formatter={(value) =>
                        !Number.isNaN(parseFloat(value))
                           ? `${value} %`.replace(
                                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                ","
                             )
                           : " %"
                     }
                  />
               )}
            />
         )}
         {fieldName.substring(36) === "DetailOrderItemSubTotal" && (
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
                     description={
                        detailOrderItemData[
                           `${fieldName.substring(
                              0,
                              36
                           )}DetailOrderItemSubTotal`
                        ]
                     }
                     min={0}
                     max={4294967295}
                     withAsterisk={isRequired}
                     error={
                        isRequired &&
                        errors[fieldName]?.type === "required" &&
                        t(`errorInput${name}`)
                     }
                     precision={decimals}
                     hideControls
                     parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                     formatter={(value) =>
                        !Number.isNaN(parseFloat(value))
                           ? `${value}`.replace(
                                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                ","
                             )
                           : ""
                     }
                  />
               )}
            />
         )}
      </>
   )
}

export default NumberInputForOrderCreation
