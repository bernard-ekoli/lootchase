export const metadata = {
  title: "LootChase", // Automatically sets the <title> tag
  description: "A shopping site for gamers", // Sets the <meta name="description"> tag
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
