import AddWallet from "../pages/auth/adminDashboardPages/SettingsPages/AddWallet";
import Package from "../pages/auth/adminDashboardPages/SettingsPages/Package";
import Personalize from "../pages/auth/adminDashboardPages/SettingsPages/Personalize";
import Taxes from "../pages/auth/adminDashboardPages/Taxes";
import UpdateDeposits from "../pages/auth/adminDashboardPages/UpdateDeposits";
import UpdateInvestment from "../pages/auth/adminDashboardPages/UpdateInvestment";
import Users from "../pages/auth/adminDashboardPages/Users";
import Withdrawals from "../pages/auth/adminDashboardPages/Withdrawals";
import Deposit from "../pages/auth/userDashboardPages/Deposit";
import Feedback from "../pages/auth/userDashboardPages/Feedback";
import Investment from "../pages/auth/userDashboardPages/Investment";
import Profile from "../pages/auth/userDashboardPages/SettingPages/Profile";
import VerifyEmail from "../pages/auth/userDashboardPages/SettingPages/VerifyEmail";
import VerifyKYC from "../pages/auth/userDashboardPages/SettingPages/VerifyKYC";
import TaxPayment from "../pages/auth/userDashboardPages/TaxPayment";
import Wallet from "../pages/auth/userDashboardPages/Wallet";
import Withdraw from "../pages/auth/userDashboardPages/Withdraw";
import AboutPage from "../pages/general/AboutPage";
import ContactPage from "../pages/general/ContactPage";
import HomePage from "../pages/general/HomePage";
import LegalSecurityPage from "../pages/general/LegalSecurityPage";
import LoginPage from "../pages/general/LoginPage";
import PrivacyPage from "../pages/general/PrivacyPage";
import SignupPage from "../pages/general/SignupPage";
import TermsPage from "../pages/general/TermsPage";
import TradingPlansPage from "../pages/general/TradingPlansPage";

export const GeneralPagesLinks = [
    { path: '/', component: HomePage },
    { path: '/contact', component: ContactPage },
    { path: '/login', component: LoginPage },
    { path: '/about', component: AboutPage },
    { path: '/signup', component: SignupPage },
    { path: '/trading', component: TradingPlansPage },
    { path: '/terms', component: TermsPage },
    { path: '/privacy', component: PrivacyPage },
    { path: '/legal', component: LegalSecurityPage }
]

const dashboard = '/dashboard'
const settings = '/settings'

export const UserDashboardPagesLinks = [
    { path: dashboard, component: Wallet },
    { path: dashboard + '/investment', component: Investment },
    { path: dashboard + '/deposit', component: Deposit },
    { path: dashboard + '/withdraw', component: Withdraw },
    { path: dashboard + '/feedback', component: Feedback },
    { path: dashboard + '/tax-payment', component: TaxPayment },
    { path: dashboard + settings + '/profile', component: Profile },
    { path: dashboard + settings + '/email-verify', component: VerifyEmail },
    { path: dashboard + settings + '/kyc', component: VerifyKYC },
]

const admin = '/admin-controls'

export const AdminDashboardPagesLinks = [
    { path: admin, component: UpdateDeposits },
    { path: admin + '/investments', component: UpdateInvestment },
    { path: admin + '/withdrawals', component: Withdrawals },
    { path: admin + '/users', component: Users },
    { path: admin + '/taxes', component: Taxes },
    { path: admin + settings, component: AddWallet },
    { path: admin + settings + '/packages', component: Package },
    { path: admin + settings + '/personalize', component: Personalize },
]