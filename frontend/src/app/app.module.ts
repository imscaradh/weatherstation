import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AppComponent} from './app.component';
import {RdWidget} from "./components/rd-widget/rd-widget";
import {RdWidgetBody} from "./components/rd-widget-body/rd-widget-body";
import {RdWidgetHeader} from "./components/rd-widget-header/rd-widget-header";
import {RdWidgetFooter} from "./components/rd-widget-footer/rd-widget-footer";
import {RdLoading} from "./components/rd-loading/rd-loading";
import {Alerts} from "./components/alerts/alerts";
import {Dashboard} from "./pages/dashboard/dashboard";
import {Tables} from "./pages/tables/tables";
import {WeatherHistoryList} from "./components/weather-history-list/weather-history-list";
import {Chart} from "./components/chart/chart";


const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: Dashboard},
    {path: 'tables', component: Tables}
];

@NgModule({
    declarations: [
        AppComponent,
        Dashboard,
        Tables,
        Alerts,
        RdWidget,
        RdWidgetBody,
        RdWidgetHeader,
        RdWidgetFooter,
        RdLoading,
        Chart,
        WeatherHistoryList
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {
}
