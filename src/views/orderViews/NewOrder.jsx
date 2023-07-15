import React, { useEffect, useState } from "react"
import {
   ActionIcon,
   Box,
   Button,
   Card,
   Group,
   ScrollArea,
   Table,
} from "@mantine/core"
import CustomBreadcrumbs from "../../components/CustomBreadCrumbs.jsx"
import { useCreateModel } from "../../hooks/useCreateModel.jsx"
import { FormProvider, useForm } from "react-hook-form"
import DatePickerInputForCreation from "../../components/DatePickerInputForCreation.jsx"
import { useGetAllModels } from "../../hooks/useGetAllModels.jsx"
import SelectInputForCreation from "../../components/SelectInputForCreation.jsx"
import { formatForSelectInput } from "../../utils/index.js"
import TextAreaInputForCreation from "../../components/TextAreaInputForCreation.jsx"
import NumberInputForOrderCreation from "./components/NumberInputForOrderCreation.jsx"
import TextInputForOrderCreation from "./components/TextInputForOrderCreation.jsx"
import DatePickerInputForOrderCreation from "./components/DatePickerInputForOrderCreation.jsx"
import { useElementSize } from "@mantine/hooks"
import { IconTrash } from "@tabler/icons-react"
import { useAtom } from "jotai"
import { detailOrderItemDataAtom } from "../../store/jotai/atoms/OrderAtoms.js"
import SelectInputForOrderCreation from "./components/SelectInputForOrderCreation.jsx"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/order", title: "Compras" },
   { path: "/order/new", title: "Nueva Compra" },
]

const NewOrder = () => {
   const [detailOrderItemData, setDetailOrderItemData] = useAtom(
      detailOrderItemDataAtom
   )

   const { ref, width, height } = useElementSize()

   const [itemsDetailOrder, setItemsDetailOrder] = useState([])

   const createOrder = useCreateModel("Order")
   const {
      allModelsData: suppliersData,
      isLoadingAllModelsData: isLoadingSuppliersData,
   } = useGetAllModels("Supplier", "GetAllSuppliers")

   const {
      allModelsData: notesData,
      isLoadingAllModelsData: isLoadingNotesData,
   } = useGetAllModels("Note", "GetAllNotes")

   const {
      allModelsData: itemsData,
      isLoadingAllModelsData: isLoadingItemsData,
   } = useGetAllModels("Item", "GetAllItems")

   const methods = useForm({
      defaultValues: { orderDate: new Date(), orderNote: "" },
   })

   const onSubmit = (data) => {
      console.log(data)
      //createOrder(data)
      methods.reset()
      setItemsDetailOrder([])
      setDetailOrderItemData({})
   }
   const handleDeleteItemDetail = (id) => {
      setItemsDetailOrder((items) => items.filter((item) => item.id !== id))
      setDetailOrderItemData((prev) => {
         const filteredKeys = Object.keys(prev).filter(
            (key) => key.substring(0, 36) !== id
         )
         prev.TotalQuantity -= prev[`${id}DetailOrderItemQuantity`]
         prev.TotalCost -= prev[`${id}DetailOrderItemCostForTotal`]
         prev.TotalDiscount -= prev[`${id}DetailOrderItemDiscountForTotal`]
         prev.TotalTax -= prev[`${id}DetailOrderItemTaxForTotal`]
         prev.TotalSubTotal -= prev[`${id}DetailOrderItemSubTotal`]

         prev[`${id}DetailOrderItemQuantity`] = 0
         prev[`${id}DetailOrderItemCost`] = 0
         prev[`${id}DetailOrderItemDiscount`] = 0
         prev[`${id}DetailOrderItemTax`] = 0
         prev[`${id}DetailOrderItemSubTotal`] = 0
         prev[`${id}DetailOrderItemLote`] = ""
         prev[`${id}DetailOrderItemExpirationDate`] = new Date()

         methods.setValue(`${id}DetailOrderItemQuantity`, 0)
         methods.setValue(`${id}DetailOrderItemCost`, 0)
         methods.setValue(`${id}DetailOrderItemDiscount`, 0)
         methods.setValue(`${id}DetailOrderItemTax`, 0)
         methods.setValue(`${id}DetailOrderItemSubTotal`, 0)
         methods.setValue(`${id}DetailOrderItemLote`, "")
         methods.setValue(`${id}DetailOrderItemExpirationDate`, new Date())
         const updatedData = {}
         filteredKeys.forEach((key) => {
            updatedData[key] = prev[key]
         })
         return updatedData
      })
   }

   const watchInput = methods.watch("itemsIds")
   useEffect(() => {
      if (
         watchInput !== null &&
         watchInput !== undefined &&
         itemsData !== undefined
      ) {
         methods.register("TotalQuantity")
         methods.register("TotalCost")
         methods.register("TotalDiscount")
         methods.register("TotalTax")
         methods.register("TotalSubTotal")

         setItemsDetailOrder((items) => {
            const watchItemInItemsData = items.findIndex(
               (item) => item.id === watchInput
            )
            if (watchItemInItemsData === -1)
               return [
                  ...items,
                  ...itemsData.filter((item) => item.id === watchInput),
               ]
            return items
         })

         setDetailOrderItemData((prev) => {
            if (
               prev[`${watchInput}DetailOrderItemQuantity`] === null ||
               prev[`${watchInput}DetailOrderItemQuantity`] === undefined
            ) {
               prev[`${watchInput}DetailOrderItemQuantity`] = 0
               prev[`${watchInput}DetailOrderItemCost`] = 0
               prev[`${watchInput}DetailOrderItemDiscount`] = 0
               prev[`${watchInput}DetailOrderItemTax`] = 0
               prev[`${watchInput}DetailOrderItemSubTotal`] = 0
               prev[`${watchInput}DetailOrderItemLote`] = ""
               prev[`${watchInput}DetailOrderItemExpirationDate`] = new Date()

               methods.setValue(`${watchInput}DetailOrderItemQuantity`, 0)
               methods.setValue(`${watchInput}DetailOrderItemCost`, 0)
               methods.setValue(`${watchInput}DetailOrderItemDiscount`, 0)
               methods.setValue(`${watchInput}DetailOrderItemTax`, 0)
               methods.setValue(`${watchInput}DetailOrderItemSubTotal`, 0)
               methods.setValue(`${watchInput}DetailOrderItemLote`, "")
               methods.setValue(
                  `${watchInput}DetailOrderItemExpirationDate`,
                  new Date()
               )
            }
            return prev
         })
      }
   }, [watchInput, itemsData])

   return (
      <Box>
         <Card ref={ref}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
               <CustomBreadcrumbs routes={routes} />
            </Box>
            <FormProvider {...methods}>
               <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <Group position="apart" grow pt={40}>
                     <DatePickerInputForCreation
                        name="OrderDate"
                        model="Order"
                        control={methods.control}
                        errors={methods.formState.errors}
                     />
                     <SelectInputForCreation
                        name="SupplierId"
                        model="Order"
                        control={methods.control}
                        errors={methods.formState.errors}
                        data={
                           isLoadingSuppliersData
                              ? ["Cargando"]
                              : formatForSelectInput(suppliersData)
                        }
                     />
                     <SelectInputForCreation
                        name="NoteId"
                        model="Order"
                        control={methods.control}
                        errors={methods.formState.errors}
                        data={
                           isLoadingNotesData
                              ? ["Cargando"]
                              : formatForSelectInput(
                                   notesData.filter(
                                      (item) => item.name === "Order"
                                   )
                                )
                        }
                     />
                  </Group>
                  <SelectInputForCreation
                     name="ItemsIds"
                     model="Order"
                     control={methods.control}
                     data={
                        isLoadingItemsData
                           ? ["Cargando"]
                           : formatForSelectInput(itemsData)
                     }
                  />
                  <Table>
                     <ScrollArea w={width}>
                        <thead>
                           <Box component="tr">
                              <th>Item</th>
                              <th>Unidad</th>
                              <th>Cantidad</th>
                              <th>Lote</th>
                              <th>Expiración</th>
                              <th>Costo*Unidad</th>
                              <th>Descuento*Unidad</th>
                              <th>Impuesto*Unidad</th>
                              <th>SubTotal</th>
                              <th>Quitar</th>
                           </Box>
                        </thead>
                        <tbody>
                           {itemsDetailOrder.map((item) => (
                              <Box component="tr" key={item.id}>
                                 <Box
                                    component="td"
                                    maw={100}
                                    miw={100}
                                 >{`${item.name}-${item.code}`}</Box>
                                 <td>
                                    <SelectInputForOrderCreation
                                       name={`${item.id}DetailOrderItemUnitId`}
                                       control={methods.control}
                                       errors={methods.formState.errors}
                                       data={
                                          isLoadingItemsData
                                             ? ["Cargando"]
                                             : formatForSelectInput(item.units)
                                       }
                                    />
                                 </td>
                                 <td>
                                    <NumberInputForOrderCreation
                                       name={`${item.id}DetailOrderItemQuantity`}
                                       control={methods.control}
                                       errors={methods.formState.errors}
                                    />
                                 </td>
                                 <td>
                                    <TextInputForOrderCreation
                                       name={`${item.id}DetailOrderItemLote`}
                                       control={methods.control}
                                       errors={methods.formState.errors}
                                    />
                                 </td>
                                 <td>
                                    <DatePickerInputForOrderCreation
                                       name={`${item.id}DetailOrderItemExpirationDate`}
                                       control={methods.control}
                                       errors={methods.formState.errors}
                                    />
                                 </td>
                                 <td>
                                    <NumberInputForOrderCreation
                                       name={`${item.id}DetailOrderItemCost`}
                                       control={methods.control}
                                       errors={methods.formState.errors}
                                       decimals={2}
                                    />
                                 </td>
                                 <td>
                                    <NumberInputForOrderCreation
                                       name={`${item.id}DetailOrderItemDiscount`}
                                       control={methods.control}
                                       errors={methods.formState.errors}
                                       decimals={2}
                                    />
                                 </td>
                                 <td>
                                    <NumberInputForOrderCreation
                                       name={`${item.id}DetailOrderItemTax`}
                                       control={methods.control}
                                       errors={methods.formState.errors}
                                       decimals={2}
                                    />
                                 </td>
                                 <td>
                                    <NumberInputForOrderCreation
                                       name={`${item.id}DetailOrderItemSubTotal`}
                                       control={methods.control}
                                       errors={methods.formState.errors}
                                       decimals={2}
                                       disabled={true}
                                    />
                                 </td>
                                 <td>
                                    <ActionIcon
                                       variant="filled"
                                       color="red"
                                       onClick={() =>
                                          handleDeleteItemDetail(item.id)
                                       }
                                    >
                                       <IconTrash size={20} />
                                    </ActionIcon>
                                 </td>
                              </Box>
                           ))}
                        </tbody>
                        <tfoot>
                           <Box component="tr">
                              <th>Total</th>
                              <th></th>
                              <th>{detailOrderItemData.TotalQuantity}</th>
                              <th></th>
                              <th></th>
                              <th>{detailOrderItemData.TotalCost}</th>
                              <th>{detailOrderItemData.TotalDiscount}</th>
                              <th>{detailOrderItemData.TotalTax}</th>
                              <th>{detailOrderItemData.TotalSubTotal}</th>
                           </Box>
                        </tfoot>
                     </ScrollArea>
                  </Table>
                  <TextAreaInputForCreation
                     name="OrderNote"
                     model="Order"
                     control={methods.control}
                  />
                  <Group position="right">
                     <Button type="submit">Registrar</Button>
                  </Group>
               </form>
            </FormProvider>
            {JSON.stringify(detailOrderItemData)
               .split(",")
               .map((item) => (
                  <p>{item}</p>
               ))}
         </Card>
      </Box>
   )
}

export default NewOrder
