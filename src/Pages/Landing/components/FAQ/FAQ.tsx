import React from "react";
import FAQData from "./FAQData";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  border: `none`,
  "&:before": {
    display: "none",
  },
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  backgroundColor: "transparent",
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary {...props} />
))(() => ({
  padding: 0,
  backgroundColor: "transparent",

  "&.Mui-expanded svg[data-testid='AddIcon']": {
    transform: "rotate(45deg)",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: "15px 0px",
  borderTop: "2px solid rgba(0, 0, 0, .125)",
}));

const FAQ = () => {
  const [expanded, setExpanded] = React.useState<string | false>("faq1");

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Box component="section" sx={{ marginBottom: "5rem" }}>
      <Container sx={{ position: "relative" }} maxWidth="lg">
        <Box
          component="img"
          sx={{ position: "absolute", left: "-12%", top: "20%" }}
          src="/Images/Landing/Search.png"
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: "40px", lineHeight: "48px" }}>
                Any Questions? <br />
                We got you.
              </Typography>
              <Typography sx={{ maxWidth: "500px", mt: 4 }}>
                We Place utmost priority on getting your petinent questions
                answered. Check through to find answers to your frequently
                answered questions. You can also visit the main FAQ Page.
              </Typography>
              <Link
                to="#"
                style={{
                  display: "flex",
                  color: "#003060",
                  marginTop: "25px",
                  alignItems: "center",
                }}
              >
                Learn More
                <ArrowForwardIcon
                  sx={{
                    marginLeft: "10px",
                    fontSize: "15px",
                    color: "#003060",
                  }}
                />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ mb: 5 }}>
              {FAQData.map((faq, index) => {
                const indexToUse = index + 1;
                const { title, description } = faq;

                return (
                  <Accordion
                    expanded={expanded === `faq${indexToUse}`}
                    onChange={handleChange(`faq${indexToUse}`)}
                  >
                    <AccordionSummary
                      id={`panel-header-${indexToUse}`}
                      aria-controls={`panel-content-${indexToUse}`}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography sx={{ flexGrow: "1" }}>{title}</Typography>
                      <AddIcon />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box className="accordion-content">
                        <Typography>{description}</Typography>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FAQ;
