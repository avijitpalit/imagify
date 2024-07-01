'use client'

import Image from 'next/image'
import React from 'react'
import styles from './sidebar.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHome, faFill, faImage } from '@fortawesome/free-solid-svg-icons'
// import "@flaticon/flaticon-uicons/css/all/all";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const Sidebar = () => {
  const pathname = usePathname()
  const links = [
    { title: 'Dashboard', href: '/', icon: faHome },
    { title: 'Generative Fill', href: '/generative-fill', icon: faUser },
    { title: 'Remove Object', href: '/remove-object', icon: faUser },
    { title: 'Replace Object', href: '/replace-object', icon: faUser },
    { title: 'Recolor Image', href: '/recolor-image', icon: faUser },
    { title: 'Restore Image', href: '/restore-image', icon: faUser }
  ]

  return (
    <aside className='site-sidebar bg-gray-100 w-[350px] flex flex-col'>
        <div className="flex items-center justify-center py-4 gap-x-2">
          <Image src={'/logo.svg'} width={60} height={0} alt='Site logo'/>
          <span className="text-lg font-semibold">Imagify</span>
        </div>

        <nav className="flex flex-col mt-5">
          {links.map(link => (
            <Link key={link.href} href={link.href} className={`p-5 transition flex gap-x-3 items-center ${ pathname === link.href ? styles.navActive : 'hover:bg-gray-200' }`}>
              <Image width={30} height={0} alt='Sidebar icon' src={'/sidebar-icons/home.svg'} />
              <i className="fi fi-rr-home"></i>
              {link.title}
            </Link>
          ))}
        </nav>

        <nav className="mt-auto flex flex-col">
          {/* <Link href={`/profile`} className={`p-4 transition flex gap-x-2 items-center ${ pathname === '/profile' ? styles.navActive : 'hover:bg-gray-200' }`}>
            <Image className='rounded-full border-2 border-white' src={'/user-placeholder.png'} width={32} height={0} alt={`User avatar`} />
            Profile
          </Link> */}
          <SignedOut>
            <SignInButton>
              <button className={`p-4 bg-secondary font-semibold text-white ${ pathname == '/sign-in' && styles.navActive }`}>Sign in</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{
              elements: {
                userButtonTrigger: 'p-4 rounded-none w-full text-left justify-start bg-gray-200',
                rootBox: 'w-full',
                userButtonBox: 'flex-row-reverse',
                userButtonOuterIdentifier: 'pl-0 text-base'
              },
              layout: {
                logoPlacement: 'inside',
                socialButtonsVariant: 'blockButton'
              }
            }} showName />
          </SignedIn>
        </nav>
    </aside>
  )
}

export default Sidebar
