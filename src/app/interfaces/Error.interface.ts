export interface ErrorInterface {
  error?: {
    message?: string;
    [key: string]: string | undefined;
  };
}