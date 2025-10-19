import { useState } from 'react'
import styles from '../../styles/Search.module.scss';
import { useNavigate } from 'react-router';
import { fetchBlockByHash } from '../../api';
import { ToastContainer, toast } from 'react-toastify';

export default function Search() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("00000000000000000005ca55a40c80213c61e5dfc6a5c2d6d38263303ead1468");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    const blockHash = searchQuery;
    if (!blockHash.trim()) return;

    setLoading(true);
    try {
      await fetchBlockByHash(blockHash);
      navigate(`/explorer/blocks/btc/${blockHash}`);
    } catch {
      toast.error('Block not found. Please check the hash and try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ToastContainer />
      <form className={styles.searchForm}>
        <div className={styles.searchInputContainer}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id='search'
            name='search'
            placeholder='Search for transaction hash...'
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
          />
        </div>
        <button
          onClick={(e) => handleSearch(e)}
          type='submit'
          disabled={loading || !searchQuery.trim()}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </>

  )
}
