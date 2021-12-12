const SearchCoin = ({ coinInfo, error, loading }: any) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return (
      <div>
        <h3>Cannot find Coin Data. Please try Later.</h3>
      </div>
    );
  }

  return (
    <div>
      <table>
        <thead style={{ fontSize: 20, fontWeight: "bold" }}>
          {coinInfo.name}
          <img src={coinInfo.image.small} alt={coinInfo.name}></img>
        </thead>
        <tbody style={{ fontSize: 16 }}>
          <tr>
            <td>
              <p>Market Rank</p>
            </td>
            <td>
              <p>{coinInfo.market_cap_rank}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Current Price</p>
            </td>
            <td>
              <p>${coinInfo.market_data.current_price.aud}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Market Supply</p>
            </td>
            <td>
              <p>{coinInfo.market_data.max_supply}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SearchCoin;
