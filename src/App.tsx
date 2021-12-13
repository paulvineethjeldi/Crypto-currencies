import { Input } from "@mui/material/";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Crypto from "./components/Crypto";
import GlobalMarket from "./components/GlobalMarket";
import Pagination from "./components/Pagination";
import SearchCoin from "./components/SearchCoin";
import Trending from "./components/Trending";

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(10);
  const [coinSearch, setCoinSearch] = useState("");
  const [coinInfo, setCoinInfo] = useState();
  const [showList, setShowList] = useState(true);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showTrending, setShowTrending] = useState(false);
  const [showGlobal, setShowGlobal] = useState(false);
  const [globalMarketData, setGlobalMarketData] = useState({});
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [error, setError] = useState(null);

  // To get all coins information
  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=250&page=1&sparkline=false"
        );
        setCoins(res.data);
      } catch (error: any) {
        setError(error);
      }

      setLoading(false);
    };

    fetchCoins();
  }, []);

  // To get individual coin information based on search
  const getCoinInfo = async () => {
    setLoading(true);
    try {
      const info = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinSearch.toLowerCase()}`
      );
      setCoinInfo(info.data);
      setError(null);
    } catch (error: any) {
      setError(error);
    }
    setShowList(false);
    setShowSearchResults(true);
    setShowTrending(false);
    setShowGlobal(false);
    setTrendingCoins([]);
    setLoading(false);
  };

  // To get trending coins
  const getTrendingResults = async () => {
    setCoinSearch("");
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/search/trending`
      );
      setTrendingCoins(res.data);
      setError(null);
    } catch (error: any) {
      setError(error);
    }
    setShowList(false);
    setShowSearchResults(false);
    setShowGlobal(false);
    setShowTrending(true);
    setLoading(false);
  };

  // To get Global market data
  const getGlobalMarketData = async () => {
    setCoinSearch("");
    setLoading(true);
    try {
      const res = await axios.get(`https://api.coingecko.com/api/v3/global`);
      setGlobalMarketData(res.data);
      setError(null);
    } catch (error: any) {
      setError(error);
    }
    setShowList(false);
    setShowSearchResults(false);
    setShowGlobal(true);
    setShowTrending(false);
    setLoading(false);
  };

  // Get current coins
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = coins.slice(indexOfFirstCoin, indexOfLastCoin);

  // Change page
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">Crypto Dashboard</h1>
      <form>
        <Input
          type="text"
          value={coinSearch}
          onChange={(e) => setCoinSearch(e.target.value)}
        ></Input>
        <Button color="primary" type="button" onClick={getCoinInfo}>
          Search
        </Button>
        <Button
          color="secondary"
          type="reset"
          onClick={() => {
            setCoinSearch("");
            setShowList(true);
          }}
        >
          Reset
        </Button>
      </form>
      <Button
        type="button"
        onClick={() => {
          setCoinSearch("");
          setTrendingCoins([]);
          setShowList(true);
          setShowGlobal(false);
          setShowSearchResults(false);
        }}
      >
        Home
      </Button>
      <Button type="button" onClick={getTrendingResults}>
        Trending Results
      </Button>
      <Button type="button" onClick={getGlobalMarketData}>
        Global Market Data
      </Button>
      {showGlobal && <GlobalMarket globalMarketData={globalMarketData} />}
      {showTrending && <Trending trendingCoins={trendingCoins} />}
      {showSearchResults && (
        <SearchCoin coinInfo={coinInfo} error={error} loading={loading} />
      )}
      {showList && (
        <>
          <Crypto coins={currentCoins} loading={loading} />
          <Pagination
            coinsPerPage={coinsPerPage}
            totalCoins={coins.length}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}

export default App;
