import { useTheme } from '@emotion/react';
import armenianFlag from '../../assets/images/armenian_flag.svg';
import russianFlag from '../../assets/images/russian_flag.svg';
import '../../assets/styles/ExchangePrice.scss';

export default function ExchangePrice() {
    const theme = useTheme();

  return (
    <div className="exchange_rates_wrapper">
      <div className="exchange_container">
          <span className="flag_item" style={{ backgroundImage: `url(${armenianFlag})` }}></span>
          <span className="code_item">AMD</span>
      </div>
      <div className={`exchange_rates_container shadow-sm ${ theme.palette.mode === "dark" ? "bg-gray-800" : "bg-gray-100" }`}>
        <h2 className='text-[16px] m-2 font-thin'>Select currency</h2>
          <label className="rate_item_block">
              <span className="flag_item" style={{ backgroundImage: `url(${russianFlag})` }}></span>
              <span>RUB</span>
          </label>
      </div>
    </div>
  );
}
