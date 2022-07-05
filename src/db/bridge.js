const {
    Student,
    User,
    Product,
    Event,
    Study,
    LanguageLevel,
    trainingSeminar,
    profesionalActivity,
    activityAndInterest
} = require('../db/sequelize');

exports.db_access = () => {
    return  {
        'student_student': Student,
        'users_user': User,
        'products_product': Product,
        'studies_study': Study,
        'events_event': Event,
        'languages_level': LanguageLevel,
        'trainings_seminar': trainingSeminar,
        'profesionals_activity': profesionalActivity,
        'activityAndInterest': activityAndInterest
    }
};