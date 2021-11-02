import React, { PropsWithChildren } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

type UICardProps = PropsWithChildren<{
  title: string | JSX.Element;
  styles?: object;
  body?: string;
}>;

const UICard = ({ title, body, styles, children }: UICardProps) => {
  return (
    <Card style={styles}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {children}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UICard;
