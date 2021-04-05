

module.exports.user = {
    USER_NOT_EXIST: "all_error_msg_user_is_not_exist",
    USER_NOT_ELIGIBLE: "all_error_msg_user_is_not_eligible_to_do_action",
    USER_NO_ACTIVE_SUBSCRIBTION: "all_error_msg_no_active_subscription_for_user",
    USER_DELETED_SUCCESSFULLY: "delete_user_success_msg_user_deleted_successfully",
    USERS_DELETED_SUCCESSFULLY: "delete_user_success_msg_multiple_users_deleted_successfully",
    USERS_NOT_FOUND: "get_all_users_error_msg_users_not_found",
    USER_NOT_FOUND: "get_user_error_msg_user_not_found",
    USERS_NOT_ACTIVE: "all_error_msg_user_is_not_active",
    USER_PROFILE_INVALID_BIRTHDATE: "edit_profile_error_msg_invalid_birthdate",
    USER_PROFILE_INVALID_BIRTHDATE_AGE: "profile_screen_error_msg_birthdate_age_must_be_valid",
    USER_NOT_VERIFIED: "all_error_msg_user_is_not_verified"

}

module.exports.admin = {
    ADMIN_NOT_AUTHORIZED: "all_error_msg_admin_not_authorized_to_do_this_action"
}



module.exports.login_signup = {
    LOGIN_FACEBOOK_FAILED: "login_error_msg_failed_to_login_with_facebook",
    LOGIN_EMAIL_NOT_FOUND: "login_error_msg_failed_email_not_found",
    LOGIN_PHONE_NUMBER_NOT_FOUND: "login_error_msg_failed_phone_number_not_found",
    SIGNUP_INVALID_MOBILE: "signup_error_msg_invalid_mobile",
    SIGNUP_INVALID_COUNTRY_CODE: "signup_error_invalid_country_code",
    SIGNUP_EMAIL_MOBILE_EMPTY: "signup_error_msg_email_mobile_cant_be_empty",
    SIGNIN_SOCIAL_MEDIA_FAILED: "signin_error_msg_social_media_login_failure",
    FORGOT_PASSWORD_WRONG_USERNAME: "forgot_password_error_msg_wrong_username",
    FORGOT_PASSWORD_USERNAME_NOT_EXIST: "forgot_password_error_msg_username_doesnot_exist",
    FORGOT_PASSWORD_PASSWORD_NOT_MATCH: "forget_passwrod_error_msg_password_doesnt_match",
    PASSWORD_USER_HAS_PASSWORD: "create_password_error_msg_user_already_has_password",
    EMAIL_ALREADY_EXIST: "email_field_error_msg_email_already_exist",
    MOBILE_ALREADY_EXIST: "mobile_field_error_msg_mobile_already_exist",
    LOGIN_AURHORIZE_CODE_EXPIRED: "login_using_authorize_code_error_msg_code_is_expired",
    LOGIN_AURHORIZE_CODE_USED_BEFORE: "login_using_authorize_code_error_msg_code_used_before",
    LOGIN_AURHORIZE_CODE_NOT_EXIST: "login_using_authorize_code_error_msg_code_is_not_exist",
    LOGIN_AURHORIZE_CODE_NOT_VALID: "login_using_authorize_code_error_msg_code_is_not_valid",

}

module.exports.verify = {
    VERIFY_INVALID_CODE: "verify_error_msg_invalid_code",
    VERIFY_EMAIL_VERIFIED: "verify_error_msg_email_is_verified",
    VERIFY_MOBILE_VERIFIED: "verify_error_msg_mobile_is_verified",
    VERIFY_CODE_EXPIRED: "verify_error_msg_code_expired",
    VERIFY_EXCEEDED_NUMBER: "verify_code_error_msg_exceeded_number_of_attempts",
    VERIFY_WRONG_CODE: "verify_error_msg_wrong_code",
    VERIFY_INVALID_KEYWORD_TYPE: "verify_error_msg_invalid_keyword_type"
}

module.exports.general = {
    GENERAL_ERROR: "all_error_mg_general",
    INVALID_REQUEST_PARAMS: "all_error_mg_invalid_request_parameters",
    ERROR_HAS_OCCURED: "all_error_msg_an_error_has_occured",
    SOMETHING_WENT_WRONG: "all_error_msg_something_went_wrong",
    REQUEST_TIMEOUT: "all_error_msg_request_timeout",

    GET_LINK_SENT_BEFORE: "get_my_link_subscriptions_error_msg_link_alreay_send_before",
    COINS: "all_coins_lbl_title",
    HOURS: "all_hours_abbreviation_lbl",
    MINUTES: "all_minutes_abbreviation_lbl",
    DAYS: "all_days_lbl",
    MONTHS: "all_months_lbl",
    DAY: "all_day_lbl",
    MINUTE: "all_minute_abbreviation_lbl",
    HOUR: "all_hour_abbreviation_lbl",
    REGISTRATION: "all_action_registration_lbl",



}
module.exports.token = {
    TOKEN_INVALID: "all_error_msg_token_invalid",
    TOKEN_EXPIRED: "all_error_msg_token_expired"

}


module.exports.channel = {
    CHANNEL_FEATURED_NOT_SUPPORT_EPG: "add_featured_channel_error_msg_channel_is_not_support_epg",
    CHANNEL_FEATURED_NOT_EXIST_DEFAULT_BOUQUET: "add_featured_channel_error_msg_channel_is_not_exist_in_default_bouquet",
    CHANNEL_FEATURED_EXIST_SAME_ORDER: "add_featured_channel_error_msg_channel_exist_with_same_order",
    CHANNEL_FEATURED_ALREADY_EXIST: "add_featured_channel_error_msg_channel_already_added",
    CHANNEL_FEATURED_NO_EPG_FEATURED_CHANNELS: "get_top_featured_channel_error_msg_no_epg_in_featured_channels",
    CHANNEL_FEATURED_INVALID_ORDER: "add_featured_channel_error_msg_channel_order_is_invalid",
    CHANNEL_FEATURED_REACH_MAX: "add_featured_channel_error_msg_reach_to_max_featured_channels",
    CHANNEL_FEATURED_ADDED_SUCCESSFULLY: "add_featured_channel_success_msg_channel_added_successfully",
    CHANNEL_FEATURED_REMOVED_SUCCESSFULLY: "remove_featured_channel_success_msg_channel_removed_successfully",
    CHANNEL_FAVORITE_ADDED_SUCCESSFULLY: "favorite_channel_success_msg_added_successfully_to_favorites",
    CHANNEL_FAVORITE_REMOVE_SUCCESSFULLY: "favorite_channel_success_msg_removed_successfully_from_favorites",
    CHANNEL_FAVORITE_NOT_EXIST_SUBSCRIPTION: "favorite_channel_error_msg_channel_is_not_exist_in_your_subscription",
    CHANNEL_FAVORITE_NOT_EXIST: "favorite_channel_error_msg_channel_is_not_exist_in_your_favorite_list",
    CHANNEL_NOT_SUPPORT_EPG: "all_error_msg_channel_is_not_support_epg"
}


module.exports.mediaProvider = {
    MP_DISPLAY_NAME_EMPTY: "add_media_provider_error_msg_display_name_empty",
    MP_DISPLAY_NAME_INVALID: "add_media_provider_error_msg_display_name_invalid",
    MP_CONTRACTED_NAME_INVALID: "add_media_provider_error_msg_contracted_name_invalid",
    MP_CONTRACTED_NAME_EMPTY: "add_media_provider_error_msg_contracted_name_empty",
    MP_LOGO_EMPTY: "add_media_provider_error_msg_logo_empty",
    MP_JOIN_DATE_INVALID: "add_media_provider_error_msg_joined_date_invalid",
    MP_EMAIL_INVALID: "add_media_provider_error_msg_email_invalid",
    MP_MOBILE_INVALID: "add_media_provider_error_msg_mobile_invalid",
    MP_MOBILE_EMPTY: "add_media_provider_error_msg_mobile_empty",
    MP_DESCRIPTION_INVALID: "add_media_provider_error_msg_description_invalid",
    MP_WEBSITE_INVALID: "add_media_provider_error_msg_website_invalid",
    MP_EXCEED_LOGGED_DEVICES: "login_media_provider_error_msg_user_exceed_number_logged_devices"
}

module.exports.mediaProvider_title = {
    MP_TITLE_NOT_EXIST: "accept_title_review_error_mg_media_provider_title_not_exist_to_review",
    MP_TITLE_ALREADY_PUBLISHED: "accept_title_review_sucess_mg_title_is_publish",
    MP_REJECTION_REASON_EMPTY: "reject_reviewing_title_error_mg_rejection_reason_empty",
    MP_REJECTION_REASON_INVALID: "reject_reviewing_title_error_mg_rejection_reason_invalid"
}

module.exports.informativeMessage = {
    INFORMATIVE_MESSAGE_PUSHED_SUCCESSFULLY: "push_informative_message_sucess_msg_im_pushed_sucessfully",
    INFORMATIVE_MESSAGE_ENDDATE_INVALID: "push_informative_message_error_msg_end_date_invalid",
    INFORMATIVE_MESSAGE_EMPTY: "push_informative_message_error_msg_message_cant_be_empty",
    INFORMATIVE_MESSAGE_DISPLAYTYPE: "push_informative_message_error_msg_displaytype_incorrect",
    INFORMATIVE_MESSAGE_1K_CHARACTERS: "push_informative_message_error_msg_message_morethan_1k_characters",
    INFORMATIVE_MESSAGE_NOT_EXIST: "delete_informative_message_error_msg_im_is_not_exist",
    INFORMATIVE_MESSAGE_ALREADY_INACTIVE: "inactive_informative_message_error_msg_im_is_already_inactive",

}

module.exports.news = {
    NEWS_NOT_FOUND: "get_news_error_msg_no_news_found",

}

module.exports.bouquet = {
    BOUQUET_NO_DEFAULT: "get_default_bouquet_error_msg_no_default_bouquet",
    BOUQUET_DEFAULT_ALREADY_EXIST: "set_default_subscription_error_msg_default_bouquet_already_exist",
    BOUQUET_NOT_ACTIVE: "create_subscription_error_msg_bouquet_is_not_active",

}

module.exports.subscription = {
    SUBSCRIPTION_EXPIRED: "subscription_error_msg_user_subscription_expired",
    SUBSCRIPTION_INVALID_DURATION: "buy_subscription_error_msg_invalid_duration",
    SUBSCRIPTION_USER_ALREADY_SUBSCRIBED: "create_subscription_error_msg_user_is_already_subscribed",
    SUBSCRIPTION_USER_NO_SUBSCRIPTION: "get_subscriptions_error_msg_user_has_no_subscription",

}


module.exports.accountType = {
    ACCOUNTTYPE_DEFAULT_NOT_EXIST: "register_account_type_error_msg_default_account_type_doesnt_exist",
    ACCOUNTTYPE_NOT_EXIST: "general_account_type_error_msg_requested_account_type_doesnt_exist",
    ACCOUNTTYPE_BOUQUET_MUST_BE_ACTIVE: "add_account_type_error_msg_bouquet_must_be_active",
    ACCOUNTTYPE_PRICELIST_MUST_BE_ADDED: "add_account_type_error_msg_price_list_need_to_be_added",
    ACCOUNTTYPE_NOT_SUPPORT_THIS_FEATURE: "all_error_msg_user_this_feature_is_not_supported_by_current_account_type",
    ACCOUNTTYPE_INSUFFICIENT_AMOUNT_TO_UPGRADRE: "upgrade_account_type_error_msg_insufficient_amount_to_upgrade",
    ACCOUNTTYPE_SWITCHED: "all_error_msg_account_type_switched"
}

module.exports.notification = {
    NOTIFICATION_BODY_NOT_ENOUGH_CREDIT: "all_notification_body_account_type_module_user_not_have_enough_credit_to_renew",
    NOTIFICATION_BODY_ACCOUNTTYPE_TWO_DAYS_REMAIN_RENEW: "all_notification_body_account_type_module_remains_2_days_on_renew",
    NOTIFICATION_BODY_ACCOUNTTYPE_REGISTERED_SUCCESSFULLY: "all_notification_body_account_type_module_user_is_registered_successfully",
    NOTIFICATION_BODY_ACCOUNTTYPE_RENEWED_SUCCESSFULLY: "all_notification_body_account_type_module_account_type_renewed_successfully",

    NOTIFICATION_BODY_ACCOUNTTYPE_UPGRADED_SUCCESSFULLY_NOW: "all_notification_body_account_type_module_account_type_upgraded_successfully_now",
    NOTIFICATION_TITLE_ACCOUNTTYPE_REGISTERED_SUCCESSFULLY: "all_notification_title_account_type_module_user_is_registered_successfully",
    NOTIFICATION_ACCOUNTTYPE_UPGRADE_INSUFFICIENT_AMOUNT: "upgrade_account_type_error_msg_insufficient_amount_to_upgrade",
    NOTIFICATION_TITLE_ACCOUNTTYPE_UPGRADE_SUCCESSFULLY_NOW: "all_notification_title_account_type_module_account_type_upgraded_successfully_now",


    NOTIFICATION_TITLE_ACCOUNTTYPE_RENEWED_SUCCESSFULLY: "all_notification_title_account_type_module_account_type_renewed_successfully",
    NOTIFICATION_BODY_ACCOUNTTYPE_DOWNGRADED_SUCCESSFULLY_DIFFERENT_ACCOUNT: "all_notification_body_account_type_module_account_type_downgraded_successfully_within_differnt_account",
    NOTIFICATION_Title_ACCOUNTTYPE_DOWNGRADED_SUCCESSFULLY: "all_notification_title_account_type_module_account_type_downgraded_successfully",
    NOTIFICATION_BODY_ACCOUNTTYPE_UPGRADE_SUCCESSFULLY_LATER_DIFFERENT_ACCOUNT: "all_notification_body_account_type_module_account_type_upgraded_successfully_later_within_different_account",
    NOTIFICATION_TITLE_ACCOUNTTYPE_UPGRADE_SUCCESSFULLY_LATER_DIFFERENT_ACCOUNT: "all_notification_title_account_type_module_account_type_upgraded_successfully_later",
    NOTIFICATION_BODY_ACCOUNTTYPE_DOWNGRADED_SUCCESSFULLY_SAME_ACCOUNT: "all_notification_body_account_type_module_account_type_downgraded_successfully_within_same_account",
    NOTIFICATION_BODY_ACCOUNTTYPE_UPGRADE_SUCCESSFULLY_LATER_SAME_ACCOUNT: "all_notification_body_account_type_module_account_type_upgraded_successfully_later_within_same_account",

    NOTIFICATION_TITLE_RENT_DURATION_ENDED: "all_notification_title_rent_title_duration_ended",
    NOTIFICATION_BODY_RENT_DURATION_ENDED: "all_notification_body_rent_title_duration_ended",
    NOTIFICATION_TITLE_RENT_SUCCESSFULLY: "all_notification_title_rent_title_successfully",
    NOTIFICATION_BODY_RENT_SUCCESSFULLY: "all_notification_body_rent_title_successfully",
    NOTIFICATION_BODY_ADDON_FIVE_DAYS_REMAIN_RENEW: "all_notification_body_bouquet_addon_sufficient_balance_5days_prior_renewal",
    NOTIFICATION_BODY_ADDON_ONE_DAY_REMAIN_RENEW: "all_notification_body_bouquet_addon_sufficient_balance_day_prior_renewal",
    NOTIFICATION_BODY_ADDON_RENEWAL_DAY: "all_notification_body_bouquet_addon_sufficient_balance_renewal_day",
    NOTIFICATION_TITLE_ADDON_PRICE_CHANGED: "all_notification_title_addon_price_changed",
    NOTIFICATION_BODY_ADDON_PRICE_CHANGED: "all_notification_body_addon_price_changed",
    NOTIFICATION_BODY_BUY_ADDON_ONCE_SUCCESSFULLY: "all_notification_body_bouquet_addon_buy_addon_once_successfully",
    NOTIFICATION_BODY_BUY_ADDON_NOW_SUCCESSFULLY: "all_notification_body_bouquet_addon_buy_addon_now_successfully",
    NOTIFICATION_BODY_BUY_ADDON_NEXT_PAYMENT_SUCCESSFULLY: "all_notification_body_bouquet_addon_buy_addon_next_payment_successfully",
    NOTIFICATION_TITLE_BUY_ADDON_SUCCESSFULLY: "all_notification_title_bouquet_addon_buy_addon_successfully"
}


module.exports.vod = {
    VOD_SEASON_NOT_FOUND: "all_vod_series_error_msg_season_is_not_found",
    VOD_SERIES_NOT_FOUND: "all_vod_series_error_msg_series_is_not_found",
    VOD_CANNOT_DELETE_GENRES: "delete_genres_from_title_error_msg_cannot_delete_genres",
    VOD_TITLE_ALREADY_ADDED_TO_LIBRARY: "all_vod_title_error_msg_titles_added_already_in_tooli_library",
    VOD_CANNOT_DELETE_CAST: "delete_people_from_title_error_msg_cannot_delete_cast",
    VOD_WRONG_PROMO_CODE: "all_vod_error_msg_wrong_promo_code",
    VOD_MORE_MEDIA_PROVIDERS: "vod_info_screen_btn_title_view_more_media_providers",
    VOD_CHOOSE_MEDIA_PROVIDER: "vod_info_screen_title_choose_media_providers",
    VOD_CANNOT_DELETE_SEASON: "delete_season_error_msg_season_cannot_deleted",
    VOD_EPISODE_NOT_FOUND: "all_vod_series_error_msg_episode_is_not_found",
    VOD_RENT_PRICE_NOT_MATCH: "rent_title_error_msg_price_not_match",
    VOD_RENT_USER_NOT_ENOUGH_BALANCE: "rent_title_error_msg_user_not_has_enough_balance",
    VOD_RENT_TITLE_ALREADY_RENTED: "add_title_error_msg_title_already_rented",
    VOD_UNLOCK_TITLE_NOT_AVAILABLE_FOR_ACCOUNTTYPE: "unlock_title_error_msg_title_not_exist_in_account_type",
    VOD_UNLOCK_TITLE_ALREADY_UNLOCKED: "unlock_title_error_msg_title_already_unlock",
    VOD_UNLOCK_TITLE_NO_REMAINING_UNLOCKS: "unlock_title_error_msg_no_remaining_unlocks",
    VOD_TITLE_NOT_EXIST: "all_vod_error_msg_title_not_exist_in_system",
    VOD_TITLE_ADD_MISSING_INFO: "add_title_error_msg_title_info_missed",
    VOD_TITLE_ALREADY_EXIST_WITH_FREE_PRICE: "add_title_error_msg_title_already_exist_with_free_price",
    VOD_TITLE_PRICE_IS_WRONG: "add_title_error_msg_title_price_is_wrong",
    VOD_TITLE_ALREADY_PUBLISHED_SAME_PROPERTIES: "add_title_error_msg_title_already_published_before_with_same_properties",
    VOD_TITLE_ADD_WW_SHOULD_BE_FOUND: "add_title_error_msg_price_ww_should_found",
    VOD_TITLE_ALREADY_EXIST_WITH_VIP_PRICE: "add_title_error_msg_title_already_exist_with_VIP_price",
    VOD_PEOPLE_NOT_FOUND: "all_vod_people_error_msg_people_is_not_found",



}

module.exports.wallet = {
    WALLET_TRANSACTION_TITLE_RENT: "wallet_transaction_title_for_rent_title_action",
    WALLET_TRANSACTION_DESCRIPTION_RENT: "wallet_transaction_description_for_rent_title_action",
    WALLET_TRANSACTION_TITLE_ACCOUNTTYPE: "wallet_transaction_title_for_account_type_action",
    WALLET_TRANSACTION_DESCRIPTION_ACCOUNTTYPE: "wallet_transaction_description_for_account_type_action",
    WALLET_TRANSACTION_TITLE_FOR_WALLET: "wallet_transaction_title_for_wallet_topup_action",
    WALLET_TRANSACTION_DESCRIPTION_FOR_WALLET: "wallet_transaction_description_for_wallet_topup_action",
    WALLET_TRANSACTION_DESCRIPTION_PROMO_REDEMPTION: "wallet_transaction_description_for_promo_redemption_action",
    WALLET_TRANSACTION_TITLE_PROMO_REDEMPTION: "wallet_transaction_title_for_promo_redemption_action",
    WALLET_RECHARGE_INVALID_AMOUNT: "recharge_wallet_error_msg_coins_amount_invalid"


}