import Image from 'next/image';

export const Logo = () => (
  <Image
    src='/logo.png'
    alt='Stack Overflow Tags Logo'
    width={220}
    height={40}
  />
);
