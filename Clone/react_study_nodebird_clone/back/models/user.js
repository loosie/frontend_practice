module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { // MySql에는 users테이블 생성
        // id: {},  // mysql에서 자동으로 넣어줌
        email: {
            type: DataTypes.STRING(30),
            allowNull: false, // 필수 (NotNull)
            unique: true, // 고유 값
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', //  한글 저장
    });
    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);

        // sequelize에서 Like테이블 자동 생성
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Likers' }); // 좋아요 테이블 1:N - like - N:1 / as: db이름 설정

        // 팔로잉,팔로워 
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
    };

    return User;
}