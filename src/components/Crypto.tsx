const Crypto = ({ coins = [], loading }: any) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className="list-group mb-4" data-testid='crypto' style={{ fontSize: 18 }}>
      {coins.map((coin: any) => (
        <li key={coin.id} className="list-group-item">
          <img src={coin.image} alt={coin.name} style={{ height: 20 }} />
          <div>{coin.name}</div>
          <div>{coin.symbol}</div>
          <div>$ {coin.current_price}</div>
        </li>
      ))}
    </ul>
  );
};

export default Crypto;
