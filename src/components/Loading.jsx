import React, { useEffect } from "react"
import { LoadingOverlay } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useIsFetching, useIsMutating } from "@tanstack/react-query"

const Loading = () => {
   const [visible, { open, close }] = useDisclosure(false)

   const isFetching = useIsFetching()
   const isMutating = useIsMutating()

   useEffect(() => {
      if (isFetching || isMutating) {
         open()
      } else {
         close()
      }
   }, [isFetching, isMutating])

   return (
      <LoadingOverlay visible={visible} />
   )
}

export default Loading