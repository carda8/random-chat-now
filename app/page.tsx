import Hero from "./lib/landing-page/components/Hero";
import ThemeProviderWrapper from "./lib/themeProvider";

export default function Home() {
  return (
    <main>
      <ThemeProviderWrapper>
        <Hero />
      </ThemeProviderWrapper>
    </main>
  );
}
