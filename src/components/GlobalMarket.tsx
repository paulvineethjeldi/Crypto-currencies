const GlobalMarket = ({ globalMarketData, loading }: any) => {

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const globalData = Object.keys(globalMarketData?.data?.total_market_cap);

  return (
    <ul
      className="list-group mb-4"
      data-testid="globalMarketData"
      style={{ fontSize: 18 }}
    >
      <h2>Total Market Cap</h2>
      {globalData?.slice(0, 10).map((coin: any) => (
        <li
          key={coin}
          className="list-group-item"
        >
          <div>
            {coin} : {globalMarketData?.data?.total_market_cap[coin]}
          </div>
        </li>
      ))}

      <h2>Total Volume</h2>
      {globalData?.slice(0, 10).map((coin: any) => (
        <li
          key={coin}
          className="list-group-item"
        >
          <div>
            {coin} : {globalMarketData?.data?.total_volume[coin]}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GlobalMarket;
