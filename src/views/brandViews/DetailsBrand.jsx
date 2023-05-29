import React from "react"
import { Card, Grid, Tabs } from "@mantine/core"
import DetailDataDoctorSection from "../doctorViews/components/detailDoctorcomponents/DetailDataDoctorSection.jsx"
import { IconFirstAidKit, IconStethoscope, IconUser } from "@tabler/icons-react"
import CitasTabDetailDoctor from "../doctorViews/components/detailDoctorcomponents/CitasTabDetailDoctor.jsx"

const DetailsBrand = () => {
   return (
      <Grid>
         <Grid.Col span={4}>
            <DetailDataDoctorSection />
         </Grid.Col>
         <Grid.Col span={8}>
            <Tabs variant="pills" radius="md" defaultValue="items">
               <Tabs.List grow mb="md">
                  <Tabs.Tab
                     value="items"
                     icon={<IconStethoscope size="1rem" />}
                  >
                     Items
                  </Tabs.Tab>
               </Tabs.List>
               <Tabs.Panel value="citas">
                  <CitasTabDetailDoctor />
               </Tabs.Panel>
            </Tabs>
         </Grid.Col>
      </Grid>
   )
}

export default DetailsBrand
