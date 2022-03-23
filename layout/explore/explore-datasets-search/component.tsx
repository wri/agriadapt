import SearchInput from 'components/ui/SearchInput';
import SearchSelect from 'components/ui/SearchSelect';
import Link from 'next/link';
import { useEffect } from 'react';
import { EXPLORE_FILTERS } from '../constants';

interface SearchProps {
    search: string;
    value_chains: Array<string>;
    advanced: {
        open: boolean;
    };  
}

const ExploreDatasetsSearch = ({ search, value_chains, advanced }: SearchProps): JSX.Element => {

    const { VALUE_CHAINS } = EXPLORE_FILTERS;
    const { open: advOpen } = advanced;

    useEffect(() => {
        console.log(advOpen);
    }, [advOpen]);

    return (
      <>
        {/* TODO: Translate */}
        <>Search Layers</>
        <SearchInput
          input={{
            value: search,
            placeholder: 'Search Layers', // TODO: Translate
          }}
        />
        {/* TODO: Translate */}
        <>Filter Layers by Value Chain</>
        <SearchSelect
          options={VALUE_CHAINS.options}
          placeholder={'Value Chain'} // TODO: Translate
        />
        {/* TODO: Translate */}
        <Link href="#">{'Advanced Search'}</Link>
        <br />
        {advOpen &&
          Object.entries(EXPLORE_FILTERS).map(([k, v]) => (
            <>
              Filter Layers by {v['placeholder']}
              <br />
            </>
          ))}
        {/* <>Filter Layers by Timescale</>
        <SearchSelect
          options={[]}
          placeholder={'Timescale'} // TODO: Translate
        /> */}
      </>
    );
}

export default ExploreDatasetsSearch;