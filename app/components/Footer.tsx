// components/Footer.tsx
import Image from "next/image";

import qrcode from "@/app/assets/qrcode.png"
import { FloralRomantico } from "./FloralRomantico2";
// import { HeraEntrelaçada } from "./HeraEntrelaçada";

export function Footer() {
  return (
    <footer className="py-10 px-6 bg-zinc-950 from-background to-gray-950/50 text-gray-400 text-sm border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-center">
        
        {/* Esquerda: Copyright + corações */}

        <div className="text-center md:text-left">
          <p>
            © {new Date().getFullYear()} — Gleison & Yasmim 💍
          </p>
          <p className="mt-1 text-gray-500">
            Feito com carinho em Horizonte-CE
          </p>
        </div>

        {/* Centro ou direita: Área PIX */}
        <div className="flex flex-col items-center">
          <p className="text-gray-300 font-medium">
            Apoie nosso cantinho via PIX
          </p>
          
          <div className=" py-2 rounded-xl shadow-md ">
            {/* Substitua pelo seu QR Code real (salve em public/pix-qr.png) */}
            <Image
              src={qrcode} // coloque o arquivo na pasta public/
              alt="QR Code PIX - Gleison & Yasmim"
              width={200}
              height={200}
              className="rounded-md"
            />
          </div>

          <p className="text-xs text-gray-500 text-center">
            Chave: gomesyasmim899@gmail.com<br />
            Qualquer valor é super bem-vindo! 💚
          </p>
        </div>

        {/* Decoração sutil: pequeno ramo de oliveira minimalista */}
        <div className="opacity-70 scale-90 sm:scale-100 sm:opacity-85">
          {/* Você pode usar SVG inline ou imagem. Aqui um SVG simples */}
          <FloralRomantico />
        </div>
      </div>
    </footer>
  );
}