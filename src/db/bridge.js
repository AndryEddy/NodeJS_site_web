const { Student,User } = require('../db/sequelize')

exports.db_access = () => {
    const table_user = User.name
    const table_student = Student.name
    const datas = {
        'student_student': Student,
        'users_user': User
    }
    return datas
}