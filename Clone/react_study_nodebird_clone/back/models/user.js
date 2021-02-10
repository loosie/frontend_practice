const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Post extends Model{
    static init(sequelize){
        return super.init({
            // id가 기본적으로 들어있다.
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
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8',
            collate: 'utf8_general_ci', //  한글 저장
            sequelize,
        });
    }
    static associate(db){
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);

        // sequelize에서 Like테이블 자동 생성
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); // 좋아요 테이블 1:N - like - N:1 / as: db이름 설정

        // 팔로잉,팔로워 
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
    };
    
}
