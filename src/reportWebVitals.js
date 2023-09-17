/*
- Maxim Petrov 207467432
- Ben Nadav 315114090
- Gal Dahan 207232349
 */

/*
The code below is a utility function that makes it easier to collect and report web vital metrics.
Web vitals are performance metrics that help developers understand and measure the user experience of a web
application.
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;