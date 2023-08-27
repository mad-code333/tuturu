import { Navigation } from '@/components/navigation';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';

interface LayoutProps {
  params: {
    wsId?: string;
  };
  children: React.ReactNode;
}

export default async function Layout({
  children,
  params: { wsId },
}: LayoutProps) {
  const navLinks = [
    {
      name: 'Home',
      href: '/',
      matchExact: true,
    },
    {
      name: 'Chat',
      href: '/ai',
    },
    {
      name: 'Dashboard',
      href: `/${wsId}`,
      matchExact: true,
    },
    {
      name: 'Users',
      href: `/${wsId}/users`,
    },
    {
      name: 'Calendar',
      href: `/${wsId}/calendar`,
    },
    {
      name: 'Documents',
      href: `/${wsId}/documents`,
    },
    {
      name: 'Boards',
      href: `/${wsId}/boards`,
    },
    {
      name: 'Inventory',
      href: `/${wsId}/inventory`,
    },
    {
      name: 'Healthcare',
      href: `/${wsId}/healthcare`,
    },
    {
      name: 'Finance',
      href: `/${wsId}/finance`,
    },
    {
      name: 'Notifications',
      href: `/${wsId}/notifications`,
    },
    {
      name: 'Settings',
      href: `/${wsId}/settings`,
    },
  ];

  return (
    <>
      <div className="p-4 font-semibold md:px-8 lg:px-16 xl:px-32">
        <Link href="/" className="mb-2 flex items-center gap-2">
          <Image
            src="/media/logos/transparent.png"
            width={320}
            height={320}
            alt="logo"
            className="h-7 w-7"
          />
          <div className="text-2xl text-black hover:text-zinc-700 dark:text-white dark:hover:text-zinc-200">
            Tuturuuu
          </div>
        </Link>

        <div className="flex gap-1">
          <Navigation navLinks={navLinks} />
        </div>
      </div>

      <Separator />

      <div className="p-4 md:px-8 lg:px-16 xl:px-32">{children}</div>
    </>
  );
}
