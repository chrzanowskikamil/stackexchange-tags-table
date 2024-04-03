import { FC } from 'react';
import Link from 'next/link';
import { Container, Typography } from '@mui/material';

export const Footer: FC = () => {
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
