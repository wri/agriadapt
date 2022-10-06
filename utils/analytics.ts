export const logEvent = (
  event_category: string,
  action: string,
  event_label: string
) => {
  if (process.env.NODE_ENV === 'production') {
    window.gtag('event', action, {
      event_category,
      event_label,
    });
  }
};

// import ReactGA from "react-ga";

// export const initGA = () => {
//   if (process.env.NEXT_PUBLIC_RW_ENV === "production") {
//     ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS);
//   } else {
//     console.info("[GA] Init");
//   }
// };

// export const logPageView = () => {
//   if (process.env.NEXT_PUBLIC_RW_ENV === "production") {
//     ReactGA.set({ page: window.location.pathname });
//     ReactGA.pageview(window.location.pathname);
//   } else {
//     console.info(`[GA] Page view: ${window.location.pathname}`);
//   }
// };

// export const logEvent = (category = "", action = "", label = "") => {
//   if (process.env.NEXT_PUBLIC_RW_ENV === "production") {
//     if (category && action) {
//       ReactGA.event({
//         category,
//         action,
//         ...(!!label && { label }),
//       });
//     }
//   } else {
//     console.info(`[GA] Event: ${category}, ${action}, ${label}`);
//   }
// };
