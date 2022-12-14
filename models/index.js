const User = require('./Users');
const Comment = require('./Comment');
const College = require('./Colleges');
const UserCollege = require('./UserCollege');

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

College.hasMany(Comment, {
    foreignKey: 'college_id',
    onDelete: 'CASCADE'
});

// Comment.belongsTo(College, {
//     foreignKey: 'college_id'
// });

User.belongsToMany(College, {through: UserCollege});
College.belongsToMany(User, {through: UserCollege});

module.exports = {
    User,
    College,
    Comment,
    UserCollege
};