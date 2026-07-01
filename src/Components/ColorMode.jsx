"use client"


import { Button } from "@chakra-ui/react"
import { ColorModeButton, useColorMode } from "./ui/color-mode"


const ColorMode = () => {
  const { toggleColorMode } = useColorMode()
  return <ColorModeButton    />
}

export default ColorMode