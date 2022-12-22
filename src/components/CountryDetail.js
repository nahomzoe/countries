import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "@mui/material/Link";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CountryDetail() {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((res) => {
        setCountry(res.data[0]);
      });
  }, []);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    country && (
      <Card sx={{ maxWidth: 345, m: "auto", mt: 10 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {country.name.common.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={country.name.common}
          subheader={country.capital}
        />
        <CardMedia
          component="img"
          height="194"
          image={country.flags.png}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            The country belongs to {country.region} and {country.subregion}{" "}
            sub-region. Located at the {country.latlng[0]} °N and{" "}
            {country.latlng[1]} °W, this country has population of{" "}
            {country.population} and it has gained the independent,according to
            the CIA World Factbook.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Link href="/">
              <KeyboardReturnIcon />
            </Link>
          </IconButton>
          <IconButton aria-label="share">
            <Link href={country.maps.openStreetMaps}>
              <LocationOnIcon />
            </Link>
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              place holder for weather info . . .
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    )
  );
}
