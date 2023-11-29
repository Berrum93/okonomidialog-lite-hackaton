import { useAtom } from 'jotai';
import { totalUtgifterAtom, totalInntektAtom, combinedTotalAtom } from '../App';

export const Resultat: React.FC = () => {
  const [totalUtgift] = useAtom(totalUtgifterAtom);
  const [totalInntekt] = useAtom(totalInntektAtom);
  const [combinedTotal] = useAtom(combinedTotalAtom);

  const totalValue = combinedTotal !== null ? combinedTotal : 'Loading...';
  return (
    <div>
      <p>Total utgift: {totalUtgift !== null ? totalUtgift : 'Loading...'}</p>
      <p>
        Total Inntekt: {totalInntekt !== null ? totalInntekt : 'Loading...'}
      </p>
      <p style={{ fontWeight: 'bold' }}>Total sum: {totalValue}</p>
      {/* Other components related to totalInntekt or other calculations */}
    </div>
  );
};
