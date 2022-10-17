import PieChart from 'components/widgets/charts/v2/PieChart';
import CalloutCard from 'components/widgets/charts/v2/CalloutCard';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'components/error-fallback';
import { average, Output } from './utils';
import Colcade from 'colcade';
import { useEffect, useState } from 'react';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

interface AnaylsisVisualsProps {
  domains: {
    label: string;
    value: number;
  }[][];
  columns: string[];
  valueMaps: Record<string, string>[];
  outputs: Output[];
}

function useDynamicImport(importPromise) {
  const [imported, setImported] = useState({});

  useEffect(() => {
    let cancelled = false;
    const awaitImport = async () => {
      const result = await importPromise;
      if (!cancelled && result && Object.keys(imported).length === 0) {
        setImported(() => result);
      }
    };
    awaitImport();
    return () => {
      cancelled = true;
    };
  }, [importPromise, imported]);

  return imported;
};

const CustomErrorFallback = (_props) => (
  <ErrorFallback {..._props} title="Something went wrong loading the widget" />
);

// class AnalysisVisuals extends React.Component<AnaylsisVisualsProps> {
//   // static propTypes = {
//   //   domains: PropTypes.any.isRequired,
//   //   columns: PropTypes.any.isRequired,
//   //   valueMaps: PropTypes.any.isRequired,
//   //   outputs: PropTypes.any.isRequired,
//   // };
  
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount(): void {
//     const colc = new Colcade( '.grid', {
//       columns: '.grid-col',
//       items: '.grid-item'
//     });
//   }




//   render() {
//     const { columns, outputs, domains, valueMaps } = this.props;

//     return (
//       <ErrorBoundary
//         FallbackComponent={CustomErrorFallback}
//         onError={(error) => {
//           console.error(error.message);
//         }}
//       >
//         {/* Implement masonry layout here: */}
//         {/* data-colcade="columns: .grid-col, items: .grid-item" */}
//         <div className="c-analysis-visuals grid" data-colcade="columns: .grid-col, items: .grid-item">
//           <div className="grid-col grid-col--1"></div>
//           <div className="grid-col grid-col--2"></div>
//           {columns.map((c, i) => {
//             const output = outputs[i];
//             if (!output) return;
//             const numDomain = domains[i].map(({ value }) => value);
//             const labelDomain = domains[i].map(({ label }) => label);
//             const avg = average(
//               numDomain.filter((x) => x != null),
//               valueMaps[i],
//               output
//             );
//             return (
//               <div key={`${c}`} className={'grid-item grid-item--' + String.fromCharCode('a'.charCodeAt(0) + (i % (outputs.length/2)))}>
//                 {output.type === 'string' && (
//                   <PieChart name={c} domain={labelDomain} />
//                 )}
//                 {output.type === 'number' && !isNaN(parseFloat(avg)) && (
//                   <CalloutCard
//                     analysis={{
//                       name: c,
//                       type: 'avg',
//                       value: avg,
//                     }}
//                   />
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </ErrorBoundary>
//     );
//   }
// };

const AnalysisVisuals = ({
  domains,
  columns,
  valueMaps,
  outputs,
}: AnaylsisVisualsProps) => {



  // useEffect(() => {
  //   // console.log('grid call');
  //   // console.log(document.querySelector('.grid'));
  //   if (document.querySelector('.grid') !== null) {
  //     // const colc = new Colcade( '.grid', {
  //     //   columns: '.grid-col',
  //     //   items: '.grid-item'
  //     // });
  //   }
  //   // setTimeout(function () {
  //   //   window.requestAnimationFrame(function() {
  //   //     const colc = new Colcade( '.grid', {
  //   //       columns: '.grid-col',
  //   //       items: '.grid-item'
  //   //     });
  //   // })});
    
  // });

  const IS_STATIC = typeof window === 'undefined';
  
  const { default: Colcade } = useDynamicImport(
    !IS_STATIC && import('colcade'),
  );
  const [colcade, setColcade] = useState(undefined);

  useEffect(() => {
    if (Colcade) {
      setColcade(
        new Colcade('.grid', {
          columns: '.grid-col',
          items: '.grid-item'
        }),
      );
    }
  }, [Colcade]);

  useEffect(() => {
    colcade?.layout();
  }, [colcade]);

  console.log('outputs');
  console.log(outputs);

  return (
    <ErrorBoundary
      FallbackComponent={CustomErrorFallback}
      onError={(error) => {
        console.error(error.message);
      }}
    >
      {/* Implement masonry layout here: */}
      {/* data-colcade="columns: .grid-col, items: .grid-item" */}
      <div className="c-analysis-visuals grid" data-colcade="columns: .grid-col, items: .grid-item">
        <div className="grid-col grid-col--1"></div>
        <div className="grid-col grid-col--2"></div>
        {columns.map((c, i) => {
          const output = outputs[i];
          if (!output) return;
          const numDomain = domains[i].map(({ value }) => value);
          const labelDomain = domains[i].map(({ label }) => label);
          const avg = average(
            numDomain.filter((x) => x != null),
            valueMaps[i],
            output
          );
          return (
            <div key={`${c}`} className={'grid-item grid-item--' + String.fromCharCode('a'.charCodeAt(0) + (i % (outputs.length/2)))}>
              {output.type === 'string' && (
                <PieChart name={c} domain={labelDomain} />
              )}
              {output.type === 'number' && !isNaN(parseFloat(avg)) && (
                <CalloutCard
                  analysis={{
                    name: c,
                    type: 'avg',
                    value: avg,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </ErrorBoundary>
  );
};

export default AnalysisVisuals;
