import Layout from "layout/layout/layout-app";
import { Media } from "lib/media";
import Carousel from './home-analysis-container/carousel';

const LayoutHome = () => {

  const getIntroContainer = () => {
    return (
      <div className='introContainer' style={{ height: '70vh' }}>
        <div className='introImage'>
          <img src='' />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>Helping farmers and agriculture businesses around the world adapt to climage change.</h2>
          <h3>Data and tools for agricultureal resilience</h3>
          <div style={{ width: '50%' }}>
            <button className="c-button -primary">
              Explore the Latest Data
            </button>
          </div>
        </div>
      </div>
    )
  };

  const getMapContainer = () => {
    return (
      <div className='mapContainer' style={{ height: '70vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>Here's a more compelling header for the map experience.</h2>
          <h3>Here's a subheader that provides additional contextual information.</h3>
          <div style={{ width: '50%' }}>
            <button className="c-button -primary">
              CTA for the Map
            </button>
          </div>
          <img src='' />
        </div>
      </div>
    )
  };

  const getValueChainsContainer = () => {
    const getValueChainCard = (valueChain: string, breakpoint: string) => {
      if (breakpoint === 'sm') {
        return (
          <div style={{ width: '100vw', textAlign: 'center' }}>
            <button className="c-button -primary">
              {`Explore the ${valueChain} Value Chain`}
            </button>
          </div>
        )
      } else {
        return (
          <div style={{ border: 1, borderColor: 'black' }}>
            <div>
              <img src='' />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2>{valueChain}</h2>
              <div style={{ width: '100%', textAlign: 'center' }}>
                <button className="c-button -primary">
                  {`Explore the ${valueChain} Value Chain`}
                </button>
              </div>
            </div>
          </div>
        )
      }
    }

    const getValueChainCardContainer = (breakpoint: string) => {
      let grid = {}
      if (breakpoint === 'sm') {
        grid = {
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '100%',
          gridRow: 'auto',
          gridRowGap: '3%'
        };
      } else if (breakpoint === 'md') {
        grid = {
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '50% 50%',
          gridRow: 'auto auto',
          gridColumnGap: '10%'
        };
      } else {
        grid = {
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '30% 30% 30%',
          gridRow: 'auto auto auto',
          gridColumnGap: '3%'
        };
      }

      return (
        <div style={{ ...grid }}>
          {getValueChainCard('Rice', breakpoint)}
          {getValueChainCard('Cotton', breakpoint)}
          {getValueChainCard('Coffee', breakpoint)}
        </div>
      )
    }
    return (
      <div className='valueChainsContainer' style={{ height: '50vh', width: '100vw' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>Here's a more compelling header for the map experience.</h2>
          <h3>Here's a subheader that provides additional contextual information.</h3>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Media at='sm'>
              {getValueChainCardContainer('sm')}
            </Media>
            <Media at='md'>
              {getValueChainCardContainer('md')}
            </Media>
            <Media greaterThanOrEqual='lg'>
              {getValueChainCardContainer('lg')}
            </Media>
          </div>
        </div>
      </div>
    )
  };

  const getAnalysisContainer = () => {
    const settings = {
      slidesToShow: 7,
      slidesToScroll: 7,
      dragging: true,
      autoplay: true,
      autoplayInterval: 3500,
      initialSlideHeight: 56,
      wrapAround: true,
      renderTopCenterControls: () => {},
      renderCenterLeftControls: () => {},
      renderCenterRightControls: () => {},
      renderBottomCenterControls: ({ currentSlide }) => (
        <div>Slide: {currentSlide}</div>
      )
    }
    const getAnalysisCard = () => {
      return (
        <div style={{ height: '150px', width: '200px', display: 'flex', flexDirection: 'column' }}>
          <h3>Understand how climate hazards affect coffee production around the world</h3>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <button className="c-button -primary">
              Check out the data
            </button>
          </div>
        </div>
      );
    };
    return (
      <div className='analysisContainer' style={{ height: '50vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>Here's a more compelling header for the map experience.</h2>
          <h3>Here's a subheader that provides additional contextual information.</h3>
          <Carousel
            items={[getAnalysisCard(), getAnalysisCard(), getAnalysisCard()]}
            settings={settings}
          />
        </div>
      </div>
    )
  };

  const getLearnMoreContainer = () => {
    return (
      <div className='learnMoreContainer' style={{ height: '30vh' }}>
        <h2>Learn more about the project</h2>
        <h3>The climate risk tool project is a initialtive by World Resource Institute. The beta version of the tool has been funded by Walmart Foundation.</h3>
        <div style={{ width: '50%' }}>
          <button className="c-button -primary">
            About [Project Name]
          </button>
        </div>
      </div>
    )
  };

  return (
    <Layout title="Home" className="l-home" updateIsLoading={() => { }}>
      <main>
        {getIntroContainer()}
        {getMapContainer()}
        {getValueChainsContainer()}
        {getAnalysisContainer()}
        {getLearnMoreContainer()}
      </main>
    </Layout>
  );
};

export default LayoutHome;
