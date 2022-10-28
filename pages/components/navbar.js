import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router'
function Navbar() {
  const router = useRouter()
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark primary-color">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className={"nav-item " + ` ${router.pathname === '/' ? 'active' : ''} `}>
      <Link href="/">
        <a className="nav-link ">Home <span className="sr-only">(current)</span></a>
      </Link>
      </li>
      <li className={"nav-item " + ` ${router.pathname === '/about' ? 'active' : ''} `}>
      <Link href="/about">
        <a className="nav-link">About</a>
      </Link>
      </li>
      <li className={"nav-item " + ` ${router.pathname === './blog/blog' ? 'active' : ''} `}>
      <Link href="../blog/blog">
        <a className="nav-link">Blog</a>
      </Link>
      </li>
    </ul>
  </div>
</nav>
    </div>
  )
}

export default Navbar