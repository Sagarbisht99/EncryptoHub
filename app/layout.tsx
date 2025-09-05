import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Component/Navbar";
import Background from "./Component/Background";
import { ClerkProvider } from "@clerk/nextjs";
import { FormProvider } from "./Contexts/FormContext";
import { ThemeProvider } from "./Contexts/ThemeContext";
import { PasswordProvider } from "./Contexts/GeneratorContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FileUploadProvider } from "./Contexts/UploadContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EncryptoHub",
  description: "It is the platforms which provides management facility",
  icons: {
    icon: "/logo.svg", // path inside public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          modalBackdrop: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
          },
          modalContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '1rem',
          },
          card: {
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        >
          <ThemeProvider
          >
            <FileUploadProvider>
              <PasswordProvider>
                <FormProvider>
                  <Background />
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    style={{ fontSize: "14px" }}
                    toastStyle={{
                      background: "var(--background)",
                      color: "var(--foreground)",
                      border: "1px solid var(--border)",
                      borderRadius: "0.75rem",
                      boxShadow:
                        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    }}
                    aria-label="Notifications"
                  />
                </FormProvider>
              </PasswordProvider>
            </FileUploadProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
