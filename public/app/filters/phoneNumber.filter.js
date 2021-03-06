(function () {

angular.module('ticketyApp')
.filter('phoneNumber', function () {
  
  return function (tel, countryCode) {
    
    return intlTelInputUtils.formatNumber(
        // For some reason this will format without spaces,
        // but prepend the '+' instead
        intlTelInputUtils.formatNumberByType(tel, countryCode || 'SE')
        , 'SE');
  };
  
});

})();