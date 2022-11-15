const User = require('./User');
const College = require('./College');
const Comment = require('./Comment');

User.hasMany(College, {
    foreignKey: 'user_id'
});


College.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comment.belongsTo(College, {
    foreignKey: 'College_id',
    onDelete: "cascade"
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

College.hasMany(Comment, {
    foreignKey: 'College_id',
    onDelete: "cascade"
})



module.exports = { User, College, Comment };