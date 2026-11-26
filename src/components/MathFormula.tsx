import {useMemo} from 'react';
import katex from 'katex';

interface MathFormulaProps {
  latex: string;
  block?: boolean;
  className?: string;
}

export function MathFormula({latex, block = false, className = ''}: MathFormulaProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return latex;
    }
  }, [latex, block]);

  if (block) {
    return (
      <div
        className={`katex-block overflow-x-auto py-1 text-slate-900 ${className}`}
        dangerouslySetInnerHTML={{__html: html}}
      />
    );
  }

  return (
    <span
      className={`inline-block align-middle ${className}`}
      dangerouslySetInnerHTML={{__html: html}}
    />
  );
}
