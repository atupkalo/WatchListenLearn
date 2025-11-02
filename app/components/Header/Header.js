import "./Header.scss";

import Image from 'next/image';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Image src="/logos/logo.svg" alt="Warch listen learn logo" width={80} height={42} />
        <div className="slogan">
          <div className="slogan-words">Watch Listen Learn</div>
          <h1 className="slogan-text">Is the best place to learn English</h1>
        </div>
      </div>
      <div className="logo-mobile">
        <Image src="/logos/logo-small.svg" alt="Truck" width={40} height={40} />
      </div>
      <div className="user">
        <Image src="/icons/user.svg" alt="Warch listen learn logo" width={32} height={32} />
        <div className="user-name">User Name</div>
      </div>
    </header>
  );
}
