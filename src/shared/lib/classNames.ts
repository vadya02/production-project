type Mods = Record<string, boolean | string>;

export function classNames (mainClass: string, mods: Mods = {}, additional: string[] = []): string {
  return [
    mainClass,
    ...additional.filter(Boolean),
    Object.entries(mods)
      .filter(([className, value]) => Boolean(value))
      .map(([className, value]) => className)
  ].join(' ');
}