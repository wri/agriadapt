import { createSelector } from 'reselect';

const getCurrentArea = (state) => state.subscriptions.userSelection.area;
const getUserSubscriptions = (state) => state.subscriptions.list;

export const getActiveArea = (state, props) =>
  state.user.areas.items.find(({ id }) => id === props.area);

export const getSubscriptionsByArea = createSelector(
  [getCurrentArea, getUserSubscriptions],
  (_area, _subscriptions) => {
    if (!_area) return [];

    return _subscriptions.filter(
      (_subscription) => _subscription.params.area === _area.id
    );
  }
);
