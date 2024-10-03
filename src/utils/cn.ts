// create a cn function
export const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");
