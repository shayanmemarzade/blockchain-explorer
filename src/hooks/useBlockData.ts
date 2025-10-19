import { useState, useEffect, useCallback } from 'react';
import type { BlockData } from '../types/block';
import { fetchBlockByHash, calculateConfirmations } from '../api';

interface UseBlockDataResult {
  blockData: BlockData | null;
  confirmations: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useBlockData = (blockHash: string | undefined): UseBlockDataResult => {
  const [blockData, setBlockData] = useState<BlockData | null>(null);
  const [confirmations, setConfirmations] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!blockHash) {
      setError('No block hash provided');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const block: BlockData = await fetchBlockByHash(blockHash);
      setBlockData(block);
      const blockConfirmations = await calculateConfirmations(block.height);
      setConfirmations(blockConfirmations);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch block data';
      setError(errorMessage);
      setBlockData(null);
      console.error('Error fetching block data:', err);
    } finally {
      setLoading(false);
    }
  }, [blockHash]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    blockData,
    confirmations,
    loading,
    error,
    refetch: fetchData,
  };
};
