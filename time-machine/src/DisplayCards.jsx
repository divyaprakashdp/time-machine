import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardHeader,
  CardMedia,
} from "@mui/material";

const DisplayCards = (props) => {
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: "100%",
        width: 280,
        height: 460,
        ":hover": {
          boxShadow: 20,
        },
        boxShadow: 2,
        marginLeft: 6,
        marginTop: 2,
        marginBottom: 2,
        backgroundColor: "#aac9af",
      }}
    >
      <CardMedia
        component="img"
        width="160"
        height="280"
        sx={{ objectFit: "contain" }}
        image={props.imageUrl}
        alt={props.altTitle}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
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
