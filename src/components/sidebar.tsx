'use client'

import Image from 'next/image'
import React from 'react'
import styles from './sidebar.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const Sidebar = () => {
  const pathname = usePathname()
  const links = [
    { title: 'Dashboard', href: '/' },
    { title: 'Generative Fill', href: '/generative-fill' },
    { title: 'Remove Object', href: '/remove-object' },
    { title: 'Replace Object', href: '/replace-object' },
    { title: 'Recolor Image', href: '/recolor-image' },
    { title: 'Restore Image', href: '/restore-image' }
  ]

  return (
    <aside className='site-sidebar bg-gray-100 w-[350px] flex flex-col'>
        <div className="flex items-center justify-center py-4 gap-x-2">
          <Image src={'/logo.svg'} width={60} height={0} alt='Site logo'/>
          <span className="text-lg font-semibold">Imagify</span>
        </div>

        <nav className="flex flex-col mt-5">
          {links.map(link => (
            <Link key={link.href} href={link.href} className={`p-5 transition ${ pathname === link.href ? styles.navActive : 'hover:bg-gray-200' }`}>{link.title}</Link>
          ))}
        </nav>

        <nav className="mt-auto flex flex-col">
          {/* <Link href={`/profile`} className={`p-4 transition flex gap-x-2 items-center ${ pathname === '/profile' ? styles.navActive : 'hover:bg-gray-200' }`}>
            <Image className='rounded-full border-2 border-white' src={'/user-placeholder.png'} width={32} height={0} alt={`User avatar`} />
            Profile
          </Link> */}
          <SignedOut>
            <SignInButton className='p-5 justify-start text-left bg-secondary text-white'/>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{
              elements: {
                button: 'bg-slate-500 hover:bg-slate-400 text-sm',
                
              },
              layout: {
                logoPlacement: 'inside',
                socialButtonsVariant: 'blockButton'
              }
            }} showName />
          </SignedIn>
        </nav>

        {/* <nav>
          <SignedIn>
            <UserButton/>
          </SignedIn>
          <SignedOut>
            <SignInButton/>
          </SignedOut>
        </nav> */}
    </aside>
  )
}

export default Sidebar
