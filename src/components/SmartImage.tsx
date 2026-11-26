import {useState} from 'react';
import {Atom} from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function SmartImage({src, alt, className = '', fallbackTitle}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-sky-100 via-white to-amber-50 p-6 text-center text-slate-600 ${className}`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600/10 text-sky-700">
          <Atom className="h-6 w-6" />
        </div>
        <p className="text-sm font-semibold text-slate-700">{fallbackTitle || alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
