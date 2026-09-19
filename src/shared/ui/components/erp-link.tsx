'use client';
import Link from 'next/link';
import { ComponentProps } from 'react';

export default function ErpLink(props: ComponentProps<typeof Link>) {
  //disables prefecth if no opinion
  return <Link {...{ prefetch: false, ...props }} />;
}
