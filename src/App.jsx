import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import MainLayout from "./layouts/MainLayout.jsx"
import IndexDoctor from "./views/doctorViews/Index.jsx"
import IndexBrand from "./views/brandViews/Index.jsx"
import IndexUnit from "./views/unitViews/Index.jsx"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./api/react-query/queryClient.js"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Loading from "./components/Loading.jsx"
import { DatesProvider } from "@mantine/dates"
import "dayjs/locale/es"
import DetailsDoctor from "./views/doctorViews/DetailsDoctor.jsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import DetailsBrand from "./views/brandViews/DetailsBrand.jsx"

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
