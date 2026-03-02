// components/Footer.tsx
import Image from "next/image";
import { useState } from "react";

import qrcode from "@/app/assets/qrcode.png"
import { FloralRomantico } from "./FloralRomantico2";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("gomesyasmim899@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <footer className="py-10 bg-zinc-950 px-8 xl:px-0 text-gray-400 text-sm ">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:items-center">
        
        
        <div className="text-center md:text-center pt-8 xl:pt-0 order-3 lg:order-1">
          <p className="mt-1 text-gray-500">
            Com carinho!
          </p>
          <p>
            © {new Date().getFullYear()}  Yasmim & Gleison 💍
          </p>
          
        </div>

        
        <div id="pix" className="flex flex-col items-center order-2 lg:order-2">
          
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <div className="py-2 rounded-xl shadow-md">
              
              <Image
                src={qrcode}
                alt="QR Code PIX - Gleison & Yasmim"
                width={200}
                height={200}
                className="w-[150px] lg:w-[150px]"
              />
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <p className="text-xs text-gray-300 mb-2">
                Se quiser nos ajudar com um pix,<br /> qualquer valor é bem vindo!
              </p>
              <p className="text-xs text-gray-500 mb-2">
                Chave: gomesyasmim899@gmail.com<br />
                Qualquer valor é super bem-vindo! 💚
              </p>
              <button
                onClick={handleCopy}
                className="bg-green-700 hover:bg-green-800 text-white font-medium py-1 px-2 rounded-lg text-xs cursor-pointer"
              >
                {copied ? "Copiado!" : "Copiar Chave"}
              </button>
            </div>
          </div>
        </div>

        
        <div className="opacity-70 scale-90 sm:scale-100 sm:opacity-85 order-1 lg:order-3">
          
          <FloralRomantico />
        </div>
      </div>
    </footer>
  );
}