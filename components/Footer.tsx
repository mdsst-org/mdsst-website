// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-slate-900 py-8 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 text-center space-y-2">
        <p className="text-sm">
          © {new Date().getFullYear()} Maa Durga Seva Sansthan Trust. All rights reserved.
        </p>
        <p className="text-xs">
          DARPAN ID: JH/2025/0684825 • PAN: AAKTM1699R
        </p>
        <p className="text-xs">
          Nayadih, Baliapur, Dhanbad, Jharkhand- 828201, India • Email: info@mdsst.org • Phone: +91 9431390575
        </p>
      </div>
    </footer>
  );
}
