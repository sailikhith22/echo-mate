import { SxProps } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import { Helmet } from "react-helmet";

interface PageProps {
  title?: string;
  sx?: SxProps;
  description?: string;
  children?: React.ReactNode;
}

export default function Page(props: PageProps) {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "calc(100vh - 70px)",
        minWidth: "100vw",
        ...props.sx,
      }}
    >
      <Helmet>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      {props.children}
    </Box>
  );
}
