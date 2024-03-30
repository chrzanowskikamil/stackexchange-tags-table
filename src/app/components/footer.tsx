import { Container, Typography } from '@mui/material';
import Link from 'next/link';

export const Footer = () => {
  const githubLink = 'https://github.com/chrzanowskikamil';
  const date = new Date();

  return (
    <Container component='footer'>
      <Typography>
        created by <Link href={githubLink}>chrzanowski-kamil</Link> @{date.getFullYear()}
      </Typography>
    </Container>
  );
};
