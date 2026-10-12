export interface SpinnerProps {
  className?: string;
  message?: string;
}

export interface SpinnerContextValue {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
}
