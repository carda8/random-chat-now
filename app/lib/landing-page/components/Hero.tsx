"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLocalStorageAgreement } from "@/app/utils/localStorage";

export default function Hero() {
  const router = useRouter();
  const [agreement, setAgreement] = useState("");

  const onPressChatNow = () => {
    // console.log("pressed");
    if (agreement) router.push("/chat");
    else router.push("/agreement");
  };

  useEffect(() => {
    const res = getLocalStorageAgreement();
    if (res) setAgreement(res);
  }, []);

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
        >
          <Typography
            variant="h1"
            className="text-black"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
            }}
          >
            Dive&nbsp;into&nbsp;
            <Typography
              component="span"
              variant="h1"
              className="text-blue"
              sx={(theme) => ({
                fontSize: "inherit",
                ...theme.applyStyles("dark", {
                  color: "primary.light",
                }),
              })}
            >
              chats
            </Typography>
          </Typography>
          <Typography
            className="text-secondary"
            sx={{
              textAlign: "center",
              width: { sm: "100%", md: "80%" },
            }}
          >
            Say goodbye to barriers and hello to stranger
          </Typography>
          {/* Welcome to ChatBox, the ultimate ramdom chat for seamless and
          worry-free communication.  */}
          {/* <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            <InputLabel htmlFor="email-hero" sx={visuallyHidden}>
              Email
            </InputLabel>
            <TextField
              id="email-hero"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Your email address"
              autoComplete="off"
            />

            <Button color="primary">Start now</Button>
          </Stack> */}

          <GradientCircularProgress onPress={onPressChatNow} />

          {/* <Typography
            className="text-secondary"
            variant="caption"
            sx={{ textAlign: "center" }}
          >
            By clicking &quot;Chat now&quot; you agree to our&nbsp;
            <Link href="setting/termsOfUse">
              <span className="text-blue">Terms & Conditions</span>
            </Link>
            .
          </Typography> */}
        </Stack>
        {/* <div className="w-full h-60 border border-[#bfc8d987] rounded-xl shadow-xl shadow-[#BFC8D933] mt-8"></div> */}
        {/* <StyledBox id="image">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            <InputLabel htmlFor="email-hero" sx={visuallyHidden}>
              Email
            </InputLabel>
            <TextField
              id="email-hero"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Your email address"
              autoComplete="off"
            />

            <Button color="primary">Send</Button>
          </Stack>
        </StyledBox> */}
      </Container>
    </Box>
  );
}

// From https://github.com/mui/material-ui/issues/9496#issuecomment-959408221
export function GradientCircularProgress({
  title,
  subTitle,
  onPress,
}: {
  title?: string;
  subTitle?: string;
  onPress?: () => void;
}) {
  return (
    <>
      {/* <Link href="/chat"> */}
      <button onClick={onPress}>
        <Box sx={{ position: "relative", display: "" }}>
          <svg width={0} height={0}>
            <defs>
              <linearGradient
                id="my_gradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#1D1E181A" />
                <stop offset="100%" stopColor="#0496FF" />
              </linearGradient>
            </defs>
          </svg>
          <CircularProgress
            // variant="determinate"
            disableShrink
            // value={100}
            size={140}
            thickness={1}
            sx={{
              circle: {
                stroke: "url(#my_gradient)",
                strokeDasharray: "220px",
              },
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              className="text-black"
              fontWeight={900}
              fontSize={32}
            >
              {title ? title : "CHAT"}
            </Typography>
            <Typography
              variant="caption"
              component="div"
              className="text-black"
              fontWeight={900}
              fontSize={24}
            >
              {subTitle ? subTitle : "NOW"}
            </Typography>
          </Box>
        </Box>
      </button>
      {/* </Link> */}
    </>
  );
}
