import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { increment, decrement, incrementByAmount } from '../store/slices/counterSlice';
import { Button } from './ui/button';

export const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState<number>(1);

  return (
    <div className="p-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">Redux Counter Example</h2>
      
      <div className="flex items-center justify-center gap-4 mb-4">
        <Button 
          variant="outline" 
          onClick={() => dispatch(decrement())}
        >
          -
        </Button>
        
        <span className="text-2xl font-bold">{count}</span>
        
        <Button 
          variant="outline" 
          onClick={() => dispatch(increment())}
        >
          +
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <input
          type="number"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value) || 0)}
          className="border rounded p-2 w-full sm:w-auto"
        />
        
        <Button 
          onClick={() => dispatch(incrementByAmount(incrementAmount))}
        >
          Add Amount
        </Button>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Open Redux DevTools in your browser to see the state changes.</p>
        <p>Usually F12 > Redux tab (may need to click "≫" if not visible)</p>
      </div>
    </div>
  );
}; 