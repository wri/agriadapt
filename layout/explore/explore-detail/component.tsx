import React from 'react';

// Components
import Spinner from 'components/ui/Spinner';
import ReadMore from 'components/ui/read-more';

// Utils
import { getDateConsideringTimeZone } from 'utils/utils';

// Explore detail components
import ExploreDetailHeader from './explore-detail-header';
import FurtherInformation from './further-information';
import ExploreDetailButtons from './explore-detail-buttons';
import ExploreDetailTags from './explore-detail-tags';
import DatasetLayers from './dataset-layers';
// import RelatedContent from "./related-content";

// Constants
import { DEFAULT_LIMIT_CHAR_FOR_METADATA_FIELDS } from './constants';
import { APILayerSpec } from 'types/layer';

interface ExploreDetailComponentProps {
  dataset?: Record<string, any>;
  datasetLoading: boolean;
  tags: string[];
  emission_scenario: 'rcp4.5' | 'rcp8.5';
  value_chains: Array<'coffee' | 'cotton' | 'rice'>;
}

const ExploreDetailComponent = ({
  dataset = null,
  datasetLoading,
  tags,
  emission_scenario,
  value_chains,
}: ExploreDetailComponentProps) => {

  const layerFilter = (l: APILayerSpec) =>
    (!l.applicationConfig.emission_scenario ||
      l.applicationConfig.emission_scenario === emission_scenario) &&
    (!value_chains.length ||
      !l.applicationConfig.value_chain ||
      value_chains.includes(l.applicationConfig.value_chain));

  const metadata =
    dataset &&
    dataset.metadata &&
    dataset.metadata.length > 0 &&
    dataset.metadata[0];
  const info = metadata && metadata.info;
  const layers = dataset && dataset.layer.filter(layerFilter);
  const dateLastUpdated = getDateConsideringTimeZone(
    dataset && dataset.dataLastUpdated
  );
  const showLayersSection =
    dataset && dataset.layer && dataset.layer.length > 0;
  const showTags = tags && tags.length > 0;

  return (
    <div className="c-explore-detail">
      <Spinner isLoading={datasetLoading} className="-light" />
      {metadata && (
        <>
          <div className="content">
            <ExploreDetailHeader dataset={dataset} />
            <div id="overview" className="overview metadata-section">
              <div className="title">
                <h2>{info && info.name}</h2>
              </div>
              <div className="source-date">
                <div className="source" title={metadata.source}>
                  {`SOURCE: ${metadata.source}`}
                </div>
                <div className="date">
                  {dateLastUpdated
                    ? `UPDATED ON ${dateLastUpdated}`.toUpperCase()
                    : ''}
                </div>
              </div>
              <div className="functions metadata-field">
                {info && info.functions}
              </div>
              <div className="description metadata-field">
                <ReadMore
                  markdown
                  text={metadata.description}
                  limitChar={DEFAULT_LIMIT_CHAR_FOR_METADATA_FIELDS}
                  readMoreClicked={
                    () => undefined
                    // logEvent(
                    //   'Explore (Detail)',
                    //   'Clicks Read More',
                    //   'description'
                    // )
                  }
                />
              </div>
              {showTags && <ExploreDetailTags tags={tags} />}
            </div>
            {showLayersSection && (
              <div id="layers" className="metadata-section">
                <DatasetLayers layers={layers} dataset={dataset} />
              </div>
            )}
            <div id="further_information" className="metadata-section">
              <FurtherInformation metadata={metadata} />
            </div>
            <ExploreDetailButtons dataset={dataset} />
            {/* <div id="related_content" className="metadata-section">
                <RelatedContent datasetID={dataset.id} />
              </div> */}
          </div>
        </>
      )}
      {!metadata && !datasetLoading && (
        <div className="content">
          <ExploreDetailHeader dataset={dataset} />
          <div id="overview" className="overview metadata-section">
            <p>Metadata for this dataset couldn&apos;t be loaded.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreDetailComponent;
