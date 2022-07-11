import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface ICarouselProps {
  gap?: string;
  Heading?: any;
  NavigationIcon?: any;
  itemsToDisplay: number;
  showNavigation?: boolean;
  items: React.ReactElement[];
}

interface IOuterNavigation {
  step: number;
  steps: number;
  prevStep: () => void;
  nextStep: () => void;
}

const spliceItems = (
  items: React.ReactElement[],
  index: number,
  step: number
): React.ReactElement[] => {
  return items.slice((step - 1) * index, index * step);
};

const NavigationBox = styled(Box)<{ state: { active: boolean } }>(
  ({ state: { active } }) => {
    return {
      width: "50px",
      height: "50px",
      display: "flex",
      cursor: "pointer",
      borderRadius: "50%",
      position: "relative",
      color: active ? "#fff" : "inherit",
      backgroundColor: active ? "#003060 " : "#ddd",
    };
  }
);

const OuterNavigation = ({
  step,
  steps,
  prevStep,
  nextStep,
}: IOuterNavigation) => {
  let prevActive = false,
    nextActive = false;

  if (step === steps) {
    nextActive = false;
    prevActive = true;
  } else if (step < steps && step !== 1) {
    nextActive = true;
    prevActive = true;
  } else {
    nextActive = true;
    prevActive = false;
  }

  return (
    <>
      <NavigationBox state={{ active: prevActive }}>
        <ArrowBackIosIcon
          onClick={prevStep}
          sx={{
            top: "50%",
            left: "60%",
            fontSize: "18px",
            position: "absolute",
            transform: "translate(-50%, -50%)",
          }}
        />
      </NavigationBox>
      <NavigationBox state={{ active: nextActive }}>
        <ArrowForwardIosIcon
          onClick={nextStep}
          sx={{
            top: "50%",
            left: "55%",
            fontSize: "18px",
            position: "absolute",
            transform: "translate(-50%, -50%)",
          }}
        />
      </NavigationBox>
    </>
  );
};

const Carousel = ({
  gap,
  items,
  Heading,
  itemsToDisplay,
  NavigationIcon,
  showNavigation = true,
}: ICarouselProps) => {
  const [step, setStep] = React.useState<number>(1);
  const calculateSteps = Math.ceil(items.length / itemsToDisplay);
  const steps = calculateSteps === 0 ? 1 : calculateSteps;

  const prevStep = () => {
    step > 1 && setStep(step - 1);
  };

  const nextStep = () => {
    step < steps && setStep(step + 1);
  };

  const initStep = (index: number) => {
    setStep(index);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", mb: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Heading />
        </Box>
        <Box sx={{ display: "flex", gap: "15px", alignItems: "flex-end" }}>
          <OuterNavigation
            step={step}
            steps={steps}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: gap || "15px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {spliceItems(items, itemsToDisplay, step).map((item) => {
          return (
            <Box sx={{ width: `calc(100% / ${itemsToDisplay})` }}>{item}</Box>
          );
        })}
      </Box>
      {showNavigation && (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {Array.from({ length: steps }, () => "").map((_, index) => {
                const innerStep = index + 1;

                return (
                  <Box
                    key={index}
                    sx={{ cursor: "pointer", "&:not(:last-child)": { mr: 2 } }}
                  >
                    {NavigationIcon ? (
                      <NavigationIcon
                        step={step}
                        index={innerStep}
                        onClick={initStep}
                      />
                    ) : (
                      <FiberManualRecordIcon
                        onClick={() => initStep(innerStep)}
                        sx={{
                          margin: 0,
                          padding: 0,
                          fontSize: "25px",
                          borderRadius: "50%",
                          border: "1px solid #ddd",
                          color:
                            innerStep === step ? "primary.main" : "transparent",
                        }}
                      />
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Carousel;
