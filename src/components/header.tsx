import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function Header() {
  return (
    <header className="w-full h-12 bg-rose-500 flex justify-between items-center p-4">
      <div></div>
      <div>
        <p>noisecheck</p>
      </div>
      <nav className="w-8 h-8">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
}
