import type { Metadata } from 'next';
import Providers from './providers';
import { AppBar, Container, CssBaseline, Stack } from '@mui/material';
import { Logo } from './components/logo';
import { Footer } from './components/footer';

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
      <body>
        <CssBaseline />
        <Providers>
          <Stack
            height='100vh'
            spacing={6}
            justifyContent='space-between'
            alignItems='center'>
            <AppBar
              color='transparent'
              position='static'
              sx={{ boxShadow: 'none', borderBottom: '1px solid #E4E6E7' }}>
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
