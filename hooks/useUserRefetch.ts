import { useAuthStore } from '@/stores/useAuthStore';
import { useCallback } from 'react';

/**
 * Hook to trigger user data refetch after CRUD operations
 * 
 * Usage:
 * const refreshUser = useUserRefetch();
 * 
 * // After any operation that modifies user data:
 * await updateProfile(data);
 * await refreshUser(); // Syncs all pages with latest data
 */
export function useUserRefetch() {
  const refetchUser = useAuthStore((state) => state.refetchUser);
  
  return useCallback(async () => {
    await refetchUser();
  }, [refetchUser]);
}

/**
 * Higher-order function to wrap API calls with automatic refetch
 * 
 * Usage:
 * const updateProfileWithRefetch = withUserRefetch(async (data) => {
 *   const response = await fetch('/api/user/profile', {
 *     method: 'PUT',
 *     body: JSON.stringify(data),
 *   });
 *   return response.json();
 * });
 * 
 * await updateProfileWithRefetch(profileData);
 * // User data automatically refetched after operation
 */
export function withUserRefetch<T extends (...args: any[]) => Promise<any>>(
  operation: T
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>) => {
    const result = await operation(...args);
    
    // Refetch user data after operation
    const refetchUser = useAuthStore.getState().refetchUser;
    await refetchUser();
    
    return result;
  };
}

/**
 * Utility to manually trigger refetch (for use outside React components)
 */
export const refreshUserData = async () => {
  const refetchUser = useAuthStore.getState().refetchUser;
  await refetchUser();
};
