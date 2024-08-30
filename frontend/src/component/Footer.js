import React from "react"
import { useTheme } from "@emotion/react"
import { Box, createTheme, Theme } from "@mui/material"

const Footer = () => {
    const theme = useTheme()
    return (
    <> 
    <Box sx={
        {
        height: '70px',
        backgroundColor: theme.palette.secondary.midNightBlue,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
       <Box component="span" sx={{ color: theme.palette.primary.main, fontWeight: "bold", ml: 1 }}>
  All Rights reserved 2024.
</Box>
    </Box>
    
    </>
)
    }

export default Footer