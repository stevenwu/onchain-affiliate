'use client';

import { GitHubLogoIcon } from '@radix-ui/react-icons';
import NextLink from 'next/link';
import { NavbarLink } from '@/components/layout/header/Navbar';
import FooterIcon from './FooterIcon';

export default function Footer() {
  return (
    <footer className="flex flex-1 flex-col justify-end">
      <div className="flex flex-col justify-between gap-16 bg-blue-600 py-12">
        <div className="container mx-auto flex w-full flex-col justify-between gap-16 px-8 md:flex-row">
          <div className="flex flex-col justify-between">
            <div className="flex h-8 items-center justify-start gap-4">
              <NextLink href="/" passHref className="relative h-8 w-8" aria-label="Home page">
                <FooterIcon />
              </NextLink>
              <NextLink
                href="/"
                passHref
                className="font-robotoMono text-center text-xl font-medium text-white no-underline"
              >
                ONCHAIN AFFILIATE
              </NextLink>
              <NavbarLink href="https://github.com/coinbase/build-onchain-apps" target="_blank">
                <GitHubLogoIcon
                  width="24"
                  height="24"
                  aria-label="build-onchain-apps Github respository"
                />
              </NavbarLink>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
