'use client'

import Image from 'next/image'
import React from 'react'
import styles from './sidebar.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHome, faFill, faImage, faWandMagicSparkles, faEraser, faObjectGroup, faPallet, faPalette } from '@fortawesome/free-solid-svg-icons'
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
    { title: 'Generative Fill', href: '/generative-fill', icon: faWandMagicSparkles },
    { title: 'Remove Object', href: '/remove-object', icon: faEraser },
    { title: 'Replace Object', href: '/replace-object', icon: faObjectGroup },
    { title: 'Recolor Image', href: '/recolor-image', icon: faPalette },
    { title: 'Restore Image', href: '/restore-image', icon: faImage }
  ]

  return (
    <aside className='site-sidebar bg-gray-100 w-[350px] flex flex-col'>
        <div className="flex items-center py-4 gap-x-2 px-3 justify-center">
          <Image src={'/logo.svg'} width={40} height={0} alt='Site logo'/>
          <span className="text-lg font-semibold">Imagify</span>
        </div>

        <nav className="flex flex-col mt-5 px-3 gap-1">
          {links.map(link => (
            <Link key={link.href} href={link.href} className={`p-5 transition flex gap-x-3 items-center rounded-lg ${ pathname === link.href ? styles.navActive : 'hover:bg-gray-200' }`}>
              <FontAwesomeIcon icon={link.icon}/>
              {link.title}
            </Link>
          ))}
        </nav>

        <nav className="mt-auto flex flex-col px-3 mb-3">
          <SignedOut>
            <SignInButton>
              <button className={`p-4 bg-[#0001] rounded-lg font-semibold ${ pathname == '/sign-in' && styles.navActive }`}>Sign in</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{
              elements: {
                userButtonTrigger: 'p-4 rounded-lg w-full text-left justify-start bg-gray-200',
                rootBox: 'w-full',
                userButtonBox: 'flex-row-reverse',
                userButtonOuterIdentifier: 'pl-0 text-base'
              }
            }} showName />
          </SignedIn>
        </nav>
    </aside>
  )
}

export default Sidebar
