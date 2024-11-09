import axios from 'axios'
import Cookies from 'js-cookie'
import { CookieName } from '../utils/utils'

export const URL = import.meta.env.VITE_API_URL
export const imageurl = import.meta.env.VITE_API_URL


const user = 'api/user/'
const user_urls = {
    signup: user + 'create-account',
    login: user + 'login-account',
    profile: user + 'profile',
    verify_email: user + 'verify-email',
    send_otp: user + 'send-otp',
    verify_otp: user + 'verify-otp',
    change_password: user + 'change-password',
    contact: user + 'contact',
    update: user + 'update-profile',
    delete_photo: user + 'delete-profile-photo',
    delete_account: user + 'delete-account',
    wallet: user + 'user-wallet',
    ups: user + 'user-ups',
    get_crypto_and_their_wallets: user + 'get_crypto_and_thier_wallets',
    get_test_run_plan: user + 'get_test_run_plan'
}

const deposit = 'api/deposit/'
const deposit_urls = {
    create_deposit: deposit + 'create-deposit',
    user_deposits: deposit + 'user-deposits',
}

const notification = 'api/notification/'
const notification_urls = {
    user_notifications: notification + 'user-notifications',
    unread_notis: notification + 'unread-notis',
    update_all: notification + 'update-all',
    update_single: notification + 'update-single',
    delete_notification: notification + 'delete-notification',
}

const withdraw = 'api/withdraw/'
const withdraw_urls = {
    user_withdrawals: withdraw + 'user-withdrawals',
    make_withdrawal: withdraw + 'make-withdrawal'
}

const investment = 'api/investment/'
const investment_urls = {
    user_investment: investment + 'user-investment',
    user_unclaim: investment + 'user-unclaim-investment',
    create_investment: investment + 'create-investment',
    claim_investment: investment + 'claim-investment'
}

const tax = 'api/tax/'
const tax_urls = {
    pay_tax: tax + 'pay-tax',
    user_taxes: tax + 'user-taxes'
}

const kyc = 'api/kyc/'
const kyc_urls = {
    user_kyc: kyc + 'user-kyc',
    create_update_kyc: kyc + 'create-update-kyc'
}

const admin = 'api/admin/'
const admin_urls = {
    all_users: admin + 'all-users',
    all_deposits: admin + 'all-deposits',
    all_investments: admin + 'all-investments',
    all_withdrawals: admin + 'all-withdrawals',
    all_taxes: admin + 'all-taxes',
    update_deposits: admin + 'update-deposits',
    update_investments: admin + 'update-investments',
    update_withdrawals: admin + 'update-withdrawals',
    update_taxes: admin + 'update-taxes',
    update_kyc: admin + 'update-kyc',
    update_users: admin + 'update-users',
    reactivate_users: admin + 'reactivate-users',
    get_user_figures: admin + 'get-user-figures',
    get_cryptocurrency: admin + 'all-cryptocurrency',
    admin_create_account: admin + 'admin-create-account',
    create_cryptocurrency: admin + 'create-cryptocurrency',
    update_cryptocurrency: admin + 'update-cryptocurrency',
    delete_cryptocurrency: admin + 'delete-cryptocurrency',
    get_admin_wallets: admin + 'all-admin-wallets',
    create_admin_wallet: admin + 'create-admin-wallet',
    update_admin_wallet: admin + 'update-admin-wallet',
    delete_admin_wallet: admin + 'delete-admin-wallet',
    get_trading_plans: admin + 'all-trading-plans',
    create_trading_plan: admin + 'create-trading-plan',
    update_trading_plan: admin + 'update-trading-plan',
    delete_trading_plan: admin + 'delete-trading-plan',
    get_admin_store: admin + 'admin-store',
    update_admin_store: admin + 'update-admin-store',
}

export const Apis = {
    user: user_urls,
    deposit: deposit_urls,
    notification: notification_urls,
    withdraw: withdraw_urls,
    investment: investment_urls,
    tax: tax_urls,
    kyc: kyc_urls,
    admin: admin_urls
}


export const UserPostApi = async (endpoint, data) => {
    const response = await axios.post(`${URL}/${endpoint}`, data)
    return response.data
}

export const UserGetApi = async (endpoint) => {
    const token = Cookies.get(CookieName)
    const response = await axios.get(`${URL}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const UserPutApi = async (endpoint, data) => {
    const token = Cookies.get(CookieName)
    const response = await axios.put(`${URL}/${endpoint}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const PostApi = async (endpoint, data) => {
    const token = Cookies.get(CookieName)
    const response = await axios.post(`${URL}/${endpoint}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

