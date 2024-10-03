declare module "*.module.css";
declare module "*.module.scss";
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string; // Add any other environment variables as needed
  }
}
