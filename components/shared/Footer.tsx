import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image
            width={128}
            height={38}
            src="https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?size=338&ext=jpg&ga=GA1.1.87170709.1707782400&semt=ais"
            alt="logo"
          />
        </Link>
        <p>
          2024 Events. All Rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
