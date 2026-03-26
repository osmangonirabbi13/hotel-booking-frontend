import RegisterForm from "@/components/module/auth/RegisterForm";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh">

     
      <div className="flex w-full flex-col px-10 py-10 md:px-16 lg:w-190 lg:shrink-0 bg-white">

    
        <div className="mb-12">
          <Link href="/">
            <span
              className="text-xl tracking-wide text-[#1a1a1a]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
            >
              SeaPearl
            </span>
          </Link>
        </div>

    
        <div className="mb-8">
          <h1
            className="text-4xl font-normal text-[#1a1a1a]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Create your account
          </h1>
        </div>

        {/* Form */}
        <div className="w-full max-w-130">
          <RegisterForm />
        </div>

      </div>

    
      <div className="relative hidden flex-1 lg:block">
        <Image
          src="/register1.png"
          alt="SeaPearl Resort"
          fill
          priority
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

    </div>
  );
}