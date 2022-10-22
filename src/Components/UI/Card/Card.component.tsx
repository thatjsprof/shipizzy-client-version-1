import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import style from "./Card.module.scss";
import { CardActionArea } from "@mui/material";
import React, { PropsWithChildren } from "react";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

type UICardProps = PropsWithChildren<{
  body?: string;
  styles?: object;
  title: string | JSX.Element;
}>;

const UICard = ({ title, body, styles, children }: UICardProps) => {
  return (
    <Card className={style.uiCard} style={styles}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Box color="text.secondary">{children}</Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UICard;
