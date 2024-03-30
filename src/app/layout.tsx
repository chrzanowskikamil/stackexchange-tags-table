import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppBar, Container, Stack } from '@mui/material';
import Providers from './providers';
import { Logo } from './components/logo';
import { Footer } from './components/footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stackexchange Tags Table',
  description: 'Created by @chrzanowskikamil',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <Stack
            height='100vh'
            spacing={4}
            justifyContent='space-between'>
            <AppBar
              color='transparent'
              position='static'>
              <Container sx={{ paddingY: '2rem' }}>
                <Logo />
              </Container>
            </AppBar>
            {children}
            <Footer />
          </Stack>
        </Providers>
      </body>
    </html>
  );
}
