const Trending = ({ trendingCoins, loading }: any) => {
    if (loading) {
      return <h2>Loading...</h2>;
    }
  
    return (
      <ul className="list-group mb-4" data-testid='crypto' style={{ fontSize: 18 }}>
        {trendingCoins?.coins?.map((coin: any) => (
          <li key={coin?.item?.id} className="list-group-item">
            <img src={coin?.item?.small} alt={coin?.item?.name} style={{ height: 20 }} />
            <div>{coin?.item?.name}</div>
            <div>{coin?.item?.symbol}</div>
            <div>$ {coin?.item?.price_btc}</div>
          </li>
        ))}
      </ul>
    );
  };
  
  export default Trending;
  