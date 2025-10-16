import { useRouter } from "next/navigation";
import { useCallback } from "react";

const useGoToPage = () => {
  const router = useRouter();

  const goToPage = useCallback((url: string) => {
    router.push(url);
  }, [router]);

  return goToPage;
};

export default useGoToPage;