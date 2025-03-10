
import React from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { TranslationType } from "@/types/package";

interface HeaderProps {
  isHeaderScrolled: boolean;
  language: string;
  setLanguage: (lang: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleLogin: (e: React.FormEvent) => void;
  t: TranslationType;
}

const Header = ({
  isHeaderScrolled,
  language,
  setLanguage,
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  t,
}: HeaderProps) => {
  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isHeaderScrolled ? "bg-white shadow-md" : "bg-[#003366]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <a href="/" className="w-12 h-12">
            <img
              src="/lovable-uploads/9dd54a53-50ad-417d-a0a2-3b4110ef83fb.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </a>
          <nav className="hidden md:flex space-x-8">
            <a
              href="/track"
              className={`transition-colors ${
                isHeaderScrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:text-blue-200"
              }`}
            >
              {t.menuTrack}
            </a>
            <a
              href="#services"
              className={`transition-colors ${
                isHeaderScrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:text-blue-200"
              }`}
            >
              {t.menuServices}
            </a>
            <a
              href="/help"
              className={`transition-colors ${
                isHeaderScrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:text-blue-200"
              }`}
            >
              {t.menuHelp}
            </a>
            <a
              href="/faq"
              className={`transition-colors ${
                isHeaderScrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:text-blue-200"
              }`}
            >
              {t.menuFaq}
            </a>
            <a
              href="/contact"
              className={`transition-colors ${
                isHeaderScrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:text-blue-200"
              }`}
            >
              {t.menuContact}
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center ${
                  isHeaderScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                <Globe className="h-4 w-4 mr-2" />
                {language}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage("DE")}>
                Deutsch
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("FR")}>
                Français
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("EN")}>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                {t.login}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t.login}</DialogTitle>
                <DialogDescription>
                  Connectez-vous pour accéder au tableau de bord
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder={t.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder={t.password}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {t.login}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default Header;
