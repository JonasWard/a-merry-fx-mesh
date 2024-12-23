import { IntDataEntry } from 'url-safe-bitpacking/dist/types';
import { BASE_64_TEXT } from '../modelDefinition/types/indexText';
import { ColorType } from '../modelDefinition/types/version0.generatedType';

/**
 * Benchmarking helper method that wraps a method, returns it output and measure the output
 * @param fn - () => any method to benchmark
 * @param text - optional name / decsription of the method (displays as <text> took: <time> ms), default is the method name
 * @returns output of the method
 */
export const measurePerformance = (fn: () => any, text?: string) => {
  const start = performance.now();
  const output = fn();
  const end = performance.now();
  const fText = text ?? fn.name;
  console.log(`${fText} took: ${(end - start).toFixed(2)} ms`);
  return output;
};

export const getText = (text: { s: IntDataEntry; v: { Text: IntDataEntry }[] }) => text.v.map((i) => BASE_64_TEXT[i.Text.value]).join('');
export const getColor = (c: ColorType): [number, number, number] => [c.R.value / 255, c.G.value / 255, c.B.value / 255];
