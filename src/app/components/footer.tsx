import { Container, Typography } from '@mui/material';
import Link from 'next/link';

export const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <Container component='footer'>
      <Typography>
        created by <Link href='https://github.com/chrzanowskikamil'>chrzanowski-kamil</Link> @{year}
      </Typography>
    </Container>
  );
};
