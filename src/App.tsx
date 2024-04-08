import React, { useState } from 'react';
import './App.css'
import { jsonData } from './StockData';
interface StockInfo {
  date: string;
  open: number;
  close: number;
}



const App: React.FC = () => {
  

  const [selectedStock, setSelectedStock] = useState<string>('');
  const [numberOfDays, setNumberOfDays] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState<number>(1);
 
  const handleChangeStock = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStock(event.target.value);
   
    setCurrentPage(1); 
  };

  const handleChangeDays = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNumberOfDays(parseInt(event.target.value, 10));
    setCurrentPage(1); 
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex: number = (currentPage - 1) * numberOfDays;
  const endIndex: number = startIndex + numberOfDays;
  const selectedStockData: StockInfo[] = jsonData.data.find(stock => stock.stockName === selectedStock)?.info || [];

  return (
    <div className='flex flex-col items-center  text-gray-500 w-auto h-[800px]  p-10'> 
      <h1 className='bg-black text-white w-[250px] justify-center p-4 text-[20px] h-[40px] flex items-center rounded-lg font-bold shadow-3xl mb-10'>Hello Stocks</h1> 
      <div className='flex flex-col gap-10 h-[100px] mb-10'>
      <div>
        <label>Select Stock  :  </label>
        <select className='rounded-lg p-2 text-black ml-2' value={selectedStock} onChange={handleChangeStock}>
          <option value="">Select Stock</option>
          {jsonData.data.map((stock) => (
            <option key={stock.stockName} value={stock.stockName}>{stock.stockName}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Number of Days  :  </label>
        <select className='rounded-lg p-2 text-black ml-2' value={numberOfDays} onChange={handleChangeDays}>
          {[2,3,5].map((days) => (
            <option key={days} value={days}>{days}</option>
          ))}
        </select>
      </div>
      </div>
      <div className='flex flex-col gap-8   mt-10 mb-10  '>
        {selectedStockData.slice(startIndex, endIndex).map((entry , index) => (
          <div className='bg-black text-white justify-center p-4 text-[12px] h-[50px] flex items-center rounded-lg font-bold shadow-3xl gap-4 max-w-[500px] ' key={index}>
            <p>{entry.date}</p>
            <p>Open: <span style={{ color: 
  (startIndex > 0 && index === 0 && entry.open < selectedStockData[startIndex - 1].close) ? 'red' :
  (index > 0 && entry.open < selectedStockData[startIndex + index - 1].close) ? 'red' : 'green' }}>
  {entry.open}
</span></p>


            <p>Close: <span style={{ color: entry.close >= entry.open  ?  'green' : 'red' }}>{entry.close}</span></p>
          </div>
        ))}
      </div>
      <div className='mt-5 flex gap-5 '>
        {[...Array(Math.ceil(selectedStockData.length / numberOfDays)).keys()].map((page) => (
          <button  className={`text-[18px] border-2 rounded-lg px-3 py-2 hover:scale-110 ${currentPage === page + 1 ? 'bg-gray-500 text-white' : ''}`} key={page + 1} onClick={() => handlePageChange(page + 1)}>{page + 1}</button>
        ))}
      </div>
    </div>
  );
};

export default App;
