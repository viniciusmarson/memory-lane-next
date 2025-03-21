"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { useAlert } from "@/hooks/useAlert";

type ErrorProps = {
  error: Error & { digest?: string };
};

export default function Error({ error }: ErrorProps) {
  const { showAlert } = useAlert();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    showAlert("Something went wrong!", "error", 3000);
  }, [error, showAlert]);
}
