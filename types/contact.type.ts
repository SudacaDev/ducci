export type SendStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface UseSendContactMailReturn {
  form: any; // UseFormReturn de react-hook-form
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string | null;
  sendStatus: SendStatus;
  reset: () => void;
}