import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import MainLayout from "./layouts/MainLayout.jsx"
import IndexDoctor from "./views/doctorViews/Index.jsx"
import IndexBrand from "./views/brandViews/Index.jsx"
import IndexUnit from "./views/unitViews/Index.jsx"
import IndexUnitBase from "./views/unitBaseViews/Index.jsx"
import IndexCustomer from "./views/customerViews/Index.jsx"
import IndexSupplier from "./views/supplierViews/Index.jsx"
import { QueryClientProvider } from "@tanstack/react-query"
import IndexCategoryItem from "./views/categoryItemViews/Index.jsx"
import { queryClient } from "./api/react-query/queryClient.js"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Loading from "./components/Loading.jsx"
import { DatesProvider } from "@mantine/dates"
import "dayjs/locale/es"
import DetailsDoctor from "./views/doctorViews/DetailsDoctor.jsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import DetailsBrand from "./views/brandViews/DetailsBrand.jsx"
import DetailsUnit from "./views/unitViews/DetailsUnit.jsx"
import DetailsUnitBase from "./views/unitBaseViews/DetailsUnitBase.jsx"
import DetailsCategoryItem from "./views/categoryItemViews/DetailsCategoryItem.jsx"
import DetailsCustomer from "./views/customerViews/DetailsCustomer.jsx"
import DetailsSupplier from "./views/supplierViews/DetailsSupplier.jsx"
import IndexOrder from "./views/orderViews/Index.jsx"
import IndexItem from "./views/itemViews/Index.jsx"
import DetailsItem from "./views/itemViews/DetailsItem.jsx"
import NewOrder from "./views/orderViews/NewOrder.jsx"

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <MantineProvider withGlobalStyles withNormalizeCSS>
               <DatesProvider settings={{ locale: "es" }}>
                  <Notifications />
                  <MainLayout>
                     <Loading />
                     <Routes>
                        <Route path="/doctor" element={<IndexDoctor />} />
                        <Route path="/doctor/:id" element={<DetailsDoctor />} />
                        <Route path="/brand" element={<IndexBrand />} />
                        <Route path="/brand/:id" element={<DetailsBrand />} />
                        <Route path="/unit" element={<IndexUnit />} />
                        <Route path="/unit/:id" element={<DetailsUnit />} />
                        <Route path="/unitBase" element={<IndexUnitBase />} />
                        <Route
                           path="/unitBase/:id"
                           element={<DetailsUnitBase />}
                        />
                        <Route
                           path="/categoryItem"
                           element={<IndexCategoryItem />}
                        />
                        <Route
                           path="/categoryItem/:id"
                           element={<DetailsCategoryItem />}
                        />
                        <Route path="/customer" element={<IndexCustomer />} />
                        <Route
                           path="/customer/:id"
                           element={<DetailsCustomer />}
                        />
                        <Route path="/supplier" element={<IndexSupplier />} />
                        <Route
                           path="/supplier/:id"
                           element={<DetailsSupplier />}
                        />
                        <Route path="/item" element={<IndexItem />} />
                        <Route path="/item/:id" element={<DetailsItem />} />
                        <Route path="/order" element={<IndexOrder />} />
                        <Route path="/order/new" element={<NewOrder />} />
                     </Routes>
                  </MainLayout>
                  <ReactQueryDevtools initialIsOpen={false} />
               </DatesProvider>
            </MantineProvider>
         </BrowserRouter>
      </QueryClientProvider>
   )
}

export default App
