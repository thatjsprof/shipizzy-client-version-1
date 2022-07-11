import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Carousel from "Components/UI/Carousel/Carousel";
import TestimonialData from "../Testimonial/TestimonialData";

const CustomBox = styled(Box)(() => ({
  cursor: "pointer",
  transition: ".5s",
  padding: "15px 12px",
  borderRadius: "10px",
  backgroundColor: "#fff",
  "&:hover": {
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
  },
}));

const items = TestimonialData.map((testimonial) => {
  const { name, content, company, image, rating } = testimonial;
  return (
    <CustomBox>
      <Avatar alt={name} sx={{ width: 50, height: 50 }} src={image} />
      <Typography sx={{ mt: 2, mb: 4, color: "#808080" }}>{content}</Typography>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography>
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {name}
            </Box>
            <br />
            <Box component="span" sx={{ color: "#808080" }}>
              {company}
            </Box>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", mb: 1, alignItems: "flex-end" }}>
          <Rating
            readOnly
            name="rating"
            precision={0.5}
            defaultValue={rating}
          />
        </Box>
      </Box>
    </CustomBox>
  );
});

const Testimonial = () => {
  const Heading = () => {
    return (
      <Box>
        <Typography sx={{ color: "primary.main" }}>Services</Typography>
        <Typography sx={{ mb: 1 }} variant="h4">
          Our Services
        </Typography>
        <Typography sx={{ color: "#808080", maxWidth: "300px" }}>
          Browse through the reviews of people who have used our service
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ marginBottom: "6rem" }} component="section">
      <Container maxWidth="lg">
        <Carousel
          items={items}
          Heading={Heading}
          itemsToDisplay={3}
          showNavigation={false}
        />
      </Container>
    </Box>
  );
};

export default Testimonial;
