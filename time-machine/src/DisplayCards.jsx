import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardHeader,
  CardMedia
} from "@mui/material";

const DisplayCards = (props) => {
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 345,
        minWidth: 345,
        ":hover": {
          boxShadow: 20,
        },
        boxShadow: 2,
        marginLeft: 6,
        backgroundColor: "#aac9af"
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={props.imageUrl}
        alt="Paella dish"
      />
      <CardContent sx={{ height: 150 }}>
        <Typography variant="body2" color="text.secondary">
          {props.cardData}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={props.onClick}>
          {props.btnText}
        </Button>
      </CardActions>
    </Card>
  );
};

export default DisplayCards;
