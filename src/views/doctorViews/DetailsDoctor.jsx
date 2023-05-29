import React from "react"
import { Card, Grid, Tabs } from "@mantine/core"
import { IconFirstAidKit, IconStethoscope, IconUser } from "@tabler/icons-react"
import DetailDataDoctorSection from "./components/detailDoctorcomponents/DetailDataDoctorSection.jsx"
import CitasTabDetailDoctor from "./components/detailDoctorcomponents/CitasTabDetailDoctor.jsx"

const DetailsDoctor = () => {
   return (
      <Grid>
         <Grid.Col span={4}>
            <DetailDataDoctorSection />
         </Grid.Col>
         <Grid.Col span={8}>
            <Tabs variant="pills" radius="md" defaultValue="citas">
               <Tabs.List grow mb="md">
                  <Tabs.Tab
                     value="citas"
                     icon={<IconStethoscope size="1rem" />}
                  >
                     Citas
                  </Tabs.Tab>
                  <Tabs.Tab value="pacientes" icon={<IconUser size="1rem" />}>
                     Pacientes
                  </Tabs.Tab>
                  <Tabs.Tab
                     value="servicios"
                     icon={<IconFirstAidKit size="1rem" />}
                  >
                     Servicios
                  </Tabs.Tab>
               </Tabs.List>
               <Tabs.Panel value="citas">
                  <CitasTabDetailDoctor />
               </Tabs.Panel>
               <Tabs.Panel value="pacientes">
                  <Card>pacientes tab</Card>
               </Tabs.Panel>
               <Tabs.Panel value="servicios">
                  <Card>servicios tab</Card>
               </Tabs.Panel>
            </Tabs>
         </Grid.Col>
      </Grid>
   )
}

export default DetailsDoctor
