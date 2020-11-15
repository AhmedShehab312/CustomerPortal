import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));

const UIBasicButton = React.lazy(() => import('./Demo/UIElements/Basic/Button'));
const UIBasicBadges = React.lazy(() => import('./Demo/UIElements/Basic/Badges'));
const UIBasicBreadcrumbPagination = React.lazy(() => import('./Demo/UIElements/Basic/BreadcrumbPagination'));

const UIBasicCollapse = React.lazy(() => import('./Demo/UIElements/Basic/Collapse'));
const UIBasicTabsPills = React.lazy(() => import('./Demo/UIElements/Basic/TabsPills'));
const UIBasicBasicTypography = React.lazy(() => import('./Demo/UIElements/Basic/Typography'));

const FormsElements = React.lazy(() => import('./Demo/Forms/FormsElements'));



const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const OtherDocs = React.lazy(() => import('./Demo/Other/Docs'));
const Tables = React.lazy(() => import('./App/components/Tables'));
const CompanyProfile = React.lazy(() => import('./Demo/CompanyProfile/CompanyProfile'));
const Branches = React.lazy(() => import('./Demo/Branches/Branches'));
const Admins = React.lazy(() => import('./Demo/Admins/Admins'));
const Reports = React.lazy(() => import('./Demo/Reports'));

const Analytics = React.lazy(() => import('./Demo/Analytics'));
const Integration = React.lazy(() => import('./Demo/Integration'));
const InternetMangment = React.lazy(() => import('./Demo/InternetMangment'));
const InvoicesPayments = React.lazy(() => import('./Demo/InvoicesPayments'));
const Contacts = React.lazy(() => import('./Demo/Contacts'));
const CurrentPayments = React.lazy(() => import('./Demo/CurrentPayments/CurrentPayments'));
const HistoryPayments = React.lazy(() => import('./Demo/HistoryPayments/HistoryPayments'));



const routes = [
    { path: '/dashboard', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/basic/button', exact: true, name: 'Basic Button', component: UIBasicButton },
    { path: '/basic/badges', exact: true, name: 'Basic Badges', component: UIBasicBadges },
    { path: '/basic/breadcrumb-paging', exact: true, name: 'Basic Breadcrumb Pagination', component: UIBasicBreadcrumbPagination },
    { path: '/basic/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
    { path: '/basic/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills },
    { path: '/basic/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
    { path: '/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
    { path: '/Tables', exact: true, name: 'Tables', component: Tables },
    { path: '/CompanyProfile', exact: true, name: 'CompanyProfile', component: CompanyProfile },
    { path: '/Branches', exact: true, name: 'Branches', component: Branches },
    { path: '/Admins', exact: true, name: 'Admins', component: Admins },
    { path: '/Reports', exact: true, name: 'Reports', component: Reports },

    { path: '/Analytics', exact: true, name: 'Analytics', component: Analytics },
    { path: '/Integration', exact: true, name: 'Integration', component: Integration },
    { path: '/InternetMangment', exact: true, name: 'InternetMangment', component: InternetMangment },
    { path: '/InvoicesPayments', exact: true, name: 'InvoicesPayments', component: InvoicesPayments },
    { path: '/Contacts', exact: true, name: 'Contacts', component: Contacts },
    { path: '/CurrentPayments', exact: true, name: 'CurrentPayments', component: CurrentPayments },
    { path: '/HistoryPayments', exact: true, name: 'HistoryPayments', component: HistoryPayments },



];

export default routes;