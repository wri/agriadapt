import Modal from 'components/modal/modal-component';
import InView from 'components/in-view';
import MapWidget from 'components/widgets/types/map';

const WidgetEnlargeModal = ({ isVisible, onClose, widget, areaOfInterest = undefined }) => (
  <Modal isOpen={isVisible} className="-no-padding -hide-close -large" onRequestClose={onClose}>
    <div className="c-enlarge-modal">
      <InView triggerOnce threshold={0.25}>
        {({ ref, inView }) => (
          <div ref={ref} className="w-full h-full">
            {inView && (
              <MapWidget
                isEnlarged={true}
                widgetId={widget.id}
                onToggleShare={undefined}
                areaOfInterest={areaOfInterest}
                onToggleEnlarge={onClose}
              />
            )}
          </div>
        )}
      </InView>
    </div>
  </Modal>
);

export default WidgetEnlargeModal;
