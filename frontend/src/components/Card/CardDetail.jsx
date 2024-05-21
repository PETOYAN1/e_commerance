/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { Link } from "react-router-dom";

const CardDetail = ({ product }) => {
  const [value, setValue] = useState(2.35);
  const imageUrl = product.images?.[0]?.url ?? "/src/assets/images/no-image.jpg";
  return (
    <>
      <Card
        sx={{
          maxWidth: 333,
          mt: 3,
          cursor: "pointer",
          borderRadius: "25px",
          ":hover .MuiCardMedia-root ": {
            rotate: "1deg",
            scale: "1.1",
            transition: "0.35s",
          },
        }}
      >
        <Link to={"/product"}> 
          <CardMedia
            component="img"
            alt="green iguana"
            sx={{ height: 277 }}
            image={imageUrl}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              { product.name }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </CardContent>
        </Link>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button size="small">
            <AddShoppingCartIcon fontSize="small" /> Add To Card
          </Button>
          <Rating
            precision={0.1}
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </CardActions>
      </Card>
    </>
  );
};

export default CardDetail;
