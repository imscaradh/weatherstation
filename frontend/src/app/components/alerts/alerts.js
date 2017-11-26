System.register(['@angular/core'], function (exports_1, context_1) {
  'use strict'
  var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc)
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
    return c > 3 && r && Object.defineProperty(target, key, r), r
  }
  var __moduleName = context_1 && context_1.id
  var core_1, Alerts
  return {
    setters: [
      function (core_1_1) {
        core_1 = core_1_1
      }
    ],
    execute: function () {
      Alerts = (function () {
        function Alerts () {
          this.alerts = [{
            type: 'success',
            msg: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!'
          }, {
            type: 'danger',
            msg: 'Found a bug? Create an issue with as many details as you can.'
          }]
        }

        Alerts.prototype.addAlert = function () {
          this.alerts.push({
            msg: 'Another alert!'
          })
        }
        Alerts.prototype.closeAlert = function (index) {
          this.alerts.splice(index, 1)
        }
        Alerts = __decorate([
          core_1.Component({
            selector: 'alerts',
            templateUrl: 'app/components/alerts/alerts.html'
          })
        ], Alerts)
        return Alerts
      }())
      exports_1('Alerts', Alerts)
    }
  }
})
//# sourceMappingURL=alerts.js.map
