const BLOCKCHAIN_BASE_URL = 'https://blockchain.info';
const HASKOIN_BASE_URL = 'https://api.blockchain.info/haskoin-store/btc';

export const fetchLatestBlock = async () => {
  const response = await fetch('/api-latestblock');

  if (!response.ok) {
    throw new Error('Failed to fetch latest block');
  }

  return response.json();
};

export const fetchBlockByHash = async (blockHash: string) => {
  const response = await fetch(`${BLOCKCHAIN_BASE_URL}/rawblock/${blockHash}?cors=true`);

  if (!response.ok) {
    throw new Error('Block not found');
  }

  return response.json();
};

export const fetchBlocksByHeights = async (heights: number[]) => {
  const heightsParam = heights.join(',');
  const response = await fetch(
    `${HASKOIN_BASE_URL}/block/heights?heights=${heightsParam}&notx=true&cors=true`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch blocks by heights');
  }

  return response.json();
};

export const fetchTransactionsByIds = async (txids: string[]) => {
  const txidsParam = txids.join(',');
  const response = await fetch(
    `${HASKOIN_BASE_URL}/transactions?txids=${txidsParam}&cors=true`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }

  return response.json();
};

export const fetchRecentBlocks = async (count: number = 10) => {
  const latestBlock = await fetchLatestBlock();

  const recentHeights: number[] = [];
  for (let i = 0; i < count; i++) {
    recentHeights.push(latestBlock.height - i);
  }

  const blocks = await fetchBlocksByHeights(recentHeights);

  const txids: string[] = blocks
    .map((block: { tx?: string[] }) => block.tx?.[0])
    .filter(Boolean);

  const transactions = await fetchTransactionsByIds(txids);

  return {
    blocks,
    transactions,
    latestHeight: latestBlock.height
  };
};

export const calculateConfirmations = async (blockHeight: number): Promise<number> => {
  try {
    const latestBlock = await fetchLatestBlock();
    return latestBlock.height - blockHeight;
  } catch (error) {
    console.error('Error calculating confirmations:', error);
    return 0;
  }
};
